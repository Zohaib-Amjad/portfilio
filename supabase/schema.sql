-- Run once in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 80),
  email text not null check (char_length(email) <= 254),
  message text not null check (char_length(message) between 10 and 2000),
  created_at timestamptz not null default now()
);

create index if not exists contacts_created_at_idx on public.contacts (created_at desc);

-- API uses the service role key (bypasses RLS). Still enable RLS so anon/public cannot read/write.
alter table public.contacts enable row level security;

-- No policies for anon/authenticated → only service role can access from the server.
