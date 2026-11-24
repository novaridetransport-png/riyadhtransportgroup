import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { media } from "@/config/media";
import { RouteMap } from "./route-map";

const notes = [
  ["Before you travel", "Tell us your destination, passenger count and luggage, and mention anything that may need declaring."],
  ["At the border", "Each passenger presents their own documents. Stops and pickup details are coordinated with you in advance."],
  ["After crossing", "Continue to your hotel, home or office in the destination city."],
];

export function International() {
  return (
    <section aria-labelledby="international-heading" className="on-dark relative isolate overflow-hidden bg-navy text-white/80">
      {media.international
        ? <><Image src={media.international.src} alt={media.international.alt} fill sizes="100vw" className="-z-20 object-cover" /><div className="absolute inset-0 -z-10 bg-navy/85" /></>
        : <RouteMap labels={false} className="absolute -right-32 -top-10 -z-10 w-[56rem] opacity-25" />}
      <div className="shell py-20 lg:py-28">
        <div className="max-w-2xl">
          <h2 id="international-heading" className="text-section">Riyadh to the GCC by road</h2>
          <p className="mt-5 text-lg leading-relaxed">Private cross-border transfers to Bahrain, Qatar, the UAE, Kuwait and Oman, with the route and border crossing discussed as part of your booking.</p>
        </div>
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {notes.map(([t, d]) => <li key={t} className="border-t border-gold pt-5"><h3 className="text-lg">{t}</h3><p className="mt-2 leading-relaxed">{d}</p></li>)}
        </ol>
        <p className="mt-12 max-w-3xl text-[.95rem] leading-relaxed">Entry decisions and processing times rest with border authorities. Clearance cannot be guaranteed, so please check the official requirements for every passenger.</p>
        <div className="mt-8"><ButtonLink href="/international-transfers/" variant="ghost-dark">See international transfers</ButtonLink></div>
      </div>
    </section>
  );
}
