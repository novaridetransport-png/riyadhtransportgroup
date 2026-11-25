"use client";

import { Download, Eye, Mail, Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createDocument, removeDocument, saveDocument } from "@/app/admin/documents/actions";
import { buttonClass } from "@/components/ui/button-class";
import { utilityPaths } from "@/config/urls";
import { currencies, documentSchema, fileName, money, statusesFor, statusLabel, totals, typeLabel, type DocumentData, type DocumentDraft, type DocumentStatus, type DocumentType } from "@/lib/documents/model";
import { cn } from "@/lib/utils/cn";
import { EmailDialog, type EmailInput } from "./email-dialog";
import { Area, Choice, Field, Panel } from "./fields";

const small = "!min-h-11 !px-4 !py-2 !text-[.95rem]";
const wide = "sm:col-span-2";
type Message = { kind: "ok" | "error"; text: string } | null;

interface Props { id: string; number: string; type: DocumentType; initial: DocumentData; sentAt: string | null; sentTo: string | null }

export function DocumentEditor({ id, number, type, initial, sentAt, sentTo }: Props) {
  const router = useRouter();
  const [doc, setDoc] = useState<DocumentDraft>(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [sent, setSent] = useState({ at: sentAt, to: sentTo });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<Message>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [emailing, setEmailing] = useState(false);
  const lock = useRef(false);
  const dirty = JSON.stringify(doc) !== saved;

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const set = <K extends keyof DocumentDraft>(key: K, value: DocumentDraft[K]) => setDoc((d) => ({ ...d, [key]: value }));
  const setIn = (group: "business" | "client" | "trip" | "payment", key: string, value: string) => setDoc((d) => ({ ...d, [group]: { ...d[group], [key]: value } }));
  const setItem = (i: number, key: string, value: string) => setDoc((d) => ({ ...d, items: d.items.map((x, n) => (n === i ? { ...x, [key]: value } : x)) }));
  const t = totals(doc);

  /** Runs one task at a time and reports anything unexpected. */
  async function run(name: string, task: () => Promise<void>) {
    if (lock.current) return;
    lock.current = true;
    setBusy(name);
    setMessage(null);
    try { await task(); } catch { setMessage({ kind: "error", text: "Something went wrong. Please try again." }); } finally { lock.current = false; setBusy(null); }
  }

  function check(): DocumentData | null {
    const parsed = documentSchema.safeParse(doc);
    if (parsed.success) { setErrors({}); return parsed.data; }
    const found: Record<string, string> = {};
    for (const i of parsed.error.issues) found[i.path.join(".")] ??= i.message;
    setErrors(found);
    setMessage({ kind: "error", text: `Please correct: ${[...new Set(Object.values(found))].slice(0, 3).join(". ")}.` });
    return null;
  }
  async function store(): Promise<DocumentData | null> {
    const data = check();
    if (!data) return null;
    const res = await saveDocument(id, data);
    if (!res.ok) { setErrors(res.fields ?? {}); setMessage({ kind: "error", text: res.error }); return null; }
    setDoc(data);
    setSaved(JSON.stringify(data));
    return data;
  }
  async function pdf(data: DocumentData) {
    const { buildPdf } = await import("@/lib/documents/pdf");
    return new Blob([(await buildPdf(data, number, type)) as BlobPart], { type: "application/pdf" });
  }

  const save = () => run("save", async () => { if (await store()) setMessage({ kind: "ok", text: "Saved." }); });
  const show = () => run("preview", async () => { const data = check(); if (data) setPreview(URL.createObjectURL(await pdf(data))); });
  const download = () => run("download", async () => {
    const data = await store();
    if (!data) return;
    const url = URL.createObjectURL(await pdf(data));
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName(number, data.client.name);
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
    setMessage({ kind: "ok", text: "Saved and downloaded." });
  });
  const openEmail = () => run("email", async () => { if (await store()) setEmailing(true); });
  const send = (input: EmailInput) => run("send", async () => {
    const data = check();
    if (!data) return setEmailing(false);
    const dataUrl = await new Promise<string>((resolve, reject) => {
      void pdf(data).then((blob) => { const r = new FileReader(); r.onload = () => resolve(String(r.result)); r.onerror = reject; r.readAsDataURL(blob); }, reject);
    });
    const res = await fetch(`${utilityPaths.documents}${id}/email/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...input, pdf: dataUrl.slice(dataUrl.indexOf(",") + 1) }) });
    const body = (await res.json().catch(() => ({}))) as { error?: string; warning?: string };
    setEmailing(false);
    if (!res.ok) return setMessage({ kind: "error", text: body.error ?? "The email could not be sent." });
    setSent({ at: new Date().toISOString(), to: input.to });
    if (data.status === "draft" && !body.warning) {
      const next = { ...data, status: "sent" as const };
      setDoc(next);
      setSaved(JSON.stringify(next));
    }
    setMessage(body.warning ? { kind: "error", text: body.warning } : { kind: "ok", text: `Emailed to ${input.to}.` });
  });
  const make = (to: DocumentType) => run("make", async () => {
    if (!(await store())) return;
    const res = await createDocument({ type: to, sourceId: id });
    if (!res.ok) return setMessage({ kind: "error", text: res.error });
    router.push(`${utilityPaths.documents}${res.id}/`);
  });
  const remove = () => run("delete", async () => {
    if (!window.confirm(`Delete ${number} permanently?`)) return;
    const res = await removeDocument(id);
    if (!res.ok) return setMessage({ kind: "error", text: res.error });
    setSaved(JSON.stringify(doc));
    router.push(utilityPaths.documents);
  });

  const group = (g: "business" | "client" | "trip" | "payment", key: string, label: string, extra: { className?: string; type?: string; area?: boolean } = {}) => {
    const props = { label, value: (doc[g] as Record<string, string>)[key], onChange: (v: string) => setIn(g, key, v), error: errors[`${g}.${key}`], className: extra.className };
    return extra.area ? <Area {...props} rows={2} /> : <Field {...props} type={extra.type} />;
  };

  return (
    <>
      <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-line bg-mist/95 px-4 py-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl text-navy">{typeLabel[type]} {number}</h1>
            <p className="text-sm text-body">{sent.at ? `Emailed to ${sent.to} on ${new Date(sent.at).toLocaleString("en-GB", { timeZone: "Asia/Riyadh", dateStyle: "medium", timeStyle: "short" })}` : "Not emailed yet"}{dirty && <strong className="text-danger"> · Unsaved changes</strong>}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={Boolean(busy)} onClick={save} className={cn(buttonClass(), small)}><Save className="size-4" aria-hidden="true" />{busy === "save" ? "Saving" : "Save"}</button>
            <button type="button" disabled={Boolean(busy)} onClick={show} className={cn(buttonClass("secondary"), small)}><Eye className="size-4" aria-hidden="true" />Preview</button>
            <button type="button" disabled={Boolean(busy)} onClick={download} className={cn(buttonClass("secondary"), small)}><Download className="size-4" aria-hidden="true" />{busy === "download" ? "Preparing" : "Download PDF"}</button>
            <button type="button" disabled={Boolean(busy)} onClick={openEmail} className={cn(buttonClass("secondary"), small)}><Mail className="size-4" aria-hidden="true" />Email to client</button>
          </div>
        </div>
        <p role="status" className={cn("mt-2 min-h-6 font-medium", message?.kind === "error" ? "text-danger" : "text-[#067647]")}>{message?.text}</p>
      </div>

      <div className="space-y-4">
        <Panel title="Document" open>
          <Field label="Title on the PDF" value={doc.title} onChange={(v) => set("title", v)} error={errors.title} />
          <Choice label="Status" value={doc.status} onChange={(v) => set("status", v as DocumentStatus)} options={statusesFor[type].map((s) => [s, statusLabel[s]])} />
          <Field label="Issue date" type="date" value={doc.issueDate} onChange={(v) => set("issueDate", v)} error={errors.issueDate} />
          <Field label={type === "quotation" ? "Valid until" : "Due date"} type="date" value={doc.dueDate} onChange={(v) => set("dueDate", v)} error={errors.dueDate} />
          <Field label="Reference" value={doc.reference} onChange={(v) => set("reference", v)} error={errors.reference} />
          <Choice label="Currency" value={doc.currency} onChange={(v) => set("currency", v as DocumentData["currency"])} options={currencies.map((c) => [c, c])} />
        </Panel>

        <Panel title="Client" open>
          {group("client", "name", "Name")}{group("client", "company", "Company")}
          {group("client", "email", "Email", { type: "email" })}{group("client", "phone", "Phone", { type: "tel" })}
          {group("client", "address", "Address", { className: wide, area: true })}
        </Panel>

        <Panel title="Journey" open={type === "quotation"}>
          {group("trip", "pickup", "Pickup")}{group("trip", "destination", "Destination")}
          {group("trip", "date", "Travel date and time")}{group("trip", "returnDate", "Return date")}
          {group("trip", "passengers", "Passengers")}{group("trip", "luggage", "Luggage")}
          {group("trip", "vehicle", "Vehicle category", { className: wide })}
        </Panel>

        <section aria-labelledby="items-h" className="rounded-xl border border-line bg-white p-5 sm:p-6">
          <h2 id="items-h" className="text-lg">Items and price</h2>
          {errors.items && <p className="mt-2 font-medium text-danger">{errors.items}</p>}
          <ul className="mt-4 space-y-4">
            {doc.items.map((item, i) => (
              <li key={i} className="grid grid-cols-2 gap-3 border-b border-line pb-4 lg:grid-cols-[2.2fr_2fr_.7fr_1fr_1fr_auto]">
                <Field className="col-span-2 lg:col-span-1" label="Description" value={item.description} onChange={(v) => setItem(i, "description", v)} error={errors[`items.${i}.description`]} />
                <Field className="col-span-2 lg:col-span-1" label="Details" value={item.details} onChange={(v) => setItem(i, "details", v)} error={errors[`items.${i}.details`]} />
                <Field label="Qty" inputMode="decimal" value={item.quantity} onChange={(v) => setItem(i, "quantity", v)} error={errors[`items.${i}.quantity`]} />
                <Field label="Unit price" inputMode="decimal" value={item.price} onChange={(v) => setItem(i, "price", v)} error={errors[`items.${i}.price`]} />
                <div><p className="text-sm font-semibold text-navy">Amount</p><p className="mt-1 flex min-h-11 items-center font-semibold text-navy">{money(t.lines[i], doc.currency)}</p></div>
                <button type="button" aria-label={`Remove item ${i + 1}`} disabled={doc.items.length === 1} onClick={() => set("items", doc.items.filter((_, n) => n !== i))} className="mt-6 grid size-11 place-items-center rounded-lg border border-line text-danger disabled:opacity-40"><Trash2 className="size-5" aria-hidden="true" /></button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => set("items", [...doc.items, { description: "", details: "", quantity: 1, price: 0 }])} className={cn(buttonClass("secondary"), small, "mt-4")}><Plus className="size-4" aria-hidden="true" />Add item</button>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Discount" inputMode="decimal" value={doc.discount} onChange={(v) => set("discount", v)} error={errors.discount} />
              <Field label="VAT %" inputMode="decimal" value={doc.vatRate} onChange={(v) => set("vatRate", v)} error={errors.vatRate} />
              {type !== "quotation" && <Field label="Amount received" inputMode="decimal" value={doc.paid} onChange={(v) => set("paid", v)} error={errors.paid} />}
            </div>
            <dl className="grid grid-cols-2 gap-y-2 self-start rounded-lg bg-mist p-4 text-right">
              <dt className="text-left">Subtotal</dt><dd>{money(t.subtotal, doc.currency)}</dd>
              <dt className="text-left">Discount</dt><dd>{money(t.discount, doc.currency)}</dd>
              <dt className="text-left">VAT</dt><dd>{money(t.vat, doc.currency)}</dd>
              <dt className="text-left text-lg font-bold text-navy">Total</dt><dd className="text-lg font-bold text-navy">{money(t.total, doc.currency)}</dd>
              {type !== "quotation" && <><dt className="text-left">Balance due</dt><dd className="font-semibold text-navy">{money(t.balance, doc.currency)}</dd></>}
            </dl>
          </div>
        </section>

        <Panel title="Payment, notes and terms" open>
          {type !== "quotation" && <>{group("payment", "method", "Payment method")}{group("payment", "date", "Payment date", { type: "date" })}{group("payment", "reference", "Payment reference", { className: wide })}</>}
          <Area className={wide} label="How to pay" value={doc.paymentDetails} onChange={(v) => set("paymentDetails", v)} error={errors.paymentDetails} />
          <Area className={wide} label="Notes" value={doc.notes} onChange={(v) => set("notes", v)} error={errors.notes} />
          <Area className={wide} rows={6} label="Terms" value={doc.terms} onChange={(v) => set("terms", v)} error={errors.terms} />
          <Field className={wide} label="Footer line" value={doc.footer} onChange={(v) => set("footer", v)} error={errors.footer} />
        </Panel>

        <Panel title="Business details on this document">
          {group("business", "tradeName", "Business name")}{group("business", "legalName", "Legal name")}
          {group("business", "phone", "Phone")}{group("business", "email", "Email", { type: "email" })}
          {group("business", "website", "Website")}{group("business", "registration", "Registration number")}
          {group("business", "vatNumber", "VAT number")}{group("business", "address", "Address", { className: wide, area: true })}
        </Panel>

        <div className="flex flex-wrap gap-2 rounded-xl border border-line bg-white p-5">
          {type === "quotation" && <button type="button" disabled={Boolean(busy)} onClick={() => make("invoice")} className={cn(buttonClass("secondary"), small)}>Make invoice</button>}
          {type !== "receipt" && <button type="button" disabled={Boolean(busy)} onClick={() => make("receipt")} className={cn(buttonClass("secondary"), small)}>Make receipt</button>}
          <button type="button" disabled={Boolean(busy)} onClick={() => make(type)} className={cn(buttonClass("secondary"), small)}>Make a copy</button>
          <button type="button" disabled={Boolean(busy)} onClick={remove} className={cn(buttonClass("secondary"), small, "!border-danger !text-danger")}>Delete draft</button>
        </div>
      </div>

      {preview && (
        <div role="dialog" aria-modal="true" aria-label="PDF preview" className="fixed inset-0 z-50 flex flex-col bg-navy/90 p-3 sm:p-6" onKeyDown={(e) => e.key === "Escape" && setPreview(null)}>
          <div className="mb-3 flex justify-end gap-2">
            <a href={preview} target="_blank" rel="noopener" className={cn(buttonClass("secondary"), small)}>Open in new tab</a>
            <button type="button" autoFocus onClick={() => setPreview(null)} className={cn(buttonClass("secondary"), small)}>Close</button>
          </div>
          <iframe src={preview} title={`${typeLabel[type]} ${number}`} className="w-full flex-1 rounded-lg bg-white" />
        </div>
      )}
      {emailing && <EmailDialog type={type} number={number} to={doc.client.email} clientName={doc.client.name} business={doc.business.tradeName} alreadySentTo={sent.at ? sent.to : null} busy={busy === "send"} onCancel={() => setEmailing(false)} onSend={send} />}
    </>
  );
}
