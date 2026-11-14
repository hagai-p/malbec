# Malbec Ventures — working environment

One repo for everything Malbec Ventures runs. First mission: the websites.

## Layout
- `apps/web` — Next.js 16 app (App Router, Tailwind 4, pnpm). Serves both domains:
  - `www.malbec.ventures` → public site, routes in `src/app/(public)`
  - `www.malbec.online` → invite-only LP site (`src/app/lp`) and admin (`src/app/admin`)
  - Host routing lives in `src/proxy.ts`. LP/admin paths must never be served on the public host.
- `apps/web/src/content` — all site copy and data as typed files (site, portfolio, team, legal, lp/*). Edit copy here.
- `packages/brand` — brand tokens and logo assets, for reuse by decks and marketing.
- `supabase/migrations` — database schema and row-level security.
- `docs` — decisions and open items.

## Rules
- Next.js 16 differs from older versions: read `apps/web/node_modules/next/dist/docs/` before using an API (see `apps/web/AGENTS.md`).
- Public site: no fund terms, no performance, no funding amounts, no offer language. Named pipeline companies are LP-only.
- LP content files (`src/content/lp`) must only be imported from `src/app/lp` or `src/app/admin`.
- Brand: burgundy + gold, Playfair Display headings, Inter body. Tailwind component classes are defined with `@utility` in `globals.css`.
- Anything marked `TO CONFIRM` in content is a placeholder awaiting Hagai's input; see `docs/open-items.md`.

## Commands (in `apps/web`)
`pnpm dev` · `pnpm build` · `pnpm lint`
