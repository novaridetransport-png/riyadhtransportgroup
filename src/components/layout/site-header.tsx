import Link from "next/link";
import { HeaderNav } from "@/components/navigation/header-nav";
import { Logo } from "@/components/ui/logo";
import { bookingLink, headerGroups, headerLinks } from "@/config/navigation";

export function SiteHeader() {
  return (
    <header className="on-dark sticky top-0 z-50 border-b border-white/10 bg-navy">
      <div className="shell flex h-18 items-center justify-between gap-4">
        <Link href="/" aria-label="Riyadh Transport Group, home"><Logo /></Link>
        <HeaderNav groups={headerGroups} links={headerLinks} booking={bookingLink} />
      </div>
    </header>
  );
}
