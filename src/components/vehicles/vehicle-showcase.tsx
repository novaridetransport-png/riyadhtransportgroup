import Image from "next/image";
import { PageLink } from "@/components/ui/page-link";
import { vehicles } from "@/config/vehicles";
import { VehicleArt } from "./vehicle-art";

export function VehicleShowcase() {
  return (
    <section id="vehicles" aria-labelledby="vehicles-heading" className="py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-20">
          <h2 id="vehicles-heading" className="text-section">Choose the space your journey needs</h2>
          <p className="text-lg">Vehicles come from independent transport partners. Pick a category, and the vehicle available for your date is confirmed with your quote.</p>
        </div>
        <ul className="mt-12 grid border-t border-line md:grid-cols-2">
          {vehicles.map((v) => (
            <li key={v.path} className="border-b border-line py-8 md:odd:border-r md:odd:pr-10 md:even:pl-10">
              <PageLink href={v.path} className="block">
                <span className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-lg bg-mist px-8">
                  {v.photo ? <Image src={v.photo.src} alt={v.photo.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" /> : <VehicleArt path={v.path} />}
                </span>
                <h3 className="mt-6 text-xl [a:hover>&]:text-royal">{v.name}</h3>
                <p className="mt-2">{v.summary}</p>
              </PageLink>
              <dl className="mt-4 grid grid-cols-[6.5rem_1fr] gap-y-1.5 text-[.95rem]">
                <dt className="text-muted">Suits</dt><dd>{v.suits}</dd>
                {v.passengers && <><dt className="text-muted">Passengers</dt><dd>{v.passengers}</dd></>}
                {v.luggage && <><dt className="text-muted">Luggage</dt><dd>{v.luggage}</dd></>}
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
