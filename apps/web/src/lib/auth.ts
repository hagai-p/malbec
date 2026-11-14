import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient, createSessionClient, supabaseConfigured } from "./supabase/server";

export type Viewer = {
  id: string;
  email: string;
  fullName: string;
  firm: string;
  role: "admin" | "lp";
  status: "invited" | "active" | "suspended";
  personalNote: string;
};

/** Local design preview only: never active in a production build. */
const previewMode = process.env.NODE_ENV === "development" && process.env.LP_PREVIEW === "1";
const previewViewer: Viewer = {
  id: "00000000-0000-0000-0000-000000000000",
  email: "preview@example.com",
  fullName: "Preview Investor",
  firm: "Example Family Office",
  role: "admin",
  status: "active",
  personalNote: "",
};

/** The signed-in person and their profile, or null. Always verified with the auth server. */
export async function getViewer(): Promise<Viewer | null> {
  // Reading the request first guarantees this is never evaluated at build time,
  // so no gated page can be prerendered into static output.
  await cookies();
  if (previewMode) return previewViewer;
  if (!supabaseConfigured) return null;

  const supabase = await createSessionClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: p } = await supabase
    .from("profiles")
    .select("id,email,full_name,firm,role,status,personal_note,access_expires_at")
    .eq("id", user.id)
    .maybeSingle();
  if (!p) return null;
  if (p.access_expires_at && new Date(p.access_expires_at) < new Date()) return null;

  return {
    id: p.id, email: p.email, fullName: p.full_name, firm: p.firm,
    role: p.role, status: p.status, personalNote: p.personal_note,
  };
}

/** Gate for LP pages: signed in, not suspended, attested. */
export async function requireLp(): Promise<Viewer> {
  const viewer = await getViewer();
  if (!viewer || viewer.status === "suspended") redirect("/lp/login");
  if (viewer.status === "invited") redirect("/lp/welcome");
  return viewer;
}

/** Gate for the attestation step: signed in and still 'invited'. */
export async function requireInvited(): Promise<Viewer> {
  const viewer = await getViewer();
  if (!viewer || viewer.status === "suspended") redirect("/lp/login");
  if (viewer.status === "active") redirect("/lp");
  return viewer;
}

export async function requireAdmin(): Promise<Viewer> {
  const viewer = await getViewer();
  if (!viewer || viewer.status !== "active") redirect("/lp/login");
  if (viewer.role !== "admin") redirect("/lp");
  return viewer;
}

export async function logActivity(userId: string, kind: string, target = "") {
  if (previewMode || !supabaseConfigured) return;
  const { error } = await createAdminClient().from("activity_log").insert({ user_id: userId, kind, target });
  if (error) console.error("[activity] failed to log", kind, error.message);
}
