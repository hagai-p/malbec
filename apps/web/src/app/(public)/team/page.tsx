import type { Metadata } from "next";
import { Header } from "@/components/header";
import { PageIntro } from "@/components/page-intro";
import { Avatar } from "@/components/avatar";
import { advisors, network, partners, type Person } from "@/content/team";

export const metadata: Metadata = {
  title: "Team",
  description: "The partners, advisors and network behind Malbec Ventures.",
};

function People({ title, people, large = false }: { title: string; people: Person[]; large?: boolean }) {
  return (
    <section className="border-t border-line py-14">
      <h2 className="eyebrow">{title}</h2>
      <ul className={`mt-10 grid gap-x-12 gap-y-12 ${large ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
        {people.map((p) => (
          <li key={p.name} className={large ? "" : "flex gap-6"}>
            <Avatar person={p} size={large ? "lg" : "md"} />
            <div className={large ? "mt-6" : ""}>
              <h3 className={`font-display text-wine-900 ${large ? "text-2xl" : "text-xl"}`}>{p.name}</h3>
              <p className="mt-1 text-sm text-gold-deep">{p.role}</p>
              <p className="mt-4 leading-relaxed text-muted">{p.bio}</p>
              {p.linkedin && (
                <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-wine-800 hover:underline">
                  LinkedIn ↗<span className="sr-only"> — {p.name}</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Team() {
  return (
    <>
      <Header />
      <main id="main">
        <PageIntro
          eyebrow="Team"
          title="People who have built, bought, sold and operated on both continents."
          lede="A small partnership, a hands-on advisory board, and a network that picks up the phone."
        />
        <div className="page pb-12">
          <People title="Partners" people={partners} large />
          <People title="Advisory board" people={advisors} />
          <People title="Network & mentors" people={network} />
        </div>
      </main>
    </>
  );
}
