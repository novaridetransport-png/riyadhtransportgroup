"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { buttonClass } from "@/components/ui/button-class";
import { formSubmissionsEnabled } from "@/config/flags";
import { linkFor } from "@/config/urls";
import { cn } from "@/lib/utils/cn";
import { bookingFormSchema, riyadhToday, type BookingInput } from "@/lib/validation/booking";
import { BookingReview } from "./booking-review";

type Name = FieldPath<BookingInput>;
const steps: { title: string; fields: Name[] }[] = [
  { title: "Your journey", fields: ["pickup", "destination", "tripType", "date", "returnDate", "time"] },
  { title: "Passengers and vehicle", fields: ["passengers", "luggage", "vehicle"] },
  { title: "Your contact details", fields: ["name", "phone", "email", "notes"] },
];
const control = "mt-1.5 block min-h-12 w-full rounded-lg border border-[#98a2b3] bg-white px-3.5 py-2.5 text-base text-navy placeholder:text-muted aria-invalid:border-danger";
const wide = "col-span-2 sm:col-span-1";
const count = (max: number) => [...Array.from({ length: max }, (_, i) => String(i + 1)), `More than ${max}`];
const minToday = (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.min = riyadhToday(); };

export function BookingForm({ places, vehicles, pickup = "Riyadh", destination = "" }: { places: string[]; vehicles: string[]; pickup?: string; destination?: string }) {
  const uid = useId();
  const privacy = linkFor("/privacy-policy/");
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<BookingInput | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const moveFocus = useRef(false);
  const { register, control: formControl, handleSubmit, trigger, formState: { errors } } = useForm<BookingInput>({
    resolver: zodResolver(bookingFormSchema),
    mode: "onTouched",
    defaultValues: { pickup, destination, tripType: "one-way", date: "", returnDate: "", time: "", passengers: "", luggage: "", vehicle: "", name: "", phone: "", email: "", notes: "" },
  });
  const tripType = useWatch({ control: formControl, name: "tripType" });

  useEffect(() => {
    if (moveFocus.current) heading.current?.focus();
    moveFocus.current = false;
  }, [step, result]);

  const goTo = (n: number) => { moveFocus.current = true; setStep(n); };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      if (await trigger(steps[step].fields, { shouldFocus: true })) goTo(step + 1);
      return;
    }
    await handleSubmit(
      (data) => { moveFocus.current = true; setResult(data); },
      (errs) => {
        const bad = steps.findIndex((s) => s.fields.some((f) => errs[f]));
        if (bad >= 0 && bad !== step) goTo(bad);
      },
    )(e);
  };

  const field = (name: Name) => ({
    id: `${uid}-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-error` : undefined,
    ...register(name),
  });
  const wrap = (name: Name, label: string, input: React.ReactNode, className?: string) => (
    <div className={className}>
      <label htmlFor={`${uid}-${name}`} className="text-[.95rem] font-semibold text-navy">{label}</label>
      {input}
      {errors[name] && <p id={`${uid}-${name}-error`} role="alert" className="mt-1.5 text-sm font-medium text-danger">{errors[name]?.message}</p>}
    </div>
  );
  const select = (name: Name, label: string, options: string[], className?: string) => wrap(name, label, (
    <select {...field(name)} className={control}><option value="">Select</option>{options.map((o) => <option key={o}>{o}</option>)}</select>
  ), className);
  const panel = (n: number) => cn("mt-5 grid-cols-2 gap-4", step === n ? "grid" : "hidden");

  if (result) return <BookingReview booking={result} headingRef={heading} onEdit={() => { moveFocus.current = true; setResult(null); }} />;

  return (
    <form method="post" noValidate onSubmit={onSubmit} aria-label="Request a private transfer" className="on-light rounded-xl bg-white p-5 text-body shadow-card sm:p-7">
      <div className="flex gap-1.5" aria-hidden="true">
        {steps.map((s, i) => <span key={s.title} className={cn("h-1 flex-1 rounded-full", i <= step ? "bg-royal" : "bg-line")} />)}
      </div>
      <p className="mt-4 text-sm text-muted">Step {step + 1} of {steps.length}</p>
      <h2 ref={heading} tabIndex={-1} className="text-xl text-navy outline-none">{steps[step].title}</h2>
      {!formSubmissionsEnabled && <p className="mt-2 text-sm">Online requests are not open yet. You can prepare your details here; nothing is sent.</p>}
      {privacy && <p className="mt-2 text-sm">Read the <a href={privacy} className="font-semibold text-royal underline underline-offset-4">privacy policy</a> before entering your details.</p>}

      <div className={panel(0)}>
        <datalist id={`${uid}-places`}>{places.map((p) => <option key={p} value={p} />)}</datalist>
        {wrap("pickup", "Pickup location", <input {...field("pickup")} list={`${uid}-places`} autoComplete="off" className={control} />, wide)}
        {wrap("destination", "Destination", <input {...field("destination")} list={`${uid}-places`} autoComplete="off" placeholder="City or address" className={control} />, wide)}
        <fieldset className="col-span-2">
          <legend className="text-[.95rem] font-semibold text-navy">Trip type</legend>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {([["one-way", "One-way"], ["return", "Return"]] as const).map(([v, l]) => (
              <label key={v} className="flex min-h-12 cursor-pointer items-center gap-2.5 rounded-lg border border-[#98a2b3] px-3.5 font-medium text-navy has-checked:border-royal has-checked:bg-royal/5">
                <input type="radio" value={v} {...register("tripType")} className="size-4 accent-royal" />{l}
              </label>
            ))}
          </div>
        </fieldset>
        {wrap("date", "Travel date", <input type="date" onFocus={minToday} {...field("date")} className={control} />, wide)}
        {tripType === "return" && wrap("returnDate", "Return date", <input type="date" onFocus={minToday} {...field("returnDate")} className={control} />, wide)}
        {wrap("time", "Pickup time", <input type="time" {...field("time")} className={control} />, wide)}
      </div>

      <div className={panel(1)}>
        {select("passengers", "Passengers", count(10))}
        {select("luggage", "Luggage", ["None", ...count(10)])}
        {select("vehicle", "Vehicle category", [...vehicles, "Help me choose"], "col-span-2")}
      </div>

      <div className={panel(2)}>
        {wrap("name", "Name", <input {...field("name")} autoComplete="name" className={control} />, wide)}
        {wrap("phone", "Phone / WhatsApp", <input type="tel" autoComplete="tel" placeholder="+966" {...field("phone")} className={control} />, wide)}
        {wrap("email", "Email (optional)", <input type="email" autoComplete="email" {...field("email")} className={control} />, "col-span-2")}
        {wrap("notes", "Additional requirements (optional)", <textarea rows={3} {...field("notes")} placeholder="Flight number, child seat, extra stops" className={control} />, "col-span-2")}
      </div>

      <div className="mt-6 flex gap-3">
        {step > 0 && <button type="button" onClick={() => goTo(step - 1)} className={cn(buttonClass("secondary"), "!px-4")}><ArrowLeft className="size-5" aria-hidden="true" />Back</button>}
        <button type="submit" className={cn(buttonClass(), "flex-1")}>
          {step < 2 ? <>Continue<ArrowRight className="size-5" aria-hidden="true" /></> : "Review and submit"}
        </button>
      </div>
    </form>
  );
}
