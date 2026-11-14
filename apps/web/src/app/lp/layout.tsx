import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Investor site", template: "%s — Malbec Ventures investors" },
  robots: { index: false, follow: false, nocache: true },
};

export default function LpRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
