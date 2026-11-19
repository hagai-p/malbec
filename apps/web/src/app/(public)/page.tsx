import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { backedBy, bridgeStats, pillars, site } from "@/content/site";
import { coInvestors, collaborators, companies } from "@/content/portfolio";
import { partners } from "@/content/team";
import { Avatar } from "@/components/avatar";

export default function Home() {
  return (
    <>
      <Header tone="dark" />
      <main id="main">
        {/* Hero: the picture is shown whole (it tells the two-brands story), with the headline beneath it */}
        <section className="bg-wine-950 text-cream">
          <div className="relative aspect-[1344/768] max-h-[64svh] min-h-[14rem] w-full overflow-hidden">
            <Image
              src="/brand/hero-orange-grape-v2.jpg"
              alt="A field at sunset: Malbec vines heavy with grapes on the left below the Buenos Aires skyline, orange trees on the right below the Tel Aviv shoreline, and the sun setting over the bay between the two cities"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_78%]"
            />
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-wine-950/75 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t sm:h-16 from-wine-950 to-transparent" />
            <p className="absolute bottom-5 left-5 hidden text-[0.65rem] uppercase tracking-[0.22em] text-cream/85 sm:left-8 sm:block lg:left-12">
              Buenos Aires · the grape
            </p>
            <p className="absolute bottom-5 right-5 hidden text-[0.65rem] uppercase tracking-[0.22em] text-cream/85 sm:right-8 sm:block lg:right-12">
              Tel Aviv · the orange
            </p>
          </div>
          <div className="page pb-12 pt-6 sm:pb-14 sm:pt-7">
            <p className="eyebrow rise !text-gold">Tel Aviv — Buenos Aires</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
              <h1 className="display rise rise-2 text-[2.5rem] sm:text-6xl">
                {site.headline[0]}
                <br />
                <em className="text-gold">{site.headline[1]}</em>
              </h1>
              <div className="rise rise-3">
                <p className="text-lg leading-relaxed text-cream/90 sm:text-xl">{site.positioning}</p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link href="/portfolio" className="btn-gold">
                    View the portfolio
                  </Link>
                  <Link href="/contact" className="btn-light">
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="page grid gap-10 py-20 sm:py-28 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <p className="eyebrow pt-3">Who we are</p>
          <div>
            <p className="display text-2xl leading-snug text-heading sm:text-4xl sm:leading-[1.2]">{site.intro}</p>
            <p className="lede mt-8 max-w-2xl">{site.introSecondary}</p>
          </div>
        </section>

        {/* Pillars */}
        <section className="border-y border-line bg-paper">
          <div className="page grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {pillars.map((p) => (
              <article key={p.title} className="py-12 md:px-10 md:first:pl-0 md:last:pr-0">
                <p className="font-display text-3xl italic text-gold-deep">{p.numeral}</p>
                <h2 className="display mt-5 text-2xl text-heading">{p.title}</h2>
                <p className="mt-4 leading-relaxed text-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Portfolio strip */}
        <section className="page py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Portfolio</p>
              <h2 className="display mt-4 max-w-xl text-3xl text-heading sm:text-5xl">Founders we are proud to stand behind.</h2>
            </div>
            <Link href="/portfolio" className="btn-ghost">
              View the portfolio
            </Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {companies.map((c) => (
              <li key={c.slug} className="bg-paper">
                <Link
                  href={`/portfolio/${c.slug}`}
                  className="group flex h-36 flex-col items-center justify-center gap-3 px-6 transition-colors hover:bg-sand/60"
                >
                  <Image
                    src={c.logo}
                    alt=""
                    width={140}
                    height={56}
                    className="h-12 w-auto max-w-[8.5rem] object-contain mix-blend-multiply"
                  />
                  <span className="text-xs tracking-wide text-muted group-hover:text-accent">{c.name}</span>
                </Link>
              </li>
            ))}
            <li className="flex h-36 items-center justify-center bg-paper px-6 text-center font-display text-lg italic text-gold-deep">
              More in the oven
            </li>
          </ul>
        </section>

        {/* Bridge stats */}
        <section className="bg-wine-900 text-cream">
          <div className="page py-20 sm:py-28">
            <p className="eyebrow !text-gold">The bridge</p>
            <h2 className="display mt-4 max-w-3xl text-3xl sm:text-5xl">
              World-class talent on both sides, <em className="text-gold">and a hundredfold gap in financing.</em>
            </h2>
            <dl className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {bridgeStats.map((s) => (
                <div key={s.label} className="border-t border-cream/20 pt-6">
                  <dt className="text-xs uppercase tracking-[0.2em] text-gold">{s.side}</dt>
                  <dd className="mt-4">
                    <span className="font-display text-5xl sm:text-6xl">{s.value}</span>
                    <span className="mt-3 block text-sm leading-relaxed text-cream/75">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Team preview */}
        <section className="page py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Team</p>
              <h2 className="display mt-4 max-w-xl text-3xl text-heading sm:text-5xl">Operators, investors, and a surgeon.</h2>
            </div>
            <Link href="/team" className="btn-ghost">
              Meet the team
            </Link>
          </div>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {partners.map((p) => (
              <li key={p.name} className="flex items-center gap-5 border-t border-line pt-6">
                <Avatar person={p} />
                <div>
                  <p className="font-display text-xl text-heading">{p.name}</p>
                  <p className="mt-1 text-sm text-muted">{p.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Ecosystem */}
        <section className="border-y border-line bg-paper">
          <div className="page grid gap-12 py-20 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow">Co-investors</p>
              <p className="display mt-5 text-xl leading-relaxed text-heading sm:text-2xl">
                {coInvestors.map((n, i) => (
                  <span key={n}>
                    {n}
                    {i < coInvestors.length - 1 && <span className="mx-2 text-gold-deep">·</span>}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <p className="eyebrow">Collaborators</p>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted">
                {collaborators.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Backed by */}
        <section className="page py-20 text-center sm:py-24">
          <p className="display mx-auto max-w-3xl text-2xl text-heading sm:text-3xl">{backedBy.line}</p>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted">
            {backedBy.countries.map((c) => (
              <li key={c.code}>{c.name}</li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="bg-sand">
          <div className="page flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
            <h2 className="display max-w-2xl text-3xl text-heading sm:text-5xl">
              Building between Israel and Latin America? <em>Pull up a chair.</em>
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-wine">
                Get in touch
              </Link>
              <Link href="/portfolio" className="btn-ghost">
                View the portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
