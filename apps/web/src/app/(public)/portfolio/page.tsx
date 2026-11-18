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
          title={<>Seven companies, <em>one bridge.</em></>}
          lede="Three flavours of the same idea. Every company here increases high-tech exports for both countries."
        />
        <section className="page pb-24">
          <PortfolioGrid companies={companies} />
        </section>
      </main>
    </>
  );
}
