import type { Metadata } from "next";
import { Header } from "@/components/header";
import { PageIntro } from "@/components/page-intro";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { companies } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "The early-stage companies Malbec Ventures backs across Israel and Argentina.",
};

export default function Portfolio() {
  return (
    <>
      <Header />
      <main id="main">
        <PageIntro
          eyebrow="Portfolio"
          title="Early-stage companies bridging Israel and Latin America."
          lede="We partner with exceptional founders building real economic ties between the two regions."
        />
        <section className="page pb-24">
          <PortfolioGrid companies={companies} />
        </section>
      </main>
    </>
  );
}
