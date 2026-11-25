-- Quotations, invoices and receipts. Run after 20261124010000_admin.sql.
create table public.business_settings (
  id integer primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.document_counters (
  type text not null,
  year integer not null,
  last integer not null,
  primary key (type, year)
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('quotation', 'invoice', 'receipt')),
  number text not null unique,
  status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'declined', 'part_paid', 'paid', 'cancelled')),
  inquiry_id uuid references public.inquiries (id) on delete set null,
  source_id uuid references public.documents (id) on delete set null,
  client_name text not null default '' check (char_length(client_name) <= 160),
  issue_date date not null,
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  total numeric(14, 3) not null default 0,
  data jsonb not null,
  sent_at timestamptz,
  sent_to text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index documents_created_at_idx on public.documents (created_at desc);
create index documents_inquiry_idx on public.documents (inquiry_id);
create index documents_source_idx on public.documents (source_id);

-- Numbers come from the database, so two documents can never share one.
create function public.assign_document_number() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  y integer := extract(year from now() at time zone 'Asia/Riyadh');
  n integer;
begin
  insert into public.document_counters as c (type, year, last) values (new.type, y, 1)
    on conflict (type, year) do update set last = c.last + 1
    returning c.last into n;
  new.number := case new.type when 'quotation' then 'QT' when 'invoice' then 'INV' else 'RCT' end
    || '-' || y || '-' || lpad(n::text, 4, '0');
  return new;
end $$;
revoke execute on function public.assign_document_number() from public, anon, authenticated;
create trigger assign_document_number before insert on public.documents
  for each row execute function public.assign_document_number();

alter table public.business_settings enable row level security;
alter table public.document_counters enable row level security;
alter table public.documents enable row level security;
revoke all on public.business_settings, public.document_counters, public.documents from anon, authenticated;

grant select, insert on public.business_settings to authenticated;
grant update (data, updated_at) on public.business_settings to authenticated;
grant select, delete on public.documents to authenticated;
grant insert (type, inquiry_id, source_id, client_name, issue_date, currency, total, data) on public.documents to authenticated;
-- Type and number never change after creation.
grant update (status, client_name, issue_date, currency, total, data, sent_at, sent_to, updated_at) on public.documents to authenticated;

create policy "admins use settings" on public.business_settings for all to authenticated
  using (exists (select 1 from public.admins where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admins where user_id = (select auth.uid())));
create policy "admins read documents" on public.documents for select to authenticated
  using (exists (select 1 from public.admins where user_id = (select auth.uid())));
create policy "admins create documents" on public.documents for insert to authenticated
  with check (exists (select 1 from public.admins where user_id = (select auth.uid())));
create policy "admins update documents" on public.documents for update to authenticated
  using (exists (select 1 from public.admins where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admins where user_id = (select auth.uid())));
-- Only drafts that were never emailed can be deleted; anything else is cancelled instead.
create policy "admins delete unsent drafts" on public.documents for delete to authenticated
  using (status = 'draft' and sent_at is null and exists (select 1 from public.admins where user_id = (select auth.uid())));
