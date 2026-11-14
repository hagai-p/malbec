import type { Metadata } from "next";
import { Block, LpPage } from "@/components/lp/shell";
import { lpPortfolio, pipeline, TBC } from "@/content/lp/fund";

export const metadata: Metadata = { title: "Portfolio & pipeline" };

export default function LpPortfolio() {
  return (
    <LpPage
      slug="portfolio"
      eyebrow="Portfolio & pipeline"
      title="Seven companies in, a dozen more in the oven."
      lede="Each one sits on the bridge: Israeli technology with an Argentine team or market, or the reverse."
    >
      <Block title="Portfolio">
        <ul className="space-y-4">
          {lpPortfolio.map((c) => (
            <li key={c.name} className="rounded-xl border border-line bg-paper p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl text-wine-900">{c.name}</h3>
                <span className="rounded-full bg-sand px-3 py-1 text-xs text-muted">{c.country} · {c.sector}</span>
              </div>
              <p className="mt-3 leading-relaxed text-ink/85">{c.note}</p>
              <dl className="mt-5 grid gap-4 border-t border-line pt-5 text-sm sm:grid-cols-3">
                <div><dt className="eyebrow">Round</dt><dd className="mt-1.5 text-ink">{c.round}</dd></div>
                <div><dt className="eyebrow">Malbec&apos;s role</dt><dd className="mt-1.5 text-ink">{c.role}</dd></div>
                <div><dt className="eyebrow">Alongside</dt><dd className={`mt-1.5 ${c.coInvestors === TBC ? "italic text-muted" : "text-ink"}`}>{c.coInvestors}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">Malbec&apos;s cheque size and ownership per company: to be added.</p>
      </Block>

      <Block title="Pipeline" note="Companies we are in active conversation with. Named in confidence; inclusion does not mean an investment will be made.">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {pipeline.map((p) => (
            <li key={p} className="bg-paper px-5 py-4 font-display text-lg text-wine-900">{p}</li>
          ))}
        </ul>
      </Block>
    </LpPage>
  );
}
