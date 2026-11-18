import type { Metadata } from "next";
import { Block, LpPage } from "@/components/lp/shell";
import { TBC, vehicles } from "@/content/lp/fund";

export const metadata: Metadata = { title: "Terms" };

export default function Terms() {
  const open = vehicles.filter((v) => v.open);
  return (
    <LpPage
      slug="terms" number="08"
      eyebrow="Terms"
      title="The commercial terms, side by side."
      lede="A summary for discussion. The fund's offering documents govern, and are in the data room when final."
    >
      <Block title="Open vehicles">
        <div className="grid gap-6 md:grid-cols-2">
          {open.map((v) => (
            <section key={v.key} className="rounded-xl border border-line bg-paper">
              <header className="border-b border-line p-6">
                <h3 className="font-display text-2xl text-wine-900">{v.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.summary}</p>
              </header>
              <dl>
                {v.terms.map((t) => (
                  <div key={t.label} className="flex items-baseline justify-between gap-6 border-b border-line/70 px-6 py-4 last:border-0">
                    <dt className="text-sm text-muted">{t.label}</dt>
                    <dd className={`text-right font-display text-lg ${t.value === TBC ? "italic text-muted" : "text-wine-900"}`}>{t.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </Block>

      <Block title="Common to both">
        <dl className="divide-y divide-line border-y border-line">
          {[
            ["Stage", "Pre-seed to Series A"],
            ["Geography", "Around 75% Israel, 25% Argentina"],
            ["Company domicile", "Portfolio companies registered in Delaware or Israel"],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-1 py-4 md:grid-cols-[14rem_1fr]">
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="font-display text-lg text-wine-900">{v}</dd>
            </div>
          ))}
        </dl>
      </Block>
    </LpPage>
  );
}
