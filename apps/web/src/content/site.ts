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

/** Public market figures (2024), as used in the investor deck. */
export const bridgeStats = [
  { value: "$12B", label: "invested in Israeli startups in 2024", side: "Israel" },
  { value: "13.8", label: "unicorns per million residents, the highest in the world", side: "Israel" },
  { value: "150K", label: "software developers, with the best English in Latin America", side: "Argentina" },
  { value: "<1%", label: "of Israel's 500+ venture funds invest in Latin America", side: "The gap" },
] as const;

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
