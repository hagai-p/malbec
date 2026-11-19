import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Investor site", template: "%s — Malbec Ventures investors" },
  robots: { index: false, follow: false, nocache: true },
};

export default function LpRootLayout({ children }: { children: React.ReactNode }) {
  // The LP site and admin use the Gallery look; the public site uses Estate (see globals.css).
  return (
    <div data-theme="gallery" className="min-h-dvh bg-page text-ink">
      {children}
    </div>
  );
}
