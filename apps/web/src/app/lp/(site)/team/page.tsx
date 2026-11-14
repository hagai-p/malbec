import type { Metadata } from "next";
import { Avatar } from "@/components/avatar";
import { Block, LpPage } from "@/components/lp/shell";
import { structure } from "@/content/lp/fund";
import { advisors, network, partners, type Person } from "@/content/team";

export const metadata: Metadata = { title: "Team & governance" };

function People({ people }: { people: Person[] }) {
  return (
    <ul className="grid gap-8 md:grid-cols-2">
      {people.map((p) => (
        <li key={p.name} className="flex gap-5">
          <Avatar person={p} />
          <div>
            <h3 className="font-display text-xl text-wine-900">{p.name}</h3>
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
    <LpPage
      slug="team"
      eyebrow="Team & governance"
      title="Who decides, who advises, and how the fund is held."
    >
      <Block title="Partners"><People people={partners} /></Block>

      <Block title="Investment committee">
        <p className="rounded-xl border border-dashed border-gold-deep/50 p-6 italic text-muted">
          Members to be confirmed. Our investment committee is made up of experienced investors and operators from both
          ecosystems.
        </p>
      </Block>

      <Block title="Advisory board"><People people={advisors} /></Block>
      <Block title="Network & mentors"><People people={network} /></Block>

      <Block title="Legal structure" note="Capital flows down from the limited partners into the fund and on to portfolio companies in Israel and Latin America.">
        <ol className="space-y-2">
          {structure.map((s, i) => (
            <li key={s.name} className="flex items-center gap-4">
              <span className="font-display text-sm italic text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 rounded-lg border border-line bg-paper px-5 py-4">
                <span className="font-display text-lg text-wine-900">{s.name}</span>
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
