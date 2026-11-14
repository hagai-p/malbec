import "server-only";

/**
 * Minimal server-side writer for form submissions.
 * Uses the Supabase REST API with the service-role key, so it bypasses row-level security
 * and must only ever be called from server code.
 */
export async function insertRow(table: string, row: Record<string, unknown>): Promise<{ ok: boolean }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[store] Supabase not configured; would insert into ${table}:`, row);
      return { ok: true };
    }
    console.error(`[store] Supabase not configured; dropped a submission to ${table}`);
    return { ok: false };
  }

  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (!res.ok) console.error(`[store] insert into ${table} failed: ${res.status} ${await res.text()}`);
  return { ok: res.ok };
}
