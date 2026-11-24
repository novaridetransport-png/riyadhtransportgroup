-- Admin access. Run after 20261124000000_inquiries.sql.
-- A signed-in user sees nothing unless their id is in public.admins.
-- Rows in public.admins are added only from the Supabase dashboard (see README).
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;
grant select on public.admins to authenticated;
create policy "read own admin row" on public.admins
  for select to authenticated using (user_id = (select auth.uid()));

-- Admins may read and delete inquiries, and change only the status column.
grant select, delete on public.inquiries to authenticated;
grant update (status) on public.inquiries to authenticated;
create policy "admins read inquiries" on public.inquiries
  for select to authenticated using (exists (select 1 from public.admins where user_id = (select auth.uid())));
create policy "admins update inquiries" on public.inquiries
  for update to authenticated
  using (exists (select 1 from public.admins where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admins where user_id = (select auth.uid())));
create policy "admins delete inquiries" on public.inquiries
  for delete to authenticated using (exists (select 1 from public.admins where user_id = (select auth.uid())));
