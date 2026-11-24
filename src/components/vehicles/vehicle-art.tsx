import type { VehicleCategory } from "@/config/vehicles";

/** Generic body-style silhouettes: no make or model implied. */
const bodies: Record<VehicleCategory["path"], { body: string; glass: string }> = {
  "/vehicles/sedan/": { body: "M14 84c0-14 6-19 24-22l28-5c18-17 30-23 58-23 30 0 46 6 64 23l30 5c18 3 24 9 24 22v6H14z", glass: "M80 57c14-11 23-14 44-14h4v14zM136 43c18 0 28 3 41 14h-41z" },
  "/vehicles/suv/": { body: "M16 84V66c0-6 5-8 14-9l30-4c12-19 22-27 46-27h66c24 0 38 9 48 27l4 4c8 2 12 8 12 18v9H16z", glass: "M74 53c9-13 16-18 34-18h14v18zM130 35h34c16 0 28 6 35 18h-69z" },
  "/vehicles/gmc-premium-suv/": { body: "M10 84V62c0-7 4-9 13-10l35-4c8-18 16-26 36-26h116c14 0 20 6 23 22l5 10c4 2 6 6 6 12v18H10z", glass: "M72 48c6-12 12-17 25-17h23v17zM128 31h38v17h-38zM174 31h34c9 0 12 5 14 17h-48z" },
  "/vehicles/premium-vans/": { body: "M10 84V66c0-8 4-11 14-14l26-8c12-22 20-30 40-30h130c14 0 20 6 22 20l4 34v16H10z", glass: "M64 46c8-16 14-23 27-23h19v23zM118 23h46v23h-46zM172 23h44c8 0 11 4 13 23h-57z" },
};

export function VehicleArt({ path }: { path: VehicleCategory["path"] }) {
  const { body, glass } = bodies[path];
  return (
    <svg viewBox="0 0 256 110" className="w-full max-w-sm" aria-hidden="true">
      <ellipse cx="128" cy="101" rx="112" ry="4" fill="#101b32" opacity=".12" />
      <path d={body} fill="#101b32" /><path d={glass} fill="#8ea3c7" />
      {[62, 194].map((x) => <g key={x}><circle cx={x} cy="86" r="16" fill="#0a1222" stroke="#f5f7fa" strokeWidth="3" /><circle cx={x} cy="86" r="7" fill="#c9d1de" /></g>)}
      <path d="M86 78h84" stroke="#d6ad60" strokeWidth="1.5" />
    </svg>
  );
}
