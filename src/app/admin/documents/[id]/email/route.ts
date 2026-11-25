import { z } from "zod";
import { getDocument, markSent } from "@/lib/admin/documents";
import { currentAdmin } from "@/lib/admin/supabase";
import { fileName } from "@/lib/documents/model";

const MAX_BYTES = 3_500_000;
const input = z.object({
  to: z.email(), cc: z.union([z.literal(""), z.email()]),
  subject: z.string().trim().min(1).max(150), message: z.string().trim().min(1).max(5000),
  // Base64 of "%PDF-": the attachment is the PDF the admin's browser just made.
  pdf: z.string().startsWith("JVBERi").regex(/^[A-Za-z0-9+/]+={0,2}$/),
});
const reply = (status: number, body: object) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const origin = request.headers.get("origin");
  if (!origin || !URL.canParse(origin) || new URL(origin).host !== request.headers.get("host")) return reply(403, { error: "Not allowed." });
  const token = await currentAdmin();
  if (!token) return reply(401, { error: "Your session has ended. Please sign in again." });

  const { BREVO_API_KEY, NOTIFY_FROM_EMAIL } = process.env;
  if (!BREVO_API_KEY || !NOTIFY_FROM_EMAIL) return reply(503, { error: "Email is not set up." });

  const raw = await request.text();
  if (raw.length > MAX_BYTES) return reply(413, { error: "The PDF is too large to email." });
  let json: unknown;
  try { json = JSON.parse(raw); } catch { return reply(400, { error: "Invalid request." }); }
  const parsed = input.safeParse(json);
  const id = z.uuid().safeParse((await params).id);
  if (!parsed.success || !id.success) return reply(400, { error: "Check the email address, subject and message." });
  const mail = parsed.data;

  const row = await getDocument(token, id.data).catch(() => null);
  if (!row) return reply(404, { error: "This document was not found." });

  try {
    const replyTo = row.data.business.email || NOTIFY_FROM_EMAIL;
    const res = await fetch(`${process.env.BREVO_API_URL ?? "https://api.brevo.com"}/v3/smtp/email`, {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: { name: row.data.business.tradeName, email: NOTIFY_FROM_EMAIL },
        replyTo: { email: replyTo },
        to: [{ email: mail.to, ...(row.client_name && { name: row.client_name }) }],
        ...(mail.cc && { cc: [{ email: mail.cc }] }),
        subject: mail.subject.replace(/\s+/g, " "),
        textContent: mail.message,
        attachment: [{ name: fileName(row.number, row.client_name), content: mail.pdf }],
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      console.error("Document email failed with status", res.status);
      return reply(502, { error: "The email was not accepted. Please check the address and try again." });
    }
  } catch {
    console.error("Document email: no reply");
    return reply(504, { error: "The email service did not reply, so the email may or may not have been sent. Check Brevo before sending again." });
  }

  try {
    await markSent(token, row, mail.to);
    return reply(200, { ok: true });
  } catch {
    return reply(200, { ok: true, warning: "The email was sent, but the document could not be marked as sent." });
  }
}
