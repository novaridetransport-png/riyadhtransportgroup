import Link from "next/link";
import { removeInquiry, updateStatus } from "./actions";
import { LogoutButton } from "@/components/admin/logout-button";
import { buttonClass } from "@/components/ui/button-class";
import { utilityPaths } from "@/config/urls";
import { isStatus, listInquiries, requireAdmin, statuses, type Inquiry } from "@/lib/admin/supabase";
import { cn } from "@/lib/utils/cn";

const when = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Riyadh" });
const label = (s: string) => s[0].toUpperCase() + s.slice(1);
const small = "!min-h-11 !px-4 !py-2 !text-[.95rem]";

function href(status: string | null, page: number) {
  const q = new URLSearchParams();
  if (status) q.set("status", status);
  if (page > 1) q.set("page", String(page));
  return `${utilityPaths.admin}${q.size ? `?${q}` : ""}`;
}

function Card({ row }: { row: Inquiry }) {
  const details: [string, string | null][] = [
    ["Trip", `${row.trip_type === "return" ? "Return" : "One-way"}, ${row.travel_date} at ${row.pickup_time.slice(0, 5)}`],
    ["Return date", row.return_date], ["Passengers", row.passengers], ["Luggage", row.luggage], ["Vehicle", row.vehicle],
    ["Phone", row.phone], ["Email", row.email], ["Requirements", row.notes],
  ];
  return (
    <li className="rounded-xl border border-line bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg wrap-anywhere">{row.pickup} to {row.destination}</h2>
        <p className="text-sm text-muted">{when.format(new Date(row.created_at))} (Riyadh)</p>
      </div>
      <p className="mt-1 font-medium wrap-anywhere">{row.name}</p>
      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-[.95rem]">
        {details.filter(([, v]) => v).map(([k, v]) => <div key={k} className="contents"><dt className="text-muted">{k}</dt><dd className="min-w-0 whitespace-pre-line wrap-anywhere text-navy">{v}</dd></div>)}
      </dl>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-4">
        <form action={updateStatus} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="id" value={row.id} />
          <label className="text-sm font-semibold text-navy">Status{" "}
            <select name="status" key={row.status} defaultValue={row.status} className="ml-1 min-h-11 rounded-lg border border-[#98a2b3] bg-white px-3 text-base">
              {statuses.map((s) => <option key={s} value={s}>{label(s)}</option>)}
            </select>
          </label>
          <button className={cn(buttonClass("secondary"), small)}>Save</button>
        </form>
        <details>
          <summary className="flex min-h-11 items-center text-sm font-semibold text-danger">Delete</summary>
          <form action={removeInquiry} className="mt-2 flex flex-wrap items-center gap-3">
            <input type="hidden" name="id" value={row.id} />
            <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" name="confirm" value="yes" required className="size-4" />Delete permanently</label>
            <button className={cn(buttonClass("secondary"), small, "!border-danger !text-danger")}>Delete inquiry</button>
          </form>
        </details>
      </div>
    </li>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const token = await requireAdmin();
  const params = await searchParams;
  const status = isStatus(params.status) ? params.status : null;
  const page = Math.min(Math.max(Number.parseInt(String(params.page), 10) || 1, 1), 1000);
  const { rows, more } = await listInquiries(token, status, page);
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-section text-navy">Inquiries</h1>
        <LogoutButton className={cn(buttonClass("secondary"), small)} />
      </div>
      <nav aria-label="Filter by status" className="mt-6 flex flex-wrap gap-2">
        {[null, ...statuses].map((s) => (
          <Link key={s ?? "all"} href={href(s, 1)} prefetch={false} aria-current={s === status ? "page" : undefined}
            className={cn("flex min-h-11 items-center rounded-lg border px-4 text-sm font-semibold", s === status ? "border-navy bg-navy text-white" : "border-line bg-white text-navy")}>{s ? label(s) : "All"}</Link>
        ))}
      </nav>
      {rows.length === 0 ? <p className="mt-10 text-lg">No inquiries here.</p> : <ul className="mt-6 space-y-4">{rows.map((r) => <Card key={r.id} row={r} />)}</ul>}
      <div className="mt-8 flex gap-3">
        {page > 1 && <Link href={href(status, page - 1)} prefetch={false} className={cn(buttonClass("secondary"), small)}>Newer</Link>}
        {more && <Link href={href(status, page + 1)} prefetch={false} className={cn(buttonClass("secondary"), small)}>Older</Link>}
      </div>
    </>
  );
}
