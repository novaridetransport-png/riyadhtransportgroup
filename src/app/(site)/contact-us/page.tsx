import { Mail, MessageCircle, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { PageLink } from "@/components/ui/page-link";
import { site, whatsappUrl } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "/contact-us/",
  "Contact Riyadh Transport Group | Call, WhatsApp or Email",
  "Call, WhatsApp or email Riyadh Transport Group about a private transfer from Riyadh, an existing request, a quotation or an invoice.",
);

export default function ContactPage() {
  const { phone, phoneDisplay, email } = site.contact;
  const wa = whatsappUrl("Hello, I have a question about a private transfer.");
  const channels = [
    phone && { icon: Phone, label: "Call", value: phoneDisplay, href: `tel:${phone}`, note: "For questions you would rather talk through." },
    wa && { icon: MessageCircle, label: "WhatsApp", value: phoneDisplay, href: wa, note: "Send your route and date, and attach anything useful." },
    email && { icon: Mail, label: "Email", value: email, href: `mailto:${email}`, note: "Good for documents, company travel and longer questions." },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href: string; note: string }[];

  return (
    <section className="pb-20 pt-8 lg:pb-28">
      <div className="shell">
        <Breadcrumbs path="/contact-us/" />
        <h1 className="mt-8 text-section text-navy">Contact us</h1>
        <p className="mt-4 max-w-2xl text-lg">Ask about a journey, follow up on a request, or get help with a quotation, invoice or receipt.</p>

        {channels.length > 0 && (
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {channels.map((c) => (
              <li key={c.label}>
                <a href={c.href} {...(c.label === "WhatsApp" && { target: "_blank", rel: "noopener noreferrer" })} className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition hover:border-royal">
                  <c.icon className="size-6 text-royal" aria-hidden="true" />
                  <span className="mt-4 text-sm font-semibold text-muted">{c.label}</span>
                  <span className="mt-1 text-lg font-bold wrap-anywhere text-navy group-hover:text-royal">{c.value}</span>
                  <span className="mt-2 text-[.95rem]">{c.note}</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <section aria-labelledby="new-h">
            <h2 id="new-h" className="text-2xl">Planning a new journey?</h2>
            <p className="mt-3 text-lg leading-relaxed">The request form asks for everything needed to reply with a vehicle category and fare: route, date, time, passengers and luggage.</p>
            <div className="mt-6"><ButtonLink href="/book-transport/">Request a quote</ButtonLink></div>
          </section>
          <section aria-labelledby="help-h">
            <h2 id="help-h" className="text-2xl">To help us answer quickly</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-lg leading-relaxed">
              <li>Give the pickup and destination, with a map pin if the place is hard to find.</li>
              <li>For a quotation, invoice or receipt, quote its number, such as QT-2026-0001.</li>
              <li>Do not send passport or card details by message or email.</li>
            </ul>
          </section>
        </div>

        <p className="mt-14 max-w-3xl border-l-4 border-gold pl-5 leading-relaxed">
          {site.operatingModel} A request is not a confirmed booking until the vehicle and fare have been agreed with you.
          Read how your details are handled in our <PageLink href="/privacy-policy/" className="font-semibold text-royal underline underline-offset-4">privacy policy</PageLink>.
        </p>
      </div>
    </section>
  );
}
