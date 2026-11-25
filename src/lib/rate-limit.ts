import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

interface Limiter { limit(options: { key: string }): Promise<{ success: boolean }> }

/** True when this visitor may submit. Uses the Cloudflare binding in wrangler.jsonc; open where it does not exist (local Next.js). */
export async function withinInquiryLimit(request: Request): Promise<boolean> {
  try {
    const limiter = (getCloudflareContext().env as unknown as { INQUIRY_LIMIT?: Limiter }).INQUIRY_LIMIT;
    return limiter ? (await limiter.limit({ key: request.headers.get("cf-connecting-ip") ?? "unknown" })).success : true;
  } catch {
    return true;
  }
}
