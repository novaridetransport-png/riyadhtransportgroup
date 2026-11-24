import { SiteShell } from "@/components/layout/site-shell";
import { JsonLd, organizationLd } from "@/lib/seo/jsonld";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}<JsonLd data={organizationLd} /></SiteShell>;
}
