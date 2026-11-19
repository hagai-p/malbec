import type { Metadata } from "next";
import { LpPage } from "@/components/lp/shell";
import { listUpdates } from "@/lib/lp-data";

export const metadata: Metadata = { title: "Updates" };

async function UpdateList() {
  const updates = await listUpdates();
  if (!updates.length)
    return <p className="rounded-xl border border-dashed border-gold-deep/50 p-8 italic text-muted">No updates yet. The first one will appear here.</p>;
  return (
    <ol className="space-y-10">
      {updates.map((u) => (
        <li key={u.id} className="border-t border-line pt-6">
          <time dateTime={u.published_at} className="eyebrow">
            {new Date(u.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </time>
          <h2 className="display mt-3 text-2xl text-heading">{u.title}</h2>
          <div className="mt-4 max-w-2xl space-y-4 leading-relaxed text-ink/85">
            {u.body.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Updates() {
  return (
    <LpPage slug="updates" number="11" eyebrow="Updates" title="News from the fund." lede="Dated notes from the partners: investments, milestones, closings.">
      <UpdateList />
    </LpPage>
  );
}
