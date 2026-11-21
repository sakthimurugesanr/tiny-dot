# Verification — 26 October 2026

## Latest presentation and interaction refinements

- Removed the hero slideshow control bar, the three-item approach strip, the homepage service-summary line/CTA and the occasion introduction's right-hand text card. Added a subtle pale-blue lower mobile hero fade and expanded the desktop hero to a 600 px minimum with a wider container.
- Section labels and header text branding use Comfortaa; the footer wordmark uses Monoton. Both fonts are self-hosted through Next/Font. Verified the footer wordmark fits its container.
- Counters have a transparent background and four values: the client-supplied 100+ deliveries, 40 service options, seven categories and 20 actual curated portfolio photos. The process section uses connected circular steps, arranged horizontally on desktop and vertically on mobile.
- The maker portrait uses its full square composition with contain sizing and no image parallax/zoom, preserving the face and the model on mobile and desktop.
- Search/filter controls align at identical top positions and 49 px heights on desktop. Focused MUI input and shared dropdown/calendar triggers retain a single border with no extra outline. Browser checks confirmed search, service preset, time selection and calendar date selection.
- Memoized hero image components, stable image-load callbacks, a precomputed service search index, memoized filtering/select/date components and stable option arrays reduce repeated work. Calendar code loads only when its popover opens. GSAP initialization runs during idle time; individual cards reveal on entry and filtered-in cards are observed. Animation cleanup and reduced-motion support remain in place. Removed 42 unused stylesheet rules for the deleted controls/strip.
- Browser checks covered Home, Services, Bookings, Portfolio, About, Contact and a JSON service page at 320, 768 and 1440 px: 21 combinations with no horizontal document overflow. Additional 390 px mobile and 1280 px desktop visuals were inspected; captured browser error logs were empty.
- Lint, TypeScript, Webpack production build, all 78 public-route smoke checks and booking integration checks passed. Synthetic booking records were removed by their test script. The existing Next.js dependency advisory remains.

No new Lighthouse score, transfer-size reduction or cross-device frame-rate guarantee is claimed for these optimizations.

## Gradient palette and JSON catalogue — 20 November 2026

- Balanced the blue with muted sapphire (#365a91), warm ivory, lavender and teal. Added layered page gradients and tinted gradients to section surfaces, cards, banners, the header and footer.
- Reduced desktop section padding to 36 px and mobile padding to 28 px; shortened service introductions, preview images, gallery rows and other large image areas. The desktop homepage service preview now uses one four-card row (811 px total section height measured at 1440 px).
- Increased the mobile hero to a 760 px minimum, verified at 320 and 390 px. Moved its slideshow controls to the left so they do not overlap the floating contact buttons.
- Connected the supplied JSON catalogue to 40 server-rendered service detail routes, with customization choices, references, expandable process steps, indicative production ranges, care and packing notes, metadata and sitemap entries. The detailed JSON stays on the server. Quote buttons map JSON names back to validated booking service values.
- Confirmed all 40 existing service options map to unique JSON slugs. Browser testing verified detail navigation, process expansion and the Custom Human Miniatures enquiry preset.
- Responsive checks: six pages at 320 px, seven pages at 768 px and seven at 1440 px, including a JSON service page; no horizontal document overflow. The homepage was also inspected at 390 and 1280 px.
- Lint, TypeScript and all 78 public-route HTTP smoke checks passed, including the 40 new service routes and existing validation/not-found checks. No new performance score is claimed.

## Blue studio refresh — 20 November 2026

- Applied a blue theme across shared layouts, buttons, MUI fields, navigation and footer. Comfortaa styles the text wordmark; Encode Sans Semi Expanded styles section labels. Fonts are self-hosted with Next/Font.
- Added all 40 requested services in seven categories, searchable category cards, individual enquiry presets and working category links from the homepage. Legacy service values remain accepted by the APIs.
- Prepared four responsive WebP copies of the supplied Plenty-of-possibility photographs (approximately 284 KB combined), preserving the originals. Added faded service images and image-backed service/occasion introductions.
- Added five hero messages with blur/fade transitions, pause and slide controls. GSAP supplies image parallax, section reveals and the count-up treatment; reduced-motion preferences disable automatic motion. Delivery count 100+ was supplied by the client; 40 services and seven categories are derived from the catalogue.
- Replaced native form dropdowns and date inputs with shared Radix/shadcn-style selects and a Popover/React DayPicker calendar. Text fields and consent controls retain MUI. Verified calendar selection inside the booking drawer, future-date availability, service presets and required-field feedback.
- Replaced the bottom horizontal contact bar with two vertically stacked circular Call/WhatsApp links. Removed the extra appointment tab and header emblem, and aligned the mobile approach list into icon/text rows.
- Browser checks covered Home, Services, Portfolio, About, Contact and Bookings at actual CSS widths 320, 768 and 1440 px: 18 combinations with no horizontal document overflow. The 320 px slideshow controls and calendar were also checked for fit.
- Verified all seven service cards and 40 option buttons, the vehicle filter (one card/four options), architecture category links, empty-search recovery, 3D Printing enquiry preset, fifth hero message, final counter values, footer font and no captured browser console errors.
- Lint and TypeScript passed. The Webpack production build passed. The existing Next.js security advisory remains; no dependency security upgrade was included.
- Booking integration checks passed validation, consent, origin/body checks, persistence and matching receipts for a legacy service plus Wedding Miniatures and 3D Printing, rate limiting and private-record isolation. The script removed its own synthetic booking records.

These checks do not claim an updated Lighthouse score or measured frame rate across devices.

## Build and routes

- Production `npm run build`: passed, including strict TypeScript checking; 43 generated build entries.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- Automated HTTP checks: all 37 sitemap content routes returned 200 with a main heading.
- Invalid editorial and project URLs returned 404.
- Sitemap, robots, per-page titles/descriptions/canonicals and local image assets are present.

## Responsive browser checks

Widths tested: 320, 360, 375, 390, 430, 640, 768, 1024, 1280, 1440 and 1920 px.

Homepage checked at all 11 widths. Portfolio, commissions, and a project detail page checked at all 11 widths: 44 viewport/page combinations, with no horizontal document overflow observed. Desktop and 390 px mobile hero layouts were visually inspected.

## Interactions

- Mobile menu opens, traps focus and closes with Escape.
- Portfolio filtering reduces the gallery to the selected category; project links open the corresponding detail route.
- Light theme changes the actual background and survives a reload; dark theme restores correctly. System theme is available.
- Image viewer opens, zooms, resets on image change, responds to arrow keys, closes, and supports concept-view comparison and thumbnails.
- The form rejects an empty project type, validates required details, advances through all five steps, preserves values on Back, displays review data, and disables sending when persistence is unconfigured.
- Page-ready animation initialization resolves a streamed-page hydration race. Two real ScrollTrigger pin wrappers were observed on desktop after initialization. No fake 3D interactions are included.
- Reduced-motion and mobile fallbacks were checked in the source. OS-level reduced-motion emulation and manual assistive-technology testing were not available through the browser tools; these are not claimed as completed.

## Commission API

Meaningful integration checks passed for invalid input, missing consent, honeypot input, unsafe reference protocols, invalid origin, wrong content type, oversized streamed body and unavailable storage.

An isolated server instance wrote three synthetic `qa@example.com` enquiries to private files. Their returned receipt IDs matched persisted records. The fourth request returned 429. No real customer information or external email was sent. The test server was stopped; synthetic files remain under ignored `qa/enquiries/` for inspection.

## Lighthouse

Audits used the local production server, standard simulated mobile throttling and the desktop preset. Actual scores varied across runs. The final reports are `qa/lighthouse-mobile.json` and `qa/lighthouse-desktop.json` (local ignored artifacts).

| Final local audit | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 67 | 100 | 100 | 100 | 3.3 s | 1,310 ms | 0 |
| Desktop | 79 | 100 | 100 | 100 | 0.9 s | 430 ms | 0 |

These final runs reported no browser console errors. Earlier desktop runs reached 94, and earlier mobile runs reached 80; the final measurements above are retained without selecting the best run. Performance work remains, particularly reducing initial React execution on the long homepage. Neither final performance score meets the requested 90+ target.

The requested 90+ mobile performance target was **not achieved**. Optimizations include WebP assets and Next/Image responsive delivery, locally served Next/Font fonts, deferred desktop GSAP loading, mobile-native galleries, debounced ScrollTrigger refreshes, zero measured layout shift, and offscreen mobile rendering containment. Accessibility, best-practices and SEO audits reached 100; this is automated homepage evidence, not a site-wide accessibility certification.

## Production limits

- No public or Vercel deployment was performed. Follow the README for deployment.
- Vercel/serverless deployments deliberately disable disk-backed enquiries. A user-approved durable cloud integration is still needed there.
- Automatic approval review rejected the proposed Resend integration because it would send customer contact and project data to that external destination without explicit approval. It is not implemented or enabled.
- Real artist identity, credentials, owned social profiles, approved photographs, project measurements, reviews and exhibition details were not supplied. Demo material is identified, and no verified business claims are fabricated.
- Shipping, pricing, payment, uploads, live social feeds and 360-degree media are not simulated.
- Legal pages are factual concept drafts; business identity, contact, retention policy and applicable commercial terms need to be completed before a real launch.

## Design refresh — 19 November 2026

- Shared Google Fonts stylesheet added; Gabarito headings and Nunito body text verified in the browser. Google Fonts hosts are permitted by the content policy.
- Forest green / warm ivory theme, square section and card edges, simplified decorative arrows and lines.
- All six existing concept projects are visible on the homepage and portfolio, with category filters, gallery/compact views, descriptions, dimensions, materials and enquiry links.
- Six service cards and `/services` added. A service enquiry preselects its matching project type; verified Architectural Model selection from the architecture service.
- Desktop light and dark appearances inspected. Mobile navigation opens and closes.
- Homepage checked at 320, 390, 768 and 1440 px. Services, portfolio, commissions and project detail checked at 320, 768 and 1440 px. No horizontal document overflow in these 16 combinations.
- `npm run lint`: passed without warnings. `npm run build`: passed with standard Turbopack, including TypeScript and 44 generated entries.
- Production HTTP smoke checks: 38 content routes passed, plus not-found content/noindex, commission validation, consent, honeypot, body size, origin checks, content type and unavailable-storage behavior.
- Smoke checks now follow the installed Next.js documentation: streamed not-found responses can retain HTTP 200, but must render the not-found content and noindex metadata.
- Replaced the custom Turbopack Tailwind loader configuration with the official PostCSS plugin after the loader worker failed during builds.
- Existing limitation: enquiry sending requires private storage configuration; it remains unavailable in this checkout. No real enquiries were sent.
- The build reported an existing Next.js security advisory; dependency security upgrades were not included in the visual refresh.

Earlier performance reports above describe the previous homepage, not this refresh. No new Lighthouse score is claimed.

## TINY DOT’S client refresh — 19 November 2026

- Replaced the previous placeholder brand with TINY DOT’S miniatures in navigation, footer, metadata and editorial copy.
- Applied the supplied Fern (#3f4b15), Sage (#6e763f), Lichen (#97a085) and Birch (#cac7b1) palette. Rounded page panels, service cards, images, inputs and buttons now share consistent responsive spacing.
- Added the supplied phone number, YouTube Shorts and Instagram destinations to the homepage, contact page and footer. These are client-provided details; platform pages could not be independently fetched from the research tool.
- Featured the supplied Tamil Nadu bus video with its YouTube thumbnail, which was observed loading in the browser. Playback opens the original video on YouTube. A text/icon fallback is available if the thumbnail fails.
- Kept all six original generated studies in a separately labelled design inspiration gallery rather than presenting them as completed client work.
- Services now reflect the four supplied categories: vehicle miniatures, home miniatures, school/college projects and bespoke handcraft work. Each category preselects the corresponding enquiry type; all four selections were verified in the browser.
- Budget options now use INR and remain illustrative budget preferences, not product prices.
- Mobile navigation opens and closes. Exact phone and social hrefs were checked; social links open in a new tab. No calls or messages were sent.
- Browser responsive checks passed at actual CSS widths 320, 390, 768 and 1440 px across homepage, services, portfolio, About, Contact and enquiries: 24 combinations with no horizontal document overflow. Fixed the narrow-screen enquiry sidebar and About CTA heading identified during checks.
- Lint passed without warnings. TypeScript and all 44 generated build entries passed; Next.js also reported its existing dependency advisory reminder.
- Online form submission remains disabled without private storage. The form provides direct phone and Instagram contact links.
- Final client-refresh verification: `npm run build` completed successfully after the advisory reminder; `npm run lint` passed. Production smoke checks on port 3012 passed all 38 public routes and commission validation/unavailable-storage behavior.

## Single light theme — 19 November 2026

- Replaced the green palette with warm white (#faf9f6), slate (#26343f), muted gray and restrained terracotta (#a84c32) accents.
- Removed the theme menu, next-themes provider, dark CSS tokens and dark button utility variants. The document declares a static light class and native light color scheme, independent of saved preferences or OS theme.
- Header, hero, services, showcase, gallery, process, social section and footer now use straight edges and open spacing. Modest rounding remains on service/social cards, images and controls; only the enquiry banner retains a rounded outer section.
- Verified actual CSS widths 320, 768 and 1440 px on Home, Services, Portfolio, About, Contact and Enquiries: all 18 checks reported light color scheme and no horizontal overflow.
- Mobile navigation opens and closes; the theme selector is absent. Lint passed. Compilation, TypeScript and all 44 generated entries passed before the existing dependency advisory reminder.
- Final `npm run build` completed successfully after the existing advisory reminder. The current light-only layout and static document scheme were visually verified on desktop and mobile.

## Booking drawer and curated media — 19 November 2026

- Added the persistent right-side gradient appointment tab, header consultation CTA and service-specific booking buttons. The mobile tab sits at the lower right; the drawer uses an accessible Radix modal with focus containment and a close control.
- Replaced the five-step commission form with a short MUI form: name, phone, optional email, service, optional date, preferred call time, message and contact consent. shadcn/ui buttons submit requests. The drawer form loads on demand.
- Added `/api/bookings`: validates input and consent, enforces origin/content type/body limits and honeypot checks, rate limits to three requests per network per hour, persists pending requests privately and returns a receipt after the file is flushed. Appointment times remain requests until confirmed directly. No email or external message is sent.
- On a self-hosted Node server, bookings use `private-data/bookings` by default, with an optional `BOOKING_STORAGE_DIR` override. This is a separate flow from the legacy `/api/commissions` endpoint. Disk-backed booking is disabled on Vercel.
- Curated exactly 20 photos and 10 videos from the supplied posts/highlights. Inspected image and video contact sheets. Skipped duplicate angles, unrelated posts, and the AI-labelled highlight folders. Original media was preserved.
- Prepared responsive WebP photos, H.264/AAC videos with fast-start metadata, and preview posters. Curated assets total approximately 22.9 MB; the 20 photos total approximately 1.5 MB. Video sources mount only after a visitor opens a film.
- Main homepage and portfolio now use real client media. Added a custom photo mosaic, photo/film tabs, service category filters, enlarged photo viewer and modal video playback. The homepage previews 8 photos and 4 films; the portfolio exposes all 20 photos and 10 films.
- Added customization points, studio films, a three-step booking guide, maker story, booking FAQs, gradient accents and additional calls to action. The site remains in its single light theme.
- Browser checks: all 20 photos and 10 film cards counted; architecture filter showed 6 photos; native playback advanced with readyState 4 and no media error; photo viewer opens and closes; all four service CTAs preselect their matching MUI service option.
- Browser end-to-end booking: empty form validation displayed required-field errors. A synthetic valid booking saved successfully, and the UI receipt matched a private pending record. The synthetic record was removed after verification.
- Responsive checks: homepage, photo portfolio, film portfolio, services, booking page and contact at actual CSS widths 320, 768 and 1440 px showed no horizontal overflow. Mobile drawer width/content both measured 308 px within a 320 px viewport. Contact's 768 px check was repeated after a viewport synchronization delay. Service preset and mobile form visuals were inspected.
- Browser console error inspection returned no errors during the checked gallery session.
- Booking API integration checks passed: invalid input/phone, consent, honeypot, past date, origin, content type, body size, three real private file writes with matching receipts, fourth-request rate limit, and private records not served publicly. Tests removed only their own synthetic records.
- Existing production smoke checks passed all 38 public routes and the legacy API validation checks. MUI integration follows the App Router cache provider and light theme setup. TypeScript, lint and the production build passed; Next.js continues to report its existing dependency advisory.

## Mobile refinement, media controls and optimization — 19 November 2026

- Added teal as a secondary accent, a shorter mobile hero, denser custom photo grids, a new occasions section and editorial studio quotations. Quotes are studio copy, not fabricated client reviews.
- Rebuilt About and Contact with client media, clear descriptions, preparation points, direct contact choices and consultation calls to action. Added a WhatsApp draft link for +91 7094341480 and a mobile Call / WhatsApp / Booking bar. No calls or external messages were sent.
- Services has MUI search and category controls. Browser checks confirmed bus search returns one service, the homes filter returns one, clearing restores four, and a no-result query provides a working clear action. Gift search finds bespoke handcraft work and opens a correctly preselected booking form.
- Films now use a touch-scrollable snap shelf with two right-aligned arrow controls. Browser testing observed horizontal scrolling from 0 to approximately 277 CSS px and the previous control enabling afterward. All 10 clips remain available in the portfolio; the homepage previews six.
- The photo viewer loads on demand and supports thumbnails, previous/next, arrow keys, 100–300% zoom, reset and bounded drag logic. Browser testing confirmed zoom to 150%, next resetting to 100%, thumbnail selection, and keyboard navigation. The homepage viewer can browse the whole curated photo collection.
- Memoized photo/film/service cards, derived gallery/filter arrays and stable event callbacks avoid unnecessary repeated rendering. useLayoutEffect is restricted to attaching a ResizeObserver for the zoom viewport; pointer movement does not trigger layout reads.
- Scoped MUI away from the root layout. Booking and service controls own their providers; viewer/player code loads only when opened. The final homepage DOM had 19 lazy-loaded images, no video elements before interaction, an eager high-priority hero image and no external Google Fonts stylesheet.
- Self-hosted Gabarito and Nunito via next/font. Removed unused global animation code, six old standalone components, the unused scale component, the global loading file and related dependency entries. Replaced broad UI imports with the specific Dialog package and native styled buttons. Removed approximately 33 KB of unused/redundant stylesheet source (including 408 unused selectors); originals were retained temporarily in ignored qa backups for review.
- Responsive browser checks: Home, Services, photo portfolio, film portfolio, About, Contact, Bookings, Creative Process, FAQ and a legacy project detail at actual CSS widths 320, 768 and 1440 px: 30 combinations without horizontal document overflow. This also checked that retained routes still render after CSS cleanup.
- Booking validation still displays required-field errors after scoping MUI. The native styled service button opened a Handcraft Work booking preset in the production preview. Production smoke checks passed all 38 public content routes, not-found rendering/noindex and legacy commission checks. Booking/media checks passed validation, consent, private persistence/receipt matching, rate limiting and exactly 20 photos / 10 video files. Synthetic request records were removed by the test script.
- `npm run lint`, TypeScript and the production build passed. The build still reports the existing Next.js dependency advisory; that upgrade was outside this change.

### Asset comparison

Uncompressed sums of script assets referenced by production HTML, measured before this turn and after the final refinement:

| Page | Before | After | Change |
| --- | ---: | ---: | ---: |
| Home | 786,139 B | 691,629 B | 12.0% less |
| Services | 760,362 B | 860,874 B | 13.2% more |
| Portfolio | 786,139 B | 686,644 B | 12.7% less |

Services intentionally includes the newly requested MUI controls. These totals are not transferred/gzip sizes or runtime timings; compatibility script references may be included.

### Mobile performance audit

A local production audit found CLS 1 from the old global loading spinner: it briefly painted the footer before inserting the full page. Removing that loading boundary eliminated the observed shift. The follow-up audit, with the same Lighthouse mobile settings, recorded:

| Metric | Before the loading fix | Final |
| --- | ---: | ---: |
| Performance | 59 | 91 |
| CLS | 1 | 0 |
| LCP | 3.7 s | 3.3 s |
| TBT | 300 ms | 120 ms |

Reports: `qa/lighthouse-refined-mobile.json`, `qa/lighthouse-refined-mobile-final.json`, `qa/performance-before.json`, `qa/performance-after.json`, and `qa/style-optimization.json`. These audits evaluate this refinement locally; earlier audits above refer to older designs. The final LCP still exceeds the 2.5 s good threshold, and no cross-device performance guarantee or site-wide certification is claimed.
