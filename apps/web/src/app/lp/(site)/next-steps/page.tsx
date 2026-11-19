import type { Metadata } from "next";
import { InterestForm } from "@/components/lp/forms";
import { Block, LpPage } from "@/components/lp/shell";
import { faq, interestRanges } from "@/content/lp/fund";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "FAQ & next steps" };

export default function NextSteps() {
  return (
    <LpPage slug="next-steps" number="12" eyebrow="FAQ & next steps" title="Questions, and what happens next."
      lede="Malbec exports the Israeli VC playbook. The window between recognition and repricing is where venture returns are made."
    >
      <Block title="Frequently asked">
        <div className="divide-y divide-line border-y border-line">
          {faq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-display text-xl text-heading">
                {f.q}
                <span aria-hidden className="text-gold-deep transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Block>

      <Block title="Talk to us">
        <div className="flex flex-wrap gap-4">
          <a href={`mailto:${site.email}?subject=Malbec%20Ventures%20%E2%80%94%20a%20conversation`} className="btn-wine">Email Hagai</a>
          <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="btn-ghost">{site.phone}</a>
        </div>
      </Block>

      <Block title="Indicate interest" note="Tell us which vehicle you are considering and roughly how much. It commits you to nothing.">
        <InterestForm ranges={interestRanges} />
      </Block>
    </LpPage>
  );
}
