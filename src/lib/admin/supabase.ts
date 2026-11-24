import "server-only";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { utilityPaths } from "@/config/urls";

const COOKIE = "rtg_admin";
export const statuses = ["new", "contacted", "quoted", "confirmed", "closed"] as const;
export type Status = (typeof statuses)[number];
export const isStatus = (v: unknown): v is Status => statuses.includes(v as Status);

export interface Inquiry {
  id: string; created_at: string; status: Status; pickup: string; destination: string; trip_type: string;
  travel_date: string; return_date: string | null; pickup_time: string; passengers: string; luggage: string;
  vehicle: string; name: string; phone: string; email: string | null; notes: string | null;
}

/** The admin area does not exist (404) until Supabase is configured. */
function config() {
  const { SUPABASE_URL: url, SUPABASE_PUBLISHABLE_KEY: key } = process.env;
  if (!url || !key) notFound();
  return { url, key };
}
export const requireConfigured = () => void config();

async function call(path: string, token: string | null, init: RequestInit = {}) {
  const { url, key } = config();
  return fetch(new URL(path, url), {
    ...init,
    cache: "no-store",
    headers: { apikey: key, "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }), ...init.headers },
    signal: AbortSignal.timeout(10_000),
  });
}

/** True only when the database confirms the token belongs to a listed admin. */
async function isAdmin(token: string) {
  const res = await call("/rest/v1/admins?select=user_id", token);
  return res.ok && ((await res.json()) as unknown[]).length === 1;
}

/** Returns an error code, or null after setting the session cookie. */
export async function signIn(email: string, password: string): Promise<"invalid" | "unavailable" | null> {
  try {
    const res = await call("/auth/v1/token?grant_type=password", null, { method: "POST", body: JSON.stringify({ email, password }) });
    if (res.status >= 500) return "unavailable";
    if (!res.ok) return "invalid";
    const { access_token: token, expires_in: maxAge } = (await res.json()) as { access_token: string; expires_in: number };
    if (!(await isAdmin(token))) return "invalid";
    (await cookies()).set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: utilityPaths.admin, maxAge });
    return null;
  } catch {
    return "unavailable";
  }
}

export async function signOut() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  jar.delete({ name: COOKIE, path: utilityPaths.admin });
  if (token) await call("/auth/v1/logout?scope=local", token, { method: "POST" }).catch(() => null);
}

/** Guards every admin page and action. The database enforces the same rule again. */
export async function requireAdmin(): Promise<string> {
  config();
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token || !(await isAdmin(token))) redirect(utilityPaths.adminLogin);
  return token;
}

export const PAGE_SIZE = 25;
export async function listInquiries(token: string, status: Status | null, page: number): Promise<{ rows: Inquiry[]; more: boolean }> {
  const query = new URLSearchParams({ select: "*", order: "created_at.desc,id", limit: String(PAGE_SIZE + 1), offset: String((page - 1) * PAGE_SIZE) });
  if (status) query.set("status", `eq.${status}`);
  const res = await call(`/rest/v1/inquiries?${query}`, token);
  if (!res.ok) throw new Error(`Inquiry list failed with status ${res.status}`);
  const rows = (await res.json()) as Inquiry[];
  return { rows: rows.slice(0, PAGE_SIZE), more: rows.length > PAGE_SIZE };
}

async function change(token: string, id: string, init: RequestInit) {
  const res = await call(`/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`, token, { ...init, headers: { Prefer: "return=minimal" } });
  if (!res.ok) throw new Error(`Inquiry change failed with status ${res.status}`);
}
export const setStatus = (token: string, id: string, status: Status) => change(token, id, { method: "PATCH", body: JSON.stringify({ status }) });
export const deleteInquiry = (token: string, id: string) => change(token, id, { method: "DELETE" });
