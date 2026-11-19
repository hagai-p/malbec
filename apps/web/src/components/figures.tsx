/** Shared, presentational figures. No confidential content lives here: data is passed in. */

type MirrorBar = { label: string; agriculture: number; tech: number; question?: boolean };

/** Grouped bars: share of exports, agriculture vs tech & knowledge. */
export function ExportMixChart({ bars, tone = "light" }: { bars: readonly MirrorBar[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const H = 200;
  return (
    <figure>
      <div className={`rounded-xl border p-5 sm:p-7 ${dark ? "border-cream/15 bg-wine-950/40" : "border-line bg-paper"}`}>
        <div className={`flex flex-wrap gap-x-6 gap-y-1 text-xs uppercase tracking-[0.16em] ${dark ? "text-cream/70" : "text-muted"}`}>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-gold-deep" />Agriculture</span>
          <span className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-sm ${dark ? "bg-cream" : "bg-chart"}`} />Tech &amp; knowledge</span>
          <span className="ml-auto normal-case tracking-normal">Share of exports, %</span>
        </div>
        <div aria-hidden className="mt-6 grid grid-cols-3 gap-3 sm:gap-8">
          {bars.map((b) => (
            <div key={b.label}>
              <div className={`flex items-end justify-center gap-2 border-b sm:gap-4 ${dark ? "border-cream/25" : "border-line"}`} style={{ height: H + 28 }}>
                {[{ v: b.agriculture, c: "bg-gold-deep" }, { v: b.tech, c: dark ? "bg-cream" : "bg-chart" }].map((x, i) => (
                  <div key={i} className="flex w-9 flex-col items-center justify-end sm:w-14">
                    {i === 1 && b.question && (
                      <span className={`mb-1 font-display text-3xl italic ${dark ? "text-gold" : "text-danger"}`}>?</span>
                    )}
                    <span className={`mb-1 font-display text-lg ${dark ? "text-cream" : "text-heading"}`}>{x.v}</span>
                    <div className={`w-full rounded-t ${x.c}`} style={{ height: Math.max((x.v / 80) * H, 2) }} />
                  </div>
                ))}
              </div>
              <p className={`mt-3 text-center text-xs sm:text-sm ${dark ? "text-cream/80" : "text-muted"}`}>{b.label}</p>
            </div>
          ))}
        </div>
        <div className="sr-only">
        <table>
          <caption>Share of exports by sector</caption>
          <thead><tr><th>Period</th><th>Agriculture %</th><th>Tech and knowledge %</th></tr></thead>
          <tbody>{bars.map((b) => <tr key={b.label}><td>{b.label}</td><td>{b.agriculture}</td><td>{b.tech}</td></tr>)}</tbody>
        </table>
        </div>
      </div>
    </figure>
  );
}

/** Horizontal bars for a handful of labelled values. */
export function PriceBars({ items }: { items: readonly { label: string; text: string; scale: number; tone?: "wine" | "gold" | "muted" }[] }) {
  const tones = { wine: "bg-chart", gold: "bg-gold-deep", muted: "bg-muted/45" };
  return (
    <dl className="space-y-4">
      {items.map((i) => (
        <div key={i.label} className="grid grid-cols-[7rem_1fr] items-center gap-4 sm:grid-cols-[9rem_1fr]">
          <dt className="text-sm font-medium text-ink">{i.label}</dt>
          <dd className="flex items-center gap-3">
            <span aria-hidden className={`h-7 rounded ${tones[i.tone ?? "wine"]}`} style={{ width: `${i.scale * 70}%` }} />
            <span className="font-display text-xl text-heading">{i.text}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** A linked chain of steps, one headline number each. */
export function Chain({ steps }: { steps: readonly { step: string; number: string; text: string }[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-xl bg-wine-800/60 md:grid-cols-5">
      {steps.map((s, i) => (
        <li key={s.step} className="relative bg-wine-900 p-5 text-cream">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
            {String(i + 1).padStart(2, "0")} · {s.step}
          </p>
          <p className="mt-3 font-display text-3xl text-cream">{s.number}</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/75">{s.text}</p>
          {i < steps.length - 1 && (
            <span aria-hidden className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 font-display text-xl text-gold md:block">→</span>
          )}
        </li>
      ))}
    </ol>
  );
}

export function Bubbles({ items, centre }: { items: readonly string[]; centre: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-6 sm:p-8">
      <p className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-wine-800 text-center font-display text-sm italic leading-tight text-gold">
        {centre}
      </p>
      <ul className="mt-6 flex flex-wrap justify-center gap-3">
        {items.map((i) => (
          <li key={i} className="rounded-full border border-gold-deep/40 bg-sand/60 px-4 py-2.5 text-center text-sm text-heading">{i}</li>
        ))}
      </ul>
    </div>
  );
}

export function Timeline({ steps }: { steps: readonly { title: string; text: string }[] }) {
  return (
    <ol className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
      {steps.map((s, i) => (
        <li key={s.title} className="relative border-t-2 border-accent pr-5 pt-5">
          <span aria-hidden className="absolute -top-[0.45rem] left-0 h-3 w-3 rounded-full bg-wine-800" />
          <p className="font-display text-sm italic text-gold-deep">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-1 font-display text-lg text-heading">{s.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Stacked yearly bars. Null values render as an outlined placeholder. */
export function StackedBars({ years }: { years: readonly { year: string; initial: number | null; followOn: number | null }[] }) {
  const max = Math.max(...years.map((y) => (y.initial ?? 0) + (y.followOn ?? 0)), 1);
  const pending = years.every((y) => y.initial === null && y.followOn === null);
  return (
    <div className="rounded-xl border border-line bg-paper p-6">
      <div className="flex gap-6 text-xs uppercase tracking-[0.16em] text-muted">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-chart" />Initial</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-gold-deep" />Follow-on</span>
      </div>
      <div className="mt-6 grid grid-cols-5 items-end gap-3 sm:gap-6" style={{ height: 170 }}>
        {years.map((y, i) => (
          <div key={y.year} className="flex h-full flex-col justify-end">
            {pending ? (
              <div className="rounded-t border border-dashed border-gold-deep/60" style={{ height: `${[45, 60, 70, 42, 28][i % 5]}%` }} />
            ) : (
              <>
                <div className="rounded-t bg-gold-deep" style={{ height: `${((y.followOn ?? 0) / max) * 100}%` }} />
                <div className="bg-chart" style={{ height: `${((y.initial ?? 0) / max) * 100}%` }} />
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-5 gap-3 text-center text-xs text-muted sm:gap-6">
        {years.map((y) => <span key={y.year}>{y.year}</span>)}
      </div>
    </div>
  );
}

export function Contrast({ others, we }: { others: string; we: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-line bg-paper p-7">
        <p className="eyebrow !text-muted">Where others see</p>
        <p className="mt-3 font-display text-xl leading-snug text-muted">{others}</p>
      </div>
      <div className="rounded-xl border-2 border-accent bg-paper p-7">
        <p className="eyebrow">We see</p>
        <p className="mt-3 font-display text-xl leading-snug text-heading">{we}</p>
      </div>
    </div>
  );
}

export function CaseCard({ name, tag, story, facts }: { name: string; tag: string; story: string; facts: readonly (readonly [string, string])[] }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-accent/25 bg-paper">
      <div className="p-6">
        <p className="eyebrow">{tag}</p>
        <h3 className="mt-2 font-display text-2xl text-heading">{name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/85">{story}</p>
      </div>
      <dl className="mt-auto border-t border-line">
        {facts.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line/70 px-6 py-3 text-sm last:border-0">
            <dt className="text-muted">{k}</dt>
            <dd className={`text-right ${v === "To be confirmed" ? "italic text-muted" : "font-medium text-heading"}`}>{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function Quote({ text, who, pending }: { text: string; who: string; pending?: boolean }) {
  if (pending)
    return (
      <div className="rounded-xl border border-dashed border-gold-deep/50 p-7 italic text-muted">
        Quote to be added: {who.toLowerCase()}.
      </div>
    );
  return (
    <figure className="border-l-2 border-gold-deep pl-6">
      <blockquote className="font-display text-2xl italic leading-snug text-heading">“{text}”</blockquote>
      <figcaption className="mt-4 text-sm text-muted">{who}</figcaption>
    </figure>
  );
}

/** The two-brands opener: orange and grape. */
export function TwoBrands({ brands, line, tone = "light" }: { brands: readonly { name: string; line: string }[]; line: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const art = [
    <svg key="o" viewBox="0 0 64 64" className="h-16 w-16" aria-hidden><circle cx="32" cy="34" r="22" fill="#e08a2c" /><circle cx="32" cy="34" r="22" fill="none" stroke="#b96a17" strokeWidth="1.5" /><path d="M32 12c2-6 8-8 13-7-1 6-6 9-13 7z" fill="#5d7a3a" /><circle cx="25" cy="27" r="4" fill="#f3b566" opacity=".6" /></svg>,
    <svg key="g" viewBox="0 0 64 64" className="h-16 w-16" aria-hidden><path d="M32 6v10" stroke="#5d7a3a" strokeWidth="2.5" strokeLinecap="round" /><path d="M32 12c4-6 11-6 15-3-3 6-9 7-15 3z" fill="#5d7a3a" />{[[22,24],[32,24],[42,24],[27,33],[37,33],[22,42],[32,42],[42,42],[27,51],[37,51],[32,59]].map(([x,y])=> <circle key={`${x}-${y}`} cx={x} cy={y} r="5.6" fill="var(--color-grape)" stroke="var(--color-grape-edge)" strokeWidth="1" />)}</svg>,
  ];
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {brands.map((b, i) => (
          <li key={b.name} className={`flex items-center gap-5 rounded-xl border p-6 ${dark ? "border-cream/15 bg-wine-950/40" : "border-line bg-paper"}`}>
            {art[i]}
            <div>
              <p className={`font-display text-2xl ${dark ? "text-cream" : "text-heading"}`}>{b.name}</p>
              <p className={`mt-1 text-sm leading-relaxed ${dark ? "text-cream/75" : "text-muted"}`}>{b.line}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className={`mt-6 font-display text-xl italic ${dark ? "text-gold" : "text-accent"}`}>{line}</p>
    </div>
  );
}
