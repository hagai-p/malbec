export type Person = {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  photo?: string;
};

/**
 * TO CONFIRM (Hagai): roster needs changes; specifics pending.
 * Photos pending: initials are shown until files are added to /public/team.
 */
export const partners: Person[] = [
  {
    name: "Hagai Platin",
    role: "Founder & Managing Partner",
    bio: "Tech and startups lawyer who has executed dozens of venture deals worth $450M in total, from pre-seed to Series E and M&A. Former operator and project manager; former Chief Engineer in the Israeli Navy.",
    linkedin: "https://www.linkedin.com/in/hagai-platin-57620225/",
  },
  {
    name: "Dr. Franck Atlan",
    role: "Partner, Head of Malbec Health",
    bio: "Clinical surgeon and member of the Israeli Society for Health-Tech. Has advised Israeli venture funds on health-tech investments worth $650M in total. Former medical scientist for digital health at Microsoft Israel.",
    linkedin: "https://www.linkedin.com/in/docatlan/",
  },
  {
    name: "Alejandro Stivelman",
    role: "Partner",
    bio: "Product executive and intelligence veteran with an MBA from Tel Aviv University. Three exits as an operator (Prospera, Zooz and PayU) and deep roots in both the Argentine and Israeli tech ecosystems.",
  },
];

export const advisors: Person[] = [
  {
    name: "Ido Almany",
    role: "Advisor",
    bio: "CEO of Zoomd (TSX-listed) and angel investor. Former CEO of American Express' licensee in Israel and member of the Isracard Group management team through its 2019 IPO.",
  },
  {
    name: "Dan Block",
    role: "Advisor",
    bio: "Impact investor with extensive experience in Latin America. Former investment banker at Goldman Sachs and venture investor at Mercy Corps Ventures.",
  },
];

export const network: Person[] = [
  {
    name: "Prof. Fred Kofman",
    role: "Special Advisor",
    bio: "PhD in Economics from Berkeley and global leadership expert. Former VP of leadership at Google and at LinkedIn.",
    linkedin: "https://www.linkedin.com/in/fkofman/",
  },
  {
    name: "Javier Shocron",
    role: "Consultant",
    bio: "Engineer, venture investor and Chairman of AMIT, the Unit 81 alumni association.",
    linkedin: "https://www.linkedin.com/in/javiershocron/",
  },
];
