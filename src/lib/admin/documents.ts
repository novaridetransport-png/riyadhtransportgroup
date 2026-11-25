import "server-only";
import { defaultSettings, settingsSchema, totals, type DocumentData, type DocumentStatus, type DocumentType, type Settings } from "@/lib/documents/model";
import { adminFetch, PAGE_SIZE, type Inquiry } from "./supabase";

export interface DocumentRow {
  id: string; type: DocumentType; number: string; status: DocumentStatus; inquiry_id: string | null; source_id: string | null;
  client_name: string; issue_date: string; currency: string; total: number; data: DocumentData;
  sent_at: string | null; sent_to: string | null; created_at: string; updated_at: string;
}
export type DocumentSummary = Omit<DocumentRow, "data">;
const summary = "id,type,number,status,inquiry_id,source_id,client_name,issue_date,currency,total,sent_at,sent_to,created_at,updated_at";

async function read<T>(path: string, token: string): Promise<T> {
  const res = await adminFetch(path, token);
  if (!res.ok) throw new Error(`Read failed with status ${res.status}`);
  return (await res.json()) as T;
}
async function write(path: string, token: string, method: string, body?: object, prefer = "return=representation") {
  const res = await adminFetch(path, token, { method, body: body && JSON.stringify(body), headers: { Prefer: prefer } });
  if (!res.ok) throw new Error(`${method} failed with status ${res.status}`);
  return res.status === 204 ? [] : ((await res.json()) as Record<string, unknown>[]);
}
const one = (id: string) => `/rest/v1/documents?id=eq.${encodeURIComponent(id)}`;

export async function getSettings(token: string): Promise<Settings> {
  const rows = await read<{ data: Partial<Settings> }[]>("/rest/v1/business_settings?id=eq.1&select=data", token);
  const saved = rows[0]?.data;
  if (!saved) return defaultSettings;
  const parsed = settingsSchema.safeParse({ ...defaultSettings, ...saved, business: { ...defaultSettings.business, ...saved.business } });
  return parsed.success ? parsed.data : defaultSettings;
}
export async function saveSettings(token: string, data: Settings) {
  const updated = await write("/rest/v1/business_settings?id=eq.1", token, "PATCH", { data, updated_at: new Date().toISOString() });
  if (updated.length === 0) await write("/rest/v1/business_settings", token, "POST", { id: 1, data });
}

export async function listDocuments(token: string, type: DocumentType | null, page: number, search: string) {
  const q = new URLSearchParams({ select: summary, order: "created_at.desc,id", limit: String(PAGE_SIZE + 1), offset: String((page - 1) * PAGE_SIZE) });
  if (type) q.set("type", `eq.${type}`);
  const term = search.replace(/[^\p{L}\p{N} -]/gu, "").trim().slice(0, 60);
  if (term) q.set("or", `(number.ilike.*${term}*,client_name.ilike.*${term}*)`);
  const rows = await read<DocumentSummary[]>(`/rest/v1/documents?${q}`, token);
  return { rows: rows.slice(0, PAGE_SIZE), more: rows.length > PAGE_SIZE };
}
export const getDocument = async (token: string, id: string) => (await read<DocumentRow[]>(`${one(id)}&select=*`, token))[0] ?? null;
export const getRelated = (token: string, id: string) => read<DocumentSummary[]>(`/rest/v1/documents?source_id=eq.${encodeURIComponent(id)}&select=${summary}&order=created_at`, token);
export const getInquiry = async (token: string, id: string) => (await read<Inquiry[]>(`/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}&select=*`, token))[0] ?? null;

const columns = (data: DocumentData) => {
  const t = totals(data);
  return { client_name: data.client.name, issue_date: data.issueDate, currency: data.currency, total: t.total / t.minor, data };
};
export async function insertDocument(token: string, type: DocumentType, data: DocumentData, links: { inquiry_id?: string | null; source_id?: string | null }) {
  const [row] = await write("/rest/v1/documents?select=id", token, "POST", { type, ...links, ...columns(data) });
  return String(row.id);
}
/** Returns false when the document no longer exists. */
export const updateDocument = async (token: string, id: string, data: DocumentData) =>
  (await write(`${one(id)}&select=id`, token, "PATCH", { ...columns(data), status: data.status, updated_at: new Date().toISOString() })).length === 1;
export const markSent = (token: string, row: DocumentRow, to: string) => {
  const status = row.status === "draft" ? "sent" : row.status;
  return write(`${one(row.id)}&select=id`, token, "PATCH", { sent_at: new Date().toISOString(), sent_to: to, status, data: { ...row.data, status } });
};
/** The database refuses to delete anything but a draft that was never emailed. */
export const deleteDocument = async (token: string, id: string) => (await write(`${one(id)}&select=id`, token, "DELETE")).length === 1;
