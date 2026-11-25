import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";
import { buttonClass } from "@/components/ui/button-class";
import { utilityPaths } from "@/config/urls";
import { cn } from "@/lib/utils/cn";

const tabs = [["inquiries", "Inquiries", utilityPaths.admin], ["documents", "Documents", utilityPaths.documents], ["settings", "Settings", utilityPaths.settings]] as const;

export function AdminNav({ current }: { current: (typeof tabs)[number][0] }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
      <nav aria-label="Admin" className="flex flex-wrap gap-1">
        {tabs.map(([key, label, href]) => (
          <Link key={key} href={href} prefetch={false} aria-current={key === current ? "page" : undefined} className={cn("flex min-h-11 items-center rounded-lg px-4 font-semibold", key === current ? "bg-royal text-white" : "text-navy hover:bg-white")}>{label}</Link>
        ))}
      </nav>
      <LogoutButton className={cn(buttonClass("secondary"), "!min-h-11 !px-4 !py-2 !text-[.95rem]")} />
    </div>
  );
}
