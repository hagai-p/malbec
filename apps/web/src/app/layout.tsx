import type { Metadata } from "next";
import { Inter, Inter_Tight, Playfair_Display, Sora } from "next/font/google";
import { theme } from "@/lib/theme";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-intertight", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.publicUrl),
  title: { default: "Malbec Ventures — Israel–LATAM early-stage venture capital", template: "%s — Malbec Ventures" },
  description:
    "Malbec Ventures is the first and only Israel–LATAM cross-border VC. We back exceptional early-stage founders in Tel Aviv and Buenos Aires and help them scale globally.",
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme={theme} className={`${inter.variable} ${playfair.variable} ${interTight.variable} ${sora.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
