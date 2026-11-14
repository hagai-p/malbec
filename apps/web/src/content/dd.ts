export type DdField = { key: string; label: string; hint?: string; rows?: number; maxLength?: number; short?: boolean; type?: string };
export type DdStep = { title: string; intro: string; fields: DdField[] };

/** The Malbec Ventures founder due-diligence questionnaire (same 18 questions as the original app). */
export const ddSteps: DdStep[] = [
  {
    title: "The company",
    intro: "The basics, and your pitch in a sentence.",
    fields: [
      { key: "company_name", label: "Company name", short: true },
      { key: "founder_name", label: "Primary founder", short: true },
      { key: "founder_email", label: "Founder email", short: true, type: "email" },
      { key: "short_pitch", label: "One-line pitch", hint: "280 characters at most.", rows: 3, maxLength: 280 },
      { key: "key_metrics", label: "Key metrics", hint: "Revenue, users, growth rate, burn, runway, CAC, LTV: whatever you track.", rows: 5 },
    ],
  },
  {
    title: "Product & technology",
    intro: "What you've built and why it's hard to copy.",
    fields: [
      { key: "product_description", label: "Product and core features", rows: 6 },
      { key: "technology_moat", label: "Technology moat or IP", rows: 5 },
    ],
  },
  {
    title: "Market",
    intro: "Who buys, how big it is, and how you reach them.",
    fields: [
      { key: "target_market", label: "Target market", rows: 4 },
      { key: "market_size_icp", label: "Market size and ideal customer profile", rows: 5 },
      { key: "gtm_strategy", label: "Go-to-market strategy", rows: 5 },
    ],
  },
  {
    title: "Competition",
    intro: "Who else is out there, and why you win.",
    fields: [
      { key: "main_competitors", label: "Main competitors", rows: 4 },
      { key: "differentiation", label: "How you're different", rows: 5 },
    ],
  },
  {
    title: "Financials & the round",
    intro: "Where you stand and what you're raising.",
    fields: [
      { key: "current_financials", label: "Current financials and cap table summary", rows: 6 },
      { key: "fundraising_details", label: "Current raise", hint: "Amount and instrument (SAFE, equity, convertible).", rows: 4 },
      { key: "fund_usage", label: "Use of funds", rows: 4 },
    ],
  },
  {
    title: "Team, risks & the bridge",
    intro: "The people, what could go wrong, and where Israel and Latin America meet.",
    fields: [
      { key: "team_members", label: "Key team members and backgrounds", rows: 6 },
      { key: "top_risks", label: "Top one to three business risks", rows: 5 },
      { key: "israel_latam_connection", label: "Israel–Latin America connection", hint: "How could the two ecosystems help your company: talent, customers, partners, capital?", rows: 5 },
    ],
  },
];

export const ddKeys = ddSteps.flatMap((s) => s.fields.map((f) => f.key));
export const ddRequired = ["company_name", "founder_name", "founder_email", "short_pitch"];
