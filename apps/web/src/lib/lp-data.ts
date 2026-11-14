import "server-only";
import { createSessionClient, supabaseConfigured } from "./supabase/server";

export type Doc = { id: string; title: string; description: string; category: string; storage_path: string };
export type Update = { id: number; title: string; body: string; published_at: string };

/** Read as the signed-in LP, so row-level security decides what comes back. */
export async function listDocuments(): Promise<Doc[]> {
  if (!supabaseConfigured) return [];
  const supabase = await createSessionClient();
  const { data } = await supabase
    .from("documents")
    .select("id,title,description,category,storage_path")
    .eq("published", true)
    .order("category")
    .order("sort_order");
  return data ?? [];
}

export async function getDocument(id: string): Promise<Doc | null> {
  if (!supabaseConfigured || !/^[0-9a-f-]{36}$/i.test(id)) return null;
  const supabase = await createSessionClient();
  const { data } = await supabase
    .from("documents")
    .select("id,title,description,category,storage_path")
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();
  return data;
}

export async function listUpdates(): Promise<Update[]> {
  if (!supabaseConfigured) return [];
  const supabase = await createSessionClient();
  const { data } = await supabase.from("updates").select("id,title,body,published_at").order("published_at", { ascending: false });
  return data ?? [];
}
