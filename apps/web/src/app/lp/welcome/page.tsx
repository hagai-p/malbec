import type { Metadata } from "next";
import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { AttestationForm } from "@/components/lp/forms";
import { requireInvited } from "@/lib/auth";
import { confidentialityTerms, investorStatuses } from "@/content/lp/fund";

export const metadata: Metadata = { title: "Before you enter" };

async function Greeting() {
  const viewer = await requireInvited();
  const first = viewer.fullName.split(" ")[0];
  return (
    <>
      <h1 className="display mt-4 text-4xl text-wine-900 sm:text-5xl">{first ? `Welcome, ${first}.` : "Welcome."}</h1>
      {viewer.personalNote && (
        <p className="mt-6 border-l-2 border-gold-deep pl-5 font-display text-xl italic leading-relaxed text-wine-800">
          {viewer.personalNote}
        </p>
      )}
      <p className="lede mt-6">
        Before you go in, two things I need from you: a word on your investor status, and your agreement to keep what
        you see here between us.
      </p>
      <section className="mt-10 rounded-xl border border-line bg-paper p-7">
        <h2 className="eyebrow">Confidentiality terms</h2>
        <ol className="mt-5 list-decimal space-y-4 pl-5 leading-relaxed text-ink/85">
          {confidentialityTerms.map((t) => <li key={t}>{t}</li>)}
        </ol>
        <p className="mt-5 text-xs text-muted">Draft wording, pending legal review.</p>
      </section>
      <div className="mt-10">
        <AttestationForm statuses={investorStatuses} />
      </div>
    </>
  );
}

export default function Welcome() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-6 py-14">
      <Logo href="/lp/welcome" className="text-wine-900" />
      <p className="eyebrow mt-14">Before you enter</p>
      <Suspense fallback={<p className="mt-6 text-sm text-muted">Opening…</p>}>
        <Greeting />
      </Suspense>
    </main>
  );
}
