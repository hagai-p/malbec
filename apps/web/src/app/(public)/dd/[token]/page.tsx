import type { Metadata } from "next";
import { Suspense } from "react";
import { DdForm } from "@/components/dd-form";
import { Header } from "@/components/header";
import { ddRequired, ddSteps } from "@/content/dd";
import { getDdInvite } from "@/lib/dd";

export const metadata: Metadata = { title: "Due-diligence questionnaire", robots: { index: false, follow: false } };

async function Questionnaire({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const invite = await getDdInvite(token);

  if (!invite)
    return (
      <div className="rounded-xl border border-line bg-paper p-10">
        <p className="display text-2xl text-wine-900">This link isn&apos;t valid.</p>
        <p className="mt-3 leading-relaxed text-muted">
          It may have expired or been mistyped. Please ask your contact at Malbec Ventures for a new one.
        </p>
      </div>
    );

  if (invite.status === "completed")
    return (
      <div className="rounded-xl border border-gold-deep/40 bg-paper p-10">
        <p className="display text-2xl text-wine-900">Already submitted. Thank you.</p>
        <p className="mt-3 leading-relaxed text-muted">We have your answers and will be in touch.</p>
      </div>
    );

  const initial = {
    company_name: invite.companyName,
    founder_name: invite.founderName,
    founder_email: invite.founderEmail,
    ...invite.answers,
  };
  return <DdForm token={token} steps={ddSteps} initial={initial} required={ddRequired} />;
}

export default function DdPage({ params }: { params: Promise<{ token: string }> }) {
  return (
    <>
      <Header />
      <main id="main" className="page max-w-3xl pb-24 pt-14">
        <p className="eyebrow">Due diligence</p>
        <h1 className="display mt-4 text-4xl text-wine-900 sm:text-5xl">Tell us the whole story.</h1>
        <p className="lede mt-5">
          Eighteen questions, about half an hour. Answer plainly: we would rather read what is true than what is polished.
        </p>
        <div className="mt-12">
          <Suspense fallback={<p className="text-sm text-muted">Opening…</p>}>
            <Questionnaire params={params} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
