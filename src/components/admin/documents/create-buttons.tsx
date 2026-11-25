"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createDocument } from "@/app/admin/documents/actions";
import { buttonClass } from "@/components/ui/button-class";
import { utilityPaths } from "@/config/urls";
import { typeLabel, type DocumentType } from "@/lib/documents/model";
import { cn } from "@/lib/utils/cn";

export function CreateButtons({ types, inquiryId, prefix = "New" }: { types: DocumentType[]; inquiryId?: string; prefix?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const create = async (type: DocumentType) => {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await createDocument({ type, inquiryId });
      if (res.ok) return router.push(`${utilityPaths.documents}${res.id}/`);
      setError(res.error);
    } catch { setError("Something went wrong. Please try again."); }
    setBusy(false);
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      {types.map((t) => <button key={t} type="button" disabled={busy} onClick={() => create(t)} className={cn(buttonClass("secondary"), "!min-h-11 !px-4 !py-2 !text-[.95rem]")}>{prefix} {typeLabel[t].toLowerCase()}</button>)}
      {error && <p role="alert" className="text-sm font-medium text-danger">{error}</p>}
    </div>
  );
}
