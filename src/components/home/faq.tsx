import { Plus } from "lucide-react";
import { PageLink } from "@/components/ui/page-link";
import { homeFaqs } from "@/config/faqs";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="border-t border-line py-20 lg:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
        <h2 id="faq-heading" className="text-section">Questions before you book</h2>
        <div>
          {homeFaqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex min-h-16 list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-navy hover:text-royal [&::-webkit-details-marker]:hidden">
                {f.q}<Plus className="size-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed">{f.a}</p>
            </details>
          ))}
          <p className="mt-6"><PageLink href="/faqs/" className="font-semibold text-royal underline underline-offset-4">See all questions</PageLink></p>
        </div>
      </div>
    </section>
  );
}
