/**
 * THE TEAM — the one place to edit. Both sites (public and LP) read this file.
 *
 * To add a person:     add an entry to `people` with the `group` they belong to.
 * To remove a person:  delete the entry, or set `hidden: true` to keep it on file but off the sites.
 * To reorder:          move the entry; the order here is the order on the page.
 * To change a title:   edit `role`.
 * To move someone:     change their `group`.
 * To add a photo:      put a square image in `apps/web/public/team/` and set `photo: "/team/<file>"`.
 *                      Without a photo the site shows the person's initials.
 * To add a new group:  add a line to `teamGroups` (e.g. "Venture partners"), then use its `key`.
 *
 * Source for the current roster: Malbec Ventures one-pager, November 2026.
 */

export type TeamGroup = {
  key: string;
  /** Heading shown on the Team pages. */
  title: string;
  /** "large" = prominent cards (partners); "compact" = smaller rows. */
  size: "large" | "compact";
  /** Show this group in the team preview on the public home page. */
  onHome?: boolean;
};

export const teamGroups: TeamGroup[] = [
  { key: "partners", title: "Partners", size: "large", onHome: true },
  { key: "advisors", title: "Advisors", size: "compact" },
];

export type Person = {
  name: string;
  role: string;
  /** Must match a `key` in `teamGroups`. */
  group: string;
  bio: string;
  photo?: string;
  linkedin?: string;
  location?: string;
  /** LP site only: short bullet points shown on partner cards instead of the bio. */
  credentials?: string[];
  /** LP site only: one line for "The partners' own records". */
  record?: string;
  /** Keep on file but do not show on either site. */
  hidden?: boolean;
};

export const people: Person[] = [
  // ───────────────────────────── Partners
  {
    name: "Hagai Platin",
    role: "Managing Partner",
    group: "partners",
    bio: "Tech and startups lawyer. Executed dozens of venture deals worth $450M in total, from pre-seed to round E and M&A. Ex operator and project manager. Ex Chief Engineer in the IDF Navy.",
    photo: "/team/hagai-platin.jpg",
    linkedin: "https://www.linkedin.com/in/hagai-platin-57620225/",
    credentials: ["Dozens of venture deals as counsel, $450M in total value", "Pre-seed to round E and M&A", "Ex operator and project manager", "Ex Chief Engineer, IDF Navy"],
    record: "Dozens of venture deals as counsel, $450M in total value, from pre-seed to round E and M&A.",
  },
  {
    name: "Dr. Franck Atlan",
    role: "Partner, Head of Malbec Health",
    group: "partners",
    bio: "Clinical surgeon. Member of The Israeli Society for Health-Tech. Advised Israeli VCs on health-tech investments worth $650M in total. Ex Medical Scientist for digital health at Microsoft Israel.",
    photo: "/team/franck-atlan.jpg",
    linkedin: "https://www.linkedin.com/in/docatlan/",
    credentials: ["Clinical surgeon", "Advised Israeli VCs on $650M of health-tech investments", "Ex Medical Scientist, digital health, Microsoft Israel", "Member, The Israeli Society for Health-Tech"],
    record: "Advised Israeli VCs on health-tech investments worth $650M in total.",
  },
  {
    name: "Alejandro Stivelman",
    role: "Partner, Head of Product",
    group: "partners",
    bio: "Product executive, leader and intelligence veteran with an MBA from Tel Aviv University, deep expertise across the Argentine and Israeli tech ecosystems, and a track record of guiding startups from MVP to exit.",
    photo: "/team/alejandro-stivelman.jpg",
    credentials: ["Product executive and intelligence veteran", "Guided startups from MVP to exit", "MBA, Tel Aviv University", "Deep roots in the Argentine and Israeli ecosystems"],
    record: "A track record of guiding startups from MVP to exit across the Argentine and Israeli ecosystems.",
  },
  {
    name: "Matias Dajcz",
    role: "Partner, Head of US & Latin America Investor Relations",
    group: "partners",
    bio: "30+ years in banking, fintech and digital assets across Latin America and the US. Former CFO, CRO and Global VP of OTC at Ripio. Based in Miami.",
    photo: "/team/matias-dajcz.jpg",
    location: "Miami",
    credentials: ["30+ years in banking, fintech and digital assets", "Latin America and the US", "Former CFO, CRO and Global VP of OTC at Ripio", "Based in Miami"],
    record: "30+ years in banking, fintech and digital assets; former CFO, CRO and Global VP of OTC at Ripio.",
  },

  // ───────────────────────────── Advisors
  {
    name: "Hilik Weinstein",
    role: "Chairman of the Advisory Board",
    group: "advisors",
    bio: "Founder of NANA Engineers Ltd. Founding Investor.",
  },
  {
    name: "Ido Almany",
    role: "Advisory Board",
    group: "advisors",
    bio: "CEO of ZOOMD (TSX). Former CEO of American Express Israel.",
    photo: "/team/ido-almany.jpg",
  },
  {
    name: "Javier Shocron",
    role: "Strategic Advisor",
    group: "advisors",
    bio: "Engineer and VC investor. Chairman of the Unit 81 alumni association.",
    photo: "/team/javier-shocron.jpg",
    linkedin: "https://www.linkedin.com/in/javiershocron/",
  },
  {
    name: "Nitzan Weinstein",
    role: "Strategic Advisor",
    group: "advisors",
    bio: "CTO. Builds high-performance solutions for financial institutions.",
  },
  {
    name: "Dan Block",
    role: "Strategic Advisor",
    group: "advisors",
    bio: "Leads Catalytic Investing at Prime Coalition. Ex Goldman Sachs.",
    photo: "/team/dan-block.jpg",
  },
];

/** People in a group, in file order, without hidden entries. */
export const peopleIn = (groupKey: string): Person[] => people.filter((p) => p.group === groupKey && !p.hidden);

/** Groups that have at least one visible person, each with its people. */
export const team = teamGroups
  .map((g) => ({ ...g, people: peopleIn(g.key) }))
  .filter((g) => g.people.length > 0);

/** People shown in the team preview on the public home page. */
export const homeTeam: Person[] = team.filter((g) => g.onHome).flatMap((g) => g.people);
