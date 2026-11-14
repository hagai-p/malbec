export function PageIntro({ eyebrow, title, lede }: { eyebrow: string; title: React.ReactNode; lede?: React.ReactNode }) {
  return (
    <section className="page pb-12 pt-16 sm:pt-24">
      <p className="eyebrow rise">{eyebrow}</p>
      <h1 className="display rise rise-2 mt-5 max-w-4xl text-4xl text-wine-900 sm:text-6xl">{title}</h1>
      {lede && <p className="lede rise rise-3 mt-7 max-w-2xl">{lede}</p>}
    </section>
  );
}
