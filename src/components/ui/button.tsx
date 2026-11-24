import { linkFor, type PagePath } from "@/config/urls";
import { buttonClass, type ButtonVariant } from "./button-class";
import { PageLink } from "./page-link";

export function ButtonLink({ href, variant = "primary", children }: { href: PagePath; variant?: ButtonVariant; children: React.ReactNode }) {
  if (!linkFor(href)) return null;
  return <PageLink href={href} className={buttonClass(variant)}>{children}</PageLink>;
}
