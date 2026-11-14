import Link from "next/link";
import { Block, Facts, LpPage } from "@/components/lp/shell";
import { lpNav, snapshot, vehicles } from "@/content/lp/fund";
import { site } from "@/content/site";

export default function LpHome() {
  return (
    <LpPage
      slug="welcome"
      eyebrow="Welcome"
      title={<>Thank you for <em>pulling up a chair.</em></>}
    >
      {(viewer) => (
        <>
          <section className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink/85">
            <p>{viewer.fullName ? `${viewer.fullName.split(" ")[0]},` : "Hello,"}</p>
            <p>
              I built this room for the handful of people I want alongside us. It holds everything I would walk you
              through in person: why we believe the Israel–Argentina corridor is the most overlooked opportunity in
              early-stage venture, what we have already done about it, and how you can take part.
            </p>
            <p>
              Read it in any order. When something raises a question, call me on{" "}
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="text-wine-800 underline">{site.phone}</a>.
            </p>
            <p className="font-display text-xl italic text-wine-800">Hagai Platin, Founder &amp; Managing Partner</p>
          </section>

          <Block title="Malbec in one screen">
            <p className="mb-7 max-w-2xl font-display text-xl leading-relaxed text-wine-900">
              {site.positioning} We back data-driven B2B founders in Israel and Argentina and open the other side of the
              ocean for each of them.
            </p>
            <Facts items={snapshot} />
          </Block>

          <Block title="What is open">
            <ul className="grid gap-5 md:grid-cols-3">
              {vehicles.map((v) => (
                <li key={v.key} className={`rounded-xl border p-6 ${v.open ? "border-wine-800/30 bg-paper" : "border-dashed border-line"}`}>
                  <p className={`eyebrow ${v.open ? "" : "!text-muted"}`}>{v.status}</p>
                  <p className="mt-3 font-display text-2xl text-wine-900">{v.name}</p>
                  <p className="font-display text-4xl text-wine-800">{v.size}</p>
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
                  <Link href={n.href} prefetch={false} className="flex items-baseline gap-4 py-4 hover:text-wine-800">
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
