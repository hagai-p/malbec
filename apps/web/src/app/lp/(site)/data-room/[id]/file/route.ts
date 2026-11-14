import { getViewer, logActivity } from "@/lib/auth";
import { getDocument } from "@/lib/lp-data";
import { createAdminClient } from "@/lib/supabase/server";

const TYPES: Record<string, string> = { pdf: "application/pdf", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp" };

/** Streams one data-room file to a verified, active LP and records the view. */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const viewer = await getViewer();
  if (!viewer || viewer.status !== "active") return new Response("Not found", { status: 404 });

  const { id } = await params;
  const doc = await getDocument(id); // read with the viewer's own session: RLS must allow it
  if (!doc) return new Response("Not found", { status: 404 });

  const ext = doc.storage_path.split(".").pop()?.toLowerCase() ?? "";
  const type = TYPES[ext];
  if (!type) return new Response("Not found", { status: 404 });

  const { data, error } = await createAdminClient().storage.from("dataroom").download(doc.storage_path);
  if (error || !data) return new Response("Not found", { status: 404 });

  await logActivity(viewer.id, "document_view", doc.title);
  return new Response(data, {
    headers: {
      "Content-Type": type,
      "Content-Disposition": "inline",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
