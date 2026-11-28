import { z } from "zod";
import { riyadhToday } from "@/lib/validation/booking";

export const documentTypes = ["quotation", "invoice", "receipt"] as const;
export type DocumentType = (typeof documentTypes)[number];
export const isDocumentType = (v: unknown): v is DocumentType => documentTypes.includes(v as DocumentType);
export const typeLabel: Record<DocumentType, string> = { quotation: "Quotation", invoice: "Invoice", receipt: "Receipt" };

export const documentStatuses = ["draft", "sent", "accepted", "declined", "part_paid", "paid", "cancelled"] as const;
export type DocumentStatus = (typeof documentStatuses)[number];
export const statusLabel: Record<DocumentStatus, string> = {
  draft: "Draft", sent: "Sent", accepted: "Accepted", declined: "Declined", part_paid: "Part paid", paid: "Paid", cancelled: "Cancelled",
};
export const statusesFor: Record<DocumentType, DocumentStatus[]> = {
  quotation: ["draft", "sent", "accepted", "declined", "cancelled"],
  invoice: ["draft", "sent", "part_paid", "paid", "cancelled"],
  receipt: ["draft", "sent", "paid", "cancelled"],
};

export const currencies = ["SAR", "AED", "QAR", "BHD", "KWD", "OMR", "USD"] as const;
const decimalsOf = (currency: string) => (["BHD", "KWD", "OMR"].includes(currency) ? 3 : 2);

const text = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters`);
const number = (max: number, message: string) => z.coerce.number({ error: message }).min(0, message).max(max, message);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date");
const optionalEmail = z.union([z.literal(""), z.email("Enter a valid email address")]);

export const businessSchema = z.object({
  tradeName: text(120).min(1, "Enter the business name"),
  legalName: text(160), registration: text(60), vatNumber: text(40), address: text(300),
  phone: text(40), email: optionalEmail, website: text(120),
});
export type Business = z.infer<typeof businessSchema>;

export const settingsSchema = z.object({
  business: businessSchema,
  currency: z.enum(currencies),
  quotationTerms: text(3000), invoiceTerms: text(3000), receiptTerms: text(3000),
  paymentDetails: text(1000), footer: text(200),
});
export type Settings = z.infer<typeof settingsSchema>;

export const defaultSettings: Settings = {
  business: {
    tradeName: "Riyadh Transport Group", legalName: "", registration: "", vatNumber: "", address: "",
    phone: "", email: "info@riyadhtransportgroup.com", website: "riyadhtransportgroup.com",
  },
  currency: "SAR",
  quotationTerms: "Free cancellation until 24 hours before pickup. Later cancellations and no-shows may be charged. Payment is made after the journey, to the driver, by cash, bank transfer, card (Mada, Apple Pay) or STC Pay. Full terms: riyadhtransportgroup.com/terms-and-conditions/",
  invoiceTerms: "Payment is made to the driver after the journey by cash, bank transfer, card (Mada, Apple Pay) or STC Pay.",
  receiptTerms: "", paymentDetails: "",
  footer: "Transportation is arranged through independent drivers and transport partners.",
};

export const documentSchema = z.object({
  title: text(60).min(1, "Enter a title"),
  status: z.enum(documentStatuses),
  business: businessSchema,
  client: z.object({ name: text(160).min(1, "Enter the client's name"), company: text(160), email: optionalEmail, phone: text(40), address: text(300) }),
  issueDate: date,
  dueDate: z.union([z.literal(""), date]),
  reference: text(80),
  currency: z.enum(currencies),
  trip: z.object({
    pickup: text(160), destination: text(160), date: text(60), returnDate: text(60),
    passengers: text(40), luggage: text(40), vehicle: text(60),
  }),
  items: z.array(z.object({
    description: text(300).min(1, "Describe the item"),
    details: text(600),
    quantity: number(100_000, "Enter a valid quantity"),
    price: number(100_000_000, "Enter a valid price"),
  })).min(1, "Add at least one item").max(60, "Use 60 items or fewer"),
  discount: number(100_000_000, "Enter a valid discount"),
  vatRate: number(100, "Enter a rate from 0 to 100"),
  paid: number(100_000_000, "Enter a valid amount"),
  payment: z.object({ method: text(60), reference: text(120), date: z.union([z.literal(""), date]) }),
  paymentDetails: text(1000), notes: text(3000), terms: text(3000), footer: text(200),
}).superRefine((d, ctx) => {
  const t = totals(d);
  if (t.discount > t.subtotal) ctx.addIssue({ code: "custom", path: ["discount"], message: "The discount is larger than the subtotal" });
  if (t.paid > t.total) ctx.addIssue({ code: "custom", path: ["paid"], message: "The amount received is larger than the total" });
  if (d.vatRate > 0 && !d.business.vatNumber) ctx.addIssue({ code: "custom", path: ["vatRate"], message: "Enter your VAT number under Business details before charging VAT" });
  if (d.dueDate && d.dueDate < d.issueDate) ctx.addIssue({ code: "custom", path: ["dueDate"], message: "This date is before the issue date" });
});
export type DocumentData = z.infer<typeof documentSchema>;

/** Form state: the same shape, with numbers still as typed text. */
type Draft<T> = T extends number ? number | string : T extends (infer U)[] ? Draft<U>[] : T extends object ? { [K in keyof T]: Draft<T[K]> } : T;
export type DocumentDraft = Draft<DocumentData>;

interface Priced { currency: string; items: { quantity: number | string; price: number | string }[]; discount: number | string; vatRate: number | string; paid: number | string }

/** All money is added up in whole minor units (halalas, fils) to avoid rounding drift. */
export function totals(d: Priced) {
  const minor = 10 ** decimalsOf(d.currency);
  const num = (v: number | string) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
  const units = (v: number | string) => Math.round(num(v) * minor);
  const lines = d.items.map((i) => Math.round((Math.round(num(i.quantity) * 1000) * units(i.price)) / 1000));
  const subtotal = lines.reduce((a, b) => a + b, 0);
  const discount = units(d.discount);
  const net = subtotal - discount;
  const vat = Math.round((net * Math.round(num(d.vatRate) * 100)) / 10_000);
  const total = net + vat;
  const paid = units(d.paid);
  return { minor, lines, subtotal, discount, net, vat, total, paid, balance: total - paid };
}

export function money(minorUnits: number, currency: string) {
  const digits = decimalsOf(currency);
  return `${currency} ${new Intl.NumberFormat("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(minorUnits / 10 ** digits)}`;
}

export const addDays = (iso: string, days: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);

const termsFor = (type: DocumentType, s: Settings) => ({ quotation: s.quotationTerms, invoice: s.invoiceTerms, receipt: s.receiptTerms })[type];

export function blankDocument(type: DocumentType, settings: Settings): DocumentData {
  const today = riyadhToday();
  return {
    title: typeLabel[type], status: "draft", business: settings.business,
    client: { name: "", company: "", email: "", phone: "", address: "" },
    issueDate: today, dueDate: type === "receipt" ? "" : addDays(today, 7), reference: "", currency: settings.currency,
    trip: { pickup: "", destination: "", date: "", returnDate: "", passengers: "", luggage: "", vehicle: "" },
    items: [{ description: "Private transfer", details: "", quantity: 1, price: 0 }],
    discount: 0, vatRate: 0, paid: 0, payment: { method: "", reference: "", date: type === "receipt" ? today : "" },
    paymentDetails: type === "invoice" ? settings.paymentDetails : "", notes: "", terms: termsFor(type, settings), footer: settings.footer,
  };
}

/** A new document of another type (or a copy) that keeps the client, trip and items. */
export function convertDocument(from: DocumentData, fromNumber: string, type: DocumentType, settings: Settings): DocumentData {
  const base = blankDocument(type, settings);
  const t = totals(from);
  return {
    ...base, business: from.business, client: from.client, trip: from.trip, items: from.items, currency: from.currency,
    discount: from.discount, vatRate: from.vatRate, notes: from.notes, reference: fromNumber,
    // A receipt covers what was received; without a recorded payment it starts at the full total.
    paid: type === "receipt" ? (t.paid || t.total) / t.minor : 0,
  };
}

export const inquiryInput = (i: { name: string; email: string | null; phone: string; pickup: string; destination: string; travel_date: string; pickup_time: string; return_date: string | null; passengers: string; luggage: string; vehicle: string; trip_type: string }, base: DocumentData): DocumentData => ({
  ...base,
  client: { ...base.client, name: i.name, email: i.email ?? "", phone: i.phone },
  trip: { pickup: i.pickup, destination: i.destination, date: `${i.travel_date} ${i.pickup_time.slice(0, 5)}`, returnDate: i.return_date ?? "", passengers: i.passengers, luggage: i.luggage, vehicle: i.vehicle },
  items: [{ description: `Private transfer: ${i.pickup} to ${i.destination}`.slice(0, 300), details: i.trip_type === "return" ? "Return journey" : "One-way journey", quantity: 1, price: 0 }],
});

export const fileName = (number: string, client: string) => `${number}${client ? `-${client.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 40)}` : ""}.pdf`;
