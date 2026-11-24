import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { media } from "@/config/media";
import { MapPanel } from "./route-map";

export function Intercity() {
  return (
    <section aria-labelledby="intercity-heading" className="bg-mist">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-72 lg:min-h-[34rem]">
          {media.intercity
            ? <Image src={media.intercity.src} alt={media.intercity.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            : <MapPanel only={["Dammam", "Buraydah", "Jeddah", "Madinah"]} className="absolute inset-0" />}
        </div>
        <div className="flex flex-col justify-center px-4 py-16 sm:px-6 lg:max-w-2xl lg:px-16 lg:py-24">
          <h2 id="intercity-heading" className="text-section">Intercity travel, address to address</h2>
          <p className="mt-5 text-lg leading-relaxed">From a Riyadh home, hotel or office straight to an address in another Saudi city. There is no terminal to reach first and no second taxi at the other end.</p>
          <dl className="mt-8 space-y-5">
            <div><dt className="font-bold text-navy">Eastern Province</dt><dd>Dammam and Khobar, for business, family visits and onward travel.</dd></div>
            <div><dt className="font-bold text-navy">Qassim</dt><dd>Buraydah and Unaizah, to your exact address.</dd></div>
            <div><dt className="font-bold text-navy">Western Saudi Arabia</dt><dd>Long-distance journeys to Jeddah, Makkah and Madinah.</dd></div>
          </dl>
          <div className="mt-9"><ButtonLink href="/services/intercity-transfers/" variant="secondary">Explore intercity transfers</ButtonLink></div>
        </div>
      </div>
    </section>
  );
}
