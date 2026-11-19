# Open items (awaiting Hagai)

- Terms per vehicle: fee, carry, minimum commitment, closing dates for Malbec POC and Malbec 1.
- Team roster changes (current list in `apps/web/src/content/team.ts`), team photos.
- Investment committee members.
- Data-room document list.
- Legal wording: privacy, terms, disclaimer, LP confidentiality terms (drafts in `content/legal.ts`).
- Logo source files (vector). Current mark is extracted from a PNG.
- Fact corrected from the old site: Technisys was acquired by SoFi (not Visa). Confirm wording on the thesis page.

## Added with the LP site revision (Nov 2026)

- Featured cases (REplace, Dtect Vision, Motivia): entry valuation or round, Malbec's cheque, progress since entry. Confirm these are the three to feature.
- POC scoreboard: capital deployed, up-rounds, write-offs.
- Bridge grouping of BloomX (set as "Israeli deep tech for Latin American customers") and ZULA (set as "Argentine startup"): confirm.
- Malbec 1 deployment plan: initial vs follow-on by year, reserve ratio.
- Terms per vehicle now also need: investment period, fund term, drawdown notice, set-up costs.
- One LP quote and one founder quote, with permission to name them.
- "Why us" text on the LP Team page is a draft from the "VC as an Export?" talk: approve or rewrite.
- Co-investment figures to date.
- "Important information" page (LP site): draft disclaimer, to be finalised by counsel.
- Press sources for the "smart money" signals (Thiel, Stargate Argentina, RIGI, ASHRA line) to be listed before launch.
- Globant and Technisys rows in "Who buys": confirm wording.

Sources for content: "ARG VC Ecosystem as an Export Story" (ASHRA, 18.8.26) and "The Argentine Tech Opportunity" (Ambassador's residence, Aug 2026), both in Gmail. Structure borrowed from the E44, iAngels and Breeze decks; none of their figures or wording is used.

## Design (decided Nov 2026)

- Public site: Estate (cream, wine, gold, Playfair Display). LP site and admin: Gallery (white, Malbec red, navy, Inter Tight). Set in `apps/web/src/app/globals.css`; the LP look is applied in `src/app/lp/layout.tsx`.
- Hero image: oranges painted into the Tel Aviv side and the grapes deepened on the Buenos Aires side by `packages/brand/scripts/make-hero.py`. The original is `packages/brand/assets/hero.png`. This is an edited image, not a new photograph; if a true photograph is wanted, generate one with: "Golden-hour panorama, orange grove heavy with fruit in the left foreground below the Tel Aviv shoreline and skyline, Malbec vineyard with dark purple grape clusters in the right foreground below the Buenos Aires skyline with the Obelisk and colourful La Boca houses, a dirt path between them leading to the horizon, dramatic purple and orange sunset sky, photorealistic, 16:9" and replace `apps/web/public/brand/hero-orange-grape.jpg`.
