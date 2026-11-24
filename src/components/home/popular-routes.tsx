import { RouteRow } from "@/components/routes/route-row";
import { featuredInternational, featuredSaudi } from "@/config/routes";

const groups = [
  { title: "Within Saudi Arabia", routes: featuredSaudi },
  { title: "Across the border", routes: featuredInternational },
];

export function PopularRoutes() {
  return (
    <section aria-labelledby="routes-heading" className="py-20 lg:py-28">
      <div className="shell">
        <div className="max-w-2xl">
          <h2 id="routes-heading" className="text-section">Routes from Riyadh</h2>
          <p className="mt-4 text-lg">One vehicle and one direct journey, from your pickup address to your destination.</p>
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="border-b-2 border-gold pb-4 text-xl">{g.title}</h3>
              <ul>{g.routes.map((r) => <RouteRow key={r.path} route={r} />)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
