"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/content/site";

export function MobileNav({ onDark }: { onDark: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className={`btn !px-4 !py-2 border ${onDark ? "border-cream/40 text-cream" : "border-accent/25 text-accent"}`}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <div id="mobile-nav" className="absolute inset-x-0 top-20 border-y border-line bg-page text-ink shadow-lg">
          <nav aria-label="Mobile" className="page flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/70 py-4 font-display text-2xl"
              >
                {item.label}
              </Link>
            ))}
            <a href={site.lpUrl} className="btn-wine mt-5 self-start">
              LP Login
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
