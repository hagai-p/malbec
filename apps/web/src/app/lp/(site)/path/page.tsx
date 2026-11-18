import type { Metadata } from "next";
import { Block, LpPage } from "@/components/lp/shell";
import { vehicles } from "@/content/lp/fund";

export const metadata: Metadata = { title: "The path" };

export default function Path() {
  return (
    <LpPage
      slug="path" number="04"
      eyebrow="The path"
      title={<>Prove it, then scale it: <em>POC → Malbec 1 → Malbec 2.</em></>}
      lede="We are building Malbec the way we ask founders to build companies: show it works with a small amount of capital, then raise more on the evidence."
    >
      <Block title="Three stages">
        <ol className="space-y-5">
          {vehicles.map((v, i) => (
            <li key={v.key} className={`grid gap-6 rounded-xl border p-7 md:grid-cols-[12rem_1fr] ${v.open ? "border-wine-800/30 bg-paper" : "border-dashed border-line"}`}>
              <div>
                <p className="font-display text-sm italic text-gold-deep">Stage {i + 1}</p>
                <p className="mt-1 font-display text-2xl text-wine-900">{v.name}</p>
                <p className="font-display text-5xl text-wine-800">{v.size}</p>
                <p className={`mt-3 inline-block rounded-full px-3 py-1 text-xs uppercase tracking-[0.15em] ${v.open ? "bg-wine-800 text-cream" : "bg-sand text-muted"}`}>{v.status}</p>
              </div>
              <div className="space-y-4 leading-relaxed">
                <p className="text-lg text-ink/85">{v.summary}</p>
                <p className="text-muted"><span className="eyebrow mr-3">What it proves</span>{v.proves}</p>
                {v.key === "poc" && <p className="text-muted"><span className="eyebrow mr-3">Initial closing</span>$1M</p>}
                {v.open && <p className="text-muted"><span className="eyebrow mr-3">First cheque</span>{v.key === "poc" ? "Up to $250K" : "Up to $500K, follow-on up to $3M"}</p>}
              </div>
            </li>
          ))}
        </ol>
      </Block>
    </LpPage>
  );
}
