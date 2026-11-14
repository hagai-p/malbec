import type { Metadata } from "next";
import { Block, LpPage } from "@/components/lp/shell";
import { partnerRecords, TBC, trackRecord } from "@/content/lp/fund";
import { coInvestors } from "@/content/portfolio";

export const metadata: Metadata = { title: "Track record" };

export default function TrackRecord() {
  return (
    <LpPage
      slug="track-record"
      eyebrow="Track record"
      title="What we have done with a small amount of capital."
      lede="The POC period is the evidence. Here is where it stands."
    >
      <Block title="To date">
        <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {trackRecord.map((t) => (
            <div key={t.label} className="bg-paper p-6">
              <dd className={`font-display ${t.value === TBC ? "text-2xl italic text-muted" : "text-5xl text-wine-800"}`}>{t.value}</dd>
              <dt className="mt-3 text-sm text-muted">{t.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-muted">Valuation marks, multiples and realised proceeds: to be added from fund records.</p>
      </Block>

      <Block title="Who we invest alongside">
        <p className="font-display text-xl leading-relaxed text-wine-900">
          {coInvestors.map((n, i) => (
            <span key={n}>{n}{i < coInvestors.length - 1 && <span className="mx-2 text-gold-deep">·</span>}</span>
          ))}
        </p>
      </Block>

      <Block title="The partners' own records">
        <ul className="divide-y divide-line border-y border-line">
          {partnerRecords.map((p) => (
            <li key={p.name} className="grid gap-2 py-5 md:grid-cols-[14rem_1fr]">
              <span className="font-display text-lg text-wine-900">{p.name}</span>
              <span className="leading-relaxed text-muted">{p.record}</span>
            </li>
          ))}
        </ul>
      </Block>
    </LpPage>
  );
}
