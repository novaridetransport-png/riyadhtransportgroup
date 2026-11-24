import type { Metadata } from "next";
import { Logo } from "@/components/ui/logo";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="on-dark bg-navy">
        <div className="shell flex h-18 items-center justify-between gap-4"><Logo /><span className="rounded-md border border-gold px-3 py-1 text-sm font-semibold text-white">Admin</span></div>
      </header>
      <main id="main" tabIndex={-1} className="flex-1 bg-mist py-8 outline-none lg:py-12"><div className="shell">{children}</div></main>
    </>
  );
}
