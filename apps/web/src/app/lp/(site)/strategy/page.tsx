import type { Metadata } from "next";
import { Bubbles, Contrast, StackedBars, Timeline } from "@/components/figures";
import { Block, Facts, LpPage } from "@/components/lp/shell";
import { afterTheCheque, alphaLevers, construction, contrast, deployment, processTimeline, sourcingNetwork, vehiclePillars, whyThroughMalbec } from "@/content/lp/fund";
import { sectors } from "@/content/site";

export const metadata: Metadata = { title: "Strategy" };

export default function Strategy() {
  return (
    <LpPage
      slug="strategy"
      number="03"
      eyebrow="Strategy"
      title={<>Israeli playbook. Argentine execution. <em>Global markets.</em></>}
      lede="Malbec is the vehicle: a cross-border, early-stage fund that closes the financing gap from both ends."
    >
      <Block title="The vehicle">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <ul className="space-y-7">
            {vehiclePillars.map((p) => (
              <li key={p.title} className="border-l-2 border-gold-deep pl-5">
                <h3 className="font-display text-xl text-wine-900">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
          <aside className="rounded-xl bg-wine-950 p-7 text-cream">
            <h3 className="eyebrow !text-gold">Why through Malbec</h3>
            <dl className="mt-6 space-y-5">
              {whyThroughMalbec.map((w) => (
                <div key={w.title}>
                  <dt className="font-display text-lg">{w.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-cream/75">{w.text}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Block>

      <Block title="How we create returns" note="Structural advantages that compound before any company outperforms.">
        <ol className="grid gap-px overflow-hidden rounded-xl bg-wine-800/60 sm:grid-cols-2 lg:grid-cols-5">
          {alphaLevers.map((l) => (
            <li key={l.n} className="bg-wine-900 p-5 text-cream">
              <p className="text-xs text-gold">{l.n}</p>
              <p className="mt-1 font-display text-lg leading-snug">{l.title}</p>
              <p className="mt-3 font-display text-3xl text-gold">{l.number}</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">{l.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6"><Contrast others={contrast.others} we={contrast.we} /></div>
      </Block>

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

      <Block title="It starts with sourcing">
        <Bubbles items={sourcingNetwork} centre="Tel Aviv · Buenos Aires" />
      </Block>

      <Block title="How a company gets in" note="Six steps, every time. Thorough, and respectful of founders' time: a clear answer, with reasons.">
        <Timeline steps={processTimeline} />
      </Block>

      <Block title="Portfolio construction">
        <Facts items={construction} cols={3} />
      </Block>

      <Block title="Deployment plan" note={deployment.note}>
        <StackedBars years={deployment.years} />
      </Block>

      <Block title="The cheque is just the beginning">
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {afterTheCheque.map((a) => (
            <li key={a} className="flex gap-3 border-t border-line py-4 text-ink/85">
              <span aria-hidden className="text-gold-deep">◆</span>{a}
            </li>
          ))}
        </ul>
      </Block>
    </LpPage>
  );
}
