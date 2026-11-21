import type { Metadata } from "next";
import { Avatar } from "@/components/avatar";
import { Block, LpPage } from "@/components/lp/shell";
import { founderStory, structure } from "@/content/lp/fund";
import { team, type Person } from "@/content/team";

export const metadata: Metadata = { title: "Team & governance" };

function Compact({ people }: { people: Person[] }) {
  return (
    <ul className="grid gap-8 md:grid-cols-2">
      {people.map((p) => (
        <li key={p.name} className="flex gap-5">
          <Avatar person={p} />
          <div>
            <h3 className="font-display text-xl text-heading">{p.name}</h3>
            <p className="text-sm text-gold-deep">{p.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.bio}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function LpTeam() {
  return (
    <LpPage slug="team" number="07" eyebrow="Team & governance" title="Who decides, who advises, and how the fund is held.">
      <Block title="Why us">
        <div className="max-w-2xl space-y-4 border-l-2 border-gold-deep pl-6 text-lg leading-relaxed text-ink/85">
          {founderStory.map((p) => <p key={p}>{p}</p>)}
          <p className="font-display italic text-accent">Hagai Platin</p>
        </div>
        <p className="mt-3 text-xs text-muted">Draft, based on the “VC as an Export?” talk. To be approved by Hagai.</p>
      </Block>

      {team.map((g) =>
        g.size === "large" ? (
          <Block key={g.key} title={g.title}>
            <ul className={`grid gap-5 ${g.people.length % 3 === 0 ? "lg:grid-cols-3" : "sm:grid-cols-2"}`}>
              {g.people.map((p) => (
                <li key={p.name} className="rounded-xl bg-wine-950 p-6 text-cream">
                  <div className="flex items-center gap-4">
                    <Avatar person={p} />
                    <div>
                      <h3 className="font-display text-xl">{p.name}</h3>
                      <p className="text-sm text-gold">{p.role}</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2 text-sm leading-relaxed text-cream/80">
                    {(p.credentials ?? [p.bio]).map((c) => (
                      <li key={c} className="flex gap-2"><span aria-hidden className="text-gold">·</span>{c}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Block>
        ) : (
          <Block key={g.key} title={g.title}><Compact people={g.people} /></Block>
        ),
      )}

      <Block title="Investment committee">
        <p className="rounded-xl border border-dashed border-gold-deep/50 p-6 italic text-muted">
          Members to be confirmed. Our investment committee is made up of experienced investors and operators from both
          ecosystems.
        </p>
      </Block>


      <Block title="Legal structure" note="Capital flows down from the limited partners into the fund and on to portfolio companies in Israel and Latin America.">
        <ol className="space-y-2">
          {structure.map((s, i) => (
            <li key={s.name} className="flex items-center gap-4">
              <span className="font-display text-sm italic text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 rounded-lg border border-line bg-paper px-5 py-4">
                <span className="font-display text-lg text-heading">{s.name}</span>
                <span className="ml-3 text-sm text-muted">{s.note}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-muted">Summary only, to be confirmed against the fund documents.</p>
      </Block>
    </LpPage>
  );
}
