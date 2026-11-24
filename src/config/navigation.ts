import { getPage, linkFor, publishedRoutes, type PagePath } from "./urls";

export interface NavLink { href: string; label: string }
export interface NavGroup { label: string; links: NavLink[] }

/** Resolves registry paths to live links; pages that are not published are left out. */
const links = (...paths: PagePath[]): NavLink[] =>
  paths.flatMap((path) => {
    const href = linkFor(path);
    return href ? [{ href, label: getPage(path).label }] : [];
  });
const relabel = (path: PagePath, label: string) => links(path).map((l) => ({ ...l, label }));

export const servicesNav: NavGroup = {
  label: "Services",
  links: links("/services/private-transportation/", "/services/intercity-transfers/", "/services/airport-transfers/", "/services/business-transportation/", "/services/family-transportation/", "/services/"),
};
export const saudiNav: NavGroup = {
  label: "Saudi Arabia",
  links: [...links(...publishedRoutes("/saudi-arabia/", "outbound")), ...relabel("/saudi-arabia/", "All Saudi routes")],
};
export const internationalNav: NavGroup = {
  label: "International",
  links: [...links(...publishedRoutes("/international-transfers/", "outbound")), ...relabel("/international-transfers/", "All international routes")],
};
export const headerGroups = [servicesNav, saudiNav, internationalNav];
export const headerLinks: NavLink[] = [...relabel("/vehicles/", "Vehicles"), ...relabel("/contact-us/", "Contact")];
export const bookingLink = links("/book-transport/")[0];
export const companyNav: NavGroup = {
  label: "Company",
  links: [...links("/about-us/"), ...relabel("/vehicles/", "Vehicles"), ...relabel("/faqs/", "FAQs"), ...links("/contact-us/", "/book-transport/")],
};
export const policyLinks = links("/privacy-policy/", "/terms-and-conditions/", "/cancellation-policy/");
