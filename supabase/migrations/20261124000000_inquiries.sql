-- Booking inquiries. Run once in the Supabase SQL editor.
-- Row level security is on with no policies: only the server's secret key can reach the table.
create table public.inquiries (
  id uuid primary key,
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'confirmed', 'closed')),
  pickup text not null check (char_length(pickup) <= 160),
  destination text not null check (char_length(destination) <= 160),
  trip_type text not null check (trip_type in ('one-way', 'return')),
  travel_date date not null,
  return_date date,
  pickup_time time not null,
  passengers text not null check (char_length(passengers) <= 40),
  luggage text not null check (char_length(luggage) <= 40),
  vehicle text not null check (char_length(vehicle) <= 60),
  name text not null check (char_length(name) <= 100),
  phone text not null check (char_length(phone) <= 40),
  email text check (char_length(email) <= 254),
  notes text check (char_length(notes) <= 1000)
);

alter table public.inquiries enable row level security;
revoke all on public.inquiries from anon, authenticated;
grant select, insert, update, delete on public.inquiries to service_role;
create index inquiries_created_at_idx on public.inquiries (created_at desc);
