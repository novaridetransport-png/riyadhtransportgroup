import type { PagePath } from "./urls";

/** Curated homepage routes. `note` is verifiable geography only. */
export interface FeaturedRoute { path: PagePath; to: string; region: string; note: string }

export const featuredSaudi: FeaturedRoute[] = [
  { path: "/saudi-arabia/riyadh-to-dammam/", to: "Dammam", region: "Eastern Province", note: "Direct to the Arabian Gulf coast" },
  { path: "/saudi-arabia/riyadh-to-khobar/", to: "Khobar", region: "Eastern Province", note: "The Saudi side of the King Fahd Causeway" },
  { path: "/saudi-arabia/riyadh-to-qassim/", to: "Qassim", region: "Central Saudi Arabia", note: "Including Buraydah and Unaizah" },
];

export const featuredInternational: FeaturedRoute[] = [
  { path: "/international-transfers/riyadh-to-bahrain/", to: "Bahrain", region: "Bahrain", note: "Via the King Fahd Causeway" },
  { path: "/international-transfers/riyadh-to-doha/", to: "Doha", region: "Qatar", note: "Via the Salwa and Abu Samra crossing" },
  { path: "/international-transfers/riyadh-to-dubai/", to: "Dubai", region: "United Arab Emirates", note: "Via the Al Batha and Al Ghuwaifat crossing" },
  { path: "/international-transfers/riyadh-to-abu-dhabi/", to: "Abu Dhabi", region: "United Arab Emirates", note: "Via the Al Batha and Al Ghuwaifat crossing" },
];

/** Place suggestions in the booking form (free text is also accepted). */
export const placeSuggestions = [
  "Riyadh", "Dammam", "Khobar", "Qassim", "Buraydah", "Unaizah", "Jeddah", "Makkah", "Madinah",
  "Bahrain", "Doha", "Dubai", "Abu Dhabi", "Kuwait City", "Muscat",
];
