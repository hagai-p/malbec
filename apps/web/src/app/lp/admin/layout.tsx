import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Admin" };

const tabs = [
  { href: "/lp/admin", label: "Investors" },
  { href: "/lp/admin/activity", label: "Activity" },
  { href: "/lp/admin/documents", label: "Documents & updates" },
  { href: "/lp/admin/inbox", label: "Inbox" },
  { href: "/lp", label: "View LP site" },
];

async function AdminOnly({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return children;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-line bg-wine-950 text-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Logo href="/lp/admin" />
          <nav aria-label="Admin" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {tabs.map((t) => (
              <Link key={t.href} href={t.href} prefetch={false} className="text-cream/75 hover:text-cream">{t.label}</Link>
            ))}
          </nav>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-6xl px-6 py-12">
        <Suspense fallback={<p className="text-sm text-muted">Opening…</p>}>
          <AdminOnly>{children}</AdminOnly>
        </Suspense>
      </main>
    </div>
  );
}
