# Runbook — taking the sites live

## What is live (public site)

- Code: GitHub `hagai-p/malbec`, branch `main`. Every push to `main` deploys automatically.
- Hosting: Vercel project `malbec-web` in the team "hagai-5042's projects", root directory `apps/web`, no environment variables.
- Domains attached in Vercel: `www.malbec.ventures` and `malbec.ventures` (redirects to www).
- DNS is at GoDaddy. Records for the website:

  | Record | Name | Vercel value | Previous (Base44) value |
  |---|---|---|---|
  | A | `@` | `216.150.1.1` | `216.24.57.1` |
  | CNAME | `www` | `f236ed7147b57885.vercel-dns-016.com` | `base44.onrender.com` |

  To roll back to the Base44 site, restore the previous values. Never touch the MX record (`smtp.google.com`) or TXT records: they carry the `@malbec.ventures` email.
- The `.vercel.app` addresses ask for a Vercel login (Vercel's default protection); the custom domain is public.
- LP pages (`/lp/*`) and the founder DD questionnaire (`/dd/*`) return 404 on these addresses by design.

The sections below describe what is still needed for the LP site on `www.malbec.online`.

## 1. Database (Supabase)
1. Create a project (suggested name `malbec`, region eu-central-1).
2. Apply `supabase/migrations/20261114000000_initial_schema.sql`.
3. Authentication settings: turn **off** "Allow new users to sign up". Add `https://www.malbec.online/**` to the redirect allow-list.
4. Create the first admin: add a user for Hagai's email in Authentication → Users, then run
   `insert into public.profiles (id, email, full_name, role, status) select id, email, 'Hagai Platin', 'admin', 'active' from auth.users where email = '<email>';`
5. Run the security advisor and confirm it is clean.

## 2. Email (Resend)
Verify the `malbec.ventures` sending domain and create an API key. Invitations, sign-in links, DD links and admin notifications all go through it, signed by Hagai.

## 3. Hosting (Vercel)
1. New project from the GitHub repo, root directory `apps/web`.
2. Environment variables: see `apps/web/.env.example`.
3. Domains: add `www.malbec.ventures` (+ apex redirect) and `www.malbec.online` (+ apex redirect) to the same project. `src/proxy.ts` decides which site each host gets.
4. Review on the preview URL first: there, the public site is at `/` and the LP site at `/lp`.

## 4. Before pointing the domains
- Fill the placeholders in `docs/open-items.md`.
- Final legal wording in `apps/web/src/content/legal.ts` and `content/lp/fund.ts` (confidentiality terms).
- Upload data-room documents in `/lp/admin/documents`.
- Send yourself an invitation and walk the whole LP flow.

## Local development
`cd apps/web && pnpm dev`. To see the LP site without a database: `LP_PREVIEW=1 pnpm dev` (works only in dev).
Without a database, `/dd/preview-anything-20-chars-long` shows the DD questionnaire.
