import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { PageLink } from "@/components/ui/page-link";
import type { PagePath } from "@/config/urls";
import type { PolicySection } from "@/content/policies";

export function PolicyPage({ path, title, updated, intro, sections, related }: { path: PagePath; title: string; updated: string; intro: string; sections: PolicySection[]; related: [PagePath, string][] }) {
  return (
    <section className="pb-20 pt-8 lg:pb-28">
      <div className="shell">
        <Breadcrumbs path={path} />
        <h1 className="mt-8 text-section text-navy">{title}</h1>
        <p className="mt-3">Last updated {updated}</p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed">{intro}</p>
        <div className="mt-10 max-w-3xl space-y-9">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl">{s.title}</h2>
              {s.body.map((b) => <p key={b} className="mt-2 leading-relaxed">{b}</p>)}
              {s.list && <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed">{s.list.map((l) => <li key={l}>{l}</li>)}</ul>}
            </section>
          ))}
        </div>
        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
          {related.map(([href, label]) => <li key={href}><PageLink href={href} className="font-semibold text-royal underline underline-offset-4">{label}</PageLink></li>)}
        </ul>
      </div>
    </section>
  );
}
