"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LpNavLinks({ items }: { items: readonly { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Investor site" className="flex gap-1 overflow-x-auto px-4 pb-4 lg:block lg:space-y-0.5 lg:px-3 lg:pb-0">
      {items.map((item, i) => {
        const active = item.href === "/lp" ? pathname === "/lp" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-baseline gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              active ? "bg-cream/10 text-cream" : "text-cream/65 hover:bg-cream/5 hover:text-cream"
            }`}
          >
            <span className="hidden w-5 font-display text-xs italic text-gold lg:inline">{String(i + 1).padStart(2, "0")}</span>
            <span className="whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
