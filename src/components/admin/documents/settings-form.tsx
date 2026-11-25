"use client";

import { useState } from "react";
import { storeSettings } from "@/app/admin/documents/actions";
import { buttonClass } from "@/components/ui/button-class";
import { currencies, type Settings } from "@/lib/documents/model";
import { Area, Choice, Field, Panel } from "./fields";

export function SettingsForm({ initial }: { initial: Settings }) {
  const [s, setS] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<{ busy: boolean; text: string; bad?: boolean }>({ busy: false, text: "" });
  const biz = (k: keyof Settings["business"], label: string) => (
    <Field label={label} value={s.business[k]} onChange={(v) => setS({ ...s, business: { ...s.business, [k]: v } })} error={errors[`business.${k}`]} />
  );
  const area = (k: "quotationTerms" | "invoiceTerms" | "receiptTerms" | "paymentDetails", label: string, rows = 5) => (
    <Area className="sm:col-span-2" rows={rows} label={label} value={s[k]} onChange={(v) => setS({ ...s, [k]: v })} error={errors[k]} />
  );
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ busy: true, text: "" });
    try {
      const res = await storeSettings(s);
      setErrors(res.ok ? {} : (res.fields ?? {}));
      setState({ busy: false, text: res.ok ? "Saved. New documents will use these details." : res.error, bad: !res.ok });
    } catch { setState({ busy: false, text: "Something went wrong. Please try again.", bad: true }); }
  };
  return (
    <form onSubmit={submit} noValidate className="mt-6 space-y-4">
      <Panel title="Business details" open>
        {biz("tradeName", "Business name")}{biz("legalName", "Legal name")}{biz("phone", "Phone")}{biz("email", "Email")}
        {biz("website", "Website")}{biz("registration", "Registration number")}{biz("vatNumber", "VAT number")}
        <Choice label="Default currency" value={s.currency} onChange={(v) => setS({ ...s, currency: v as Settings["currency"] })} options={currencies.map((c) => [c, c])} />
        <Area className="sm:col-span-2" rows={2} label="Address" value={s.business.address} onChange={(v) => setS({ ...s, business: { ...s.business, address: v } })} error={errors["business.address"]} />
      </Panel>
      <Panel title="Default wording" open>
        {area("paymentDetails", "How to pay (invoices)", 3)}{area("quotationTerms", "Quotation terms")}{area("invoiceTerms", "Invoice terms")}{area("receiptTerms", "Receipt terms", 3)}
        <Field className="sm:col-span-2" label="Footer line" value={s.footer} onChange={(v) => setS({ ...s, footer: v })} error={errors.footer} />
      </Panel>
      <p role="status" className={`min-h-6 font-medium ${state.bad ? "text-danger" : "text-[#067647]"}`}>{state.text}</p>
      <button type="submit" disabled={state.busy} className={buttonClass()}>{state.busy ? "Saving" : "Save settings"}</button>
    </form>
  );
}
