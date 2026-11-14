import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function Header({ tone = "light" }: { tone?: "light" | "dark" }) {
  const onDark = tone === "dark";
  return (
    <header
      className={
        onDark
          ? "absolute inset-x-0 top-0 z-40 text-cream"
          : "sticky top-0 z-40 border-b border-line/70 bg-cream/90 text-ink backdrop-blur"
      }
    >
      <div className="page flex h-20 items-center justify-between">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm tracking-wide transition-colors ${onDark ? "text-cream/85 hover:text-cream" : "text-ink/75 hover:text-wine-800"}`}
            >
              {item.label}
            </Link>
          ))}
          <a href={site.lpUrl} className={onDark ? "btn-light !py-2" : "btn-ghost !py-2"}>
            LP Login
          </a>
        </nav>
        <MobileNav onDark={onDark} />
      </div>
    </header>
  );
}
