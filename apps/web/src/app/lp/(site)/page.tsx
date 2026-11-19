import Link from "next/link";
import { TwoBrands } from "@/components/figures";
import { Block, LpPage, StatBand } from "@/components/lp/shell";
import { execSummary, glance, lpNav, vehicles } from "@/content/lp/fund";
import { site, story } from "@/content/site";

export default function LpHome() {
  return (
    <LpPage slug="welcome" number="01" eyebrow="Welcome" title={<>Thank you for <em>pulling up a chair.</em></>}>
      {(viewer) => (
        <>
          <section className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink/85">
            <p>{viewer.fullName ? `${viewer.fullName.split(" ")[0]},` : "Hello,"}</p>
            <p>
              I built this room for the handful of people I want alongside us. It holds everything I would walk you
              through in person: a market where the talent is world-class, the entry price is less than half of Tel
              Aviv&apos;s, and the smartest money has already started moving.
            </p>
            <p>
              Read it in any order. When something raises a question, call me on{" "}
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="text-accent underline">{site.phone}</a>.
            </p>
            <p className="font-display text-xl italic text-accent">Hagai Platin, Founder &amp; Managing Partner</p>
          </section>

          <Block title="Two nations. Two crops. Two global brands.">
            <TwoBrands brands={story.brands} line={story.brandsLine} />
            <div className="mt-8 grid gap-6 rounded-xl bg-wine-800 p-7 text-cream sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:p-9">
              <div className="text-center">
                <p className="font-display text-5xl text-gold">{story.nameYear}</p>
                <p className="mt-1 text-xs text-cream/70">{story.nameYearLabel}</p>
              </div>
              <div>
                <p className="eyebrow !text-gold">Why “Malbec”</p>
                <p className="mt-3 text-lg leading-relaxed text-cream/90">{story.name}</p>
                <p className="mt-3 font-display text-xl italic">{story.nameLine}</p>
              </div>
            </div>
          </Block>

          <Block title="Malbec in five points">
            <ol className="divide-y divide-line border-y border-line">
              {execSummary.map((p, i) => (
                <li key={p.lead} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr]">
                  <span className="font-display text-xl italic text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-lg leading-relaxed text-ink/85">
                    <strong className="font-display font-medium text-heading">{p.lead}</strong> {p.text}
                  </p>
                </li>
              ))}
            </ol>
          </Block>

          <Block title="The fund at a glance">
            <StatBand items={glance} />
          </Block>

          <Block title="What is open">
            <ul className="grid gap-5 md:grid-cols-3">
              {vehicles.map((v) => (
                <li key={v.key} className={`rounded-xl border p-6 ${v.open ? "border-accent/30 bg-paper" : "border-dashed border-line"}`}>
                  <p className={`eyebrow ${v.open ? "" : "!text-muted"}`}>{v.status}</p>
                  <p className="mt-3 font-display text-2xl text-heading">{v.name}</p>
                  <p className="font-display text-4xl text-accent">{v.size}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{v.summary}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/lp/next-steps" prefetch={false} className="btn-wine">Indicate interest</Link>
              <a href={`mailto:${site.email}`} className="btn-ghost">Talk to Hagai</a>
            </div>
          </Block>

          <Block title="In this room">
            <ol className="grid gap-x-10 sm:grid-cols-2">
              {lpNav.slice(1).map((n, i) => (
                <li key={n.href} className="border-t border-line">
                  <Link href={n.href} prefetch={false} className="flex items-baseline gap-4 py-4 hover:text-accent">
                    <span className="font-display text-sm italic text-gold-deep">{String(i + 2).padStart(2, "0")}</span>
                    <span className="font-display text-lg">{n.label}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </Block>
        </>
      )}
    </LpPage>
  );
}
