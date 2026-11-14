import Link from "next/link";

/** The Malbec mark, drawn with a CSS mask so it takes the current text colour. */
export function Mark({ className = "h-8 w-9" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block bg-current ${className}`}
      style={{
        mask: "url(/brand/mark.png) center / contain no-repeat",
        WebkitMask: "url(/brand/mark.png) center / contain no-repeat",
      }}
    />
  );
}

export function Logo({ href = "/", className = "" }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-3 ${className}`} aria-label="Malbec Ventures — home">
      <Mark />
      <span className="text-[0.95rem] font-medium lowercase leading-[1.05] tracking-wide">
        malbec
        <br />
        ventures
      </span>
    </Link>
  );
}
