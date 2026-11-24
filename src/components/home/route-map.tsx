import { cn } from "@/lib/utils/cn";

/** Schematic map: city positions are projected from real coordinates. Decorative. */
const project = (lat: number, lon: number): [number, number] => [Math.round((lon - 37) * 44), Math.round((30.5 - lat) * 48)];
const RIYADH = project(24.71, 46.68);
type City = [name: string, lat: number, lon: number, anchor: "start" | "end" | "middle", dy: number];
const cities: City[] = [
  ["Dammam", 26.43, 50.1, "end", -8], ["Bahrain", 26.1, 50.55, "start", 0], ["Buraydah", 26.33, 43.97, "end", 4],
  ["Jeddah", 21.54, 39.17, "middle", -14], ["Makkah", 21.39, 39.86, "start", 22], ["Madinah", 24.47, 39.61, "middle", -14],
  ["Doha", 25.29, 51.53, "start", -2], ["Dubai", 25.2, 55.27, "middle", -14], ["Abu Dhabi", 24.45, 54.38, "middle", 28],
  ["Kuwait City", 29.38, 47.98, "start", 0], ["Muscat", 23.59, 58.4, "middle", 28],
];

export function RouteMap({ only, labels = true, viewBox = "30 10 980 460", className }: { only?: string[]; labels?: boolean; viewBox?: string; className?: string }) {
  const shown = only ? cities.filter((c) => only.includes(c[0])) : cities;
  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true" fill="none">
      {shown.map(([name, lat, lon, anchor, dy]) => {
        const [x, y] = project(lat, lon);
        const mx = (RIYADH[0] + x) / 2;
        const my = (RIYADH[1] + y) / 2 - Math.abs(x - RIYADH[0]) * 0.12;
        return (
          <g key={name}>
            <path d={`M${RIYADH[0]} ${RIYADH[1]}Q${mx} ${my} ${x} ${y}`} pathLength={1} className="route-line" stroke="#d6ad60" strokeWidth="1.5" strokeOpacity=".75" />
            <circle cx={x} cy={y} r="4.5" fill="#101b32" stroke="#d6ad60" strokeWidth="2" />
            {labels && <text x={x + (anchor === "start" ? 13 : anchor === "end" ? -13 : 0)} y={y + dy} textAnchor={anchor} fontSize="19" fontWeight="500" fill="#fff" fillOpacity=".85">{name}</text>}
          </g>
        );
      })}
      <circle cx={RIYADH[0]} cy={RIYADH[1]} r="17" fill="#d6ad60" fillOpacity=".2" />
      <circle cx={RIYADH[0]} cy={RIYADH[1]} r="8" fill="#d6ad60" />
      {labels && <text x={RIYADH[0]} y={RIYADH[1] + 44} textAnchor="middle" fontSize="24" fontWeight="700" fill="#fff">Riyadh</text>}
    </svg>
  );
}

export function MapPanel({ only, className }: { only?: string[]; className?: string }) {
  return <div className={cn("grid place-items-center overflow-hidden bg-navy p-6", className)}><RouteMap only={only} viewBox="20 130 640 340" className="w-full" /></div>;
}
