import { z } from "zod";
import { site } from "@/config/site";
import { bookingFormSchema } from "@/lib/validation/booking";

const MAX_BYTES = 10_000;
const envelope = z.object({ id: z.uuid(), website: z.string().optional(), booking: z.unknown() });
const reply = (status: number, error?: string) =>
  Response.json(error ? { ok: false, error } : { ok: true }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const { SUPABASE_URL, SUPABASE_SECRET_KEY } = process.env;
  if (!site.formSubmissionsEnabled || !SUPABASE_URL || !SUPABASE_SECRET_KEY) return reply(503, "unavailable");

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

  try {
    // Repeating the same id (double click, retry) does not create a second row.
    const res = await fetch(new URL("/rest/v1/inquiries?on_conflict=id", SUPABASE_URL), {
      method: "POST",
      headers: { apikey: SUPABASE_SECRET_KEY, "Content-Type": "application/json", Prefer: "resolution=ignore-duplicates,return=minimal" },
      body: JSON.stringify({
        id: outer.data.id, pickup: b.pickup, destination: b.destination, trip_type: b.tripType, travel_date: b.date,
        return_date: b.tripType === "return" ? b.returnDate : null, pickup_time: b.time, passengers: b.passengers,
        luggage: b.luggage, vehicle: b.vehicle, name: b.name, phone: b.phone, email: b.email || null, notes: b.notes || null,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (res.ok) return reply(201);
    console.error("Inquiry insert failed with status", res.status); // never log personal data
  } catch {
    console.error("Inquiry insert failed: network");
  }
  return reply(502, "storage");
}
