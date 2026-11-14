import type { Metadata } from "next";
import { Block, Facts, LpPage } from "@/components/lp/shell";
import { construction, edge, process } from "@/content/lp/fund";
import { sectors } from "@/content/site";

export const metadata: Metadata = { title: "Strategy" };

export default function Strategy() {
  return (
    <LpPage
      slug="strategy"
      eyebrow="Strategy"
      title="Data-driven B2B, from pre-seed to Series A, on both sides of the ocean."
      lede="We invest where Israel and Argentina are both strong, and where one country's technology meets the other's market."
    >
      <Block title="Where we invest">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {sectors.core.map((s) => (
            <li key={s.name} className="bg-paper p-6">
              <h3 className="font-display text-xl text-wine-900">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">Opportunistically, for exceptional founders: {sectors.opportunistic.join(" and ")}.</p>
      </Block>

      <Block title="Portfolio construction">
        <Facts items={construction} cols={3} />
      </Block>

      <Block title="Our edge">
        <ul className="grid gap-8 md:grid-cols-2">
          {edge.map((e) => (
            <li key={e.title} className="border-t border-line pt-5">
              <h3 className="font-display text-xl text-wine-900">{e.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{e.body}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="How a company gets in" note="Six steps, every time. More than 100 startups reviewed so far.">
        <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => (
            <li key={p} className="bg-paper p-6">
              <span className="font-display text-2xl italic text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 font-display text-lg text-wine-900">{p}</p>
            </li>
          ))}
        </ol>
      </Block>
    </LpPage>
  );
}
