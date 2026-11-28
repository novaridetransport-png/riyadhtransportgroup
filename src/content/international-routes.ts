import type { InternationalRoutePath } from "@/config/urls";
import { internationalCorridors } from "./corridors";
import { internationalOutbound } from "./international-outbound";
import { internationalReturn } from "./international-return";
import type { RouteContent } from "./types";

/** Typed so that a registered international route without content fails the build. */
export const internationalRoutes: Record<InternationalRoutePath, RouteContent> = { ...internationalOutbound, ...internationalReturn, ...internationalCorridors };
