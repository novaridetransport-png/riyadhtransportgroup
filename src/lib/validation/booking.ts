import { z } from "zod";

/** Today's date in Riyadh as YYYY-MM-DD, whatever timezone the visitor is in. */
export const riyadhToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Riyadh" }).format(new Date());

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

export const bookingSchema = z.object({
  pickup: z.string().trim().min(2, "Enter your pickup location").max(160, "Keep this under 160 characters"),
  destination: z.string().trim().min(2, "Enter your destination").max(160, "Keep this under 160 characters"),
  tripType: z.enum(["one-way", "return"]),
  date: z.string().regex(isoDate, "Choose a travel date").refine((v) => v >= riyadhToday(), "Travel date cannot be in the past"),
  returnDate: z.string(),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Choose a pickup time"),
  passengers: z.string().min(1, "Select the number of passengers"),
  luggage: z.string().min(1, "Select the amount of luggage"),
  vehicle: z.string().min(1, "Select a vehicle category"),
  name: z.string().trim().min(2, "Enter your name").max(100, "Keep this under 100 characters"),
  phone: z.string().trim().refine(
    (v) => /^\+?[\d\s()-]+$/.test(v) && /^\d{8,15}$/.test(v.replace(/\D/g, "")),
    "Enter a valid number, including the country code",
  ),
  email: z.union([z.literal(""), z.email("Enter a valid email address")]),
  notes: z.string().trim().max(1000, "Keep this under 1,000 characters"),
});

export type BookingInput = z.infer<typeof bookingSchema>;

/**
 * Rules spanning several fields. `when` makes them run even while later steps
 * are still empty; Zod otherwise skips refinements until every field is valid.
 */
export const bookingFormSchema = bookingSchema.check(
  z.superRefine((v: BookingInput, ctx) => {
    const issue = (path: keyof BookingInput, message: string) => ctx.addIssue({ code: "custom", path: [path], message });
    const same = v.pickup.trim().toLowerCase() === v.destination.trim().toLowerCase();
    if (v.destination && same) issue("destination", "Destination must differ from pickup");
    if (v.tripType === "return") {
      if (!isoDate.test(v.returnDate)) issue("returnDate", "Choose a return date");
      else if (v.returnDate < v.date) issue("returnDate", "Return date must be on or after the travel date");
    }
  }, { when: () => true }),
);

export function bookingSummary(b: BookingInput): [string, string][] {
  const rows: [string, string][] = [
    ["Pickup", b.pickup],
    ["Destination", b.destination],
    ["Trip", b.tripType === "return" ? "Return" : "One-way"],
    ["Travel date", b.date],
    ["Pickup time", b.time],
    ["Passengers", b.passengers],
    ["Luggage", b.luggage],
    ["Vehicle", b.vehicle],
    ["Name", b.name],
    ["Phone / WhatsApp", b.phone],
  ];
  if (b.tripType === "return") rows.splice(4, 0, ["Return date", b.returnDate]);
  if (b.email) rows.push(["Email", b.email]);
  if (b.notes) rows.push(["Requirements", b.notes]);
  return rows;
}
