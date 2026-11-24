import type { VehicleCategory } from "@/config/vehicles";
import type { PagePath } from "@/config/urls";

type Pair = [term: string, detail: string];
export type Block =
  | { kind: "prose"; title: string; body: string[] }
  | { kind: "points"; title: string; intro?: string; items: Pair[] }
  | { kind: "steps"; title: string; items: Pair[] }
  | { kind: "list"; title: string; intro?: string; items: string[] }
  | { kind: "note"; title: string; body: string }
  | { kind: "vehicles"; title: string; intro: string; picks: [VehicleCategory["path"], string][] };

export interface PageContent {
  title: string;
  description: string;
  h1: string;
  intro: string[];
  blocks: Block[];
  faqs: [question: string, answer: string][];
  /** Contextual internal links; unpublished targets are dropped automatically */
  links: [path: PagePath, reason: string][];
  cta: { title: string; text: string };
}
export interface RouteContent extends PageContent {
  /** Sentence introducing the opposite-direction page */
  opposite: string;
}

// Authoring helpers
export const prose = (title: string, ...body: string[]): Block => ({ kind: "prose", title, body });
export const points = (title: string, items: Pair[], intro?: string): Block => ({ kind: "points", title, items, intro });
export const steps = (title: string, ...items: Pair[]): Block => ({ kind: "steps", title, items });
export const list = (title: string, items: string[], intro?: string): Block => ({ kind: "list", title, items, intro });
export const note = (title: string, body: string): Block => ({ kind: "note", title, body });
export const vehicleOptions = (title: string, intro: string, picks: { sedan?: string; suv?: string; gmc?: string; van?: string }): Block => {
  const all: [VehicleCategory["path"], string | undefined][] = [
    ["/vehicles/sedan/", picks.sedan], ["/vehicles/suv/", picks.suv], ["/vehicles/gmc-premium-suv/", picks.gmc], ["/vehicles/premium-vans/", picks.van],
  ];
  return { kind: "vehicles", title, intro, picks: all.filter((p): p is [VehicleCategory["path"], string] => Boolean(p[1])) };
};
