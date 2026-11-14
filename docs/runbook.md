# Runbook — taking the sites live

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
