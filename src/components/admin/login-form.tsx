"use client";

import { useActionState, useEffect } from "react";
import { login } from "@/app/admin/actions";
import { buttonClass } from "@/components/ui/button-class";
import { utilityPaths } from "@/config/urls";

const control = "mt-1.5 block min-h-12 w-full rounded-lg border border-[#98a2b3] bg-white px-3.5 py-2.5 text-base text-navy";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, { ok: false, error: "" });
  useEffect(() => { if (state.ok) window.location.assign(utilityPaths.admin); }, [state.ok]);
  const busy = pending || state.ok;
  return (
    <form action={action} className="mt-6 space-y-4">
      <label className="block font-semibold text-navy">Email<input name="email" type="email" required autoComplete="username" className={control} /></label>
      <label className="block font-semibold text-navy">Password<input name="password" type="password" required maxLength={200} autoComplete="current-password" className={control} /></label>
      <p role="alert" className="min-h-6 font-medium text-danger">{state.error}</p>
      <button type="submit" disabled={busy} className={`${buttonClass()} w-full`}>{busy ? "Signing in" : "Sign in"}</button>
    </form>
  );
}
