export const site = {
  name: "Malbec Ventures",
  publicUrl: "https://www.malbec.ventures",
  lpUrl: "https://www.malbec.online",
  headline: ["Great ventures start", "with a glass of Malbec."],
  positioning: "The first and only Israel–LATAM cross-border VC.",
  intro:
    "We are an early-stage venture fund bridging the innovation ecosystems of Israel and Latin America. We back exceptional founders in Tel Aviv and Buenos Aires and help them scale globally.",
  introSecondary:
    "Our limited partners are seasoned founders, operators and tech investors who built great companies across both continents. They bring capital, connections and conviction.",
  footerLine: "We invest in resilient founders who make an impact.",
  email: "hagai@malbec.ventures",
  phone: "+972-52-540-2730",
  linkedin: "https://www.linkedin.com/company/malbec-ventures",
  cities: ["Tel Aviv", "Buenos Aires"],
  year: 2026,
} as const;

export const nav = [
  { href: "/thesis", label: "Thesis" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/team", label: "Team" },
  { href: "/founders", label: "Founders" },
  { href: "/contact", label: "Contact" },
] as const;

export const pillars = [
  {
    numeral: "I",
    title: "Timing",
    body: "Geopolitical change and a new wave of technology are redrawing the map. Argentina is opening up; Israel is rebuilding at attractive valuations. Both reward investors who arrive early.",
  },
  {
    numeral: "II",
    title: "The best of both worlds",
    body: "Israel's playbook for taking a startup from garage to global, joined with Argentina's deep, cost-efficient talent and fast-growing markets.",
  },
  {
    numeral: "III",
    title: "Seed to global scale",
    body: "We invest from pre-seed to Series A and stay close: financing strategy, first customers, and introductions across two continents and the United States.",
  },
] as const;

/** Public market figures, as presented in Malbec's "VC as an Export?" and Embassy decks (Aug 2026). */
export const bridgeStats = [
  { value: ">100×", label: "gap in venture investment per person between Israel and Argentina", side: "The gap" },
  { value: "$85B", label: "of high-tech exports a year, 58% of everything Israel sells abroad", side: "Israel" },
  { value: "162K", label: "software professionals, with the best English in Latin America", side: "Argentina" },
  { value: "12", label: "unicorns, the strongest per-capita record in Latin America", side: "Argentina" },
] as const;

export const story = {
  brands: [
    { name: "Jaffa oranges", line: "Israel's face to the world, once 75% of its exports." },
    { name: "Malbec grapes", line: "Argentina's face to the world, 60% of its wine exports." },
  ],
  brandsLine: "Both born from soil and craft. Both conquered the world. Both are grown by great talent.",
  nameYear: "1853",
  nameYearLabel: "the year Malbec arrived from France",
  name: "A French grape that struggled at home. Argentine soil, altitude and craft made it the world's benchmark.",
  nameLine: "Argentina takes imported knowledge and makes it world-class.",
  close: "Malbec exports the Israeli VC playbook.",
} as const;

/** Share of exports (%), the "mirror" chart. */
export const mirror = {
  bars: [
    { label: "Israel · 1950s", agriculture: 75, tech: 0 },
    { label: "Israel · 2025", agriculture: 2, tech: 58 },
    { label: "Argentina · 2025", agriculture: 60, tech: 10, question: true },
  ],
  points: [
    { title: "Israel flipped this chart in one generation", text: "From oranges at 75% of exports to high-tech at 58%, $85B a year, powered by the venture capital industry born with the Yozma programme in 1993." },
    { title: "Argentina is at the tipping point today", text: "Agriculture still leads at about 60% of exports, but knowledge services hit a record $9.6B in 2025, already the country's third-largest export complex." },
    { title: "Venture capital fuelled the transition", text: "What flipped Israel's chart was not talent. Both countries have it. It was financing." },
  ],
  line: "The catalyst that flips the chart is venture financing.",
  source: "Israel Innovation Authority, State of High-Tech 2026; Argencon 2025; OECD.",
} as const;

export const talent = {
  stats: [
    { value: "162,598", label: "software-industry professionals, an all-time record", source: "CESSI, Q1 2026" },
    { value: "285,000", label: "knowledge-economy jobs; 80% hold university degrees", source: "Argencon" },
    { value: "#1", label: "English proficiency in Latin America, year after year", source: "EF EPI" },
    { value: "$2.85B", label: "record software exports, 49% sold to the United States", source: "CESSI" },
  ],
  engine: [
    { title: "2M+ students", text: "Over two million university students nationwide. The University of Buenos Aires alone has 105,000+, and ranks in the world's top 100." },
    { title: "Tuition-free, by law", text: "Public universities have been free since 1949, open to every talented student regardless of means." },
    { title: "Five Nobel laureates", text: "Four of them studied at UBA, a record unmatched in Latin America." },
    { title: "Innovation hubs beyond the capital", text: "Córdoba, Mendoza, Rosario and Santa Fe all host meaningful hubs, with INTA and CONICET behind them." },
  ],
  proof: ["MercadoLibre", "Globant", "Auth0", "Vercel", "Mural", "Satellogic"],
  line: "Talent is not the bottleneck. Access to capital is.",
} as const;

export const sectors = {
  core: [
    { name: "Energy & Climate", note: "Siting, grids, storage and the software that runs them." },
    { name: "Agri-Tech", note: "Data and robotics for the farms that feed the world." },
    { name: "Fintech", note: "Infrastructure, risk and trust for digital finance." },
    { name: "Digital Health", note: "Care management and clinical tools that change outcomes." },
  ],
  opportunistic: ["Cybersecurity", "AI"],
  model: "Data-driven B2B",
  stage: "Pre-seed to Series A",
} as const;

export const backedBy = {
  line: "Backed by founders, operators, family offices and tech investors across six countries.",
  countries: [
    { name: "Israel", code: "il" },
    { name: "Argentina", code: "ar" },
    { name: "Uruguay", code: "uy" },
    { name: "Mexico", code: "mx" },
    { name: "United States", code: "us" },
    { name: "United Kingdom", code: "gb" },
  ],
} as const;

export const founderValue = [
  { title: "A bridge, not just a cheque", body: "Deep local networks in both Israel and Argentina: customers, design partners, talent and co-investors on either side of the ocean." },
  { title: "Hands-on from day one", body: "Real-world feedback, round structuring, the road to product-market fit, and scaling guidance from people who have done it." },
  { title: "A curated circle", body: "Introductions to co-investors, advisors and industry experts who open doors rather than fill calendars." },
  { title: "Go global early", body: "Strategic support for expansion and go-to-market in new geographies, built into the plan from the first conversation." },
] as const;

export const founderProcess = [
  { step: "01", title: "Tell us what you're building", body: "A short note is enough. No deck theatre." },
  { step: "02", title: "A conversation", body: "We meet, ideally in person, and get to know you and the problem." },
  { step: "03", title: "Due diligence", body: "If there's a fit, we send a personal link to our DD questionnaire and dig in together." },
  { step: "04", title: "Decision", body: "A clear answer from our investment committee, and the reasons behind it." },
] as const;
