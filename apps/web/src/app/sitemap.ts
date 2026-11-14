import type { MetadataRoute } from "next";
import { companies } from "@/content/portfolio";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/thesis", "/portfolio", "/team", "/founders", "/contact", ...companies.map((c) => `/portfolio/${c.slug}`)];
  return paths.map((p) => ({ url: `${site.publicUrl}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
