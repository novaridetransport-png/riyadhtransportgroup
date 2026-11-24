import { isPublished } from "./urls";

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
    whatsapp: "966574205462" as string | null,
    /** E.164, used for tel: links and structured data */
    phone: "+966574205462" as string | null,
    phoneDisplay: "+966 57 420 5462",
    email: null as string | null,
  },
  /**
   * Lets the booking form store inquiries in Supabase. Needs the environment switch
   * AND a published privacy page, so data can never be collected without a notice.
   */
  formSubmissionsEnabled: process.env.NEXT_PUBLIC_FORM_SUBMISSIONS_ENABLED === "true" && isPublished("/privacy-policy/"),
  /** Search engines may index the site. Off until launch sign-off: every page is noindex and the sitemap is empty. */
  indexingEnabled: process.env.NEXT_PUBLIC_INDEXING_ENABLED === "true",
  social: [] as { label: string; href: string }[],
  areaServed: ["Saudi Arabia", "Bahrain", "Qatar", "United Arab Emirates", "Kuwait", "Oman"],
};

export function whatsappUrl(message: string): string | null {
  return site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}` : null;
}
