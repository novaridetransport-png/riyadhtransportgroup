import { ArrowRight, Plus } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { PageLink } from "@/components/ui/page-link";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { faqGroups } from "@/content/faqs-page";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "/faqs/",
  "Private Transfer FAQs | Riyadh Transport Group",
  "Answers about booking a private transfer from Riyadh: vehicles and luggage, border documents, Makkah and Madinah, fares, payment and your details.",
);

const slug = (t: string) => t.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");

export default function FaqsPage() {
  return (
    <section className="pb-20 pt-8 lg:pb-28">
      <div className="shell">
        <Breadcrumbs path="/faqs/" />
        <h1 className="mt-8 text-section text-navy">Frequently asked questions</h1>
        <p className="mt-4 max-w-2xl text-lg">How private transfers from Riyadh are arranged, and what to prepare before you travel.</p>
        <nav aria-label="Topics" className="mt-8 flex flex-wrap gap-2">
          {faqGroups.map((g) => <a key={g.title} href={`#${slug(g.title)}`} className="flex min-h-11 items-center rounded-lg border border-line bg-white px-4 text-sm font-semibold text-navy hover:border-royal hover:text-royal">{g.title}</a>)}
        </nav>
        <div className="mt-12 space-y-14">
          {faqGroups.map((g) => (
            <section key={g.title} id={slug(g.title)} aria-labelledby={`${slug(g.title)}-h`} className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <h2 id={`${slug(g.title)}-h`} className="text-2xl">{g.title}</h2>
                {g.links && (
                  <ul className="mt-4 space-y-2">
                    {g.links.map(([href, label]) => <li key={href}><PageLink href={href} className="inline-flex items-center gap-2 font-semibold text-royal underline-offset-4 hover:underline">{label}<ArrowRight className="size-4" aria-hidden="true" /></PageLink></li>)}
                  </ul>
                )}
              </div>
              <div>
                {g.items.map(([q, a]) => (
                  <details key={q} className="group border-b border-line">
                    <summary className="flex min-h-14 list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-navy hover:text-royal [&::-webkit-details-marker]:hidden">
                      {q}<Plus className="size-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
                    </summary>
                    <p className="max-w-2xl pb-5 leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center gap-3 rounded-xl bg-mist p-6 sm:p-8">
          <p className="mr-auto text-lg font-semibold text-navy">Still have a question?</p>
          <ButtonLink href="/contact-us/" variant="secondary">Contact us</ButtonLink>
          <WhatsAppButton variant="secondary" />
        </div>
      </div>
    </section>
  );
}
