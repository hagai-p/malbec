export type Company = {
  slug: string;
  name: string;
  country: "Israel" | "Argentina";
  sector: string;
  logo: string;
  logoWide?: boolean;
  oneLiner: string;
  description: string;
  bridge?: string;
  url: string;
};

/** Public portfolio. Funding amounts are deliberately absent: they live in the LP content only. */
export const companies: Company[] = [
  {
    slug: "replace",
    name: "REplace",
    country: "Israel",
    sector: "Energy & Climate",
    logo: "/portfolio/replace.png",
    logoWide: true,
    oneLiner: "AI-powered site selection for renewable energy and data centers.",
    description:
      "A GIS platform that helps renewable energy and data center developers identify optimal project sites in seconds, tackling the poor site selection behind most failed projects. Backed by Gravity Climate, Techstars and Malbec Ventures.",
    bridge: "An Israeli company powered by Argentine talent.",
    url: "https://www.renewableenergyplace.com",
  },
  {
    slug: "nandi",
    name: "Nandi",
    country: "Israel",
    sector: "Agri-Tech",
    logo: "/portfolio/nandi.jpg",
    oneLiner: "Data-driven herd management for livestock farmers.",
    description:
      "A SaaS platform that gives farmers real-time animal monitoring, AI-powered alerts and actionable insights to improve birth rates, reduce costs and optimize herd performance.",
    bridge: "An Israeli solution to an Argentine problem.",
    url: "https://www.nandi.ag",
  },
  {
    slug: "dtect-vision",
    name: "Dtect Vision",
    country: "Israel",
    sector: "Cybersecurity",
    logo: "/portfolio/dtect.png",
    oneLiner: "Deepfake detection through motion-based biometrics.",
    description:
      "Patented motion-based biometric analysis that protects financial institutions and media from AI-generated fraud, misinformation and identity manipulation. Selected for Google's AI First Accelerator. Malbec Ventures led its bridge round to support early commercial agreements.",
    url: "https://www.dtectvision.ai",
  },
  {
    slug: "motivia",
    name: "Motivia",
    country: "Argentina",
    sector: "Digital Health",
    logo: "/portfolio/motivia.jpeg",
    oneLiner: "Care management for people living with chronic disease.",
    description:
      "An AI-driven app for patients with diabetes, heart failure, COPD and other chronic conditions, combining personalized education, gamified tools and treatment monitoring. Clinical trials showed an 87% reduction in hospital readmissions. Seed round led by Alaya Capital and Sancor Seguros Ventures.",
    url: "https://www.motivia.co",
  },
  {
    slug: "watchit",
    name: "WATCHIT",
    country: "Israel",
    sector: "AI",
    logo: "/portfolio/watchit.png",
    logoWide: true,
    oneLiner: "Collision and grounding prevention for recreational boats.",
    description:
      "Marine AI combined with 4D imaging radar brings automotive-grade driver assistance to the water, delivering timely, prioritized alerts to existing onboard displays. Trusted by leading boat builders including Ferretti Group and Azimut.",
    url: "https://watchit.ai/",
  },
  {
    slug: "bloomx",
    name: "BloomX",
    country: "Israel",
    sector: "Agri-Tech",
    logo: "/portfolio/bloomx.svg",
    logoWide: true,
    oneLiner: "Robotic, AI-driven pollination for blueberries and avocados.",
    description:
      "Controlled pollination that reduces growers' dependence on increasingly unpredictable natural pollinators. Growers using its systems report average yield increases of around 20%. Series A led by the Elah Fund to expand in Latin America and enter the United States.",
    bridge: "Israeli technology scaling across Latin American orchards.",
    url: "https://bloomx.ag/",
  },
  {
    slug: "zula",
    name: "ZULA Cybersecurity",
    country: "Argentina",
    sector: "Cybersecurity",
    logo: "/portfolio/zula.png",
    oneLiner: "Reducing human risk in cybersecurity.",
    description:
      "A platform that helps companies and governments train, measure and reduce employee risk through realistic cyberattack simulations and security awareness programs.",
    url: "https://zula.lat/",
  },
];

export const coInvestors = [
  "Tech Angels", "10D", "Gravity Climate", "Alaya Capital", "TAU Ventures", "Techstars",
  "Sancor Seguros Ventures", "BAMCAP VC", "Streem VC", "Crescendo", "Don't Quit Ventures",
];

export const collaborators = [
  "Google for Startups",
  "IDB – Inter-American Development Bank",
  "Israel–Latin America Chamber of Commerce",
  "ARCAP – Argentine Association of Private Equity, Venture and Seed Capital",
  "INTA – National Institute of Agricultural Technology",
  "AMIT – Unit 81 Association",
  "Dolphin – S7 Submariners Association",
  "Migdalor – Naval Academy Association",
  "7Founders – S7 Entrepreneurs Community",
  "Latil.io",
  "IBI Capital",
  "Alto",
];
