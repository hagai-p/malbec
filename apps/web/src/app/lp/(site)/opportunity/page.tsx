import type { Metadata } from "next";
import { Block, LpPage } from "@/components/lp/shell";
import { comparisons, whyNow } from "@/content/lp/fund";

export const metadata: Metadata = { title: "Opportunity" };

function Bar({ scale, tone }: { scale: number; tone: "wine" | "gold" }) {
  return (
    <span className="block h-2.5 w-full rounded-full bg-sand" aria-hidden>
      <span className={`block h-full rounded-full ${tone === "wine" ? "bg-wine-800" : "bg-gold-deep"}`} style={{ width: `${Math.max(scale * 100, 1.5)}%` }} />
    </span>
  );
}

export default function Opportunity() {
  return (
    <LpPage
      slug="opportunity"
      eyebrow="Opportunity"
      title={<>The world&apos;s densest startup nation, and the one that <em>does it on a fraction of the capital.</em></>}
      lede="Israel has the playbook and the exits. Argentina has the talent and the valuations. Almost no capital connects them."
    >
      <Block title="Side by side" note="Israel leads the world; Argentina leads Latin America. The distance between the two columns is the opportunity.">
        <div className="rounded-xl border border-line bg-paper">
          <div className="flex gap-6 border-b border-line px-6 py-4 text-xs uppercase tracking-[0.18em]">
            <span className="flex items-center gap-2 text-wine-800"><span className="h-2.5 w-2.5 rounded-full bg-wine-800" />Israel</span>
            <span className="flex items-center gap-2 text-gold-deep"><span className="h-2.5 w-2.5 rounded-full bg-gold-deep" />Argentina</span>
          </div>
          <dl>
            {comparisons.map((c) => (
              <div key={c.metric} className="grid gap-4 border-b border-line/70 px-6 py-5 last:border-0 md:grid-cols-[14rem_1fr] md:items-center">
                <dt className="text-sm text-muted">{c.metric}</dt>
                <dd className="space-y-2">
                  <div className="grid grid-cols-[5.5rem_1fr] items-center gap-4">
                    <span className="font-display text-xl text-wine-900">{c.israel.text}</span>
                    <Bar scale={c.israel.scale} tone="wine" />
                  </div>
                  <div className="grid grid-cols-[5.5rem_1fr] items-center gap-4">
                    <span className="font-display text-xl text-gold-deep">{c.argentina.text}</span>
                    <Bar scale={c.argentina.scale} tone="gold" />
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-3 text-xs text-muted">2024 figures, as presented in the Malbec Ventures investor deck. Sources to be listed.</p>
      </Block>

      <Block title="Why now">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
          {whyNow.map((w) => (
            <li key={w.title} className="bg-paper p-7">
              <h3 className="font-display text-xl text-wine-900">{w.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{w.body}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="The arbitrage, plainly">
        <ul className="space-y-4 text-lg leading-relaxed text-ink/85">
          <li><strong className="font-display font-medium text-wine-900">Lower entry valuations.</strong> Each dollar buys a larger stake, and a larger share of the outcome.</li>
          <li><strong className="font-display font-medium text-wine-900">Lower cost of talent.</strong> Milestones are reached on less capital, with longer runway and less dilution.</li>
          <li><strong className="font-display font-medium text-wine-900">Faster to market.</strong> Lean teams iterate quickly; Israeli decision-makers sign pilots early.</li>
          <li><strong className="font-display font-medium text-wine-900">Exit in the developed market.</strong> Build where it is efficient, sell where multiples are highest.</li>
        </ul>
      </Block>
    </LpPage>
  );
}
