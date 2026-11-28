/**
 * Deletes inquiries 6 months after travel (the return date for return trips), as the privacy
 * policy promises. Documents keep their copy of the details; their link to the inquiry is cleared.
 */
interface Env { SUPABASE_URL?: string; SUPABASE_SECRET_KEY?: string }

export function retentionCutoff(now: Date): string {
  // Day 0 of the next month is the last day of the target month, so 31 August becomes 28 February.
  const lastDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5, 0)).getUTCDate();
  const cutoff = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 6, Math.min(now.getUTCDate(), lastDay)));
  return cutoff.toISOString().slice(0, 10);
}

export async function deleteExpiredInquiries(env: Env, now = new Date()): Promise<void> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) return;
  const cutoff = retentionCutoff(now);
  const filter = `or=(and(return_date.is.null,travel_date.lt.${cutoff}),return_date.lt.${cutoff})`;
  const res = await fetch(new URL(`/rest/v1/inquiries?${filter}&select=id`, env.SUPABASE_URL), {
    method: "DELETE",
    headers: { apikey: env.SUPABASE_SECRET_KEY, Prefer: "return=representation" },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`Retention delete failed with status ${res.status}`);
  console.log(`Retention: deleted ${((await res.json()) as unknown[]).length} inquiries travelling before ${cutoff}`);
}
