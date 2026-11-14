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
] as const;

export const snapshot = [
  { label: "Strategy", value: "Early-stage, cross-border", note: "Israel 75% · Argentina 25%" },
  { label: "Stage", value: "Pre-seed to Series A", note: "Data-driven B2B" },
  { label: "First cheque", value: "Up to $500K", note: "Follow-on up to $3M" },
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
      { label: "Management fee", value: TBC },
      { label: "Carried interest", value: TBC },
      { label: "Minimum commitment", value: TBC },
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
      { label: "Management fee", value: TBC },
      { label: "Carried interest", value: TBC },
      { label: "Minimum commitment", value: TBC },
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
  { title: "Nobody else is here", body: "More than 500 venture funds operate in Israel and fewer than 1% invest in Latin America. Argentina has about 20 active funds in total." },
];

/** Paired comparisons; `scale` is each side's share of the larger value, for bar length. */
export const comparisons = [
  { metric: "Venture capital invested, 2024", israel: { text: "$12B", scale: 1 }, argentina: { text: "$420M", scale: 0.035 } },
  { metric: "Invested per capita", israel: { text: "$1,245", scale: 1 }, argentina: { text: "< $9", scale: 0.007 } },
  { metric: "Unicorns per million residents", israel: { text: "13.76", scale: 1 }, argentina: { text: "0.28", scale: 0.02 } },
  { metric: "Average seed round", israel: { text: "$7M", scale: 1 }, argentina: { text: "$3M", scale: 0.43 } },
  { metric: "Exit value, 2024", israel: { text: "$17B", scale: 1 }, argentina: { text: "$8B", scale: 0.47 } },
  { metric: "Active venture funds", israel: { text: "500+", scale: 1 }, argentina: { text: "~20", scale: 0.04 } },
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
  { label: "First cheque", value: "Up to $500K" },
  { label: "Follow-on", value: "Up to $3M per company" },
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
  { value: "100+", label: "startups reviewed" },
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
