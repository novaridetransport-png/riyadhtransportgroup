import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { AdminNav } from "@/components/admin/admin-nav";
import { DocumentEditor } from "@/components/admin/documents/editor";
import { utilityPaths } from "@/config/urls";
import { getDocument, getRelated, getSettings } from "@/lib/admin/documents";
import { requireAdmin } from "@/lib/admin/supabase";
import { blankDocument, type DocumentData } from "@/lib/documents/model";

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const token = await requireAdmin();
  const id = z.uuid().safeParse((await params).id);
  if (!id.success) notFound();
  const row = await getDocument(token, id.data);
  if (!row) notFound();
  const [settings, made, source] = await Promise.all([getSettings(token), getRelated(token, row.id), row.source_id ? getDocument(token, row.source_id) : null]);
  // Fills fields added to the form after this document was made.
  const base = blankDocument(row.type, settings);
  const initial: DocumentData = {
    ...base, ...row.data, status: row.status,
    business: { ...base.business, ...row.data.business }, client: { ...base.client, ...row.data.client },
    trip: { ...base.trip, ...row.data.trip }, payment: { ...base.payment, ...row.data.payment },
  };
  const related = [...(source ? [source] : []), ...made];
  return (
    <>
      <AdminNav current="documents" />
      {related.length > 0 && (
        <p className="mt-4 text-sm">Related: {related.map((r, i) => <span key={r.id}>{i > 0 && ", "}<Link prefetch={false} href={`${utilityPaths.documents}${r.id}/`} className="font-semibold text-royal underline underline-offset-4">{r.number}</Link></span>)}</p>
      )}
      <div className="mt-4"><DocumentEditor key={row.id} id={row.id} number={row.number} type={row.type} initial={initial} sentAt={row.sent_at} sentTo={row.sent_to} /></div>
    </>
  );
}
