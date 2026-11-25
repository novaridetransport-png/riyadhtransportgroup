import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "/privacy-policy/",
  "Privacy Policy | Riyadh Transport Group",
  "What Riyadh Transport Group collects when you send a transfer request, why, who receives it, how long it is kept and how to ask for deletion.",
);

const contact = "info@riyadhtransportgroup.com";
const sections: { title: string; body: string[]; list?: string[] }[] = [
  { title: "Who we are", body: [`This notice covers ${site.name} and riyadhtransportgroup.com. We arrange private transportation through independent drivers and transport partners. For any privacy question, email ${contact}.`] },
  { title: "What we collect", body: ["When you submit a request, we collect:"], list: [
    "Your name and phone or WhatsApp number",
    "Your email address and extra requirements, if you give them",
    "Journey details: pickup, destination, trip type, dates, time, passengers, luggage and vehicle category",
  ] },
  { title: "What to leave out", body: ["Please do not send passport or ID numbers, payment card details, or information about religion or health through the form. If someone needs assistance, describe only the practical help required."] },
  { title: "Why we use it", body: ["We use your details to check availability, prepare a quotation, coordinate a journey you ask for, answer you, and issue an invoice or receipt where one is needed. We do not sell your details. Name, phone and journey details are needed to answer a request; the other fields are optional."] },
  { title: "Who receives it", body: ["Requests are read by the site's administrator. Others receive only what they need:"], list: [
    "The independent driver or transport partner for a confirmed journey, who receives the details needed to carry it out",
    "Supabase, which stores requests in Singapore",
    "Brevo, which delivers our emails",
    "Cloudflare, which hosts and protects the website",
    "ImprovMX, which forwards email sent to our addresses",
    "WhatsApp, if you choose to message us there, under its own terms",
    "Authorities, where the law requires it",
  ] },
  { title: "Storage outside Saudi Arabia", body: ["Because of these providers, your details may be stored or handled outside Saudi Arabia, including in Singapore."] },
  { title: "How long we keep it", body: ["We delete a request within 6 months after the travel date. Quotations, invoices and receipts may be kept longer where business records must be kept. Emails and messages about a journey may remain in our mailbox until deleted."] },
  { title: "Cookies and tracking", body: ["The public website sets no advertising or analytics cookies. The hosting provider handles technical data, such as IP addresses, to deliver the site and limit abuse of the form."] },
  { title: "Your choices", body: [`You may ask to see, correct or delete your details, or to stop their use, by emailing ${contact}. We may need to confirm that the request comes from you. You may also complain to the competent data protection authority, which in Saudi Arabia is SDAIA.`] },
  { title: "Changes", body: ["If this notice changes, the new version will appear on this page with a new date."] },
];

export default function PrivacyPage() {
  return (
    <section className="pb-20 pt-8 lg:pb-28">
      <div className="shell">
        <Breadcrumbs path="/privacy-policy/" />
        <h1 className="mt-8 text-section text-navy">Privacy Policy</h1>
        <p className="mt-3 text-body">Last updated 25 November 2026</p>
        <div className="mt-10 max-w-3xl space-y-9">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl">{s.title}</h2>
              {s.body.map((b) => <p key={b} className="mt-2 leading-relaxed">{b}</p>)}
              {s.list && <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed">{s.list.map((l) => <li key={l}>{l}</li>)}</ul>}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
