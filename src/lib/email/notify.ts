import "server-only";
import { site } from "@/config/site";
import { utilityPaths } from "@/config/urls";

interface Summary { id: string; pickup: string; destination: string; date: string; time: string }

/**
 * Tells the owner about a new inquiry through Brevo. Off until all three variables are set.
 * The email leaves out the customer's name and contact details; those stay in the admin area.
 * Never throws: the inquiry is already stored when this runs.
 */
export async function notifyNewInquiry(i: Summary): Promise<void> {
  const { BREVO_API_KEY, NOTIFY_FROM_EMAIL, NOTIFY_TO_EMAIL } = process.env;
  if (!BREVO_API_KEY || !NOTIFY_FROM_EMAIL || !NOTIFY_TO_EMAIL) return;
  const oneLine = (s: string) => s.replace(/\s+/g, " ").trim();
  try {
    const res = await fetch(`${process.env.BREVO_API_URL ?? "https://api.brevo.com"}/v3/smtp/email`, {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: { name: site.name, email: NOTIFY_FROM_EMAIL },
        to: [{ email: NOTIFY_TO_EMAIL }],
        subject: `New inquiry: ${oneLine(i.pickup)} to ${oneLine(i.destination)}`,
        textContent: `A new inquiry has arrived.\n\nRoute: ${oneLine(i.pickup)} to ${oneLine(i.destination)}\nTravel: ${i.date} at ${i.time}\nReference: ${i.id}\n\nSee the customer's details in the admin area:\n${new URL(utilityPaths.admin, site.url)}\n`,
      }),
      signal: AbortSignal.timeout(5_000),
    });
    if (!res.ok) console.error("Inquiry email failed with status", res.status);
  } catch {
    console.error("Inquiry email failed: network");
  }
}
