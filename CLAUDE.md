# Malbec Ventures — working environment

One repo for everything Malbec Ventures runs. First mission: the websites.

## Layout
- `apps/web` — Next.js 16 app (App Router, Tailwind 4, pnpm). Serves both domains:
  - `www.malbec.ventures` → public site, routes in `src/app/(public)`
  - `www.malbec.online` → invite-only LP site (`src/app/lp`) and admin (`src/app/lp/admin`)
  - Host routing lives in `src/proxy.ts`. LP/admin paths must never be served on the public host.
- `apps/web/src/content` — all site copy and data as typed files (site, portfolio, team, legal, lp/*). Edit copy here.
- `packages/brand` — brand tokens and logo assets, for reuse by decks and marketing.
- `supabase/migrations` — database schema and row-level security.
- `docs` — open items and the go-live runbook.
- `shortcuts` — Windows desktop links (`.url`) to the sites, Vercel, GitHub and GoDaddy DNS.

## Rules
- Next.js 16 differs from older versions: read `apps/web/node_modules/next/dist/docs/` before using an API (see `apps/web/AGENTS.md`).
- Public site: no fund terms, no performance, no funding amounts, no offer language. Named pipeline companies are LP-only.
- Public site has four sections only: Home, Portfolio, Team, Contact. No Thesis or Founders pages, no forms (an "Email us" button until the database exists), and no "LP Login" link until the LP site is live on malbec.online.
- `proxy.ts` serves `/lp/*` only on malbec.online and localhost, and `/dd/*` only on localhost; every other host gets a 404.
- LP content files (`src/content/lp`) must only be imported from `src/app/lp` or `src/app/admin`.
- Brand: two looks, one firm. Public site = Estate (cream, wine, gold, Playfair Display). LP site and admin = Gallery (white, Malbec red, navy, Inter Tight), applied by `data-theme="gallery"` in `src/app/lp/layout.tsx`. Use role classes (`bg-page`, `text-heading`, `text-accent`, `bg-chart`), not raw colours, so both looks keep working. Component classes are defined with `@utility` in `globals.css`.
- Team: `apps/web/src/content/team.ts` is the only place to edit. Add, remove, reorder or regroup people in `people`; add a group in `teamGroups`; photos go in `apps/web/public/team/`. The public Team page, home preview and LP Team page all loop over it, so no page code changes are needed.
- Anything marked `TO CONFIRM` in content is a placeholder awaiting Hagai's input; see `docs/open-items.md`.

## Commands (in `apps/web`)
`pnpm dev` · `pnpm build` · `pnpm lint`

## Access rules (do not weaken)
- Every LP page renders through `LpPage` (`components/lp/shell.tsx`) or calls `requireLp()` / `requireAdmin()` itself. `getViewer()` reads cookies first so gated pages are never prerendered.
- `proxy.ts` also requires a session for all `/lp/*` paths except login and link confirmation.
- Reads use the visitor's session (row-level security applies). The service-role client is used only after an explicit check, for writes and for streaming data-room files.
- After changing LP pages, run `pnpm build` and confirm no LP-only text appears in `.next/static` or prerendered HTML.
