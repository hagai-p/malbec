import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { PageIntro } from "@/components/page-intro";
import { sectors } from "@/content/site";

export const metadata: Metadata = {
  title: "Thesis",
  description:
    "Why Israel and Argentina, and why now: the investment thesis behind Malbec Ventures, the first and only Israel–LATAM cross-border VC.",
};

const comparisons = [
  { label: "Venture capital invested, 2024", israel: "$12B", argentina: "$420M" },
  { label: "Per capita", israel: "$1,245", argentina: "under $9" },
  { label: "Unicorns per million residents", israel: "13.76 — first in the world", argentina: "0.28 — first in Latin America" },
  { label: "Average seed round", israel: "$7M", argentina: "$3M" },
  { label: "Active venture funds", israel: "500+", argentina: "about 20" },
];

export default function Thesis() {
  return (
    <>
      <Header />
      <main id="main">
        <PageIntro
          eyebrow="Thesis"
          title={
            <>
              Israel knows how to build companies. Argentina knows how to build them <em>with less.</em>
            </>
          }
          lede="Put the two together and you get startups that reach global scale on a fraction of the capital. That is the whole idea. Here is why we believe it, and why now."
        />

        <article className="page grid gap-16 pb-24 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <dl className="space-y-6 border-t border-line pt-6 text-sm">
              <div>
                <dt className="eyebrow">Model</dt>
                <dd className="mt-2 font-display text-xl text-wine-900">{sectors.model}</dd>
              </div>
              <div>
                <dt className="eyebrow">Stage</dt>
                <dd className="mt-2 font-display text-xl text-wine-900">{sectors.stage}</dd>
              </div>
              <div>
                <dt className="eyebrow">Geography</dt>
                <dd className="mt-2 font-display text-xl text-wine-900">Israel &amp; Argentina</dd>
              </div>
            </dl>
          </aside>

          <div className="min-w-0 space-y-16">
            <section>
              <h2 className="display text-3xl text-wine-900">Two worlds, one opportunity</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
                <p>
                  Israel is the most concentrated startup ecosystem on earth: more unicorns per person than any other
                  country, and three and a half decades of practice at taking a company from a garage to an acquisition or
                  a public listing. Its high-tech sector accounts for roughly a fifth of GDP and more than half of exports.
                </p>
                <p>
                  Argentina leads Latin America on the same measure, with a fraction of the capital. Around 150,000
                  software developers, the highest English proficiency in the region, and salary costs 50–55% below the
                  United States. Global acquirers have already noticed: Auth0 was bought by Okta for $6.5B, Technisys by
                  SoFi for about $1B.
                </p>
              </div>
              <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-paper">
                <table className="w-full min-w-[32rem] text-left text-sm">
                  <thead>
                    <tr className="border-b border-line text-xs uppercase tracking-[0.18em] text-gold-deep">
                      <th scope="col" className="px-5 py-4 font-medium">&nbsp;</th>
                      <th scope="col" className="px-5 py-4 font-medium">Israel</th>
                      <th scope="col" className="px-5 py-4 font-medium">Argentina</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((row) => (
                      <tr key={row.label} className="border-b border-line/70 last:border-0">
                        <th scope="row" className="px-5 py-4 font-normal text-muted">{row.label}</th>
                        <td className="px-5 py-4 font-display text-lg text-wine-900">{row.israel}</td>
                        <td className="px-5 py-4 font-display text-lg text-wine-900">{row.argentina}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Fewer than 1% of Israel&apos;s venture funds invest in Latin America. That is the white space we work in.
              </p>
            </section>

            <section>
              <h2 className="display text-3xl text-wine-900">Why now</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
                <p>
                  Argentina is changing faster than at any time in a generation. Monthly inflation has fallen from 25.5%
                  to around 2.9%, the budget has moved from a 4.6% deficit to its first surplus since 2010, and country
                  risk has compressed by 77%.
                </p>
                <p>
                  Israel, meanwhile, is rebuilding with valuations that reward early conviction, and a new wave of
                  technology is giving small teams the reach that once took hundreds of people. Good founders in both
                  countries are short of capital and of networks. We bring both.
                </p>
              </div>
            </section>

            <section>
              <h2 className="display text-3xl text-wine-900">Where we invest</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Data-driven B2B products for industries where Israel and Argentina are both strong, and where one
                country&apos;s technology meets the other&apos;s market.
              </p>
              <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                {sectors.core.map((s) => (
                  <li key={s.name} className="bg-paper p-7">
                    <h3 className="font-display text-xl text-wine-900">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.note}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted">
                And, when the founder is exceptional: {sectors.opportunistic.join(" and ")}.
              </p>
            </section>

            <section>
              <h2 className="display text-3xl text-wine-900">How it compounds</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
                <p>
                  An Israeli company with an engineering team in Buenos Aires extends its runway. An Argentine founder
                  introduced in Tel Aviv meets decision-makers who sign a pilot before the product is finished. An Israeli
                  agri-tech finds its first large market on the Pampas. Each of these is already happening in our
                  portfolio.
                </p>
              </div>
              <Link href="/portfolio" className="btn-wine mt-8">
                See the companies
              </Link>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}
