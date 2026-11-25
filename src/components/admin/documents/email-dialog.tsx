"use client";

import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { buttonClass } from "@/components/ui/button-class";
import { typeLabel, type DocumentType } from "@/lib/documents/model";
import { cn } from "@/lib/utils/cn";
import { Area, Field } from "./fields";

export interface EmailInput { to: string; cc: string; subject: string; message: string }
interface Props { type: DocumentType; number: string; to: string; clientName: string; business: string; alreadySentTo: string | null; busy: boolean; onCancel: () => void; onSend: (input: EmailInput) => void }

const opening: Record<DocumentType, string> = {
  quotation: "Please find your quotation attached.",
  invoice: "Please find your invoice attached.",
  receipt: "Thank you for your payment. Please find your receipt attached.",
};

export function EmailDialog({ type, number, to, clientName, business, alreadySentTo, busy, onCancel, onSend }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [mail, setMail] = useState<EmailInput>({
    to, cc: "", subject: `${typeLabel[type]} ${number} from ${business}`,
    message: `Dear ${clientName},\n\n${opening[type]}\n\nPlease reply to this email if you have any questions.\n\nKind regards,\n${business}`,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof EmailInput) => (v: string) => setMail((m) => ({ ...m, [k]: v }));

  useEffect(() => { dialog.current?.showModal(); }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!z.email().safeParse(mail.to).success) next.to = "Enter a valid email address";
    if (mail.cc && !z.email().safeParse(mail.cc).success) next.cc = "Enter a valid email address";
    if (!mail.subject.trim()) next.subject = "Enter a subject";
    if (!mail.message.trim()) next.message = "Enter a message";
    setErrors(next);
    if (Object.keys(next).length === 0) onSend(mail);
  };

  return (
    <dialog ref={dialog} aria-label="Email to client" onCancel={(e) => { e.preventDefault(); if (!busy) onCancel(); }} className="m-auto w-full max-w-xl rounded-xl p-0 shadow-card backdrop:bg-navy/70">
      <form onSubmit={submit} noValidate className="space-y-4 p-5 text-body sm:p-7">
        <h2 className="text-xl">Email {typeLabel[type].toLowerCase()} {number}</h2>
        {alreadySentTo && <p className="rounded-lg bg-mist p-3 font-medium text-navy">This was already emailed to {alreadySentTo}. Sending again delivers another copy.</p>}
        <Field label="To" type="email" value={mail.to} onChange={set("to")} error={errors.to} />
        <Field label="Copy to (optional)" type="email" value={mail.cc} onChange={set("cc")} error={errors.cc} />
        <Field label="Subject" value={mail.subject} onChange={set("subject")} error={errors.subject} />
        <Area label="Message" rows={8} value={mail.message} onChange={set("message")} error={errors.message} />
        <p className="text-sm">The PDF is attached automatically. Sending cannot be undone.</p>
        <div className="flex flex-wrap gap-2">
          <button type="submit" disabled={busy} className={buttonClass()}>{busy ? "Sending" : "Send email"}</button>
          <button type="button" disabled={busy} onClick={onCancel} className={cn(buttonClass("secondary"))}>Cancel</button>
        </div>
      </form>
    </dialog>
  );
}
