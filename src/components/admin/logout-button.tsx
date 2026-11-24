"use client";

import { useTransition } from "react";
import { logout } from "@/app/admin/actions";
import { utilityPaths } from "@/config/urls";

export function LogoutButton({ className }: { className: string }) {
  const [pending, start] = useTransition();
  return (
    <button type="button" disabled={pending} className={className} onClick={() => start(async () => { await logout(); window.location.assign(utilityPaths.adminLogin); })}>
      Sign out
    </button>
  );
}
