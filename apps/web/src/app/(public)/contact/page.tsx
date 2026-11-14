import type { Metadata } from "next";
import { Header } from "@/components/header";
import { PageIntro } from "@/components/page-intro";
import { ContactForm } from "@/components/forms";
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
              <dd className="mt-2 font-display text-xl text-wine-900">
                <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Phone</dt>
              <dd className="mt-2 font-display text-xl text-wine-900">
                <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="hover:underline">{site.phone}</a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Where</dt>
              <dd className="mt-2 font-display text-xl text-wine-900">Tel Aviv, Israel<br />Buenos Aires, Argentina</dd>
            </div>
            <div>
              <dt className="eyebrow">Follow</dt>
              <dd className="mt-2 font-display text-xl text-wine-900">
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn ↗</a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Investors</dt>
              <dd className="mt-2 leading-relaxed text-muted">
                Existing and invited limited partners can sign in at{" "}
                <a href={site.lpUrl} className="text-wine-800 underline">malbec.online</a>. Access is by invitation.
              </dd>
            </div>
          </dl>
          <ContactForm />
        </section>
      </main>
    </>
  );
}
