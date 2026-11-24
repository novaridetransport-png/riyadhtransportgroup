import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { indexablePaths } from "@/config/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexingEnabled) return [];
  return indexablePaths().map((path) => ({ url: new URL(path, site.url).toString() }));
}
