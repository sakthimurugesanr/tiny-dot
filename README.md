# TINY DOT’S miniatures

A light-theme miniature studio website with real client photographs and videos, responsive galleries, MUI booking fields, shadcn buttons, and a right-side appointment drawer. The current booking flow saves pending requests privately on a self-hosted Node server; dates and project details are confirmed directly.

## Run locally

Requires Node 20.9+ (Node 24 LTS recommended) and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

On Windows PowerShell use `Copy-Item .env.example .env.local` instead of `cp` if preferred. Open the local URL printed by Next.js.

```sh
npm run lint
npx tsc --noEmit
npm run build
npm start
node scripts/smoke.mjs http://127.0.0.1:3000
```

The lockfile pins the current Next.js 16, React 19, TypeScript, Tailwind 4, MUI, shadcn-style native buttons, Radix Dialog, Lucide, React Hook Form and Zod dependencies. The legacy illustrative quote route retains Embla. Gabarito and Nunito are self-hosted with next/font.

## Routes

All requested paths are implemented. Editorial pages use the shared `src/app/[page]/page.tsx` server template with distinct content. Portfolio/category/project routes, journal articles, and gallery product detail pages use their own templates. Unknown slugs return 404.

- `/`, `/about`, `/portfolio`, `/portfolio/[category]`, `/portfolio/project/[slug]`
- `/miniature-art`, `/dioramas`, `/miniature-photography`, `/custom-projects`
- `/commissions`, `/creative-process`, `/studio`, `/exhibitions`
- `/shop`, `/shop/[slug]`, `/journal`, `/journal/[slug]`
- `/testimonials`, `/faq`, `/contact`, `/privacy`, `/terms`
- `/api/commissions`, `/sitemap.xml`, `/robots.txt`

## Customize

- `src/config/site.ts`: brand, canonical origin, public email.
- `src/data/projects.ts`: project concepts, categories, proposed dimensions, scale, materials, journal entries, process.
- `src/data/pages.ts`: biography/editorial copy and FAQs.
- `src/components/home/interactions.tsx`: clearly marked illustrative quotes.
- `src/app/globals.css`: semantic theme tokens and responsive layouts.
- `public/images/ASSETS.md`: image provenance.

Images are original AI-generated concept illustrations. Some details are alternate crops, explicitly labeled as such. Proposed scales and dimensions are concept data, not physical measurements. The scale explorer calculates model height × scale denominator; it does not pretend that resizing a photo changes a physical model's scale. No real artist identity, client feedback, social account, exhibition, award, stock, price, or delivery promise has been fabricated. Replace all demo content and legal drafts with verified material before a business launch.

## Legacy commission endpoint

The old `/api/commissions` endpoint is retained for compatibility. The current website uses the shorter `/api/bookings` flow described below.

Sending is **disabled by default**. For a self-hosted Node server with a persistent private volume, set `COMMISSION_STORAGE_DIR` to an absolute directory outside `public/` and outside the web-served document root. Restrict directory access to the server account using OS permissions. Each request is stored in a separate UUID JSON file. The studio operator reads these files privately; no admin web interface is exposed. Configure backups, retention and deletion procedures, monitor the intake directory, and deploy a single writer instance on a persistent filesystem.

The handler enforces Zod validation, consent, same-origin browser requests, a honeypot, a 24 KB streamed body limit, and a persistent per-network rate limit of three requests per hour with an exclusive lock. Configure a trusted reverse proxy to overwrite `X-Forwarded-For`; do not trust client-provided values on an exposed Node server. Network IDs are hashed. If the storage or rate service fails, requests fail closed. Reference links are stored as text and never fetched. Direct uploads are intentionally not enabled.

There is no external email or cloud database integration in the delivered version. Automatic approval review rejected the proposed Resend integration because transmitting customer data to that destination requires explicit approval. Resend would receive the name, email, optional phone, country, delivery region, project requirements, budget, notes, references and consent so it could deliver the enquiry email. It has not been implemented or enabled.

To test actual persistence in an isolated instance, set `COMMISSION_STORAGE_DIR` to an absolute test directory, start the server on a second port, and run:

```sh
node scripts/smoke.mjs http://127.0.0.1:3001 --storage
```

Only synthetic `example.com` data is used. The test saves three records and verifies a fourth is rate limited. Test records can be removed from that dedicated test directory after inspection.

## Vercel deployment

1. Push this project to your Git repository and import it in Vercel.
2. Select the Next.js preset; build command `npm run build`, output directory default.
3. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin with no trailing slash. Optionally set a verified `NEXT_PUBLIC_CONTACT_EMAIL`.
4. Deploy. Check canonical URLs, sitemap, images, all routes and both themes.

The portfolio works on Vercel. **Disk-backed commission sending is deliberately disabled when `VERCEL` is present**, since ephemeral serverless disks are not durable. A user-approved cloud persistence/email integration must be added before accepting requests on Vercel. Never set the directory to `/tmp` to simulate durable storage. A verified public email can provide a direct contact route in the meantime.

This project follows the requested native Next.js architecture rather than replacing it with the Sites Vinext runtime. It is delivered as a local project and Vercel-ready source; no hosted deployment is claimed.

## Accessibility and animation

Semantic landmarks, skip link, visible focus, labeled form errors, native FAQs, accessible Radix focus-trapped lightboxes/menu, Escape and arrow-key support, theme persistence, reduced-motion fallbacks, mobile native gallery scrolling, bounded pan/zoom and scoped GSAP cleanup. Desktop-only ScrollTrigger pinning is implemented for the horizontal gallery and narrative. The image viewer supports keyboard/swipe navigation, zoom, bounded pan, reset, and optional browser fullscreen. No fake 3D rotation is used. Page content is visible in server HTML if JavaScript is unavailable.

## Security and launch tasks

Security headers and a same-origin content policy are configured. HTTPS is provided by the production host. Environment secrets are never exposed to clients. Inline scripts are permitted because Next.js/next-themes require bootstrap scripts; a stricter nonce policy can be added for a specific hosting setup.

Before a real launch, add the verified artist biography/portrait, owned social URLs, contact/business identity, approved photographs, real project specifications, permissioned feedback, retention policy and reviewed legal terms. Add a user-approved production enquiry integration for serverless hosting. Gallery entries are enquiry-only: there is no payment or fake checkout.

See `QA.md` for measured checks and limitations. Performance scores depend on host, device, network and content; they are not guarantees.

## November 2026 design refresh

The homepage now presents all six project studies and six service categories. The portfolio supports category filters and gallery/compact views. `/services` lists each service and links to a requirements form with the project type selected. Edit service descriptions and inclusions in `src/data/services.ts` and projects in `src/data/projects.ts`.

The two-color palette is forest green and warm ivory, with square section and card edges. The shared Google Fonts stylesheet contains the requested font families; Gabarito is used for headings and Nunito for body text throughout the app. Fonts load from Google at runtime with system fallbacks. This supersedes the earlier Next/Font self-hosting description. Tailwind uses the official PostCSS integration for both development and production builds.

## TINY DOT’S client identity

Client-supplied branding, contact number and social URLs are configured in `src/config/site.ts`. The four supplied service categories and enquiry types are in `src/data/services.ts` and `src/lib/validations/commission.ts`. The latest theme uses the client’s Fern, Sage, Lichen and Birch colors with rounded sections and cards, superseding the earlier square-edged design.

The homepage and portfolio feature the supplied Tamil Nadu bus YouTube video. Its thumbnail loads from YouTube; opening the feature takes the visitor to the original video. The six original generated project studies remain clearly labelled as inspiration. Contact links call +91 7094341480 or open the supplied Instagram and YouTube profiles; no email address, WhatsApp availability, pricing or delivery guarantees have been invented.

## Current appearance: a single light theme

The current design supersedes the earlier green palette and rounded page panels. It uses warm white, slate, neutral gray and a terracotta accent. Most sections have open layouts and straight edges; cards and images have modest rounding, with a rounded enquiry banner. Theme switching and the theme provider have been removed, so stored dark preferences and OS appearance do not change the site.


## Current booking flow

The appointment tab, header CTA, service buttons and homepage CTAs open a right-side drawer. MUI provides the name, phone, optional email, service, optional date, preferred call time, message and consent controls. shadcn/ui buttons submit the form; Radix manages the accessible drawer and media dialogs. The same form is available at `/commissions`.

On a self-hosted Node server, pending booking requests are saved under `private-data/bookings/<receipt-id>.json` by default. This directory is ignored by Git and is outside the public asset tree. The studio operator reviews these files privately; no email, SMS or external messaging service is connected. Set `BOOKING_STORAGE_DIR` to an absolute private persistent directory to override it. Keep this directory on a persistent private volume when deploying. Disk-backed bookings are disabled on Vercel.

The endpoint validates data on the server, checks origin and consent, rejects honeypot submissions and oversized bodies, and limits a network to three requests per hour. A successful response means the request was saved, not that an appointment or order is confirmed.

## Curated client media

Exactly 20 photographs and 10 full video clips were selected from the supplied Instagram posts/highlights folder. The main gallery at `/portfolio` supports photo/film tabs, category filters, enlarged photographs and video playback. The homepage previews part of the collection. The original files are preserved.

Selected photos are optimized under `public/media/photos`; H.264/AAC videos with fast-start metadata live under `public/media/videos`, and previews under `public/media/posters`. Videos load only when opened. `src/data/media.ts` drives the UI, and `scripts/media-sources.json` records the original sources. To regenerate the curated assets with the source folder present, run `node scripts/prepare-media.mjs`.

Verification commands:

```sh
node scripts/smoke.mjs http://127.0.0.1:3000
node scripts/booking-smoke.mjs http://127.0.0.1:3000
```

The booking smoke check uses and removes only its own synthetic records.


## Mobile refinement and measured optimization

The current light design uses terracotta, slate and a restrained teal accent. Home has a shorter mobile hero, custom photo tiles, an occasions section and clearly labelled studio quotations. About and Contact are dedicated studio views rather than the older generic concept template.

The photo viewer loads when opened and supports 100–300% zoom, bounded dragging, thumbnails, previous/next controls and arrow-key navigation. Films use a horizontal snap shelf with previous/next buttons on the right and touch scrolling. Video players mount only after a click. The curated collection remains 20 photos and 10 films.

Services uses MUI search and category controls, with clear results and a recoverable empty state. WhatsApp links open a draft chat using the supplied business number; no automatic message is sent. A mobile contact bar provides Call, WhatsApp and Booking actions.

MUI providers are scoped to the forms and service controls. Photo cards, film cards and filtered lists use stable memoized values/callbacks; layout effects are limited to measuring the zoom viewport. Unused animation/theme/storage code and dependencies were removed. Below-fold images are lazy-loaded, the hero is loaded eagerly with a high priority, and fonts no longer request Google at runtime. The old global spinner was removed after an audit exposed a major layout shift.

Measured local mobile Lighthouse performance: **91**, CLS **0**, LCP **3.3 s**, TBT **120 ms**. The audit covers the homepage in local production, not every page or device. Initial script asset totals decreased 12.0% for Home and 12.7% for Portfolio. Services increased 13.2% because the requested MUI search/filter controls are now present. These asset totals are uncompressed script references from HTML, not transferred-byte or timing measurements. See `QA.md` and the local `qa/` reports for details.
