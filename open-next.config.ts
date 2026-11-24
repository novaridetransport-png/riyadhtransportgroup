import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

const config = {
  // Every page is static, so prerendered output is served from Workers assets (no R2 needed).
  ...defineCloudflareConfig({ incrementalCache: staticAssetsIncrementalCache }),
  // "npm run build" runs OpenNext (what Cloudflare calls), so OpenNext must call Next directly.
  buildCommand: "npm run build:next",
};

export default config;
