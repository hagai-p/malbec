import Link from "next/link";
import { notFound } from "next/navigation";
import { ddSteps } from "@/content/dd";
import { fmt, getDd } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";

export default async function AdminDd({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const dd = await getDd(id);
  if (!dd) notFound();
  const answers = dd.dd_submissions?.answers ?? {};
  return (
    <article className="max-w-3xl">
      <Link href="/lp/admin/inbox" prefetch={false} className="text-sm text-muted hover:text-accent print:hidden">← Inbox</Link>
      <h1 className="display mt-4 text-4xl text-heading">{dd.company_name || answers.company_name}</h1>
      <p className="mt-2 text-muted">
        DD questionnaire · {dd.founder_name}, {dd.founder_email} · {dd.dd_submissions?.status === "completed" ? `submitted ${fmt(dd.dd_submissions.completed_at)}` : "draft in progress"}
      </p>
      <p className="mt-2 text-sm text-muted print:hidden">To save as PDF, use your browser&apos;s Print command.</p>
      {ddSteps.map((step) => (
        <section key={step.title} className="mt-12">
          <h2 className="eyebrow">{step.title}</h2>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            {step.fields.map((f) => (
              <div key={f.key} className="py-5">
                <dt className="font-display text-lg text-heading">{f.label}</dt>
                <dd className="mt-2 whitespace-pre-line leading-relaxed text-ink/85">{answers[f.key] || <span className="italic text-muted">No answer</span>}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </article>
  );
}
