import Image from "next/image";
import { Check } from "lucide-react";
import { BookingForm } from "@/components/booking/booking-form";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { media } from "@/config/media";
import { placeSuggestions } from "@/config/routes";
import { vehicles } from "@/config/vehicles";
import { RouteMap } from "./route-map";

const highlights = ["Private vehicle, no shared rides", "Door-to-door pickup and drop-off", "Fare shared for your approval before booking"];

export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy text-white">
      {media.hero && (
        <>
          <Image src={media.hero.src} alt={media.hero.alt} fill preload sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-navy via-navy/85 to-navy/50" />
        </>
      )}
      <div className="shell grid items-start gap-12 py-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-14 lg:py-16">
        <div>
          <h1 className="text-hero">Private Transportation from Riyadh to Saudi Arabia &amp; Beyond</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            Request private transfers from Riyadh to major Saudi cities and GCC destinations. Journeys are arranged through independent drivers and transport partners.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book-transport/">Book Your Ride</ButtonLink>
            <WhatsAppButton />
          </div>
          <ul className="mt-8 grid gap-2.5 text-[.95rem] text-white/85">
            {highlights.map((h) => <li key={h} className="flex items-center gap-2.5"><Check className="size-5 text-gold" aria-hidden="true" />{h}</li>)}
          </ul>
          {!media.hero && <RouteMap className="mt-8 hidden w-full sm:block" />}
        </div>
        <BookingForm places={placeSuggestions} vehicles={vehicles.map((v) => v.name)} />
      </div>
    </section>
  );
}
