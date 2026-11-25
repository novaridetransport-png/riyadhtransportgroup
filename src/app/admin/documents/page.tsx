import Link from "next/link";
import { AdminNav } from "@/components/admin/admin-nav";
import { CreateButtons } from "@/components/admin/documents/create-buttons";
import { buttonClass } from "@/components/ui/button-class";
import { utilityPaths } from "@/config/urls";
import { listDocuments } from "@/lib/admin/documents";
import { requireAdmin } from "@/lib/admin/supabase";
import { documentTypes, isDocumentType, statusLabel, typeLabel } from "@/lib/documents/model";
import { cn } from "@/lib/utils/cn";

const small = "!min-h-11 !px-4 !py-2 !text-[.95rem]";

export default async function DocumentsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const token = await requireAdmin();
  const params = await searchParams;
  const type = isDocumentType(params.type) ? params.type : null;
  const search = typeof params.q === "string" ? params.q : "";
  const page = Math.min(Math.max(Number.parseInt(String(params.page), 10) || 1, 1), 1000);
  const { rows, more } = await listDocuments(token, type, page, search);
  const href = (t: string | null, p: number) => {
    const q = new URLSearchParams();
    if (t) q.set("type", t);
    if (search) q.set("q", search);
    if (p > 1) q.set("page", String(p));
    return `${utilityPaths.documents}${q.size ? `?${q}` : ""}`;
  };
  return (
    <>
      <AdminNav current="documents" />
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-section text-navy">Documents</h1>
        <CreateButtons types={[...documentTypes]} />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {[null, ...documentTypes].map((t) => (
          <Link key={t ?? "all"} href={href(t, 1)} prefetch={false} aria-current={t === type ? "page" : undefined} className={cn("flex min-h-11 items-center rounded-lg border px-4 text-sm font-semibold", t === type ? "border-navy bg-navy text-white" : "border-line bg-white text-navy")}>{t ? `${typeLabel[t]}s` : "All"}</Link>
        ))}
        <form action={utilityPaths.documents} className="flex gap-2">
          {type && <input type="hidden" name="type" value={type} />}
          <input name="q" defaultValue={search} aria-label="Search number or client" placeholder="Number or client" className="min-h-11 w-44 rounded-lg border border-[#98a2b3] bg-white px-3" />
          <button className={cn(buttonClass("secondary"), small)}>Search</button>
        </form>
      </div>
      {rows.length === 0 ? <p className="mt-10 text-lg">No documents here.</p> : (
        <ul className="mt-6 divide-y divide-line rounded-xl border border-line bg-white">
          {rows.map((r) => (
            <li key={r.id}>
              <Link href={`${utilityPaths.documents}${r.id}/`} prefetch={false} className="grid grid-cols-2 gap-x-4 gap-y-1 px-5 py-4 hover:bg-mist sm:grid-cols-[10rem_1fr_7rem_8rem_9rem]">
                <span className="font-bold text-navy">{r.number}</span>
                <span className="text-right wrap-anywhere sm:text-left">{r.client_name || "No client yet"}</span>
                <span>{r.issue_date}</span>
                <span className="text-right sm:text-left">{statusLabel[r.status]}{r.sent_at ? ", emailed" : ""}</span>
                <span className="col-span-2 font-semibold text-navy sm:col-span-1 sm:text-right">{r.currency} {Number(r.total).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 3 })}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8 flex gap-3">
        {page > 1 && <Link href={href(type, page - 1)} prefetch={false} className={cn(buttonClass("secondary"), small)}>Newer</Link>}
        {more && <Link href={href(type, page + 1)} prefetch={false} className={cn(buttonClass("secondary"), small)}>Older</Link>}
      </div>
    </>
  );
}
