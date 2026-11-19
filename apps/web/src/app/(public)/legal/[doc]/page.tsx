import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { legal } from "@/content/legal";

export function generateStaticParams() {
  return Object.keys(legal).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const { doc } = await params;
  return legal[doc] ? { title: legal[doc].title, robots: { index: false } } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const page = legal[doc];
  if (!page) notFound();
  return (
    <>
      <Header />
      <main id="main" className="page max-w-3xl pb-24 pt-16">
        <p className="eyebrow">Legal</p>
        <h1 className="display mt-4 text-4xl text-heading sm:text-5xl">{page.title}</h1>
        <p className="mt-4 rounded-md border border-gold-deep/40 bg-paper px-4 py-3 text-sm text-muted">
          Draft for review by counsel. Not final.
        </p>
        <div className="mt-10 space-y-10">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl text-heading">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-muted">{p}</p>
              ))}
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
