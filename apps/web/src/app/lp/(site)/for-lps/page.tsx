import type { Metadata } from "next";
import { Block, LpPage } from "@/components/lp/shell";
import { investorBase, lpValue } from "@/content/lp/fund";

export const metadata: Metadata = { title: "For LPs" };

export default function ForLps() {
  return (
    <LpPage
      slug="for-lps"
      eyebrow="For LPs"
      title={<>More than a line in a capital account. <em>A seat at the table.</em></>}
      lede="Our limited partners are founders, operators and investors. We treat them as part of the firm's reach, and they get the firm's reach in return."
    >
      <Block title="What you get">
        <ol className="divide-y divide-line border-y border-line">
          {lpValue.map((v, i) => (
            <li key={v} className="flex gap-5 py-5">
              <span className="font-display text-lg italic text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-lg leading-relaxed text-ink/85">{v}</span>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Who is already in" note={investorBase.intro}>
        <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {investorBase.stats.map((s) => (
            <div key={s.label} className="bg-paper p-6">
              <dd className="font-display text-5xl text-wine-800">{s.value}</dd>
              <dt className="mt-2 text-sm text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm uppercase tracking-[0.18em] text-muted">{investorBase.countries.join(" · ")}</p>
        <p className="mt-3 text-xs text-muted">{investorBase.note}</p>
      </Block>
    </LpPage>
  );
}
