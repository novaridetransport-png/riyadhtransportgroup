/**
 * CENTRAL URL REGISTRY: the only place a URL may be defined.
 *
 * Mirrors the approved Master URL Architecture. Do not add, rename or remove a
 * path without approval; a published path may only change with a 301 redirect.
 *
 * status
 *   published    page exists, is tested, and (when `index`) is in the sitemap
 *   planned      approved, page not built yet
 *   unconfirmed  service coverage not confirmed
 * Only published pages are linked (see `linkFor`).
 *
 * Keep this file free of imports: the scripts in /scripts load it directly.
 */
export type PageStatus = "published" | "planned" | "unconfirmed";
export type PageType = "main" | "service" | "directory" | "route" | "airport" | "vehicle";
export type Country = "Saudi Arabia" | "Bahrain" | "Qatar" | "United Arab Emirates" | "Kuwait" | "Oman";

export interface RouteInfo {
  origin: string;
  destination: string;
  /** Country at the non-Riyadh end of the journey */
  country: Country;
  direction: "outbound" | "return";
}
export interface PageEntry {
  /** Page title used in navigation, breadcrumbs and link lists */
  label: string;
  type: PageType;
  status: PageStatus;
  /** false = noindex and excluded from the sitemap */
  index: boolean;
  route?: RouteInfo;
}

const page = (label: string, type: PageType, status: PageStatus = "published", index = true): PageEntry => ({ label, type, status, index });
const main = (label: string, status: PageStatus = "planned", index = true) => page(label, "main", status, index);
const vehicle = (label: string) => page(label, "vehicle", "planned");
const airport = (label: string) => page(label, "airport", "unconfirmed");
const reserved = (label: string) => page(label, "directory", "unconfirmed");
const out = (destination: string, country: Country = "Saudi Arabia"): PageEntry => ({
  ...page(`Riyadh to ${destination}`, "route"), route: { origin: "Riyadh", destination, country, direction: "outbound" },
});
const back = (origin: string, country: Country = "Saudi Arabia"): PageEntry => ({
  ...page(`${origin} to Riyadh`, "route"), route: { origin, destination: "Riyadh", country, direction: "return" },
});

export const registry = {
  // Main pages
  "/": main("Home", "published"),
  "/about-us/": main("About Us"),
  "/contact-us/": main("Contact Us"),
  "/vehicles/": main("Vehicle Categories"),
  "/faqs/": main("Frequently Asked Questions"),
  "/book-transport/": main("Book Your Ride", "published", false),
  "/privacy-policy/": main("Privacy Policy"),
  "/terms-and-conditions/": main("Terms & Conditions"),
  "/cancellation-policy/": main("Cancellation Policy"),

  // Services
  "/services/": page("All Services", "service"),
  "/services/private-transportation/": page("Private Transportation", "service"),
  "/services/intercity-transfers/": page("Intercity Transfers", "service"),
  // noindex until at least one airport is confirmed
  "/services/airport-transfers/": page("Airport Transfers", "service", "published", false),
  "/services/business-transportation/": page("Business Transportation", "service"),
  "/services/family-transportation/": page("Family Transportation", "service"),

  // Saudi Arabia
  "/saudi-arabia/": page("Saudi Arabia Routes", "directory"),
  "/saudi-arabia/riyadh-to-dammam/": out("Dammam"),
  "/saudi-arabia/riyadh-to-khobar/": out("Khobar"),
  "/saudi-arabia/riyadh-to-qassim/": out("Qassim"),
  "/saudi-arabia/riyadh-to-buraydah/": out("Buraydah"),
  "/saudi-arabia/riyadh-to-unaizah/": out("Unaizah"),
  "/saudi-arabia/riyadh-to-jeddah/": out("Jeddah"),
  "/saudi-arabia/riyadh-to-makkah/": out("Makkah"),
  "/saudi-arabia/riyadh-to-madinah/": out("Madinah"),
  "/saudi-arabia/dammam-to-riyadh/": back("Dammam"),
  "/saudi-arabia/khobar-to-riyadh/": back("Khobar"),
  "/saudi-arabia/qassim-to-riyadh/": back("Qassim"),
  "/saudi-arabia/buraydah-to-riyadh/": back("Buraydah"),
  "/saudi-arabia/unaizah-to-riyadh/": back("Unaizah"),
  "/saudi-arabia/jeddah-to-riyadh/": back("Jeddah"),
  "/saudi-arabia/makkah-to-riyadh/": back("Makkah"),
  "/saudi-arabia/madinah-to-riyadh/": back("Madinah"),

  // International
  "/international-transfers/": page("International Transfers", "directory"),
  "/international-transfers/riyadh-to-bahrain/": out("Bahrain", "Bahrain"),
  "/international-transfers/riyadh-to-doha/": out("Doha", "Qatar"),
  "/international-transfers/riyadh-to-dubai/": out("Dubai", "United Arab Emirates"),
  "/international-transfers/riyadh-to-abu-dhabi/": out("Abu Dhabi", "United Arab Emirates"),
  "/international-transfers/riyadh-to-kuwait/": out("Kuwait", "Kuwait"),
  "/international-transfers/riyadh-to-muscat/": out("Muscat", "Oman"),
  "/international-transfers/bahrain-to-riyadh/": back("Bahrain", "Bahrain"),
  "/international-transfers/doha-to-riyadh/": back("Doha", "Qatar"),
  "/international-transfers/dubai-to-riyadh/": back("Dubai", "United Arab Emirates"),
  "/international-transfers/abu-dhabi-to-riyadh/": back("Abu Dhabi", "United Arab Emirates"),
  "/international-transfers/kuwait-to-riyadh/": back("Kuwait", "Kuwait"),
  "/international-transfers/muscat-to-riyadh/": back("Muscat", "Oman"),

  // Future destination directory (reserved)
  "/international-transfers/bahrain/": reserved("Bahrain"),
  "/international-transfers/qatar/": reserved("Qatar"),
  "/international-transfers/uae/": reserved("United Arab Emirates"),
  "/international-transfers/kuwait/": reserved("Kuwait"),
  "/international-transfers/oman/": reserved("Oman"),

  // Airports (publish only after coverage is confirmed)
  "/services/airport-transfers/riyadh-airport/": airport("Riyadh Airport (RUH)"),
  "/services/airport-transfers/dammam-airport/": airport("Dammam Airport (DMM)"),
  "/services/airport-transfers/qassim-airport/": airport("Qassim Airport (ELQ)"),
  "/services/airport-transfers/jeddah-airport/": airport("Jeddah Airport (JED)"),
  "/services/airport-transfers/madinah-airport/": airport("Madinah Airport (MED)"),
  "/services/airport-transfers/bahrain-airport/": airport("Bahrain Airport (BAH)"),
  "/services/airport-transfers/doha-airport/": airport("Doha Airport (DOH)"),
  "/services/airport-transfers/dubai-airport/": airport("Dubai Airport (DXB)"),
  "/services/airport-transfers/abu-dhabi-airport/": airport("Abu Dhabi Airport (AUH)"),
  "/services/airport-transfers/kuwait-airport/": airport("Kuwait Airport (KWI)"),

  // Vehicles
  "/vehicles/sedan/": vehicle("Sedan"),
  "/vehicles/suv/": vehicle("SUV"),
  "/vehicles/gmc-premium-suv/": vehicle("GMC & Premium SUV"),
  "/vehicles/premium-vans/": vehicle("Premium Vans"),
} satisfies Record<string, PageEntry>;

/** Internal tools: never linked, indexed or listed in the sitemap. 404 until Supabase is configured. */
export const utilityPaths = { admin: "/admin/", adminLogin: "/admin/login/" } as const;

export type PagePath = keyof typeof registry;
export type SaudiRoutePath = Extract<PagePath, `/saudi-arabia/${string}-to-${string}/`>;
export type InternationalRoutePath = Extract<PagePath, `/international-transfers/${string}-to-${string}/`>;
export type RoutePath = SaudiRoutePath | InternationalRoutePath;

export const allPaths = Object.keys(registry) as PagePath[];
export const getPage = (path: PagePath): PageEntry => registry[path];
export const isPublished = (path: PagePath) => getPage(path).status === "published";
export const indexablePaths = () => allPaths.filter((p) => isPublished(p) && getPage(p).index);

/** Homepage sections that stand in for pages which are not built yet. */
const sectionFallbacks: Partial<Record<PagePath, string>> = {
  "/vehicles/": "/#vehicles",
  "/faqs/": "/#faq",
};

/** Where a link should point, or null when there is nothing live to link to. */
export const linkFor = (path: PagePath): string | null => (isPublished(path) ? path : (sectionFallbacks[path] ?? null));

/** Published routes of a directory, in registry order. */
export const publishedRoutes = (directory: "/saudi-arabia/" | "/international-transfers/", direction: RouteInfo["direction"]) =>
  allPaths.filter((p) => p.startsWith(directory) && getPage(p).route?.direction === direction && isPublished(p));

/** Breadcrumb trail derived from the URL itself, so it always matches the hierarchy. */
export function breadcrumbTrail(path: PagePath): PagePath[] {
  const trail: PagePath[] = ["/"];
  let current = "/";
  for (const segment of path.split("/").filter(Boolean)) {
    current += `${segment}/`;
    if (current in registry) trail.push(current as PagePath);
  }
  return trail;
}

/** The opposite-direction page of a route, when one is registered. */
export function returnPath(path: PagePath): PagePath | null {
  const match = path.match(/^(\/[^/]+\/)(.+)-to-(.+)\/$/);
  const reverse = match && `${match[1]}${match[3]}-to-${match[2]}/`;
  return reverse && reverse in registry ? (reverse as PagePath) : null;
}
