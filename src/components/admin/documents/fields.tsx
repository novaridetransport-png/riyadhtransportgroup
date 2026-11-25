"use client";

import { useId } from "react";

const control = "mt-1 block w-full rounded-lg border border-[#98a2b3] bg-white px-3 py-2 text-base text-navy aria-invalid:border-danger";

interface Base { label: string; value: string | number; onChange: (v: string) => void; error?: string; className?: string }

export function Field({ label, value, onChange, error, className, type = "text", ...rest }: Base & { type?: string; inputMode?: "decimal"; placeholder?: string; list?: string }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-navy">{label}</label>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-e` : undefined} className={`${control} min-h-11`} {...rest} />
      {error && <p id={`${id}-e`} className="mt-1 text-sm font-medium text-danger">{error}</p>}
    </div>
  );
}

export function Area({ label, value, onChange, error, className, rows = 3 }: Base & { rows?: number }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-navy">{label}</label>
      <textarea id={id} rows={rows} dir="auto" value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-e` : undefined} className={control} />
      {error && <p id={`${id}-e`} className="mt-1 text-sm font-medium text-danger">{error}</p>}
    </div>
  );
}

export function Choice({ label, value, onChange, error, className, options }: Base & { options: [value: string, label: string][] }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-navy">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={`${control} min-h-11`}>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      {error && <p className="mt-1 text-sm font-medium text-danger">{error}</p>}
    </div>
  );
}

export function Panel({ title, children, open }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details open={open} className="rounded-xl border border-line bg-white">
      <summary className="flex min-h-14 items-center px-5 text-lg font-bold text-navy sm:px-6">{title}</summary>
      <div className="grid gap-4 px-5 pb-6 sm:grid-cols-2 sm:px-6">{children}</div>
    </details>
  );
}
