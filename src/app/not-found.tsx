import type { Metadata } from "next";
import { NotFoundContent } from "@/components/layout/not-found-content";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Page not available" };

/** Unknown addresses: nothing else draws the site frame here. */
export default function NotFound() {
  return <SiteShell><NotFoundContent /></SiteShell>;
}
