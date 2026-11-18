/**
 * LP-ONLY CONTENT. Import only from src/app/lp.
 * TBC marks figures awaiting confirmation from Hagai (see docs/open-items.md).
 */
export const TBC = "To be confirmed";

export const lpNav = [
  { href: "/lp", label: "Welcome" },
  { href: "/lp/opportunity", label: "Opportunity" },
  { href: "/lp/strategy", label: "Strategy" },
  { href: "/lp/path", label: "The path" },
  { href: "/lp/portfolio", label: "Portfolio & pipeline" },
  { href: "/lp/track-record", label: "Track record" },
  { href: "/lp/team", label: "Team & governance" },
  { href: "/lp/terms", label: "Terms" },
  { href: "/lp/for-lps", label: "For LPs" },
  { href: "/lp/data-room", label: "Data room" },
  { href: "/lp/updates", label: "Updates" },
  { href: "/lp/next-steps", label: "FAQ & next steps" },
  { href: "/lp/important-information", label: "Important information" },
] as const;

export const snapshot = [
  { label: "Strategy", value: "Early-stage, cross-border", note: "Israel 75% · Argentina 25%" },
  { label: "Stage", value: "Pre-seed to Series A", note: "Data-driven B2B" },
  { label: "First cheque", value: "Up to $250K · $500K", note: "POC · Malbec 1 (follow-on up to $3M)" },
  { label: "Portfolio", value: "20–30 companies", note: "Per fund" },
];

export const vehicles = [
  {
    key: "poc",
    name: "Malbec POC",
    size: "$5M",
    status: "Open",
    open: true,
    summary: "The proof of concept. A concentrated first portfolio that shows the cross-border thesis working with real companies and real co-investors.",
    proves: "Proprietary deal flow in both countries, the ability to lead and co-invest, and early mark-ups.",
    terms: [
      { label: "Size", value: "$5M" },
      { label: "Initial closing", value: "$1M" },
      { label: "First cheque", value: "Up to $250K" },
      { label: "Management fee", value: TBC },
      { label: "Carried interest", value: TBC },
      { label: "Minimum commitment", value: TBC },
      { label: "Investment period", value: TBC },
      { label: "Fund term", value: TBC },
      { label: "Drawdowns", value: TBC },
      { label: "Set-up costs", value: TBC },
      { label: "Closing timeline", value: TBC },
    ],
  },
  {
    key: "malbec-1",
    name: "Malbec 1",
    size: "$25M",
    status: "Open",
    open: true,
    summary: "The first institutional fund: 20–30 companies from pre-seed to Series A, with reserves to follow the winners.",
    proves: "The model at fund scale, with a full reserve strategy and institutional reporting.",
    terms: [
      { label: "Target size", value: "$25M" },
      { label: "First closing", value: TBC },
      { label: "First cheque", value: "Up to $500K" },
      { label: "Follow-on", value: "Up to $3M per company" },
      { label: "Management fee", value: TBC },
      { label: "Carried interest", value: TBC },
      { label: "Minimum commitment", value: TBC },
      { label: "Investment period", value: TBC },
      { label: "Fund term", value: TBC },
      { label: "Drawdowns", value: TBC },
      { label: "Set-up costs", value: TBC },
      { label: "Closing timeline", value: TBC },
    ],
  },
  {
    key: "malbec-2",
    name: "Malbec 2",
    size: "$50M",
    status: "Future",
    open: false,
    summary: "The successor fund, extending the corridor across Latin America with a larger cheque and deeper reserves.",
    proves: "Malbec as the standing bridge between Israel and Latin America.",
    terms: [{ label: "Target size", value: "$50M" }],
  },
];

export const structure = [
  { name: "Limited partners", note: "Global and Israeli investors" },
  { name: "Malbec Ventures LP", note: "The fund (Cayman)" },
  { name: "Malbec Ventures GP", note: "General partner (Israel)" },
  { name: "Malbec Ventures Management Ltd", note: "Management company (Israel)" },
  { name: "Trustee", note: "IBI Capital, holding warehoused investments" },
];

export const whyNow = [
  { title: "Argentina is opening", body: "Monthly inflation down from 25.5% to about 2.9%. Fiscal balance from a 4.6% deficit to a 0.2% surplus, the first since 2010. Country risk compressed by 77%." },
  { title: "Israel is rebuilding", body: "Seed valuations are attractive after the war, while exits keep coming: 118 deals worth $17B in 2024." },
  { title: "Exits are real on both sides", body: "Argentina recorded 99 deals worth $8B in 2024, a seven-year high. Auth0 sold to Okta for $6.5B; Technisys to SoFi for about $1B; Ualá is valued at $3.2B." },
  { title: "Nobody else is here", body: "More than 800 funds and investment entities operate in Israel; Argentina has about 20 active venture funds. In Israel you outbid hundreds of funds for a seed allocation. In Argentina it is different." },
];

/** Paired comparisons; `scale` is each side's share of the larger value, for bar length. */
export const comparisons = [
  { metric: "Venture capital invested, 2024", israel: { text: "$12B", scale: 1 }, argentina: { text: "$420M", scale: 0.035 } },
  { metric: "Invested per capita", israel: { text: "$1,245", scale: 1 }, argentina: { text: "< $9", scale: 0.007 } },
  { metric: "Unicorns per million residents", israel: { text: "13.76", scale: 1 }, argentina: { text: "0.28", scale: 0.02 } },
  { metric: "Average seed round", israel: { text: "~$8M", scale: 1 }, argentina: { text: "~$3M", scale: 0.375 } },
  { metric: "Exit value, 2024", israel: { text: "$17B", scale: 1 }, argentina: { text: "$8B", scale: 0.47 } },
  { metric: "Funds and active investment entities", israel: { text: "800+", scale: 1 }, argentina: { text: "~20", scale: 0.025 } },
];

export const edge = [
  { title: "Proprietary deal flow in two countries", body: "Government innovation agencies, universities, local funds, angel networks and service providers in Tel Aviv and Buenos Aires, plus IDF alumni networks (Navy, Air Force, 8200, 81, Talpiot)." },
  { title: "The Israeli playbook", body: "Thirty-five years of collective experience taking startups from a garage to M&A and IPO, applied from the first cheque." },
  { title: "Capital efficiency", body: "Argentine engineering at 50–55% below US cost extends runway and reduces dilution, so each dollar buys more company." },
  { title: "Entry before the crowd", body: "We invest early, at valuations set before these companies appear on the radar of larger funds." },
];

export const process = [
  "Sourcing and screening",
  "First meeting with founders",
  "Review by the advisory board",
  "Business and technology due diligence",
  "Weighing strengths and weaknesses",
  "Investment committee decision",
];

export const construction = [
  { label: "Companies per fund", value: "20–30" },
  { label: "Geographic split", value: "75% Israel · 25% Argentina" },
  { label: "First cheque", value: "POC up to $250K · Malbec 1 up to $500K" },
  { label: "Follow-on", value: "Up to $3M per company (Malbec 1)" },
  { label: "Reserves", value: TBC },
  { label: "Approach", value: "Co-invest with reputable funds; lead when it matters" },
];

export const lpPortfolio = [
  { name: "REplace", country: "Israel", sector: "Energy & Climate", round: "$2.1M raised", coInvestors: "Gravity Climate, Techstars", role: "Investor", note: "AI-powered GIS for siting renewable energy and data centers. Israeli company with an Argentine engineering team." },
  { name: "Nandi", country: "Israel", sector: "Agri-Tech", round: "$1.5M raised", coInvestors: TBC, role: "Investor", note: "Herd-management SaaS. Israeli technology aimed squarely at Argentina's cattle industry." },
  { name: "Dtect Vision", country: "Israel", sector: "Cybersecurity", round: "$300K bridge · $5.4M raised in total", coInvestors: TBC, role: "Led the bridge round", note: "Patented deepfake detection for financial institutions. Selected for Google's AI First Accelerator." },
  { name: "Motivia", country: "Argentina", sector: "Digital Health", round: "$1.2M seed", coInvestors: "Alaya Capital, Sancor Seguros Ventures", role: "Investor", note: "Chronic-care management app; clinical trials showed 87% fewer hospital readmissions." },
  { name: "WATCHIT", country: "Israel", sector: "AI", round: "$6M raised", coInvestors: TBC, role: "Investor", note: "Collision prevention for boats, with Ferretti Group and Azimut as customers." },
  { name: "BloomX", country: "Israel", sector: "Agri-Tech", round: "$13M Series A · $20M raised in total", coInvestors: "Elah Fund (lead)", role: "Investor", note: "Robotic pollination; expanding in Latin America and entering the US." },
  { name: "ZULA Cybersecurity", country: "Argentina", sector: "Cybersecurity", round: "$300K raised", coInvestors: TBC, role: "Investor", note: "Human-risk reduction through attack simulation and awareness training." },
];

export const pipeline = [
  "Propin", "Satellites on Fire", "Drift Sense", "Biomakers", "Propello", "Better.Charge",
  "Chatty", "Teamcubation", "Kabuta", "Cydome Security", "BiggerPicture.AI", "ProScout",
];

export const trackRecord = [
  { value: "7", label: "portfolio companies" },
  { value: "250+", label: "startups evaluated" },
  { value: "11", label: "co-investing funds" },
  { value: TBC, label: "capital deployed to date" },
];

export const partnerRecords = [
  { name: "Hagai Platin", record: "Dozens of venture deals as counsel, $450M in total value, from pre-seed to Series E and M&A." },
  { name: "Dr. Franck Atlan", record: "Advised Israeli venture funds on health-tech investments worth $650M in total." },
  { name: "Alejandro Stivelman", record: "Three exits as an operator: Prospera, Zooz and PayU." },
];

export const lpValue = [
  "Access to cross-border deal flow in two underserved, high-potential markets",
  "Diversified exposure across geographies, sectors and currencies",
  "Co-investment opportunities alongside seasoned operators and angels",
  "Active portfolio management with hands-on support",
  "Transparent reporting and direct access to the partners",
];

export const investorBase = {
  intro: "Malbec is backed by industry veterans, private investors and family offices who share the conviction that exceptional talent on both sides of the ocean belongs together.",
  stats: [
    { value: "6", label: "countries" },
    { value: "12+", label: "investors" },
    { value: "> $1M", label: "committed" },
  ],
  countries: ["Israel", "Argentina", "Uruguay", "Mexico", "United States", "United Kingdom"],
  note: "Figures as last published; to be updated.",
};

export const faq = [
  { q: "What exactly can I commit to today?", a: "Two vehicles are open: the $5M Malbec POC and the $25M Malbec 1 fund. You can indicate interest in either or both below; an indication is not binding." },
  { q: "How are investments held before the fund's closing?", a: "Investments made during the warehousing period are held by a trustee, IBI Capital, on behalf of the investors." },
  { q: "How do you split capital between the two countries?", a: "Around 75% in Israeli companies and 25% in Argentine companies. Many sit on both sides: Israeli companies with Argentine teams or markets, and the reverse." },
  { q: "Do you lead rounds?", a: "We co-invest with reputable funds and lead when our involvement makes the difference, as we did with Dtect Vision's bridge round." },
  { q: "What reporting will I receive?", a: "Regular written updates on this site, and direct access to the partners. The reporting calendar will be set out in the fund documents." },
  { q: "Can I co-invest directly in portfolio companies?", a: "Yes. Co-investment alongside the fund is offered to limited partners when allocation allows." },
];

export const interestRanges = ["Up to $100K", "$100K – $250K", "$250K – $500K", "$500K – $1M", "Above $1M", "Not sure yet"];

export const termsVersion = "2026-11-draft";
export const confidentialityTerms = [
  "The materials on this site are confidential and are shared with you personally. Please do not forward, copy or publish them, or share your access with anyone else.",
  "Nothing here is an offer to sell or a solicitation to buy any security. Any offer will be made only through the fund's formal offering documents, which prevail over anything on this site.",
  "The materials include forward-looking statements and targets. They are not guarantees. Investing in early-stage companies involves a high degree of risk, including the loss of your entire investment.",
  "Your activity on this site, including the documents you open, is recorded.",
];
export const investorStatuses = [
  "Accredited investor (United States, Regulation D)",
  "Qualified investor under the Israeli Securities Law",
  "Professional or qualified investor under the laws of my jurisdiction",
  "Institutional investor or family office",
];


/* ------------------------------------------------------------------------------------------
 * Narrative blocks. Figures and wording come from Malbec's own presentations
 * ("VC as an Export?", ASHRA, Aug 2026; "The Argentine Tech Opportunity", Ambassador's residence, Aug 2026).
 * ---------------------------------------------------------------------------------------- */

export const execSummary = [
  { lead: "A >100× gap.", text: "Israel invests $1,245 per person in venture each year. Argentina invests less than $9, with talent of the same calibre." },
  { lead: "The same trade, one generation later.", text: "Venture capital turned Israel from an orange exporter into an $85B high-tech exporter. Argentina stands where Israel once stood." },
  { lead: "The entry price.", text: "Seed rounds price at about $3M in Argentina against about $8M in Israel, with almost no competing term sheets." },
  { lead: "Smart money is already moving.", text: "RIGI, Stargate Argentina, a seven-year high in exits, and Israel's first export-credit line to Argentina in twenty years." },
  { lead: "Seven companies, one bridge.", text: "250+ startups evaluated, seven investments made, alongside funds such as Techstars, Gravity Climate and Alaya Capital." },
];

export const glance = [
  { value: "$5M", label: "Malbec POC", note: "Initial closing $1M · open" },
  { value: "$25M", label: "Malbec 1", note: "Target · open" },
  { value: "Pre-seed → A", label: "Stage", note: "Data-driven B2B" },
  { value: "20–30", label: "Companies per fund", note: "75% Israel · 25% Argentina" },
  { value: "$250K · $500K", label: "First cheque, up to", note: "POC · Malbec 1" },
  { value: "7", label: "Investments so far", note: "250+ startups evaluated" },
];

export const chain = [
  { step: "The orange", number: "75%", text: "of Israel's exports were once citrus. A proud export with a ceiling you could touch." },
  { step: "The flip", number: "58%", text: "of Israel's exports are high-tech today, $85B a year. Yozma (1993) seeded the venture industry that did it." },
  { step: "The grape", number: "1853", text: "the year Malbec arrived from France. Argentina made it the world's benchmark." },
  { step: "The mirror", number: "60 / 10", text: "Argentina today: 60% agriculture, 10% knowledge. Israel two generations ago." },
  { step: "The gap", number: ">100×", text: "per-capita difference in venture financing. The missing piece is not talent." },
];
export const chainSource = "Israel Innovation Authority, State of High-Tech 2026; OECD on Yozma; Argencon 2025; Malbec Ventures analysis.";

export const ecosystem = {
  stats: [
    { value: "12", label: "unicorns, the strongest per-capita record in Latin America" },
    { value: "$141B", label: "combined startup-ecosystem value, #19 in the world" },
    { value: "470+", label: "funded startups, 90% still pre-seed to Series A; ~160 founded each year" },
    { value: "7.1×", label: "ecosystem value growth over the last five years" },
  ],
  source: "Dealroom; Malbec Ventures analysis.",
  takeaway: "Ecosystem value grew 7.1× in five years while entry prices stayed attractive. Ninety percent of the funded market is early-stage: this is an early-stage investor's market by construction.",
};

export const signals = [
  { title: "Peter Thiel moved in, literally", body: "Bought a $12M Buenos Aires residence and relocated his family (May 2026); his fund took a $76M stake in an Argentine energy company.", highlight: true },
  { title: "RIGI and Stargate Argentina", body: "A new legal framework protecting foreign investment in energy, mining and infrastructure, and OpenAI's $25B, 500MW AI data-center project in Patagonia with Sur Energy." },
  { title: "Exits at a seven-year high", body: "99 M&A deals worth $8B in 2024, led by tech. The marquee precedent: Auth0, Argentine-founded, acquired by Okta for $6.5B." },
  { title: "Israel is opening the lane", body: "ASHRA's new $150M state-backed credit-insurance line to Argentina, the first in twenty years, reopens trade and de-risks the corridor." },
];
export const signalsSource = "As presented in “The Argentine Tech Opportunity”, August 2026. Press sources to be listed.";

export const gap = {
  israel: [
    { value: "$12B+", label: "invested in startups every year; $15.6B in 2025" },
    { value: "800+", label: "funds and active investment entities" },
    { value: "$1,245", label: "of venture investment per capita (2024)" },
  ],
  argentina: [
    { value: "~$400M", label: "invested in startups per year" },
    { value: "~20", label: "active venture funds" },
    { value: "<$9", label: "of venture investment per capita (2024)" },
  ],
  line: "A >100× per-capita financing gap is the opportunity.",
  body: "World-class founders, $9.6B of knowledge exports already flowing, twelve unicorns, and almost no competing capital at the early stage.",
  source: "Israel Innovation Authority; Argencon; Malbec Ventures analysis.",
};

export const acquirers = [
  { company: "Auth0", buyer: "Okta", value: "$6.5B", note: "Argentine-founded identity platform, 2021" },
  { company: "Technisys", buyer: "SoFi", value: "~$1B", note: "Argentine-founded core banking, 2022" },
  { company: "MercadoLibre", buyer: "NASDAQ-listed", value: "~$98B", note: "Latin America's most valuable company" },
  { company: "Globant", buyer: "NYSE-listed", value: "IPO 2014", note: "Born in Buenos Aires; listed in 2014" },
];

export const alphaLevers = [
  { n: "01", title: "Enter cheaper", number: "~$3M", text: "average seed entry in Argentina, against ~$8M in Israel and $12M+ in the United States." },
  { n: "02", title: "Build for less", number: "50–55%", text: "below US engineering cost, so milestones arrive on less capital and with less dilution." },
  { n: "03", title: "Two markets from day one", number: "2", text: "ecosystems behind every company: Israeli technology and playbook, Argentine talent and customers." },
  { n: "04", title: "Pick the few", number: "7 of 250+", text: "startups evaluated received our cheque." },
  { n: "05", title: "Exit where multiples are highest", number: "$8B", text: "of Argentine M&A in 2024, a seven-year high." },
];

export const contrast = {
  others: "Two distant markets, a currency with a past, and nobody to call on the ground.",
  we: "One corridor: the same trade Israeli investors already watched work, one generation later, at the entry price.",
};

export const whyThroughMalbec = [
  { title: "Access", text: "The Israel–LATAM bridge is our core thesis, not a side pocket." },
  { title: "Selection", text: "250+ startups evaluated, seven chosen." },
  { title: "Geography", text: "An Israeli VC with boots on the ground in both regions." },
  { title: "Management", text: "Sourced, diligenced, and managed through follow-on." },
];

export const vehiclePillars = [
  { title: "Cross-border, early-stage VC", text: "We invest in founders from Israel and Latin America, with a focus on Argentina, from pre-seed to Series A." },
  { title: "Israeli playbook, Argentine execution, global markets", text: "Thirty-five years of taking startups from garage to M&A and IPO, applied to Argentina's world-class, cost-efficient talent." },
  { title: "B2B software with unique data", text: "Products for the traditional industries both countries know deeply: agriculture, energy and climate, cyber, fintech, digital health." },
  { title: "On the ground in both ecosystems", text: "Proprietary deal flow from Tel Aviv and Buenos Aires: deals most funds never see." },
];

export const sourcingNetwork = [
  "Government innovation agencies", "Universities & tech-transfer", "IDF alumni: Navy, 8200, 81, Talpiot", "ARCAP & local funds",
  "Angel networks", "Our LP network", "INTA & CONICET hubs", "Embassies & chambers", "Portfolio founders",
];

export const processTimeline = [
  { title: "Sourcing", text: "Both ecosystems, through the network above." },
  { title: "First meeting", text: "In person where we can. A fast, honest first read." },
  { title: "Advisory review", text: "Sector experts weigh in before we go deep." },
  { title: "Due diligence", text: "Business and technology, plus our founder questionnaire." },
  { title: "Weighing", text: "Strengths and weaknesses, written down." },
  { title: "Decision", text: "Investment committee. A clear answer, with reasons." },
];

export const deployment = {
  note: "Illustrative layout. The plan for Malbec 1 (initial vs follow-on by year, reserve ratio) is to be confirmed.",
  years: [
    { year: "Year 1", initial: null, followOn: null },
    { year: "Year 2", initial: null, followOn: null },
    { year: "Year 3", initial: null, followOn: null },
    { year: "Year 4", initial: null, followOn: null },
    { year: "Year 5", initial: null, followOn: null },
  ] as { year: string; initial: number | null; followOn: number | null }[],
};

export const afterTheCheque = [
  "Financing strategy and round structuring",
  "The road to product-market fit",
  "Go-to-market in the other hemisphere",
  "Customer and design-partner introductions",
  "Hiring engineers in Argentina",
  "Co-investor and follow-on introductions",
  "Legal and deal structuring, in-house",
  "A founder network across both countries",
];

export const featuredCases = [
  { name: "REplace", tag: "Israeli company, Argentine engineering", story: "AI-powered GIS for siting renewable-energy and data-center projects. Built in part by an Argentine team; backed alongside Gravity Climate and Techstars.", facts: [["Entry", TBC], ["Malbec's cheque", TBC], ["Since entry", "$2.1M raised"]] },
  { name: "Dtect Vision", tag: "We led", story: "Patented deepfake detection for financial institutions, selected for Google's AI First Accelerator. Malbec led the bridge round that funded its first commercial agreements.", facts: [["Entry", "$300K bridge, led by Malbec"], ["Malbec's cheque", TBC], ["Since entry", TBC]] },
  { name: "Motivia", tag: "Argentine founders", story: "Chronic-care management with an 87% reduction in hospital readmissions in clinical trials. Seed led by Alaya Capital and Sancor Seguros Ventures.", facts: [["Entry", "$1.2M seed"], ["Malbec's cheque", TBC], ["Since entry", TBC]] },
] as { name: string; tag: string; story: string; facts: [string, string][] }[];

export const scoreboard = [
  { value: "7", label: "investments" },
  { value: "250+", label: "startups evaluated" },
  { value: "11", label: "co-investing funds" },
  { value: TBC, label: "up-rounds" },
  { value: TBC, label: "write-offs" },
  { value: TBC, label: "capital deployed" },
];

export const quotes = {
  lp: { text: TBC, who: "An existing limited partner", pending: true },
  founder: { text: TBC, who: "A portfolio founder", pending: true },
};

export const founderStory = [
  "In November 2025 I joined an economic delegation to Argentina and Paraguay, and came home with a question: Israel knows how to export technology. Can it export the thing that made the technology possible?",
  "For thirty-five years Israeli investors have watched, or funded, their country's transformation. I spent a good part of that time inside the deals: dozens of venture transactions, from pre-seed to M&A. Argentina has the talent Israel had. What it lacks is the financing industry Israel learned how to build.",
  "Malbec Ventures is that export. Imported knowledge, local execution, global ambition. Like the grape.",
];

export const importantInformation = [
  { heading: "Not an offer", body: ["The materials on this site are provided for information and discussion only. They do not constitute an offer to sell, or a solicitation of an offer to buy, any security or any interest in any fund or vehicle managed or advised by Malbec Ventures. Any offer will be made only by means of the definitive fund documents, and only to persons to whom it may lawfully be made."] },
  { heading: "Fund documents prevail", body: ["The terms and structure described here are a summary, are subject to change, and are qualified in their entirety by the limited partnership agreement and subscription documents of the relevant vehicle. Only those documents bind the investors and the general partner."] },
  { heading: "Israeli Securities Law", body: ["Any proposal to invest may be made in reliance on an exemption under the Israeli Securities Law, 5728-1968. The investment has not been approved by the Israel Securities Authority or any other governmental authority, and is not regulated under the Joint Investment Trust Law, 5754-1994."] },
  { heading: "Other jurisdictions", body: ["These materials are not directed at any person in any jurisdiction where, by reason of that person's nationality, residence or otherwise, their publication or availability is prohibited. Interests have not been registered under the US Securities Act of 1933 or the securities laws of any other jurisdiction."] },
  { heading: "Risk", body: ["Investing in early-stage companies is high-risk and illiquid, and may result in the loss of the entire amount invested. You should invest only if you are a sophisticated or accredited investor able to bear that loss.", "Past performance is not a guide to future performance. Valuations of unrealised investments are estimates and may not be achieved."] },
  { heading: "Forward-looking statements and third-party data", body: ["These materials contain targets, projections and other forward-looking statements based on assumptions that may prove wrong; actual results may differ materially.", "Market data come from third-party sources believed to be reliable, but no representation is made as to their accuracy or completeness."] },
  { heading: "No advice", body: ["Nothing here is legal, tax, accounting or investment advice. Please consult your own advisers before making any investment decision."] },
  { heading: "Confidentiality", body: ["These materials are strictly confidential and were made available to you personally. By using this site you agree not to copy, forward or disclose them without the prior written consent of Malbec Ventures. Your activity on this site is recorded."] },
];
