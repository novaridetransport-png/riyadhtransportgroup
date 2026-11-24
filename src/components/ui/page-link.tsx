import Link from "next/link";
import { linkFor, type PagePath } from "@/config/urls";

/** Internal link. Only accepts registered URLs; renders plain text when the page is not live. */
export function PageLink({ href, className, children }: { href: PagePath; className?: string; children: React.ReactNode }) {
  const target = linkFor(href);
  return target ? <Link href={target} className={className}>{children}</Link> : <div className={className}>{children}</div>;
}
