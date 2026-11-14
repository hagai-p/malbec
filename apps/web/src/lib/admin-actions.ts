"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "./auth";
import { hashToken, newToken } from "./dd";
import { sendEmail } from "./email";
import { requestOrigin } from "./origin";
import { createAdminClient, supabaseConfigured } from "./supabase/server";
import { site } from "@/content/site";
import type { FormState } from "./actions";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (form: FormData, key: string, max = 300) => String(form.get(key) ?? "").trim().slice(0, max);
const notReady: FormState = { status: "error", message: "The database is not connected yet." };

function invitationText(first: string, note: string, link: string) {
  return [
    `${first ? `Dear ${first}` : "Hello"},`,
    "",
    "I'd like to share what we're building at Malbec Ventures, the first and only Israel–LATAM cross-border VC.",
    note ? `\n${note}\n` : "",
    "I've set up a private page for you with everything I would walk you through in person: the opportunity, our portfolio, the terms, and the documents. It is for you only.",
    "",
    link,
    "",
    "The link works once and is valid for 24 hours; after that you can sign in with this email address at www.malbec.online. What you find there is confidential, so please keep it to yourself.",
    "",
    "I'd be glad to talk whenever it suits you.",
    "",
    "Hagai Platin",
    "Founder & Managing Partner, Malbec Ventures",
    site.phone,
  ].join("\n");
}

export async function inviteLp(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  if (!supabaseConfigured) return notReady;
  const email = str(form, "email", 320).toLowerCase();
  const full_name = str(form, "full_name");
  if (!EMAIL.test(email)) return { status: "error", errors: { email: "Enter a valid email address." } };
  if (!full_name) return { status: "error", errors: { full_name: "Enter the investor's name." } };

  const admin = createAdminClient();
  const { data: existing } = await admin.from("profiles").select("id").eq("email", email).maybeSingle();
  if (existing) return { status: "error", errors: { email: "This person has already been invited." } };

  const { data, error } = await admin.auth.admin.generateLink({ type: "invite", email });
  if (error || !data.user || !data.properties?.hashed_token)
    return { status: "error", message: `Could not create the invitation: ${error?.message ?? "unknown error"}` };

  const personal_note = str(form, "personal_note", 1000);
  const expires = str(form, "access_expires_at", 20);
  const { error: pErr } = await admin.from("profiles").insert({
    id: data.user.id, email, full_name, role: "lp", status: "invited",
    firm: str(form, "firm"), country: str(form, "country"), investor_type: str(form, "investor_type"),
    personal_note, access_expires_at: expires ? new Date(expires).toISOString() : null,
  });
  if (pErr) {
    await admin.auth.admin.deleteUser(data.user.id);
    return { status: "error", message: `Could not save the invitation: ${pErr.message}` };
  }

  const link = `${await requestOrigin()}/lp/auth/confirm?token_hash=${data.properties.hashed_token}&type=invite`;
  const sent = await sendEmail({
    to: email,
    subject: "A private invitation from Malbec Ventures",
    text: invitationText(full_name.split(" ")[0], personal_note, link),
    replyTo: site.email,
  });
  revalidatePath("/lp/admin");
  return sent.ok
    ? { status: "ok", message: `Invitation sent to ${email}.` }
    : { status: "error", message: "The investor was added but the email could not be sent. Use “Resend”." };
}

export async function resendInvite(form: FormData) {
  await requireAdmin();
  if (!supabaseConfigured) return;
  const id = str(form, "id");
  const admin = createAdminClient();
  const { data: p } = await admin.from("profiles").select("email,full_name,personal_note").eq("id", id).maybeSingle();
  if (!p) return;
  const { data } = await admin.auth.admin.generateLink({ type: "magiclink", email: p.email });
  if (!data?.properties?.hashed_token) return;
  const link = `${await requestOrigin()}/lp/auth/confirm?token_hash=${data.properties.hashed_token}&type=magiclink`;
  await sendEmail({
    to: p.email,
    subject: "A private invitation from Malbec Ventures",
    text: invitationText(p.full_name.split(" ")[0], p.personal_note, link),
    replyTo: site.email,
  });
  await admin.from("profiles").update({ invited_at: new Date().toISOString() }).eq("id", id);
  revalidatePath("/lp/admin");
}

export async function setLpStatus(form: FormData) {
  const me = await requireAdmin();
  if (!supabaseConfigured) return;
  const id = str(form, "id");
  const status = str(form, "status");
  if (id === me.id || !["active", "suspended"].includes(status)) return;
  const admin = createAdminClient();
  const { data: p } = await admin.from("profiles").select("status").eq("id", id).maybeSingle();
  if (!p) return;
  // Restoring someone who never attested returns them to 'invited', not 'active'.
  const { count } = await admin.from("attestations").select("id", { count: "exact", head: true }).eq("user_id", id);
  const next = status === "active" && !count ? "invited" : status;
  await admin.from("profiles").update({ status: next }).eq("id", id);
  if (next === "suspended") await admin.auth.admin.signOut(id, "global").catch(() => {});
  revalidatePath("/lp/admin");
}

export async function uploadDocument(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  if (!supabaseConfigured) return notReady;
  const file = form.get("file");
  const title = str(form, "title");
  if (!title) return { status: "error", errors: { title: "Give the document a title." } };
  if (!(file instanceof File) || !file.size) return { status: "error", errors: { file: "Choose a file." } };
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!["pdf", "png", "jpg", "jpeg", "webp"].includes(ext))
    return { status: "error", errors: { file: "Use a PDF or an image (PNG, JPG, WebP) so it can be shown view-only." } };
  if (file.size > 40 * 1024 * 1024) return { status: "error", errors: { file: "The file is larger than 40 MB." } };

  const admin = createAdminClient();
  const storage_path = `${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await admin.storage.from("dataroom").upload(storage_path, file, { contentType: file.type });
  if (upErr) return { status: "error", message: `Upload failed: ${upErr.message}` };
  const { error } = await admin.from("documents").insert({
    title, storage_path, description: str(form, "description", 500),
    category: str(form, "category") || "General", published: form.get("published") === "on",
  });
  if (error) {
    await admin.storage.from("dataroom").remove([storage_path]);
    return { status: "error", message: `Could not save: ${error.message}` };
  }
  revalidatePath("/lp/admin/documents");
  return { status: "ok", message: `“${title}” added.` };
}

export async function setDocumentPublished(form: FormData) {
  await requireAdmin();
  if (!supabaseConfigured) return;
  await createAdminClient().from("documents").update({ published: str(form, "published") === "true" }).eq("id", str(form, "id"));
  revalidatePath("/lp/admin/documents");
}

export async function postUpdate(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  if (!supabaseConfigured) return notReady;
  const title = str(form, "title");
  const body = str(form, "body", 20000);
  if (!title || !body) return { status: "error", message: "An update needs a title and some text." };
  const { error } = await createAdminClient().from("updates").insert({ title, body });
  if (error) return { status: "error", message: error.message };
  revalidatePath("/lp/admin/documents");
  return { status: "ok", message: "Update published to the LP site." };
}

/** Sends a founder their personal DD questionnaire link. Only the hash of the token is stored. */
export async function sendDdInvite(form: FormData) {
  await requireAdmin();
  if (!supabaseConfigured) return;
  const pitchId = Number(str(form, "pitch_id"));
  const admin = createAdminClient();
  const { data: pitch } = await admin
    .from("founder_pitches").select("id,founder_name,founder_email,company_name").eq("id", pitchId).maybeSingle();
  if (!pitch) return;

  const token = newToken();
  const { error } = await admin.from("dd_invites").insert({
    pitch_id: pitch.id, token_hash: hashToken(token),
    founder_name: pitch.founder_name, founder_email: pitch.founder_email, company_name: pitch.company_name,
  });
  if (error) return;
  const link = `${site.publicUrl}/dd/${token}`;
  await sendEmail({
    to: pitch.founder_email,
    subject: "Malbec Ventures — due-diligence questionnaire",
    replyTo: site.email,
    text: [
      `Hi ${pitch.founder_name.split(" ")[0]},`, "",
      `Thank you for the conversations so far. We'd like to take a closer look at ${pitch.company_name}.`, "",
      "This is your personal link to our due-diligence questionnaire: eighteen questions, about half an hour. Your answers save as you go, and you can return on the same link until you submit.", "",
      link, "",
      "The link is valid for 45 days. Please don't forward it.", "",
      "Hagai Platin", "Malbec Ventures",
    ].join("\n"),
  });
  await admin.from("founder_pitches").update({ status: "dd_sent" }).eq("id", pitch.id);
  revalidatePath("/lp/admin/inbox");
}

export async function markHandled(form: FormData) {
  await requireAdmin();
  if (!supabaseConfigured) return;
  await createAdminClient().from("contact_messages").update({ handled: true }).eq("id", Number(str(form, "id")));
  revalidatePath("/lp/admin/inbox");
}
