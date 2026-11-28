import { PolicyPage } from "@/components/layout/policy-page";
import { cancellationPolicy, policyDate } from "@/content/policies";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "/cancellation-policy/",
  "Cancellation Policy | Free Until 24 Hours Before Pickup",
  "Cancel a private transfer free of charge until 24 hours before pickup. How later cancellations, no-shows and changes are handled.",
);

export default function CancellationPage() {
  return (
    <PolicyPage path="/cancellation-policy/" title="Cancellation Policy" updated={policyDate} sections={cancellationPolicy}
      intro="Plans change. This page explains how to cancel or change a journey, and when a charge may apply."
      related={[["/terms-and-conditions/", "Terms and conditions"], ["/contact-us/", "Contact us"], ["/faqs/", "FAQs"]]} />
  );
}
