"use client";

import { Check, Copy, Send } from "lucide-react";
import { useState } from "react";
import { buttonClass } from "@/components/ui/button-class";
import { site } from "@/config/site";
import { bookingSummary, type BookingInput } from "@/lib/validation/booking";

/** Success is shown only after the server confirms that the inquiry was stored. */
export function BookingReview({ booking, headingRef, onEdit }: { booking: BookingInput; headingRef: React.Ref<HTMLHeadingElement>; onEdit: () => void }) {
  const enabled = site.formSubmissionsEnabled;
  const [id] = useState(() => crypto.randomUUID());
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [copied, setCopied] = useState<"idle" | "ok" | "failed">("idle");
  const rows = bookingSummary(booking);

  const send = async () => {
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/inquiries/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, website, booking }) });
      setState(res.ok ? "sent" : "failed");
    } catch { setState("failed"); }
  };
  const copy = async () => {
    const text = ["Private transfer inquiry", ...rows.map(([k, v]) => `${k}: ${v}`)].join("\n");
    try { await navigator.clipboard.writeText(text); setCopied("ok"); } catch { setCopied("failed"); }
  };

  const lead = state === "sent" ? "We have received your inquiry. It is not a confirmed booking."
    : enabled ? "Not sent yet. Check the details, then send your inquiry."
    : "Not sent. Online submission is not available yet, but you can copy these details.";
  const status = state === "failed" ? "Your inquiry could not be sent. Please try again, or copy the details."
    : copied === "ok" ? "Details copied to your clipboard."
    : copied === "failed" ? "Copying was blocked by your browser. Please select the text above." : "";

  return (
    <div className="on-light rounded-xl bg-white p-5 text-body shadow-card sm:p-7">
      <h2 ref={headingRef} tabIndex={-1} className="text-xl text-navy outline-none">{state === "sent" ? "Inquiry received" : "Check your inquiry"}</h2>
      <p role="status" className="mt-2 font-medium">{lead}</p>
      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-[.95rem]">
        {rows.map(([k, v]) => <div key={k} className="contents"><dt className="text-muted">{k}</dt><dd className="min-w-0 font-medium wrap-anywhere text-navy">{v}</dd></div>)}
      </dl>
      {enabled && <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" />}
      <div className="mt-6 flex flex-wrap gap-3">
        {enabled && state !== "sent" && (
          <button type="button" onClick={send} disabled={state === "sending"} className={buttonClass()}><Send className="size-5" aria-hidden="true" />{state === "sending" ? "Sending" : "Send inquiry"}</button>
        )}
        <button type="button" onClick={copy} className={buttonClass(enabled ? "secondary" : "primary")}>{copied === "ok" ? <Check className="size-5" aria-hidden="true" /> : <Copy className="size-5" aria-hidden="true" />}{copied === "ok" ? "Copied" : "Copy details"}</button>
        {state !== "sent" && <button type="button" onClick={onEdit} disabled={state === "sending"} className={buttonClass("secondary")}>Edit</button>}
      </div>
      <p role="alert" className="mt-3 text-sm">{status}</p>
    </div>
  );
}
