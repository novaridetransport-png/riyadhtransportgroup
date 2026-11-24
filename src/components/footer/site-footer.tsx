import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { companyNav, internationalNav, policyLinks, saudiNav, servicesNav } from "@/config/navigation";
import { site } from "@/config/site";

export function SiteFooter() {
  const { phone, phoneDisplay, email } = site.contact;
  return (
    <footer className="on-dark bg-navy text-white/75">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.2fr_3fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-[.95rem] leading-relaxed">{site.positioning} {site.operatingModel}</p>
          {(phone || email) && (
            <ul className="mt-5 space-y-2 text-[.95rem]">
              {phone && <li><a href={`tel:${phone}`} className="inline-block py-1.5 hover:text-white">{phoneDisplay}</a></li>}
              {email && <li><a href={`mailto:${email}`} className="hover:text-white">{email}</a></li>}
            </ul>
          )}
          {site.social.length > 0 && (
            <ul className="mt-5 flex gap-4 text-[.95rem]">
              {site.social.map((s) => <li key={s.href}><a href={s.href} rel="noopener noreferrer" className="hover:text-white">{s.label}</a></li>)}
            </ul>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {[servicesNav, saudiNav, internationalNav, companyNav].map((g) => (
            <nav key={g.label} aria-label={`${g.label} links`}>
              <p className="font-semibold text-white">{g.label}</p>
              <ul className="mt-3 text-[.95rem]">
                {g.links.map((l) => <li key={l.href}><Link href={l.href} prefetch={false} className="inline-block py-1.5 hover:text-white">{l.label}</Link></li>)}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.name}</p>
          <ul className="flex flex-wrap gap-x-6">
            {policyLinks.map((l) => <li key={l.href}><Link href={l.href} prefetch={false} className="inline-block py-1.5 hover:text-white">{l.label}</Link></li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
