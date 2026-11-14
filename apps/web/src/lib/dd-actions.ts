"use server";

import { ddKeys, ddRequired } from "@/content/dd";
import { getDdInvite } from "./dd";
import { notifyAdmin } from "./email";
import { createAdminClient } from "./supabase/server";

type Result = { ok: boolean; error?: string; missing?: string[] };

function clean(input: Record<string, unknown>) {
  const out: Record<string, string> = {};
  for (const key of ddKeys) {
    const v = input[key];
    if (typeof v === "string") out[key] = v.slice(0, key === "short_pitch" ? 280 : 8000);
  }
  return out;
}

/** Saves a draft (autosave) or, with `complete`, locks and submits the questionnaire. */
export async function saveDd(token: string, input: Record<string, unknown>, complete = false): Promise<Result> {
  const invite = await getDdInvite(token);
  if (!invite) return { ok: false, error: "This link is no longer valid." };
  if (invite.status === "completed") return { ok: false, error: "This questionnaire has already been submitted." };

  const answers = clean(input);
  if (complete) {
    const missing = ddRequired.filter((k) => !answers[k]?.trim());
    if (missing.length) return { ok: false, missing };
  }
  if (invite.id === "preview") return { ok: true };

  const now = new Date().toISOString();
  const { error } = await createAdminClient()
    .from("dd_submissions")
    .upsert({
      invite_id: invite.id,
      answers,
      status: complete ? "completed" : "draft",
      updated_at: now,
      completed_at: complete ? now : null,
    });
  if (error) {
    console.error("[dd] save failed:", error.message);
    return { ok: false, error: "We couldn't save that. Please try again." };
  }
  if (complete)
    await notifyAdmin(
      `DD questionnaire submitted: ${answers.company_name}`,
      `${answers.founder_name} (${answers.founder_email}) has completed the DD questionnaire for ${answers.company_name}.`,
    );
  return { ok: true };
}
