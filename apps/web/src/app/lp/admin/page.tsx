import { InviteForm } from "@/components/lp/admin-forms";
import { resendInvite, setLpStatus } from "@/lib/admin-actions";
import { fmt, listProfiles } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";

const badge: Record<string, string> = { active: "bg-wine-800 text-cream", invited: "bg-gold text-wine-950", suspended: "bg-sand text-muted" };

export default async function AdminInvestors() {
  await requireAdmin();
  const people = await listProfiles();
  return (
    <div className="space-y-14">
      <section>
        <h1 className="display text-4xl text-wine-900">Investors</h1>
        <p className="mt-2 text-muted">Everyone who has been invited to the LP site. Nobody else can get in.</p>
        <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-paper">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-[0.15em] text-gold-deep">
              <tr>{["Investor", "Firm", "Status", "Invited", "Last seen", ""].map((h) => <th key={h} scope="col" className="px-4 py-3 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {people.map((p) => (
                <tr key={p.id} className="border-b border-line/70 last:border-0">
                  <td className="px-4 py-3"><span className="font-medium text-ink">{p.full_name || "—"}</span><br /><span className="text-muted">{p.email}</span></td>
                  <td className="px-4 py-3 text-muted">{p.firm || "—"}{p.country && `, ${p.country}`}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs ${badge[p.status]}`}>{p.role === "admin" ? "admin" : p.status}</span></td>
                  <td className="px-4 py-3 text-muted">{fmt(p.invited_at)}</td>
                  <td className="px-4 py-3 text-muted">{fmt(p.last_seen_at)}</td>
                  <td className="px-4 py-3">
                    {p.role !== "admin" && (
                      <div className="flex justify-end gap-3">
                        {p.status === "invited" && (
                          <form action={resendInvite}><input type="hidden" name="id" value={p.id} /><button className="text-wine-800 underline">Resend</button></form>
                        )}
                        <form action={setLpStatus}>
                          <input type="hidden" name="id" value={p.id} />
                          <input type="hidden" name="status" value={p.status === "suspended" ? "active" : "suspended"} />
                          <button className="text-wine-800 underline">{p.status === "suspended" ? "Restore" : "Suspend"}</button>
                        </form>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {!people.length && <tr><td colSpan={6} className="px-4 py-8 text-center italic text-muted">No investors yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
      <section className="max-w-3xl">
        <h2 className="display text-2xl text-wine-900">Invite an investor</h2>
        <p className="mb-6 mt-2 text-muted">They receive a personal email from you with a single-use link.</p>
        <InviteForm />
      </section>
    </div>
  );
}
