import type { Metadata } from "next";
import { Header } from "@/components/header";
import { PageIntro } from "@/components/page-intro";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Malbec Ventures in Tel Aviv and Buenos Aires.",
};

export default function Contact() {
  return (
    <>
      <Header />
      <main id="main">
        <PageIntro eyebrow="Contact" title="Let's talk." lede="Founders, co-investors, partners: we'd like to hear from you." />
        <section className="page grid gap-14 pb-24 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <dl className="space-y-8 border-t border-line pt-8">
            <div>
              <dt className="eyebrow">Email</dt>
              <dd className="mt-2 font-display text-xl text-heading">
                <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Phone</dt>
              <dd className="mt-2 font-display text-xl text-heading">
                <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="hover:underline">{site.phone}</a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Where</dt>
              <dd className="mt-2 font-display text-xl text-heading">Tel Aviv, Israel<br />Buenos Aires, Argentina</dd>
            </div>
            <div>
              <dt className="eyebrow">Follow</dt>
              <dd className="mt-2 font-display text-xl text-heading">
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn ↗</a>
              </dd>
            </div>
          </dl>
          <div className="rounded-xl bg-wine-950 p-8 text-cream sm:p-12">
            <p className="eyebrow !text-gold">Write to us</p>
            <h2 className="display mt-4 text-3xl sm:text-4xl">
              The best conversations <em className="text-gold">start with a short note.</em>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-cream/80">
              Tell us who you are and what you have in mind. We read every message ourselves and reply personally.
            </p>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Hello Malbec Ventures")}`}
              className="btn-gold mt-8"
            >
              Email us
            </a>
            <p className="mt-4 text-sm text-cream/60">{site.email}</p>
          </div>
        </section>
      </main>
    </>
  );
}
