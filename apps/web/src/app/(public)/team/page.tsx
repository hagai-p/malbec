import type { Metadata } from "next";
import { Header } from "@/components/header";
import { PageIntro } from "@/components/page-intro";
import { Avatar } from "@/components/avatar";
import { team, type Person } from "@/content/team";

export const metadata: Metadata = {
  title: "Team",
  description: "The partners and advisors behind Malbec Ventures.",
};

function People({ title, people, large }: { title: string; people: Person[]; large: boolean }) {
  const grid = large ? (people.length % 3 === 0 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4") : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <section className="border-t border-line py-14">
      <h2 className="eyebrow">{title}</h2>
      <ul className={`mt-10 grid gap-x-10 gap-y-12 ${grid}`}>
        {people.map((p) => (
          <li key={p.name} className={large ? "" : "flex gap-5"}>
            <Avatar person={p} size={large ? "lg" : "md"} />
            <div className={large ? "mt-6" : ""}>
              <h3 className={`font-display text-heading ${large ? "text-2xl" : "text-xl"}`}>{p.name}</h3>
              <p className="mt-1 text-sm text-gold-deep">{p.role}</p>
              <p className={`mt-4 leading-relaxed text-muted ${large ? "" : "text-sm"}`}>{p.bio}</p>
              {p.linkedin && (
                <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
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
          lede="A small partnership and a hands-on circle of advisors, on the ground in Tel Aviv, Buenos Aires and Miami."
        />
        <div className="page pb-12">
          {team.map((g) => (
            <People key={g.key} title={g.title} people={g.people} large={g.size === "large"} />
          ))}
        </div>
      </main>
    </>
  );
}
