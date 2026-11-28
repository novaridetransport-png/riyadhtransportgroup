import { PolicyPage } from "@/components/layout/policy-page";
import { policyDate, terms } from "@/content/policies";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "/terms-and-conditions/",
  "Terms and Conditions | Riyadh Transport Group",
  "How bookings, fares, payment after the journey, cancellations, borders and passenger responsibilities work with Riyadh Transport Group.",
);

export default function TermsPage() {
  return (
    <PolicyPage path="/terms-and-conditions/" title="Terms and Conditions" updated={policyDate} sections={terms}
      intro="These terms apply to journeys you book with Riyadh Transport Group. Please read them before you confirm a booking."
      related={[["/cancellation-policy/", "Cancellation policy"], ["/privacy-policy/", "Privacy policy"], ["/contact-us/", "Contact us"]]} />
  );
}
