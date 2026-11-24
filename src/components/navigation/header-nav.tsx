"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { buttonClass } from "@/components/ui/button-class";
import type { NavGroup, NavLink } from "@/config/navigation";
import { cn } from "@/lib/utils/cn";

export function HeaderNav({ groups, links, booking }: { groups: NavGroup[]; links: NavLink[]; booking: NavLink }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const close = () => { setOpen(null); setMobile(false); };

  useEffect(() => {
    if (!open && !mobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobile) menuButton.current?.focus();
      else root.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]')?.focus();
      close();
    };
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, mobile]);

  const menuId = (label: string) => `menu-${label.replace(/\s/g, "-").toLowerCase()}`;

  return (
    <div ref={root} className="flex items-center gap-3" onBlur={(e) => { if (e.relatedTarget && !root.current?.contains(e.relatedTarget)) close(); }}>
      <nav aria-label="Main" className="hidden items-center lg:flex">
        {groups.map((g) => (
          <div key={g.label} className="relative">
            <button type="button" aria-expanded={open === g.label} aria-controls={menuId(g.label)} onClick={() => setOpen(open === g.label ? null : g.label)}
              className="flex min-h-11 items-center gap-1 px-3 text-[.95rem] font-medium text-white/85 hover:text-white">
              {g.label}<ChevronDown aria-hidden="true" className={cn("size-4 transition-transform", open === g.label && "rotate-180")} />
            </button>
            <ul id={menuId(g.label)} hidden={open !== g.label}
              className={cn("on-light absolute left-0 top-full mt-3 rounded-lg border border-line bg-white p-2 shadow-card", g.links.length > 6 ? "w-[26rem] columns-2 gap-1" : "w-64")}>
              {g.links.map((l) => (
                <li key={l.href} className="break-inside-avoid">
                  <Link href={l.href} prefetch={false} onClick={close} className="block rounded-md px-3 py-2.5 text-[.95rem] font-medium text-navy hover:bg-mist hover:text-royal">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {links.map((l) => (
          <Link key={l.href} href={l.href} prefetch={false} className="flex min-h-11 items-center px-3 text-[.95rem] font-medium text-white/85 hover:text-white">{l.label}</Link>
        ))}
      </nav>
      <Link href={booking.href} onClick={close} className={cn(buttonClass(), "!min-h-11 !px-4 !py-2 !text-[.95rem]")}>
        <span>Book<span className="hidden sm:inline"> Your Ride</span></span>
      </Link>
      <button ref={menuButton} type="button" aria-expanded={mobile} aria-controls="mobile-menu" aria-label={mobile ? "Close menu" : "Open menu"}
        onClick={() => setMobile(!mobile)} className="grid size-11 place-items-center rounded-lg border border-white/25 text-white lg:hidden">
        {mobile ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <nav id="mobile-menu" aria-label="Mobile" hidden={!mobile} className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-navy px-4 pb-6 shadow-card sm:px-6 lg:hidden">
        {groups.map((g) => (
          <details key={g.label} className="group border-b border-white/10">
            <summary className="flex min-h-14 list-none items-center justify-between font-semibold text-white [&::-webkit-details-marker]:hidden">
              {g.label}<ChevronDown aria-hidden="true" className="size-5 transition-transform group-open:rotate-180" />
            </summary>
            <ul className="pb-3">
              {g.links.map((l) => <li key={l.href}><Link href={l.href} prefetch={false} onClick={close} className="flex min-h-11 items-center border-l border-gold/60 pl-4 text-white/85">{l.label}</Link></li>)}
            </ul>
          </details>
        ))}
        {links.map((l) => <Link key={l.href} href={l.href} prefetch={false} onClick={close} className="flex min-h-14 items-center border-b border-white/10 font-semibold text-white">{l.label}</Link>)}
        <Link href={booking.href} onClick={close} className={cn(buttonClass(), "mt-6 w-full")}>{booking.label}</Link>
      </nav>
    </div>
  );
}
