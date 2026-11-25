"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { utilityPaths } from "@/config/urls";
import { deleteDocument, getDocument, getInquiry, getSettings, insertDocument, saveSettings, updateDocument } from "@/lib/admin/documents";
import { requireAdmin } from "@/lib/admin/supabase";
import { blankDocument, convertDocument, documentSchema, documentTypes, inquiryInput, settingsSchema, statusesFor } from "@/lib/documents/model";

export type Result = { ok: true; id?: string } | { ok: false; error: string; fields?: Record<string, string> };
const unavailable: Result = { ok: false, error: "The change could not be saved. Please try again." };

function invalid(error: z.ZodError): Result {
  const fields: Record<string, string> = {};
  for (const i of error.issues) fields[i.path.join(".")] ??= i.message;
  return { ok: false, error: "Please correct the marked fields.", fields };
}

const createInput = z.object({ type: z.enum(documentTypes), inquiryId: z.uuid().optional(), sourceId: z.uuid().optional() });

/** New, from an inquiry, or converted/copied from another document. */
export async function createDocument(input: z.infer<typeof createInput>): Promise<Result> {
  const token = await requireAdmin();
  const { type, inquiryId, sourceId } = createInput.parse(input);
  try {
    const settings = await getSettings(token);
    let data = blankDocument(type, settings);
    let inquiry_id = inquiryId ?? null;
    if (sourceId) {
      const source = await getDocument(token, sourceId);
      if (!source) return { ok: false, error: "The original document was not found." };
      data = convertDocument(source.data, source.number, type, settings);
      inquiry_id = source.inquiry_id;
    } else if (inquiryId) {
      const inquiry = await getInquiry(token, inquiryId);
      if (!inquiry) return { ok: false, error: "The inquiry was not found." };
      data = inquiryInput(inquiry, data);
    }
    const id = await insertDocument(token, type, data, { inquiry_id, source_id: sourceId ?? null });
    revalidatePath(utilityPaths.documents);
    return { ok: true, id };
  } catch (e) {
    console.error("Document create:", e instanceof Error ? e.message : "unknown");
    return unavailable;
  }
}

export async function saveDocument(id: string, draft: unknown): Promise<Result> {
  const token = await requireAdmin();
  const parsed = documentSchema.safeParse(draft);
  if (!parsed.success) return invalid(parsed.error);
  try {
    const row = await getDocument(token, z.uuid().parse(id));
    if (!row) return { ok: false, error: "This document no longer exists." };
    if (!statusesFor[row.type].includes(parsed.data.status)) return { ok: false, error: "That status does not apply to this document." };
    if (!(await updateDocument(token, id, parsed.data))) return { ok: false, error: "This document no longer exists." };
    revalidatePath(utilityPaths.documents);
    return { ok: true };
  } catch (e) {
    console.error("Document save:", e instanceof Error ? e.message : "unknown");
    return unavailable;
  }
}

export async function removeDocument(id: string): Promise<Result> {
  const token = await requireAdmin();
  try {
    if (!(await deleteDocument(token, z.uuid().parse(id)))) return { ok: false, error: "Only drafts that were never emailed can be deleted. Set the status to Cancelled instead." };
    revalidatePath(utilityPaths.documents);
    return { ok: true };
  } catch (e) {
    console.error("Document delete:", e instanceof Error ? e.message : "unknown");
    return unavailable;
  }
}

export async function storeSettings(draft: unknown): Promise<Result> {
  const token = await requireAdmin();
  const parsed = settingsSchema.safeParse(draft);
  if (!parsed.success) return invalid(parsed.error);
  try {
    await saveSettings(token, parsed.data);
    return { ok: true };
  } catch (e) {
    console.error("Settings save:", e instanceof Error ? e.message : "unknown");
    return unavailable;
  }
}
