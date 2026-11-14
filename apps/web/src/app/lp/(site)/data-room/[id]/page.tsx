import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DocumentViewer } from "@/components/lp/document-viewer";
import { requireLp } from "@/lib/auth";
import { getDocument } from "@/lib/lp-data";

export const metadata: Metadata = { title: "Document" };

async function Viewer({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireLp();
  const { id } = await params;
  const doc = await getDocument(id);
  if (!doc) notFound();
  const isPdf = doc.storage_path.toLowerCase().endsWith(".pdf");
  return (
    <main id="main" className="px-4 pb-16 pt-8 sm:px-10">
      <Link href="/lp/data-room" prefetch={false} className="text-sm text-muted hover:text-wine-800">← Data room</Link>
      <h1 className="display mt-4 text-3xl text-wine-900">{doc.title}</h1>
      <p className="mt-2 text-xs text-muted">Confidential. Viewing recorded for {viewer.fullName || viewer.email}.</p>
      <DocumentViewer src={`/lp/data-room/${doc.id}/file`} isPdf={isPdf} watermark={`${viewer.fullName || viewer.email} · Confidential`} />
    </main>
  );
}

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="px-6 py-24 text-sm text-muted sm:px-12">Opening…</div>}>
      <Viewer params={params} />
    </Suspense>
  );
}
