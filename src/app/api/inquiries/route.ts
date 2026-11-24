import { z } from "zod";
import { formSubmissionsEnabled } from "@/config/flags";
import { notifyNewInquiry } from "@/lib/email/notify";
import { bookingFormSchema } from "@/lib/validation/booking";

const MAX_BYTES = 10_000;
const envelope = z.object({ id: z.uuid(), website: z.string().optional(), booking: z.unknown() });
const reply = (status: number, error?: string) =>
  Response.json(error ? { ok: false, error } : { ok: true }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const { SUPABASE_URL, SUPABASE_SECRET_KEY } = process.env;
  if (!formSubmissionsEnabled || !SUPABASE_URL || !SUPABASE_SECRET_KEY) return reply(503, "unavailable");

  const origin = request.headers.get("origin");
  if (!origin || !URL.canParse(origin) || new URL(origin).host !== request.headers.get("host")) return reply(403, "forbidden");
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415, "unsupported");

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BYTES) return reply(413, "too_large");
  let json: unknown;
  try { json = JSON.parse(raw); } catch { return reply(400, "invalid"); }

  const outer = envelope.safeParse(json);
  if (!outer.success) return reply(400, "invalid");
  if (outer.data.website) return reply(200); // honeypot: a bot filled the hidden field
  const parsed = bookingFormSchema.safeParse(outer.data.booking);
  if (!parsed.success) return reply(400, "invalid");
  const b = parsed.data;

  const row = JSON.stringify({
    id: outer.data.id, pickup: b.pickup, destination: b.destination, trip_type: b.tripType, travel_date: b.date,
    return_date: b.tripType === "return" ? b.returnDate : null, pickup_time: b.time, passengers: b.passengers,
    luggage: b.luggage, vehicle: b.vehicle, name: b.name, phone: b.phone, email: b.email || null, notes: b.notes || null,
  });
  // The id makes inserts repeatable: if a reply is lost after the row was stored, the
  // second attempt finds it instead of failing, and the owner is still notified.
  let replyLost = false;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(new URL("/rest/v1/inquiries?on_conflict=id&select=id", SUPABASE_URL), {
        method: "POST",
        headers: { apikey: SUPABASE_SECRET_KEY, "Content-Type": "application/json", Prefer: "resolution=ignore-duplicates,return=representation" },
        body: row,
        signal: AbortSignal.timeout(8_000),
      });
      if (!res.ok) {
        console.error("Inquiry insert failed with status", res.status); // never log personal data
        if (res.status < 500) break;
        continue;
      }
      const created = ((await res.json()) as unknown[]).length === 1; // empty when the id already existed
      if (created || replyLost) await notifyNewInquiry({ id: outer.data.id, pickup: b.pickup, destination: b.destination, date: b.date, time: b.time });
      return reply(201);
    } catch (error) {
      replyLost = true;
      console.error("Inquiry insert attempt failed:", error instanceof Error ? error.name : "unknown");
    }
  }
  return reply(502, "storage");
}
