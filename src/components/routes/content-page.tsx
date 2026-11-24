import { ArrowLeftRight, ArrowRight, Check, Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/booking/booking-form";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { PageLink } from "@/components/ui/page-link";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { placeSuggestions } from "@/config/routes";
import { getPage, isPublished, linkFor, returnPath, type PagePath } from "@/config/urls";
import { vehicles } from "@/config/vehicles";
import type { Block, PageContent } from "@/content/types";
import { JsonLd, serviceLd } from "@/lib/seo/jsonld";
import { cn } from "@/lib/utils/cn";

function BlockBody({ block }: { block: Block }) {
  switch (block.kind) {
    case "prose":
      return <div className="max-w-2xl space-y-4 text-lg leading-relaxed">{block.body.map((b) => <p key={b}>{b}</p>)}</div>;
    case "points":
      return (
        <>
          {block.intro && <p className="mb-6 max-w-2xl text-lg">{block.intro}</p>}
          <dl className="grid gap-x-12 sm:grid-cols-2">
            {block.items.map(([t, d]) => <div key={t} className="border-t border-line py-5"><dt className="text-lg font-bold text-navy">{t}</dt><dd className="mt-1.5 leading-relaxed">{d}</dd></div>)}
          </dl>
        </>
      );
    case "steps":
      return (
        <ol className="space-y-6">
          {block.items.map(([t, d], i) => (
            <li key={t} className="flex gap-5">
              <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-navy font-bold text-white">{i + 1}</span>
              <div><h3 className="text-lg">{t}</h3><p className="mt-1 leading-relaxed">{d}</p></div>
            </li>
          ))}
        </ol>
      );
    case "list":
      return (
        <>
          {block.intro && <p className="mb-5 max-w-2xl text-lg">{block.intro}</p>}
          <ul className="max-w-2xl space-y-3">
            {block.items.map((t) => <li key={t} className="flex gap-3 leading-relaxed"><Check className="mt-1 size-5 shrink-0 text-royal" aria-hidden="true" />{t}</li>)}
          </ul>
        </>
      );
    case "note":
      return <p className="max-w-2xl border-l-4 border-gold pl-5 text-lg leading-relaxed">{block.body}</p>;
    case "vehicles":
      return (
        <>
          <p className="mb-6 max-w-2xl text-lg">{block.intro}</p>
          <dl className="divide-y divide-line border-y border-line">
            {block.picks.map(([path, why]) => {
              const v = vehicles.find((x) => x.path === path)!;
              return (
                <div key={path} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="font-bold text-navy">{linkFor(path) ? <PageLink href={path} className="hover:text-royal">{v.name}</PageLink> : v.name}</dt>
                  <dd>{why}</dd>
                </div>
              );
            })}
          </dl>
          <p className="mt-5 text-[.95rem]">Categories are examples and depend on availability.</p>
          <p className="mt-2"><PageLink href="/vehicles/" className="font-semibold text-royal underline-offset-4 hover:underline">Compare vehicle categories</PageLink></p>
        </>
      );
  }
}

/** Landing page for routes, airports and services. Section order and mix come from the content file. */
export function ContentPage({ path, content, opposite, children }: { path: PagePath; content: PageContent; opposite?: string; children?: React.ReactNode }) {
  if (!isPublished(path)) notFound();
  const route = getPage(path).route;
  const reverse = route ? returnPath(path) : null;
  const links = content.links.filter(([p]) => linkFor(p));
  return (
    <>
      <section className="on-dark bg-navy text-white">
        <div className="shell pb-14 pt-6 lg:pb-20">
          <Breadcrumbs path={path} dark />
          <div className="mt-8 grid items-start gap-10 lg:mt-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
            <div>
              <h1 className="text-[clamp(2.1rem,1.6rem+2vw,3.1rem)] leading-[1.1]">{content.h1}</h1>
              <div className="mt-5 max-w-xl space-y-4 text-lg leading-relaxed text-white/80">{content.intro.map((t) => <p key={t}>{t}</p>)}</div>
              <p className="mt-5 max-w-xl border-l-2 border-gold pl-4 text-[.95rem] text-white/80">Available on request and subject to driver and partner confirmation.</p>
              <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/book-transport/">Request a quote</ButtonLink><WhatsAppButton /></div>
              {reverse && opposite && linkFor(reverse) && (
                <p className="mt-8 flex max-w-xl gap-3 border-t border-white/15 pt-6 text-white/80">
                  <ArrowLeftRight className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                  <span>{opposite} <PageLink href={reverse} className="font-semibold text-white underline underline-offset-4">{getPage(reverse).label}</PageLink></span>
                </p>
              )}
            </div>
            <BookingForm places={placeSuggestions} vehicles={vehicles.map((v) => v.name)} pickup={route ? route.origin : ""} destination={route ? route.destination : ""} />
          </div>
        </div>
      </section>

      {children}

      {content.blocks.map((block, i) => (
        <section key={block.title} aria-labelledby={`s${i}`} className={cn("py-14 lg:py-20", i % 2 === 1 && "bg-mist")}>
          <div className="shell grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <h2 id={`s${i}`} className="text-[clamp(1.6rem,1.4rem+.9vw,2.1rem)] leading-tight">{block.title}</h2>
            <div><BlockBody block={block} /></div>
          </div>
        </section>
      ))}

      <section aria-labelledby="faq-heading" className="border-t border-line py-14 lg:py-20">
        <div className="shell grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <h2 id="faq-heading" className="text-[clamp(1.6rem,1.4rem+.9vw,2.1rem)] leading-tight">Common questions</h2>
          <div>
            {content.faqs.map(([q, a]) => (
              <details key={q} className="group border-b border-line">
                <summary className="flex min-h-14 list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-navy hover:text-royal [&::-webkit-details-marker]:hidden">
                  {q}<Plus className="size-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="max-w-2xl pb-5 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {links.length > 0 && (
        <nav aria-label="Related pages" className="bg-mist py-14">
          <ul className="shell grid gap-x-12 md:grid-cols-2">
            {links.map(([p, reason]) => (
              <li key={p} className="border-t border-line">
                <PageLink href={p} className="group flex items-center gap-4 py-5">
                  <span className="flex-1"><span className="block font-bold text-navy group-hover:text-royal">{getPage(p).label}</span><span className="mt-1 block text-[.95rem]">{reason}</span></span>
                  <ArrowRight className="size-5 shrink-0 text-royal" aria-hidden="true" />
                </PageLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <section aria-labelledby="cta-heading" className="on-dark border-b border-white/10 bg-navy-soft text-white/80">
        <div className="shell flex flex-col gap-7 py-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl"><h2 id="cta-heading" className="text-[clamp(1.6rem,1.4rem+.9vw,2.1rem)] leading-tight">{content.cta.title}</h2><p className="mt-3 text-lg">{content.cta.text}</p></div>
          <div className="flex flex-wrap gap-3"><ButtonLink href="/book-transport/">Request a quote</ButtonLink><WhatsAppButton /></div>
        </div>
      </section>
      <JsonLd data={serviceLd(path, content)} />
    </>
  );
}
