import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "./site-header";

/** Public website frame. The admin area does not use it. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">{children}</main>
      <SiteFooter />
    </>
  );
}
