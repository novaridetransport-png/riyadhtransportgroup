import type { Metadata } from "next";
import { site } from "@/config/site";
import { getPage, isPublished, type PagePath } from "@/config/urls";

/** Every page builds its metadata here so canonical and robots always follow the registry. */
export function pageMetadata(path: PagePath, title: string, description: string): Metadata {
  const indexable = site.indexingEnabled && getPage(path).index && isPublished(path);
  const image = { url: "/og.png", width: 1200, height: 630, alt: `${site.name}. ${site.positioning}` };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: { index: indexable, follow: true },
    openGraph: { type: "website", siteName: site.name, locale: "en_US", url: path, title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
