import { site } from "@/config/site";
import { breadcrumbTrail, getPage, isPublished, type PagePath } from "@/config/urls";

const abs = (path: string) => new URL(path, site.url).toString();

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Contains supplied facts only: no address, rating, price or founding data. */
export const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": abs("/#organization"),
      name: site.name,
      url: abs("/"),
      logo: abs("/logo.png"),
      slogan: site.positioning,
      description: site.description,
      ...(site.contact.phone && { telephone: site.contact.phone }),
      ...(site.contact.email && { email: site.contact.email }),
      ...(site.social.length > 0 && { sameAs: site.social.map((s) => s.href) }),
    },
    { "@type": "WebSite", "@id": abs("/#website"), url: abs("/"), name: site.name, publisher: { "@id": abs("/#organization") }, inLanguage: "en" },
  ],
};

export const homeServiceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private transportation from Riyadh",
  serviceType: "Private passenger transfer",
  description: site.description,
  provider: { "@id": abs("/#organization") },
  areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })),
};

/** Service markup for a route, airport or service page. */
export function serviceLd(path: PagePath, content: { h1: string; description: string }) {
  const { route, label } = getPage(path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": abs(`${path}#service`),
    name: content.h1,
    description: content.description,
    serviceType: route ? `Private transfer, ${label}` : label,
    url: abs(path),
    provider: { "@id": abs("/#organization") },
    ...(route && { areaServed: [route.origin, route.destination].map((name) => ({ "@type": name === "Bahrain" || name === "Kuwait" ? "Country" : "Place", name })) }),
  };
}

export function breadcrumbLd(path: PagePath) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbTrail(path)
      .filter((p) => isPublished(p) || p === path)
      .map((p, i) => ({ "@type": "ListItem", position: i + 1, name: getPage(p).label, item: abs(p) })),
  };
}
