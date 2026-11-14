import { Suspense } from "react";
import { logActivity, requireLp, type Viewer } from "@/lib/auth";
import { signOut } from "@/lib/lp-actions";
import { lpNav } from "@/content/lp/fund";
import { Logo } from "@/components/logo";
import { LpNavLinks } from "./nav-links";

/** Frame shared by all LP pages. Holds nothing confidential: section names only. */
export function LpFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="border-b border-line bg-wine-950 text-cream lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto lg:border-b-0">
        <div className="flex items-center justify-between px-6 py-6 lg:block">
          <Logo href="/lp" />
          <p className="eyebrow !text-gold lg:mt-6">Investor site</p>
        </div>
        <Suspense>
          <LpNavLinks items={lpNav} />
        </Suspense>
        <form action={signOut} className="hidden px-6 py-6 lg:block">
          <button type="submit" className="text-xs uppercase tracking-[0.2em] text-cream/60 hover:text-cream">
            Sign out
          </button>
        </form>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

type PageProps = {
  slug: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children: React.ReactNode | ((viewer: Viewer) => React.ReactNode);
};

/** Every LP page renders through this: nothing inside is produced until the viewer is verified. */
export function LpPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="px-6 py-24 text-sm text-muted sm:px-12">Opening…</div>}>
      <Verified {...props} />
    </Suspense>
  );
}

async function Verified({ slug, eyebrow, title, lede, children }: PageProps) {
  const viewer = await requireLp();
  await logActivity(viewer.id, "page_view", slug);
  return (
    <>
      <main id="main" className="mx-auto max-w-5xl px-6 pb-20 pt-12 sm:px-12 sm:pt-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-4 max-w-3xl text-4xl text-wine-900 sm:text-5xl">{title}</h1>
        {lede && <p className="lede mt-6 max-w-2xl">{lede}</p>}
        <div className="mt-12 space-y-16">{typeof children === "function" ? children(viewer) : children}</div>
      </main>
      <footer className="border-t border-line px-6 py-6 text-xs leading-relaxed text-muted sm:px-12">
        <p>
          Confidential. Prepared for <strong className="font-medium text-ink">{viewer.fullName || viewer.email}</strong>
          {viewer.firm && <> ({viewer.firm})</>}. Not for distribution. This is not an offer to sell or a solicitation to
          buy any security; any offer is made only through the fund&apos;s offering documents.
        </p>
      </footer>
    </>
  );
}

export function Block({ title, children, note }: { title: string; children: React.ReactNode; note?: string }) {
  return (
    <section>
      <h2 className="display text-2xl text-wine-900 sm:text-3xl">{title}</h2>
      {note && <p className="mt-3 max-w-2xl leading-relaxed text-muted">{note}</p>}
      <div className="mt-7">{children}</div>
    </section>
  );
}

export function Facts({ items, cols = 4 }: { items: readonly { label: string; value: string; note?: string }[]; cols?: 2 | 3 | 4 }) {
  const grid = cols === 2 ? "sm:grid-cols-2" : cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 xl:grid-cols-4";
  return (
    <dl className={`grid gap-px overflow-hidden rounded-xl border border-line bg-line ${grid}`}>
      {items.map((f) => (
        <div key={f.label} className="bg-paper p-6">
          <dt className="eyebrow">{f.label}</dt>
          <dd className={`mt-3 font-display text-2xl ${f.value === "To be confirmed" ? "italic text-muted" : "text-wine-900"}`}>{f.value}</dd>
          {f.note && <dd className="mt-1 text-sm text-muted">{f.note}</dd>}
        </div>
      ))}
    </dl>
  );
}
