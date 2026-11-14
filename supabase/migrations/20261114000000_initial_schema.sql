-- Malbec Ventures: initial schema
-- Access model: no public sign-up. Admins invite LPs; LPs attest once, then read LP content.
-- Form submissions (contact, pitches, DD) are written by server code with the service role,
-- which bypasses row-level security; no anonymous role can read or write them.

create schema if not exists private;

-- ---------------------------------------------------------------- profiles
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'lp' check (role in ('admin', 'lp')),
  email text not null,
  full_name text not null default '',
  firm text not null default '',
  country text not null default '',
  investor_type text not null default '',
  status text not null default 'invited' check (status in ('invited', 'active', 'suspended')),
  personal_note text not null default '',
  access_expires_at timestamptz,
  invited_at timestamptz not null default now(),
  last_seen_at timestamptz,
  created_at timestamptz not null default now()
);

-- Helper predicates. SECURITY DEFINER so policies can consult profiles without recursion;
-- kept in a non-exposed schema so they are not callable through the API.
create or replace function private.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'admin' and p.status = 'active'
  );
$$;

create or replace function private.is_active_lp()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid())
      and p.status = 'active'
      and (p.access_expires_at is null or p.access_expires_at > now())
  );
$$;

revoke all on function private.is_admin() from public;
revoke all on function private.is_active_lp() from public;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;
grant execute on function private.is_active_lp() to authenticated;

alter table public.profiles enable row level security;
create policy "profiles: read own or admin" on public.profiles
  for select to authenticated using (id = (select auth.uid()) or (select private.is_admin()));
create policy "profiles: admin writes" on public.profiles
  for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

-- ------------------------------------------------------------ attestations
create table public.attestations (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  investor_status text not null,
  jurisdiction text not null,
  terms_version text not null,
  accepted_at timestamptz not null default now()
);
create index attestations_user_id_idx on public.attestations (user_id);
alter table public.attestations enable row level security;
create policy "attestations: read own or admin" on public.attestations
  for select to authenticated using (user_id = (select auth.uid()) or (select private.is_admin()));
-- Inserts happen in server code (service role) together with the status change to 'active'.

-- --------------------------------------------------------------- documents
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category text not null default 'General',
  storage_path text not null unique,
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.documents enable row level security;
create policy "documents: active LPs read published" on public.documents
  for select to authenticated
  using ((published and (select private.is_active_lp())) or (select private.is_admin()));
create policy "documents: admin writes" on public.documents
  for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

-- ------------------------------------------------------------ activity log
create table public.activity_log (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('login', 'page_view', 'document_view', 'attestation', 'interest')),
  target text not null default '',
  created_at timestamptz not null default now()
);
create index activity_log_user_id_idx on public.activity_log (user_id, created_at desc);
create index activity_log_created_at_idx on public.activity_log (created_at desc);
alter table public.activity_log enable row level security;
create policy "activity: admin reads" on public.activity_log
  for select to authenticated using ((select private.is_admin()));
-- Written by server code (service role) only, so an LP cannot forge or omit entries.

-- ------------------------------------------------------------- LP interest
create table public.lp_interest (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  vehicles text[] not null,
  amount_range text not null,
  note text not null default '',
  created_at timestamptz not null default now()
);
create index lp_interest_user_id_idx on public.lp_interest (user_id);
alter table public.lp_interest enable row level security;
create policy "interest: read own or admin" on public.lp_interest
  for select to authenticated using (user_id = (select auth.uid()) or (select private.is_admin()));

-- ------------------------------------------------------------------ updates
create table public.updates (
  id bigint generated always as identity primary key,
  title text not null,
  body text not null,
  published_at timestamptz not null default now()
);
alter table public.updates enable row level security;
create policy "updates: active LPs read" on public.updates
  for select to authenticated using ((select private.is_active_lp()) or (select private.is_admin()));
create policy "updates: admin writes" on public.updates
  for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

-- ------------------------------------------------- public-site submissions
create table public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  organisation text not null default '',
  message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "contact: admin reads" on public.contact_messages
  for select to authenticated using ((select private.is_admin()));
create policy "contact: admin updates" on public.contact_messages
  for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

create table public.founder_pitches (
  id bigint generated always as identity primary key,
  founder_name text not null,
  founder_email text not null,
  company_name text not null,
  company_url text not null default '',
  country text not null default '',
  sector text not null default '',
  stage text not null default '',
  short_pitch text not null,
  bridge text not null default '',
  status text not null default 'new' check (status in ('new', 'in_conversation', 'dd_sent', 'passed', 'invested')),
  created_at timestamptz not null default now()
);
alter table public.founder_pitches enable row level security;
create policy "pitches: admin reads" on public.founder_pitches
  for select to authenticated using ((select private.is_admin()));
create policy "pitches: admin updates" on public.founder_pitches
  for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

-- --------------------------------------------------- founder DD questionnaire
-- Founders are not users. They reach their questionnaire through a secret link;
-- only a SHA-256 hash of the token is stored. All access goes through server code.
create table public.dd_invites (
  id uuid primary key default gen_random_uuid(),
  pitch_id bigint references public.founder_pitches (id) on delete set null,
  token_hash text not null unique,
  founder_name text not null default '',
  founder_email text not null,
  company_name text not null default '',
  expires_at timestamptz not null default (now() + interval '45 days'),
  created_at timestamptz not null default now()
);
alter table public.dd_invites enable row level security;
create policy "dd invites: admin reads" on public.dd_invites
  for select to authenticated using ((select private.is_admin()));

create table public.dd_submissions (
  invite_id uuid primary key references public.dd_invites (id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'completed')),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);
alter table public.dd_submissions enable row level security;
create policy "dd submissions: admin reads" on public.dd_submissions
  for select to authenticated using ((select private.is_admin()));

-- ------------------------------------------------------- data-room storage
insert into storage.buckets (id, name, public) values ('dataroom', 'dataroom', false)
on conflict (id) do nothing;

create policy "dataroom: admin manages" on storage.objects
  for all to authenticated
  using (bucket_id = 'dataroom' and (select private.is_admin()))
  with check (bucket_id = 'dataroom' and (select private.is_admin()));
-- LPs never read storage directly: files are streamed by the app after a session,
-- status and publication check, and each view is logged.
