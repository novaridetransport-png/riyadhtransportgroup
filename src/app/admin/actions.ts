"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { utilityPaths } from "@/config/urls";
import { deleteInquiry, isStatus, requireAdmin, requireConfigured, setStatus, signIn, signOut } from "@/lib/admin/supabase";

const id = (form: FormData) => z.uuid().parse(form.get("id"));

// Actions do not redirect: the browser navigates afterwards, which avoids a server self-request.
export type LoginState = { ok: boolean; error: string };

export async function login(_: LoginState, form: FormData): Promise<LoginState> {
  requireConfigured();
  const parsed = z.object({ email: z.email(), password: z.string().min(1).max(200) }).safeParse(Object.fromEntries(form));
  const error = parsed.success ? await signIn(parsed.data.email, parsed.data.password) : "invalid";
  if (error === "unavailable") return { ok: false, error: "Sign-in is not available right now. Please try again." };
  if (error) return { ok: false, error: "The email or password is not correct." };
  return { ok: true, error: "" };
}

export async function logout() {
  requireConfigured();
  await signOut();
}

export async function updateStatus(form: FormData) {
  const token = await requireAdmin();
  const status = form.get("status");
  if (!isStatus(status)) throw new Error("Unknown status");
  await setStatus(token, id(form), status);
  revalidatePath(utilityPaths.admin);
}

export async function removeInquiry(form: FormData) {
  const token = await requireAdmin();
  if (form.get("confirm") !== "yes") return;
  await deleteInquiry(token, id(form));
  revalidatePath(utilityPaths.admin);
}
