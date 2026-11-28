import type { SaudiRoutePath } from "@/config/urls";
import { saudiCorridors } from "./corridors";
import { saudiOutbound } from "./saudi-outbound";
import { saudiReturn } from "./saudi-return";
import type { RouteContent } from "./types";

/** Typed so that a registered Saudi route without content fails the build. */
export const saudiRoutes: Record<SaudiRoutePath, RouteContent> = { ...saudiOutbound, ...saudiReturn, ...saudiCorridors };
