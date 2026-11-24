import { ArrowRight } from "lucide-react";
import { PageLink } from "@/components/ui/page-link";
import type { FeaturedRoute } from "@/config/routes";

export function RouteRow({ route }: { route: FeaturedRoute }) {
  return (
    <li className="border-b border-line last:border-0">
      <PageLink href={route.path} className="group flex items-center gap-4 py-5">
        <span className="flex-1">
          <span className="flex flex-wrap items-baseline gap-x-3">
            <span className="text-lg font-bold text-navy group-hover:text-royal">Riyadh to {route.to}</span>
            <span className="text-sm text-muted">{route.region}</span>
          </span>
          <span className="mt-1 block text-[.95rem]">{route.note}</span>
        </span>
        <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-line text-navy transition group-hover:border-royal group-hover:bg-royal group-hover:text-white">
          <ArrowRight className="size-5" aria-hidden="true" />
        </span>
      </PageLink>
    </li>
  );
}
