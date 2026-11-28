import { ArrowRight } from "lucide-react";
import { PageLink } from "@/components/ui/page-link";
import { getPage, publishedRoutes } from "@/config/urls";

/** Outbound and return route lists, generated from the registry. */
export function RouteDirectory({ directory }: { directory: "/saudi-arabia/" | "/international-transfers/" }) {
  const groups = [
    { title: "From Riyadh", paths: publishedRoutes(directory, "outbound") },
    { title: "To Riyadh", paths: publishedRoutes(directory, "return") },
    { title: "Other routes", paths: publishedRoutes(directory, "between") },
  ].filter((g) => g.paths.length > 0);
  return (
    <div className="shell grid gap-12 py-14 lg:grid-cols-2 lg:gap-x-20 lg:py-20">
      {groups.map((g) => (
        <section key={g.title} aria-label={g.title}>
          <h2 className="border-b-2 border-gold pb-4 text-2xl">{g.title}</h2>
          <ul>
            {g.paths.map((p) => (
              <li key={p} className="border-b border-line">
                <PageLink href={p} className="group flex min-h-16 items-center justify-between gap-4 py-3">
                  <span className="font-bold text-navy group-hover:text-royal">{getPage(p).label}</span>
                  <ArrowRight className="size-5 text-royal" aria-hidden="true" />
                </PageLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
