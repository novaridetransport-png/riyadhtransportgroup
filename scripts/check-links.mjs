/**
 * Crawls a running build and checks every page against the URL registry.
 *   npm run check:links            (BASE_URL overrides http://localhost:3000)
 */
import { registry, indexablePaths, breadcrumbTrail, returnPath, linkFor, isPublished } from "../src/config/urls.ts";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const origin = "https://riyadhtransportgroup.com";
const errors = [];
const indexing = process.env.NEXT_PUBLIC_INDEXING_ENABLED === "true";
const seen = { title: new Map(), description: new Map(), h1: new Map() };
const texts = new Map();
const get = (p) => fetch(base + p, { redirect: "manual" });
const unique = (kind, value, path) => {
  if (!value) errors.push(`${path} has no ${kind}`);
  else if (seen[kind].has(value)) errors.push(`${path} shares its ${kind} with ${seen[kind].get(value)}`);
  seen[kind].set(value, path);
};

for (const [path, entry] of Object.entries(registry)) {
  if (!/^\/([a-z0-9-]+\/)*$/.test(path)) errors.push(`Bad URL format: ${path}`);
  const res = await get(path);
  const html = await res.text();
  if (entry.status !== "published") {
    if (res.status !== 404) errors.push(`${path} is ${entry.status} but returned ${res.status}`);
    continue;
  }
  if (res.status !== 200) { errors.push(`${path} returned ${res.status}`); continue; }

  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  if (new URL(canonical ?? "about:blank").href !== origin + path) errors.push(`${path} canonical is ${canonical}`);
  if (!html.includes('property="og:title"')) errors.push(`${path} has no Open Graph title`);
  if (/name="robots" content="[^"]*noindex/.test(html) === (indexing && entry.index)) errors.push(`${path} robots does not match the registry`);
  if ((html.match(/<footer[ >]/g) ?? []).length !== 1 || !html.includes('id="mobile-menu"')) errors.push(`${path} is missing the site header or footer`);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1]);
  if (h1s.length !== 1) errors.push(`${path} must have exactly one h1`);
  unique("title", html.match(/<title>([^<]+)/)?.[1], path);
  unique("description", html.match(/name="description" content="([^"]+)/)?.[1], path);
  unique("h1", h1s[0], path);

  if (path !== "/") {
    const bare = await get(path.slice(0, -1));
    if (bare.status !== 308) errors.push(`${path} without a slash returned ${bare.status}, expected 308`);
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    const crumbs = ld.find((d) => d["@type"] === "BreadcrumbList")?.itemListElement.map((i) => i.item) ?? [];
    const expectedCrumbs = breadcrumbTrail(path).filter((p) => isPublished(p)).map((p) => origin + p);
    if (crumbs.join() !== expectedCrumbs.join()) errors.push(`${path} breadcrumbs are ${crumbs}`);
    if (["route", "airport", "service", "directory"].includes(entry.type) && !ld.some((d) => d["@type"] === "Service")) errors.push(`${path} has no Service data`);
  }

  const hrefs = [...html.matchAll(/<a [^>]*href="(\/[^"]*)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    const target = href.split("#")[0];
    if (!registry[target]) errors.push(`${path} links to unregistered ${href}`);
    else if (!isPublished(target)) errors.push(`${path} links to ${registry[target].status} page ${href}`);
  }
  const reverse = entry.route && returnPath(path);
  if (entry.route && (!reverse || !linkFor(reverse) || !hrefs.includes(reverse))) errors.push(`${path} does not link to its opposite direction`);

  if (entry.type !== "main") {
    const main = html.match(/<main[\s\S]*<\/main>/)?.[0] ?? "";
    texts.set(path, main.replace(/<form[\s\S]*?<\/form>/g, " ").replace(/<(script|style|nav)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ").toLowerCase().match(/[a-z’']+/g) ?? []);
  }
}

// Duplicate content: share of 4-word phrases two pages have in common (Jaccard).
const grams = new Map([...texts].map(([p, w]) => [p, new Set(w.slice(0, -3).map((_, i) => w.slice(i, i + 4).join(" ")))]));
const pairs = [];
const list = [...grams];
list.forEach(([a, A], i) => list.slice(i + 1).forEach(([b, B]) => {
  const shared = [...A].filter((g) => B.has(g)).length;
  pairs.push([shared / (A.size + B.size - shared), a, b]);
}));
pairs.sort((x, y) => y[0] - x[0]);
console.log("Most similar pages:");
pairs.slice(0, 3).forEach(([s, a, b]) => console.log(`  ${(s * 100).toFixed(1)}%  ${a}  ${b}`));
if (pairs[0]?.[0] > 0.25) errors.push("Two pages share more than 25% of their phrases");
const counts = [...texts.values()].map((w) => w.length);
console.log(`Words per content page: ${Math.min(...counts)} to ${Math.max(...counts)}`);

const sitemap = [...(await (await get("/sitemap.xml")).text()).matchAll(/<loc>([^<]+)/g)].map((m) => m[1]);
const expected = (indexing ? indexablePaths() : []).map((p) => origin + p);
if (sitemap.join() !== expected.join()) errors.push(`Sitemap mismatch: ${sitemap}`);
console.log(`Published: ${Object.keys(registry).filter(isPublished).length}, in sitemap: ${sitemap.length}, registered: ${Object.keys(registry).length}`);

errors.forEach((e) => console.error("ERROR " + e));
console.log(errors.length ? "FAILED" : "OK");
process.exit(errors.length ? 1 : 0);
