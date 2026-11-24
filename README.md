# Riyadh Transport Group website

Next.js (App Router), TypeScript, Tailwind CSS, deployed to Cloudflare Workers with OpenNext.

| Command | Purpose |
|---|---|
| `npm run dev` | Local development |
| `npm run build` | Build the Cloudflare Worker (runs `next build` inside) |
| `npm run build:next` / `npm start` | Plain Next.js build and server |
| `npm run lint` / `npm run typecheck` | Code checks |
| `npm run check:links` | Check the running site against the URL registry (add `-- --release` before deploying) |
| `npm run cf:preview` | Build and preview the Worker locally |

## Where to change things

- **URLs and publish status**: `src/config/urls.ts` (the only place URLs are defined)
- **Phone, WhatsApp, email, social links**: `src/config/site.ts`
- **Photos**: put files in `public/images/`, then set them in `src/config/media.ts`
- **Vehicle capacities**: `src/config/vehicles.ts`
