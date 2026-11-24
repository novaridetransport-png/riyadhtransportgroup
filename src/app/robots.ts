import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Non-indexable pages use a noindex meta tag, which crawlers must be able to fetch.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
