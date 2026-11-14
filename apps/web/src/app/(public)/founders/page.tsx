import type { Metadata } from "next";
import { Header } from "@/components/header";
import { PageIntro } from "@/components/page-intro";
import { PitchForm } from "@/components/forms";
import { founderProcess, founderValue } from "@/content/site";

export const metadata: Metadata = {
  title: "Founders",
  description: "What Malbec Ventures brings to early-stage founders in Israel and Argentina, and how to start a conversation.",
};

export default function Founders() {
  return (
    <>
      <Header />
      <main id="main">
        <PageIntro
          eyebrow="For founders"
          title={
            <>
              Your first cheque should come with <em>a second continent.</em>
            </>
          }
          lede="We invest from pre-seed to Series A in founders building data-driven B2B companies in Israel and Argentina, and we work to open the other side of the ocean for each of them."
        />

        <section className="page pb-20">
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
            {founderValue.map((v) => (
              <li key={v.title} className="bg-paper p-8 sm:p-10">
                <h2 className="display text-2xl text-wine-900">{v.title}</h2>
                <p className="mt-4 leading-relaxed text-muted">{v.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-wine-900 text-cream">
          <div className="page py-20">
            <p className="eyebrow !text-gold">How it works</p>
            <ol className="mt-10 grid gap-10 md:grid-cols-4">
              {founderProcess.map((s) => (
                <li key={s.step} className="border-t border-cream/20 pt-6">
                  <p className="font-display text-3xl italic text-gold">{s.step}</p>
                  <h2 className="mt-4 font-display text-xl">{s.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="pitch" className="page grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 className="display mt-4 text-3xl text-wine-900 sm:text-4xl">Tell us what you&apos;re building.</h2>
            <p className="mt-5 leading-relaxed text-muted">
              A short note is all we need for a first read. If it looks like a fit we&apos;ll set up a conversation, and
              later send you a personal link to our due-diligence questionnaire.
            </p>
          </div>
          <PitchForm />
        </section>
      </main>
    </>
  );
}
