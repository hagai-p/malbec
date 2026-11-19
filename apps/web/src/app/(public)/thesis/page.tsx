import type { Metadata } from "next";
import Link from "next/link";
import { ExportMixChart, TwoBrands } from "@/components/figures";
import { Header } from "@/components/header";
import { PageIntro } from "@/components/page-intro";
import { mirror, sectors, story, talent } from "@/content/site";

export const metadata: Metadata = {
  title: "Thesis",
  description:
    "Two nations, two crops, two global brands. Why Malbec Ventures, the first and only Israel–LATAM cross-border VC, exports the Israeli venture playbook to Argentina.",
};

export default function Thesis() {
  return (
    <>
      <Header />
      <main id="main">
        <PageIntro
          eyebrow="Thesis"
          title={<>Two nations. Two crops. <em>Two global brands.</em></>}
          lede="Can a country export venture capital, the way it once exported fruit or wine? We think so. The story takes an orange, a grape, and a playbook."
        />

        <section className="page pb-20">
          <TwoBrands brands={story.brands} line={story.brandsLine} />
        </section>

        {/* The name */}
        <section className="bg-wine-800 text-cream">
          <div className="page grid gap-10 py-20 md:grid-cols-[auto_1fr] md:items-center md:gap-20">
            <div className="text-center md:text-left">
              <p className="font-display text-7xl text-gold sm:text-8xl">{story.nameYear}</p>
              <p className="mt-2 text-sm text-cream/70">{story.nameYearLabel}</p>
            </div>
            <div>
              <p className="eyebrow !text-gold">The name · why “Malbec”</p>
              <h2 className="display mt-4 text-3xl sm:text-5xl">What is in your glass is the evidence.</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">{story.name}</p>
              <p className="mt-4 font-display text-2xl italic text-gold">{story.nameLine}</p>
            </div>
          </div>
        </section>

        {/* The mirror */}
        <section className="page py-20 sm:py-28">
          <p className="eyebrow">The mirror · Israel then, Argentina now</p>
          <h2 className="display mt-4 max-w-3xl text-3xl text-heading sm:text-5xl">You have seen this movie before.</h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div className="min-w-0">
              <ExportMixChart bars={mirror.bars} />
              <p className="mt-3 text-xs text-muted">Sources: {mirror.source}</p>
            </div>
            <ul className="space-y-8">
              {mirror.points.map((p) => (
                <li key={p.title}>
                  <h3 className="font-display text-xl text-heading">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-12 text-center font-display text-2xl italic text-accent sm:text-3xl">{mirror.line}</p>
        </section>

        {/* Talent */}
        <section className="border-y border-line bg-paper">
          <div className="page py-20 sm:py-24">
            <p className="eyebrow">The talent · deep, educated, global</p>
            <h2 className="display mt-4 max-w-3xl text-3xl text-heading sm:text-5xl">Argentine talent, in numbers.</h2>
            <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {talent.stats.map((s) => (
                <div key={s.label} className="border-t border-line pt-6">
                  <dd className="font-display text-5xl text-accent">{s.value}</dd>
                  <dt className="mt-3 text-sm leading-relaxed text-muted">{s.label}</dt>
                  <dd className="mt-1 text-xs text-muted/80">{s.source}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {talent.engine.map((e) => (
                <li key={e.title} className="bg-page p-6">
                  <h3 className="font-display text-lg text-heading">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{e.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm uppercase tracking-[0.18em] text-muted">Argentines already build global companies</p>
            <ul className="mt-3 font-display text-2xl leading-relaxed text-heading flex flex-wrap gap-x-3">
          {talent.proof.map((n, i) => (
            <li key={n}>{n}{i < talent.proof.length - 1 && <span aria-hidden className="ml-3 text-gold-deep">·</span>}</li>
          ))}
        </ul>
            <p className="mt-10 font-display text-2xl italic text-accent">{talent.line}</p>
          </div>
        </section>

        {/* Where we invest */}
        <section className="page grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="eyebrow">Where we invest</p>
            <h2 className="display mt-4 text-3xl text-heading sm:text-4xl">Israeli playbook. Argentine execution. Global markets.</h2>
            <dl className="mt-8 space-y-5 border-t border-line pt-6 text-sm">
              <div><dt className="eyebrow">Model</dt><dd className="mt-1 font-display text-xl text-heading">{sectors.model}</dd></div>
              <div><dt className="eyebrow">Stage</dt><dd className="mt-1 font-display text-xl text-heading">{sectors.stage}</dd></div>
              <div><dt className="eyebrow">Geography</dt><dd className="mt-1 font-display text-xl text-heading">Israel &amp; Argentina</dd></div>
            </dl>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-muted">
              B2B software with unique data, for the traditional industries both countries know deeply, and where one
              country&apos;s technology meets the other&apos;s market.
            </p>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {sectors.core.map((s) => (
                <li key={s.name} className="bg-paper p-7">
                  <h3 className="font-display text-xl text-heading">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">And, when the founder is exceptional: {sectors.opportunistic.join(" and ")}.</p>
          </div>
        </section>

        {/* Close */}
        <section className="bg-wine-950 text-cream">
          <div className="page py-20 text-center sm:py-28">
            <h2 className="display mx-auto max-w-3xl text-4xl sm:text-6xl">{story.close}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">
              Israel turned its lead export from oranges into an $85B high-tech industry. Argentina turned an imported
              French grape into a global icon. The next chapter is written together.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/portfolio" className="btn-gold">See the companies</Link>
              <Link href="/contact" className="btn-light">Get in touch</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
