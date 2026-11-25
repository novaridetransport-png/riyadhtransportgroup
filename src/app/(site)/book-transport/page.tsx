import { BookingForm } from "@/components/booking/booking-form";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { placeSuggestions } from "@/config/routes";
import { vehicles } from "@/config/vehicles";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "/book-transport/",
  "Book Private Transport from Riyadh | Riyadh Transport Group",
  "Enter your pickup, destination, dates, passengers and luggage to request a private transfer quote.",
);

export default function BookTransportPage() {
  return (
    <section className="bg-mist pb-20 pt-8 lg:pb-28">
      <div className="shell">
        <Breadcrumbs path="/book-transport/" />
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <h1 className="text-section text-navy">Request your private transfer</h1>
            <p className="mt-4 text-lg">Tell us about the journey. Availability is checked first, and a vehicle category and fare are shared for your review before anything is booked.</p>
            <ul className="mt-8 space-y-4 border-l-2 border-gold pl-5">
              <li>An inquiry is not a confirmed booking and takes no payment.</li>
              <li>Airport pickup and drop-off are not confirmed. Please ask before planning around them.</li>
              <li>For cross-border trips, check that every passenger has valid documents and entry permission.</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3"><WhatsAppButton variant="secondary" /></div>
          </div>
          <BookingForm places={placeSuggestions} vehicles={vehicles.map((v) => v.name)} />
        </div>
      </div>
    </section>
  );
}
