import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { createAdminClient, supabaseConfigured } from "./supabase/server";

export type DdInvite = {
  id: string;
  founderName: string;
  founderEmail: string;
  companyName: string;
  answers: Record<string, string>;
  status: "draft" | "completed";
};

export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");
export const newToken = () => randomBytes(32).toString("base64url");

const devPreview = process.env.NODE_ENV === "development" && !supabaseConfigured;

/** Looks up a questionnaire by its secret link token. Returns null for unknown or expired links. */
export async function getDdInvite(token: string): Promise<DdInvite | null> {
  if (!/^[A-Za-z0-9_-]{20,100}$/.test(token)) return null;
  if (devPreview)
    return token.startsWith("preview")
      ? { id: "preview", founderName: "", founderEmail: "", companyName: "", answers: {}, status: "draft" }
      : null;
  if (!supabaseConfigured) return null;

  const admin = createAdminClient();
  const { data: invite } = await admin
    .from("dd_invites")
    .select("id,founder_name,founder_email,company_name,expires_at")
    .eq("token_hash", hashToken(token))
    .maybeSingle();
  if (!invite || new Date(invite.expires_at) < new Date()) return null;

  const { data: sub } = await admin.from("dd_submissions").select("answers,status").eq("invite_id", invite.id).maybeSingle();
  return {
    id: invite.id,
    founderName: invite.founder_name,
    founderEmail: invite.founder_email,
    companyName: invite.company_name,
    answers: (sub?.answers as Record<string, string>) ?? {},
    status: sub?.status ?? "draft",
  };
}
