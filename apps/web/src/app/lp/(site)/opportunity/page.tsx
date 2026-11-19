import type { Metadata } from "next";
import { Chain, ExportMixChart, PriceBars } from "@/components/figures";
import { Block, LpPage, Sources, StatBand } from "@/components/lp/shell";
import { acquirers, chain, chainSource, ecosystem, gap, signals, signalsSource } from "@/content/lp/fund";
import { mirror, talent } from "@/content/site";

export const metadata: Metadata = { title: "Opportunity" };

export default function Opportunity() {
  return (
    <LpPage
      slug="opportunity"
      number="02"
      eyebrow="Opportunity"
      title={<>You have seen this movie before. <em>Argentina is the same trade, one generation later.</em></>}
      lede="World-class talent. A developing tech ecosystem. Almost no competing capital. The window between recognition and repricing is where venture returns are made."
    >
      <Block title="The argument in five steps">
        <Chain steps={chain} />
        <Sources>{chainSource}</Sources>
      </Block>

      <Block title="The mirror: Israel then, Argentina now">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <ExportMixChart bars={mirror.bars} />
          <ul className="space-y-6">
            {mirror.points.map((p) => (
              <li key={p.title}>
                <h3 className="font-display text-lg text-heading">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 font-display text-xl italic text-accent">{mirror.line}</p>
        <Sources>{mirror.source}</Sources>
      </Block>

      <Block title="Argentine talent, in numbers" note="“We have lots of talent in Argentina.” Is it real? Let the numbers answer.">
        <StatBand cols={4} items={talent.stats.map((s) => ({ value: s.value, label: s.label, note: s.source }))} />
        <h3 className="mt-10 font-display text-xl text-heading">The engine behind it: a free, world-class education system</h3>
        <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {talent.engine.map((e) => (
            <li key={e.title} className="bg-paper p-6">
              <p className="font-display text-lg text-heading">{e.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{e.text}</p>
            </li>
          ))}
        </ul>
        <h3 className="mt-10 font-display text-xl text-heading">The proof abroad: Argentines already build global giants</h3>
        <ul className="mt-4 font-display text-xl leading-relaxed text-accent flex flex-wrap gap-x-3">
          {talent.proof.map((n, i) => (
            <li key={n}>{n}{i < talent.proof.length - 1 && <span aria-hidden className="ml-3 text-gold-deep">·</span>}</li>
          ))}
        </ul>
        <p className="mt-6 rounded-xl bg-wine-900 p-6 font-display text-xl italic text-cream">{talent.line}</p>
      </Block>

      <Block title="The ecosystem, and the entry price">
        <StatBand cols={4} items={ecosystem.stats} />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-paper p-7">
            <h3 className="eyebrow">Average seed-stage entry price</h3>
            <div className="mt-6">
              <PriceBars
                items={[
                  { label: "Argentina", text: "~$3M", scale: 0.25, tone: "wine" },
                  { label: "Israel", text: "~$8M", scale: 0.66, tone: "gold" },
                  { label: "United States", text: "$12M+", scale: 1, tone: "muted" },
                ]}
              />
            </div>
          </div>
          <div className="rounded-xl border border-line bg-paper p-7">
            <h3 className="eyebrow">What this means for an investor</h3>
            <p className="mt-4 leading-relaxed text-ink/85">{ecosystem.takeaway}</p>
          </div>
        </div>
        <Sources>{ecosystem.source}</Sources>
      </Block>

      <Block title="The signal: smart money is already moving">
        <ul className="grid gap-4 md:grid-cols-2">
          {signals.map((s) => (
            <li key={s.title} className={`rounded-xl p-7 ${s.highlight ? "bg-wine-800 text-cream" : "bg-wine-950 text-cream"}`}>
              <h3 className="font-display text-xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/80">{s.body}</p>
            </li>
          ))}
        </ul>
        <Sources>{signalsSource}</Sources>
      </Block>

      <Block title="Two tech ecosystems, one gap">
        <div className="grid gap-4 md:grid-cols-2">
          {([["Israel — a mature VC market", gap.israel, true], ["Argentina — a developing VC market", gap.argentina, false]] as const).map(([title, rows, dark]) => (
            <section key={title} className={`rounded-xl p-7 ${dark ? "bg-wine-950 text-cream" : "border border-line bg-paper"}`}>
              <h3 className={`eyebrow ${dark ? "!text-gold" : ""}`}>{title}</h3>
              <dl className="mt-6 space-y-5">
                {rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4">
                    <dd className={`font-display text-3xl ${dark ? "text-cream" : "text-heading"}`}>{r.value}</dd>
                    <dt className={`text-sm leading-relaxed ${dark ? "text-cream/75" : "text-muted"}`}>{r.label}</dt>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-wine-800 p-7 text-cream">
          <p className="font-display text-2xl">{gap.line}</p>
          <p className="mt-2 leading-relaxed text-cream/85">{gap.body}</p>
        </div>
        <Sources>{gap.source}</Sources>
      </Block>

      <Block title="Who buys">
        <div className="overflow-x-auto rounded-xl border border-line bg-paper">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-[0.15em] text-gold-deep">
              <tr>{["Company", "Outcome", "Value", ""].map((h) => <th key={h} scope="col" className="px-5 py-3 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {acquirers.map((a) => (
                <tr key={a.company} className="border-b border-line/70 last:border-0">
                  <th scope="row" className="px-5 py-4 font-display text-lg font-normal text-heading">{a.company}</th>
                  <td className="px-5 py-4">{a.buyer}</td>
                  <td className="px-5 py-4 font-display text-lg text-accent">{a.value}</td>
                  <td className="px-5 py-4 text-muted">{a.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>
    </LpPage>
  );
}
