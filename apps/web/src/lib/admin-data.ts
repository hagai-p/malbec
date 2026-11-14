import "server-only";
import { createSessionClient, supabaseConfigured } from "./supabase/server";

/** All reads run as the signed-in admin, so row-level security independently confirms the role. */
async function rows<T>(table: string, select: string, order: string, limit = 500): Promise<T[]> {
  if (!supabaseConfigured) return [];
  const supabase = await createSessionClient();
  const { data, error } = await supabase.from(table).select(select).order(order, { ascending: false }).limit(limit);
  if (error) console.error(`[admin] ${table}:`, error.message);
  return (data as T[]) ?? [];
}

export type Profile = { id: string; email: string; full_name: string; firm: string; country: string; investor_type: string; role: string; status: string; invited_at: string; last_seen_at: string | null; access_expires_at: string | null };
export type Activity = { id: number; kind: string; target: string; created_at: string; profiles: { full_name: string; email: string } | null };
export type DocRow = { id: string; title: string; category: string; published: boolean; created_at: string };
export type Pitch = { id: number; founder_name: string; founder_email: string; company_name: string; company_url: string; country: string; sector: string; stage: string; short_pitch: string; bridge: string; status: string; created_at: string };
export type Contact = { id: number; name: string; email: string; organisation: string; message: string; handled: boolean; created_at: string };
export type Interest = { id: number; vehicles: string[]; amount_range: string; note: string; created_at: string; profiles: { full_name: string; email: string; firm: string } | null };
export type DdRow = { id: string; founder_name: string; founder_email: string; company_name: string; created_at: string; expires_at: string; dd_submissions: { status: string; updated_at: string } | null };

export const listProfiles = () => rows<Profile>("profiles", "id,email,full_name,firm,country,investor_type,role,status,invited_at,last_seen_at,access_expires_at", "invited_at");
export const listActivity = () => rows<Activity>("activity_log", "id,kind,target,created_at,profiles(full_name,email)", "created_at", 300);
export const listAllDocuments = () => rows<DocRow>("documents", "id,title,category,published,created_at", "created_at");
export const listPitches = () => rows<Pitch>("founder_pitches", "*", "created_at");
export const listContacts = () => rows<Contact>("contact_messages", "*", "created_at");
export const listInterest = () => rows<Interest>("lp_interest", "id,vehicles,amount_range,note,created_at,profiles(full_name,email,firm)", "created_at");
export const listDd = () => rows<DdRow>("dd_invites", "id,founder_name,founder_email,company_name,created_at,expires_at,dd_submissions(status,updated_at)", "created_at");

export async function getDd(id: string) {
  if (!supabaseConfigured || !/^[0-9a-f-]{36}$/i.test(id)) return null;
  const supabase = await createSessionClient();
  const { data } = await supabase
    .from("dd_invites")
    .select("id,founder_name,founder_email,company_name,dd_submissions(answers,status,completed_at)")
    .eq("id", id)
    .maybeSingle();
  return data as { id: string; founder_name: string; founder_email: string; company_name: string; dd_submissions: { answers: Record<string, string>; status: string; completed_at: string | null } | null } | null;
}

export const fmt = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";
