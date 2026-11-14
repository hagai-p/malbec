import { fmt, listActivity } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";

const labels: Record<string, string> = { login: "Signed in", page_view: "Viewed section", document_view: "Opened document", attestation: "Accepted terms", interest: "Indicated interest" };

export default async function AdminActivity() {
  await requireAdmin();
  const items = await listActivity();
  return (
    <section>
      <h1 className="display text-4xl text-wine-900">Activity</h1>
      <p className="mt-2 text-muted">The latest 300 events: who looked at what, and when.</p>
      <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-paper">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-[0.15em] text-gold-deep">
            <tr>{["When", "Who", "What", "Detail"].map((h) => <th key={h} scope="col" className="px-4 py-3 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id} className="border-b border-line/70 last:border-0">
                <td className="whitespace-nowrap px-4 py-3 text-muted">{fmt(a.created_at)}</td>
                <td className="px-4 py-3">{a.profiles?.full_name || a.profiles?.email || "—"}</td>
                <td className="px-4 py-3">{labels[a.kind] ?? a.kind}</td>
                <td className="px-4 py-3 text-muted">{a.target}</td>
              </tr>
            ))}
            {!items.length && <tr><td colSpan={4} className="px-4 py-8 text-center italic text-muted">Nothing yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
