import { ButtonLink } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { site } from "@/config/site";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-heading" className="on-dark border-b border-white/10 bg-navy-soft text-white/80">
      <div className="shell flex flex-col gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <div className="max-w-2xl">
          <h2 id="cta-heading" className="text-section">Where are you travelling from Riyadh?</h2>
          <p className="mt-3 text-lg">{site.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-3"><ButtonLink href="/book-transport/">Request your quote</ButtonLink><WhatsAppButton /></div>
      </div>
    </section>
  );
}
