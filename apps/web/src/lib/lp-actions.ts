"use server";

import { redirect } from "next/navigation";
import { logActivity, requireInvited, requireLp } from "./auth";
import { notifyAdmin, sendEmail } from "./email";
import { requestOrigin } from "./origin";
import { createAdminClient, createSessionClient, supabaseConfigured } from "./supabase/server";
import { interestRanges, investorStatuses, termsVersion } from "@/content/lp/fund";
import type { FormState } from "./actions";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Step 1 of sign-in: email a one-time link, but only to people who already have a profile. */
export async function requestLoginLink(_prev: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL.test(email)) return { status: "error", errors: { email: "Please enter a valid email address." } };
  // Same answer whether or not the address is invited, so the form reveals nothing.
  const answer: FormState = { status: "ok" };
  if (!supabaseConfigured) return answer;

  const admin = createAdminClient();
  const { data: profile } = await admin.from("profiles").select("id,status,full_name").eq("email", email).maybeSingle();
  if (!profile || profile.status === "suspended") return answer;

  const { data, error } = await admin.auth.admin.generateLink({ type: "magiclink", email });
  if (error || !data.properties?.hashed_token) {
    console.error("[login] could not generate link:", error?.message);
    return answer;
  }
  const origin = await requestOrigin();
  const link = `${origin}/lp/auth/confirm?token_hash=${data.properties.hashed_token}&type=magiclink`;
  const first = profile.full_name.split(" ")[0] || "there";
  await sendEmail({
    to: email,
    subject: "Your Malbec Ventures sign-in link",
    text: `Hi ${first},\n\nHere is your sign-in link for the Malbec Ventures investor site:\n\n${link}\n\nIt works once and expires in an hour. If you didn't ask for it, you can ignore this email.\n\nHagai`,
  });
  return answer;
}

/** Step 2 of sign-in: exchange the emailed token for a session. Runs on a button press, not on page load,
 *  so that email scanners which pre-open links cannot use up the token. */
export async function confirmLogin(form: FormData) {
  const token_hash = String(form.get("token_hash") ?? "");
  const type = String(form.get("type") ?? "");
  if (!supabaseConfigured || !token_hash || !["magiclink", "invite"].includes(type)) redirect("/lp/login?error=link");

  const supabase = await createSessionClient();
  const { data, error } = await supabase.auth.verifyOtp({ token_hash, type: type as "magiclink" | "invite" });
  if (error || !data.user) redirect("/lp/login?error=link");

  await createAdminClient().from("profiles").update({ last_seen_at: new Date().toISOString() }).eq("id", data.user.id);
  await logActivity(data.user.id, "login");
  redirect("/lp");
}

export async function signOut() {
  if (supabaseConfigured) await (await createSessionClient()).auth.signOut();
  redirect("/lp/login");
}

/** First visit: record the investor's self-certification and acceptance of the confidentiality terms. */
export async function submitAttestation(_prev: FormState, form: FormData): Promise<FormState> {
  const viewer = await requireInvited();
  const investor_status = String(form.get("investor_status") ?? "");
  const jurisdiction = String(form.get("jurisdiction") ?? "").trim().slice(0, 100);
  const errors: Record<string, string> = {};
  if (!investorStatuses.includes(investor_status)) errors.investor_status = "Please choose the description that applies to you.";
  if (!jurisdiction) errors.jurisdiction = "Please tell us your country of residence.";
  if (form.get("confirm_identity") !== "on") errors.confirm_identity = "Please confirm this invitation was addressed to you.";
  if (form.get("accept_terms") !== "on") errors.accept_terms = "Please accept the confidentiality terms to continue.";
  if (Object.keys(errors).length) return { status: "error", errors };

  const admin = createAdminClient();
  const { error: e1 } = await admin
    .from("attestations")
    .insert({ user_id: viewer.id, investor_status, jurisdiction, terms_version: termsVersion });
  const { error: e2 } = e1
    ? { error: e1 }
    : await admin.from("profiles").update({ status: "active" }).eq("id", viewer.id).eq("status", "invited");
  if (e1 || e2) {
    console.error("[attestation] failed:", (e1 ?? e2)?.message);
    return { status: "error", message: "We couldn't record that. Please try again." };
  }
  await logActivity(viewer.id, "attestation", investor_status);
  await notifyAdmin("LP accepted invitation", `${viewer.fullName} (${viewer.email}) has entered the investor site.`);
  redirect("/lp");
}

export async function submitInterest(_prev: FormState, form: FormData): Promise<FormState> {
  const viewer = await requireLp();
  const vehicles = form.getAll("vehicles").map(String).filter((v) => ["poc", "malbec-1"].includes(v));
  const amount_range = String(form.get("amount_range") ?? "");
  const note = String(form.get("note") ?? "").trim().slice(0, 2000);
  const errors: Record<string, string> = {};
  if (!vehicles.length) errors.vehicles = "Please choose at least one.";
  if (!interestRanges.includes(amount_range)) errors.amount_range = "Please choose a range.";
  if (Object.keys(errors).length) return { status: "error", errors };

  if (supabaseConfigured) {
    const { error } = await createAdminClient().from("lp_interest").insert({ user_id: viewer.id, vehicles, amount_range, note });
    if (error) {
      console.error("[interest] failed:", error.message);
      return { status: "error", message: "We couldn't record that. Please try again, or write to Hagai directly." };
    }
  }
  await logActivity(viewer.id, "interest", `${vehicles.join("+")} ${amount_range}`);
  await notifyAdmin(
    "LP indication of interest",
    `${viewer.fullName} (${viewer.firm || viewer.email})\nVehicles: ${vehicles.join(", ")}\nRange: ${amount_range}\n\n${note}`,
  );
  return { status: "ok" };
}
