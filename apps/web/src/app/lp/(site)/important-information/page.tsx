import type { Metadata } from "next";
import { LpPage } from "@/components/lp/shell";
import { importantInformation } from "@/content/lp/fund";

export const metadata: Metadata = { title: "Important information" };

export default function ImportantInformation() {
  return (
    <LpPage slug="important-information" number="13" eyebrow="Important information" title="Please read this.">
      <p className="rounded-md border border-gold-deep/40 bg-paper px-4 py-3 text-sm text-muted">
        Draft for review by counsel. Not final.
      </p>
      <div className="max-w-3xl space-y-10">
        {importantInformation.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-2xl text-wine-900">{s.heading}</h2>
            {s.body.map((p) => <p key={p} className="mt-3 leading-relaxed text-muted">{p}</p>)}
          </section>
        ))}
      </div>
    </LpPage>
  );
}
