import { PageLink } from "@/components/ui/page-link";
import { breadcrumbTrail, getPage, isPublished, type PagePath } from "@/config/urls";
import { breadcrumbLd, JsonLd } from "@/lib/seo/jsonld";
import { cn } from "@/lib/utils/cn";

export function Breadcrumbs({ path, dark = false }: { path: PagePath; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap gap-x-2 text-sm", dark ? "text-white/75" : "text-body")}>
        {breadcrumbTrail(path).map((p, i) => (
          <li key={p} className="flex gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {p === path ? <span aria-current="page" className="font-semibold">{getPage(p).label}</span>
              : isPublished(p) ? <PageLink href={p} className="underline-offset-4 hover:underline">{getPage(p).label}</PageLink>
              : <span>{getPage(p).label}</span>}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbLd(path)} />
    </nav>
  );
}
