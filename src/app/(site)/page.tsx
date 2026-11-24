import { BookingSteps } from "@/components/home/booking-steps";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { Intercity } from "@/components/home/intercity";
import { International } from "@/components/home/international";
import { PopularRoutes } from "@/components/home/popular-routes";
import { WhyUs } from "@/components/home/why-us";
import { VehicleShowcase } from "@/components/vehicles/vehicle-showcase";
import { homeServiceLd, JsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "/",
  "Private Transportation from Riyadh | Riyadh Transport Group",
  "Private door-to-door transfers from Riyadh to Dammam, Khobar, Qassim, Bahrain, Doha, Dubai and Abu Dhabi. No shared rides. Request your quote.",
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularRoutes />
      <Intercity />
      <International />
      <VehicleShowcase />
      <WhyUs />
      <BookingSteps />
      <Faq />
      <FinalCta />
      <JsonLd data={homeServiceLd} />
    </>
  );
}
