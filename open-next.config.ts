import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page is static, so prerendered output is served from Workers assets (no R2 needed).
export default defineCloudflareConfig({ incrementalCache: staticAssetsIncrementalCache });
