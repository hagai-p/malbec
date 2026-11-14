import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-wine-950 text-cream/80">
      <div className="page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="text-cream" />
          <p className="mt-6 max-w-xs font-display text-xl italic leading-snug text-cream">{site.footerLine}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-gold">Tel Aviv — Buenos Aires</p>
        </div>
        <div>
          <h2 className="eyebrow !text-gold">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.lpUrl} className="hover:text-cream">
                LP Login
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow !text-gold">Contact</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-cream">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="hover:text-cream">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="page flex flex-col gap-4 py-8 text-xs leading-relaxed text-cream/55 md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl">
            This website is for general information only. Nothing on it is an offer to sell, or a solicitation of an offer
            to buy, any security or interest in any fund. Any such offer is made only to qualified investors through
            confidential offering documents.
          </p>
          <p className="flex shrink-0 gap-5">
            <Link href="/legal/privacy" className="hover:text-cream">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-cream">
              Terms
            </Link>
            <span>© {site.year} Malbec Ventures</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
