import type { Metadata } from "next";
import { Quote } from "@/components/figures";
import { Block, LpPage, StatBand } from "@/components/lp/shell";
import { partnerRecords, quotes, scoreboard } from "@/content/lp/fund";
import { coInvestors } from "@/content/portfolio";

export const metadata: Metadata = { title: "Track record" };

export default function TrackRecord() {
  return (
    <LpPage
      slug="track-record"
      number="06"
      eyebrow="Track record"
      title="What we have done with a small amount of capital."
      lede="Seven investments since November 2025. The POC is the evidence; here is where it stands."
    >
      <Block title="The scoreboard">
        <StatBand items={scoreboard} />
        <p className="mt-3 text-xs text-muted">Valuation marks, multiples and realised proceeds: to be added from fund records.</p>
      </Block>

      <Block title="Who we invest alongside">
        <p className="font-display text-xl leading-relaxed text-wine-900">
          {coInvestors.map((n, i) => (
            <span key={n}>{n}{i < coInvestors.length - 1 && <span className="mx-2 text-gold-deep">·</span>}</span>
          ))}
        </p>
      </Block>

      <Block title="In a founder's words">
        <Quote {...quotes.founder} />
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
