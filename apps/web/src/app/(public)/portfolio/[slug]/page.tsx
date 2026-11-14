import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { companies } from "@/content/portfolio";

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = companies.find((x) => x.slug === slug);
  return c ? { title: c.name, description: c.oneLiner } : {};
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = companies.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <>
      <Header />
      <main id="main" className="page pb-24 pt-12 sm:pt-16">
        <Link href="/portfolio" className="text-sm text-muted hover:text-wine-800">
          ← Portfolio
        </Link>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <div className="flex h-40 items-center justify-center rounded-xl border border-line bg-paper p-8">
              <Image src={c.logo} alt={`${c.name} logo`} width={240} height={96} className="max-h-24 w-auto max-w-full object-contain mix-blend-multiply" />
            </div>
            <dl className="mt-8 space-y-5 text-sm">
              <div>
                <dt className="eyebrow">Country</dt>
                <dd className="mt-1 font-display text-lg text-wine-900">{c.country}</dd>
              </div>
              <div>
                <dt className="eyebrow">Sector</dt>
                <dd className="mt-1 font-display text-lg text-wine-900">{c.sector}</dd>
              </div>
            </dl>
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-8">
              Visit website ↗
            </a>
          </div>
          <div>
            <h1 className="display text-4xl text-wine-900 sm:text-6xl">{c.name}</h1>
            <p className="lede mt-6">{c.oneLiner}</p>
            <p className="mt-8 text-lg leading-relaxed text-ink/85">{c.description}</p>
            {c.bridge && (
              <p className="mt-10 border-l-2 border-gold-deep pl-6 font-display text-2xl italic leading-snug text-wine-800">{c.bridge}</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
