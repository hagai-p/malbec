import Link from "next/link";
import { markHandled, sendDdInvite } from "@/lib/admin-actions";
import { fmt, listContacts, listDd, listInterest, listPitches } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";

const Empty = ({ text }: { text: string }) => <li className="px-5 py-8 text-center italic text-muted">{text}</li>;

export default async function AdminInbox() {
  await requireAdmin();
  const [interest, pitches, dd, contacts] = await Promise.all([listInterest(), listPitches(), listDd(), listContacts()]);
  return (
    <div className="space-y-14">
      <h1 className="display text-4xl text-heading">Inbox</h1>

      <section>
        <h2 className="display text-2xl text-heading">LP indications of interest</h2>
        <ul className="mt-5 divide-y divide-line rounded-xl border border-line bg-paper">
          {interest.map((i) => (
            <li key={i.id} className="px-5 py-4">
              <p className="font-medium text-ink">{i.profiles?.full_name || i.profiles?.email} <span className="font-normal text-muted">{i.profiles?.firm}</span></p>
              <p className="mt-1 text-sm">{i.vehicles.join(" + ")} · {i.amount_range} · <span className="text-muted">{fmt(i.created_at)}</span></p>
              {i.note && <p className="mt-2 text-sm leading-relaxed text-muted">{i.note}</p>}
            </li>
          ))}
          {!interest.length && <Empty text="None yet." />}
        </ul>
      </section>

      <section>
        <h2 className="display text-2xl text-heading">Founder pitches</h2>
        <ul className="mt-5 divide-y divide-line rounded-xl border border-line bg-paper">
          {pitches.map((p) => (
            <li key={p.id} className="flex flex-wrap items-start justify-between gap-4 px-5 py-4">
              <div className="max-w-2xl">
                <p className="font-medium text-ink">{p.company_name} <span className="font-normal text-muted">· {p.founder_name}, {p.founder_email}</span></p>
                <p className="mt-1 text-sm text-muted">{[p.country, p.sector, p.stage].filter(Boolean).join(" · ")} · {fmt(p.created_at)}</p>
                <p className="mt-2 text-sm leading-relaxed">{p.short_pitch}</p>
                {p.bridge && <p className="mt-1 text-sm leading-relaxed text-muted">{p.bridge}</p>}
              </div>
              {p.status === "dd_sent" ? (
                <span className="rounded-full bg-sand px-2.5 py-1 text-xs text-muted">DD link sent</span>
              ) : (
                <form action={sendDdInvite}><input type="hidden" name="pitch_id" value={p.id} /><button className="btn-ghost !py-2">Send DD questionnaire</button></form>
              )}
            </li>
          ))}
          {!pitches.length && <Empty text="None yet." />}
        </ul>
      </section>

      <section>
        <h2 className="display text-2xl text-heading">DD questionnaires</h2>
        <ul className="mt-5 divide-y divide-line rounded-xl border border-line bg-paper">
          {dd.map((d) => {
            const status = d.dd_submissions?.status ?? "not started";
            return (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="font-medium text-ink">{d.company_name} <span className="font-normal text-muted">· {d.founder_name}</span></p>
                  <p className="text-sm text-muted">Sent {fmt(d.created_at)} · {status}{d.dd_submissions && ` · last saved ${fmt(d.dd_submissions.updated_at)}`}</p>
                </div>
                {d.dd_submissions && <Link href={`/lp/admin/dd/${d.id}`} prefetch={false} className="text-sm text-accent underline">Read answers</Link>}
              </li>
            );
          })}
          {!dd.length && <Empty text="None sent yet." />}
        </ul>
      </section>

      <section>
        <h2 className="display text-2xl text-heading">Contact messages</h2>
        <ul className="mt-5 divide-y divide-line rounded-xl border border-line bg-paper">
          {contacts.map((c) => (
            <li key={c.id} className={`flex flex-wrap items-start justify-between gap-4 px-5 py-4 ${c.handled ? "opacity-55" : ""}`}>
              <div className="max-w-2xl">
                <p className="font-medium text-ink">{c.name} <span className="font-normal text-muted">· {c.email}{c.organisation && ` · ${c.organisation}`} · {fmt(c.created_at)}</span></p>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{c.message}</p>
              </div>
              {!c.handled && <form action={markHandled}><input type="hidden" name="id" value={c.id} /><button className="text-sm text-accent underline">Mark handled</button></form>}
            </li>
          ))}
          {!contacts.length && <Empty text="None yet." />}
        </ul>
      </section>
    </div>
  );
}
