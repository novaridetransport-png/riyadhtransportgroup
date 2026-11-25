/** Call, WhatsApp and email links. On unless the variable is set to "false". */
const contactEnabled = process.env.NEXT_PUBLIC_CONTACT_ENABLED !== "false";

/** Business facts. `null` means "not supplied or verified": the UI hides it. */
export const site = {
  name: "Riyadh Transport Group",
  url: "https://riyadhtransportgroup.com",
  positioning: "Connecting Riyadh to Saudi Arabia and Beyond.",
  tagline: "Private Rides. Direct Transfers. Reliable Journeys.",
  description:
    "Private door-to-door transfers from Riyadh to Saudi cities and GCC destinations, arranged through independent drivers and transport partners.",
  operatingModel: "Transportation is arranged through independent drivers and transport partners.",
  contact: {
    /** International format, digits only, e.g. "9665XXXXXXXX" */
    whatsapp: contactEnabled ? "966574205462" : null,
    /** E.164, used for tel: links and structured data */
    phone: contactEnabled ? "+966574205462" : null,
    phoneDisplay: contactEnabled ? "+966 57 420 5462" : null,
    /** General contact. New inquiries are sent to booking@ (NOTIFY_TO_EMAIL). */
    email: contactEnabled ? "info@riyadhtransportgroup.com" : null,
  },
  /** Search engines may index the site. "false" makes every page noindex and empties the sitemap. */
  indexingEnabled: process.env.NEXT_PUBLIC_INDEXING_ENABLED !== "false",
  social: [] as { label: string; href: string }[],
  areaServed: ["Saudi Arabia", "Bahrain", "Qatar", "United Arab Emirates", "Kuwait", "Oman"],
};

export function whatsappUrl(message: string): string | null {
  return site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}` : null;
}
