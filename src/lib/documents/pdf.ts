import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { money, totals, type DocumentData, type DocumentType } from "./model";

const NAVY = rgb(16 / 255, 27 / 255, 50 / 255), GOLD = rgb(214 / 255, 173 / 255, 96 / 255), WHITE = rgb(1, 1, 1);
const BODY = rgb(52 / 255, 64 / 255, 84 / 255), MUTED = rgb(102 / 255, 112 / 255, 133 / 255), LINE = rgb(228 / 255, 231 / 255, 236 / 255), MIST = rgb(245 / 255, 247 / 255, 250 / 255);
const W = 595.28, H = 841.89, M = 44, FOOT = 58;
const ARABIC = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

export type FontLoader = (name: string) => Promise<ArrayBuffer>;
const fetchFont: FontLoader = async (name) => {
  const res = await fetch(`/fonts/${name}`);
  if (!res.ok) throw new Error(`Font ${name} could not be loaded`);
  return res.arrayBuffer();
};

/** fontkit reads a few bytes past an empty glyph at the end of a font file, so leave it room. */
function pad(font: ArrayBuffer): Uint8Array {
  const bytes = new Uint8Array(font.byteLength + 64);
  bytes.set(new Uint8Array(font));
  return bytes;
}

interface Face { latin: PDFFont; arabic: PDFFont | null }

/** Splits text into Latin and Arabic runs, in the order they are drawn from left to right. */
function runs(text: string): { text: string; arabic: boolean }[] {
  const parts: { text: string; arabic: boolean }[] = [];
  for (const word of text.split(/(\s+)/)) {
    for (const piece of word.split(/([؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]+)/).filter(Boolean)) {
      const last = parts.at(-1);
      const arabic = ARABIC.test(piece) || (/^\s+$/.test(piece) && Boolean(last?.arabic));
      if (last && last.arabic === arabic) last.text += piece;
      else parts.push({ text: piece, arabic });
    }
  }
  for (let i = 0; i < parts.length - 1; i++) {
    const trailing = parts[i].arabic ? parts[i].text.match(/\s+$/)?.[0] : null;
    if (trailing) { parts[i].text = parts[i].text.slice(0, -trailing.length); parts[i + 1].text = trailing + parts[i + 1].text; }
  }
  const firstStrong = text.match(/[A-Za-z؀-ۿ]/)?.[0];
  return firstStrong && ARABIC.test(firstStrong) ? parts.reverse() : parts;
}

export async function buildPdf(doc: DocumentData, number: string, type: DocumentType, load: FontLoader = fetchFont): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  const needsArabic = ARABIC.test(JSON.stringify(doc));
  const [r, b, ar, ab] = await Promise.all([
    load("manrope-400.ttf").then(pad), load("manrope-700.ttf").then(pad),
    needsArabic ? load("plex-arabic-400.ttf").then(pad) : null, needsArabic ? load("plex-arabic-700.ttf").then(pad) : null,
  ]);
  const regular: Face = { latin: await pdf.embedFont(r, { subset: true }), arabic: ar ? await pdf.embedFont(ar) : null };
  const bold: Face = { latin: await pdf.embedFont(b, { subset: true }), arabic: ab ? await pdf.embedFont(ab) : null };
  const known = new Set(regular.latin.getCharacterSet());
  pdf.setTitle(`${doc.title} ${number}`);
  pdf.setAuthor(doc.business.tradeName);
  pdf.setCreator(doc.business.tradeName);

  // Characters the fonts cannot draw (emoji, for example) are left out rather than shown as boxes.
  const clean = (s: string) => [...s.replace(/\t/g, " ").replace(/[‎‏‪-‮⁦-⁩]/g, "")].filter((c) => ARABIC.test(c) || /\s/.test(c) || known.has(c.codePointAt(0)!)).join("");
  const faceOf = (f: Face, arabic: boolean) => (arabic && f.arabic ? f.arabic : f.latin);
  const width = (s: string, f: Face, size: number) => runs(s).reduce((w, x) => w + faceOf(f, x.arabic).widthOfTextAtSize(x.text, size), 0);

  function wrap(raw: string, f: Face, size: number, max: number): string[] {
    const out: string[] = [];
    for (const para of clean(raw).split(/\r?\n/)) {
      let line = "";
      for (let word of para.split(/ +/).filter(Boolean)) {
        const next = line ? `${line} ${word}` : word;
        if (width(next, f, size) <= max) { line = next; continue; }
        if (line) out.push(line);
        while (width(word, f, size) > max) {
          let n = word.length - 1;
          while (n > 1 && width(word.slice(0, n), f, size) > max) n--;
          out.push(word.slice(0, n));
          word = word.slice(n);
        }
        line = word;
      }
      out.push(line);
    }
    return out;
  }

  let page: PDFPage = pdf.addPage([W, H]);
  let y = H;
  const put = (s: string, x: number, yy: number, o: { f?: Face; size?: number; color?: ReturnType<typeof rgb>; right?: boolean } = {}) => {
    const f = o.f ?? regular, size = o.size ?? 9.5;
    const t = clean(s);
    let cx = o.right ? x - width(t, f, size) : x;
    for (const part of runs(t)) {
      const font = faceOf(f, part.arabic);
      page.drawText(part.text, { x: cx, y: yy, size, font, color: o.color ?? BODY });
      cx += font.widthOfTextAtSize(part.text, size);
    }
  };
  const rule = (yy: number, color = LINE, thickness = 0.8) => page.drawLine({ start: { x: M, y: yy }, end: { x: W - M, y: yy }, color, thickness });
  const newPage = () => {
    page = pdf.addPage([W, H]);
    page.drawRectangle({ x: 0, y: H - 34, width: W, height: 34, color: NAVY });
    put(doc.business.tradeName, M, H - 22, { f: bold, size: 10, color: WHITE });
    put(`${doc.title} ${number}`, W - M, H - 22, { size: 9, color: WHITE, right: true });
    y = H - 62;
  };
  const need = (h: number) => { if (y - h < FOOT + 12) newPage(); };
  const block = (lines: string[], x: number, o: { f?: Face; size?: number; color?: ReturnType<typeof rgb>; lead?: number } = {}) => {
    const lead = o.lead ?? 13.5;
    for (const l of lines) { need(lead); put(l, x, y - 10, o); y -= lead; }
  };

  // Header
  page.drawRectangle({ x: 0, y: H - 112, width: W, height: 112, color: NAVY });
  page.drawRectangle({ x: 0, y: H - 115, width: W, height: 3, color: GOLD });
  page.drawSvgPath("M12 31V10h9a6.5 6.5 0 0 1 0 13h-9", { x: M - 8, y: H - 34, borderColor: WHITE, borderWidth: 3 });
  page.drawSvgPath("M20 23l8 7", { x: M - 8, y: H - 34, borderColor: GOLD, borderWidth: 3 });
  page.drawCircle({ x: M + 21, y: H - 65, size: 3, color: GOLD });
  const nameLines = wrap(doc.business.tradeName, bold, 15, 230).slice(0, 2);
  nameLines.forEach((l, i) => put(l, M + 38, H - 54 - i * 18 + (nameLines.length - 1) * 6, { f: bold, size: 15, color: WHITE }));
  const title = wrap(doc.title.toUpperCase(), bold, 20, 220)[0] ?? "";
  put(title, W - M, H - 55, { f: bold, size: 20, color: WHITE, right: true });
  put(number, W - M, H - 76, { f: bold, size: 11, color: GOLD, right: true });

  // Parties
  y = H - 140;
  const col = (W - 2 * M - 24) / 2;
  const dueLabel = type === "quotation" ? "Valid until" : "Due date";
  const from = [doc.business.legalName, doc.business.address, doc.business.phone, doc.business.email, doc.business.website,
    doc.business.registration && `Registration: ${doc.business.registration}`, doc.business.vatNumber && `VAT number: ${doc.business.vatNumber}`].filter(Boolean) as string[];
  const to = [doc.client.company, doc.client.address, doc.client.phone, doc.client.email].filter(Boolean);
  const party = (label: string, name: string, rows: string[], x: number) => {
    let yy = y;
    put(label, x, yy, { size: 8.5, color: MUTED });
    yy -= 16;
    for (const l of wrap(name, bold, 11.5, col)) { put(l, x, yy, { f: bold, size: 11.5, color: NAVY }); yy -= 15; }
    for (const row of rows) for (const l of wrap(row, regular, 9.5, col)) { put(l, x, yy); yy -= 13; }
    return yy;
  };
  y = Math.min(party("From", doc.business.tradeName, from, M), party(type === "receipt" ? "Received from" : "Prepared for", doc.client.name, to, M + col + 24)) - 8;

  // Key dates
  const facts = [["Issue date", doc.issueDate], [dueLabel, doc.dueDate], ["Reference", doc.reference], ["Currency", doc.currency]].filter(([, v]) => v);
  page.drawRectangle({ x: M, y: y - 38, width: W - 2 * M, height: 38, color: MIST });
  const cell = (W - 2 * M) / facts.length;
  facts.forEach(([k, v], i) => {
    put(k, M + 12 + i * cell, y - 15, { size: 8, color: MUTED });
    put(wrap(v, bold, 10, cell - 16)[0] ?? "", M + 12 + i * cell, y - 29, { f: bold, size: 10, color: NAVY });
  });
  y -= 60;

  const heading = (t: string) => { need(40); put(t, M, y - 10, { f: bold, size: 11, color: NAVY }); y -= 22; };

  // Trip
  const trip = [["Pickup", doc.trip.pickup], ["Destination", doc.trip.destination], ["Travel date", doc.trip.date], ["Return date", doc.trip.returnDate],
    ["Passengers", doc.trip.passengers], ["Luggage", doc.trip.luggage], ["Vehicle category", doc.trip.vehicle]].filter(([, v]) => v);
  if (trip.length) {
    heading("Journey details");
    for (let i = 0; i < trip.length; i += 2) {
      const pair = trip.slice(i, i + 2).map(([k, v]) => ({ k, lines: wrap(v, regular, 9.5, col - 92) }));
      const h = Math.max(...pair.map((p) => p.lines.length)) * 13 + 3;
      need(h);
      pair.forEach((p, j) => {
        const x = M + j * (col + 24);
        put(p.k, x, y - 10, { size: 9, color: MUTED });
        p.lines.forEach((l, n) => put(l, x + 92, y - 10 - n * 13, { color: NAVY }));
      });
      y -= h;
    }
    y -= 12;
  }

  // Items
  const t = totals(doc);
  const xQty = W - M - 200, xPrice = W - M - 105, xAmt = W - M - 10;
  const plain = (v: number) => money(v, doc.currency).slice(4);
  const tableHead = () => {
    page.drawRectangle({ x: M, y: y - 24, width: W - 2 * M, height: 24, color: NAVY });
    put("Description", M + 10, y - 16, { f: bold, size: 9, color: WHITE });
    put("Qty", xQty, y - 16, { f: bold, size: 9, color: WHITE, right: true });
    put("Unit price", xPrice, y - 16, { f: bold, size: 9, color: WHITE, right: true });
    put("Amount", xAmt, y - 16, { f: bold, size: 9, color: WHITE, right: true });
    y -= 24;
  };
  need(70);
  tableHead();
  doc.items.forEach((item, i) => {
    const max = xQty - 40 - (M + 10);
    const name = wrap(item.description, bold, 9.5, max), extra = item.details ? wrap(item.details, regular, 8.5, max) : [];
    const h = name.length * 13 + extra.length * 11.5 + 13;
    if (y - Math.min(h, 300) < FOOT + 12) { newPage(); tableHead(); }
    let yy = y - 16;
    name.forEach((l) => { put(l, M + 10, yy, { f: bold, color: NAVY }); yy -= 13; });
    put(String(item.quantity), xQty, y - 16, { right: true });
    put(plain(Math.round(item.price * t.minor)), xPrice, y - 16, { right: true });
    put(plain(t.lines[i]), xAmt, y - 16, { f: bold, color: NAVY, right: true });
    extra.forEach((l) => { if (yy < FOOT + 12) { newPage(); yy = y - 10; } put(l, M + 10, yy, { size: 8.5, color: MUTED }); yy -= 11.5; });
    y = yy - 1;
    rule(y);
  });

  // Totals
  const rows: [string, string, boolean][] = [];
  if (t.discount || t.vat) rows.push(["Subtotal", plain(t.subtotal), false]);
  if (t.discount) rows.push(["Discount", `-${plain(t.discount)}`, false]);
  if (t.vat) rows.push([`VAT ${doc.vatRate}%`, plain(t.vat), false]);
  rows.push(["Total", money(t.total, doc.currency), true]);
  if (type !== "quotation" && (t.paid || type === "receipt")) {
    rows.push(["Amount received", plain(t.paid), false]);
    rows.push(["Balance due", money(t.balance, doc.currency), true]);
  }
  need(rows.length * 20 + 24);
  y -= 8;
  for (const [k, v, strong] of rows) {
    if (strong) page.drawRectangle({ x: W - M - 250, y: y - 20, width: 250, height: 21, color: MIST });
    put(k, W - M - 240, y - 13.5, { f: strong ? bold : regular, size: strong ? 10.5 : 9.5, color: strong ? NAVY : BODY });
    put(v, xAmt, y - 13.5, { f: strong ? bold : regular, size: strong ? 10.5 : 9.5, color: strong ? NAVY : BODY, right: true });
    y -= strong ? 23 : 18;
  }
  y -= 14;

  const section = (label: string, body: string) => {
    if (!body.trim()) return;
    heading(label);
    block(wrap(body, regular, 9.5, W - 2 * M), M);
    y -= 10;
  };
  if (type !== "quotation") {
    section("Payment", [doc.payment.method && `Method: ${doc.payment.method}`, doc.payment.date && `Date: ${doc.payment.date}`, doc.payment.reference && `Reference: ${doc.payment.reference}`].filter(Boolean).join("\n"));
  }
  section("How to pay", doc.paymentDetails);
  section("Notes", doc.notes);
  section("Terms", doc.terms);

  const pages = pdf.getPages();
  pages.forEach((p, i) => {
    page = p;
    rule(FOOT - 6, GOLD, 1);
    put(wrap(doc.footer, regular, 8, W - 2 * M - 70)[0] ?? "", M, FOOT - 22, { size: 8, color: MUTED });
    put(`Page ${i + 1} of ${pages.length}`, W - M, FOOT - 22, { size: 8, color: MUTED, right: true });
  });
  return pdf.save();
}
