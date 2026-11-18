import type { Metadata } from "next";
import Link from "next/link";
import { LpPage } from "@/components/lp/shell";
import { listDocuments } from "@/lib/lp-data";

export const metadata: Metadata = { title: "Data room" };

async function DocumentList() {
  const docs = await listDocuments();
  if (!docs.length)
    return <p className="rounded-xl border border-dashed border-gold-deep/50 p-8 italic text-muted">Documents are being prepared and will appear here.</p>;
  const groups = Map.groupBy(docs, (d) => d.category);
  return (
    <div className="space-y-12">
      {[...groups].map(([category, items]) => (
        <section key={category}>
          <h2 className="eyebrow">{category}</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {items.map((d) => (
              <li key={d.id}>
                <Link href={`/lp/data-room/${d.id}`} prefetch={false} className="group flex items-baseline justify-between gap-6 py-5">
                  <span>
                    <span className="font-display text-xl text-wine-900 group-hover:underline">{d.title}</span>
                    {d.description && <span className="mt-1 block text-sm text-muted">{d.description}</span>}
                  </span>
                  <span className="shrink-0 text-sm text-wine-800">Open →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default function DataRoom() {
  return (
    <LpPage
      slug="data-room" number="10"
      eyebrow="Data room"
      title="The documents."
      lede="Documents open here in your browser and are for viewing only. Each one you open is recorded against your name."
    >
      <DocumentList />
    </LpPage>
  );
}
