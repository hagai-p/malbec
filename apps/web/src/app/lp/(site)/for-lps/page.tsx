import type { Metadata } from "next";
import Link from "next/link";
import { Quote } from "@/components/figures";
import { Block, LpPage, StatBand } from "@/components/lp/shell";
import { investorBase, lpValue, quotes } from "@/content/lp/fund";

export const metadata: Metadata = { title: "For LPs" };

export default function ForLps() {
  return (
    <LpPage
      slug="for-lps"
      number="09"
      eyebrow="For LPs"
      title={<>More than a line in a capital account. <em>A seat at the table.</em></>}
      lede="Join us in writing the next chapter: as an investor, a partner, or a door-opener in either country."
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

      <Block title="Co-investment" note="When allocation allows, limited partners are offered the chance to invest directly alongside the fund in portfolio rounds.">
        <p className="rounded-xl border border-dashed border-gold-deep/50 p-6 italic text-muted">
          Co-investment figures to date (rounds offered, amounts taken up) to be added.
        </p>
      </Block>

      <Block title="This room is your reporting" note="No waiting for a PDF. What you see here is what we see.">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            ["Updates", "Dated notes from the partners on investments, milestones and closings.", "/lp/updates"],
            ["Portfolio", "Every company, its round, our role and who we invested alongside.", "/lp/portfolio"],
            ["Data room", "The fund documents, viewable here as soon as they are final.", "/lp/data-room"],
          ].map(([t, d, h]) => (
            <li key={t}>
              <Link href={h} prefetch={false} className="block h-full rounded-xl border border-line bg-paper p-6 hover:border-accent">
                <p className="font-display text-xl text-heading">{t} →</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Who is already in" note={investorBase.intro}>
        <StatBand items={investorBase.stats} />
        <p className="mt-5 text-sm uppercase tracking-[0.18em] text-muted">{investorBase.countries.join(" · ")}</p>
        <p className="mt-3 text-xs text-muted">{investorBase.note}</p>
        <div className="mt-8"><Quote {...quotes.lp} /></div>
      </Block>
    </LpPage>
  );
}
