const HOST = "riyadhtransportgroup.com";

/**
 * Sends www and plain-http visitors to the one canonical https address.
 * Returns null when no redirect is needed. `cf-ray` exists only on Cloudflare's
 * network, so local previews are never redirected to the live site.
 */
export function canonicalRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  const isWww = url.hostname === `www.${HOST}`;
  const isPlainHttp = url.hostname === HOST && url.protocol === "http:";
  if (!request.headers.has("cf-ray") || !(isWww || isPlainHttp)) return null;
  url.protocol = "https:";
  url.hostname = HOST;
  url.port = "";
  return Response.redirect(url.toString(), 308);
}
