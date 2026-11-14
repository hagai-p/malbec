"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Company } from "@/content/portfolio";

export function PortfolioGrid({ companies }: { companies: Company[] }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Israel", "Argentina", ...Array.from(new Set(companies.map((c) => c.sector)))];
  const shown = companies.filter((c) => filter === "All" || c.country === filter || c.sector === filter);

  return (
    <>
      <div role="group" aria-label="Filter companies" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              filter === f ? "border-wine-800 bg-wine-800 text-cream" : "border-line bg-paper text-muted hover:border-wine-800 hover:text-wine-800"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {shown.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/portfolio/${c.slug}`}
              className="group flex h-full flex-col rounded-xl border border-line bg-paper p-7 transition-shadow hover:shadow-[0_12px_40px_-20px_rgba(78,14,37,0.35)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-32 items-center">
                  <Image src={c.logo} alt="" width={160} height={64} className="max-h-14 w-auto max-w-full object-contain mix-blend-multiply" />
                </div>
                <span className="rounded-full bg-sand px-3 py-1 text-xs text-muted">
                  {c.country} · {c.sector}
                </span>
              </div>
              <h2 className="display mt-6 text-2xl text-wine-900">{c.name}</h2>
              <p className="mt-3 leading-relaxed text-muted">{c.oneLiner}</p>
              {c.bridge && <p className="mt-4 font-display italic text-gold-deep">{c.bridge}</p>}
              <span className="mt-auto pt-6 text-sm font-medium text-wine-800 group-hover:underline">Read more →</span>
            </Link>
          </li>
        ))}
        <li className="flex min-h-48 flex-col justify-center rounded-xl border border-dashed border-gold-deep/50 p-7 md:col-span-2">
          <p className="display text-2xl italic text-wine-900">More in the oven.</p>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">
            Several more companies are on their way. We&apos;ll introduce them when the time is right.
          </p>
        </li>
      </ul>
    </>
  );
}
