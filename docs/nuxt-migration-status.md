# Nuxt 4 migration status

November 10, 2026. **Local migration and validation complete. Nothing deployed.**
The npm-generated lockfile and installed dependencies now match the migrated source.
The static artifact is `.output/public`; `dist/` remains the previous release.

## Implementation

- Nuxt **4.6.4**, Vue **3.5.45**, Vue Router **5.5.0**, Nuxt Image **2.2.1**,
  Color Mode **4.1.0**, Node **24.22.2**, npm **11.6.2**. Registry access verified;
  Nuxt 4.6.4 remains the registry's latest stable release on this date. Nuxt requires
  Router `^5.4.0`, so the planning document's Router 4 assumption does not apply.
- Application code lives in `app/`; public assets retain their URLs under `public/`.
  Nuxt 4 entry/layout, head/runtime configuration, Vite, Vue 3 templates and lifecycle
  hooks, native observers, ESLint and Stylelint are implemented.
- Removed Panelbear analytics at the user's request, including the client plugin,
  public runtime configuration, and both environment-variable fallbacks. No
  analytics provider is configured.
  After removal, lint, all 3 native tests, build, generation, and all 12 browser
  tests passed again. Generation with both historical site-ID variables set still
  emitted no Panelbear references or site-ID values in HTML, JavaScript, or JSON.
- Responsive project images use Nuxt Image. Separate tiny background placeholders
  let the main image's full `src`/`srcset` remain in prerendered HTML, including when
  JavaScript is disabled. Explicit screen sizes avoid generating 1px/2px variants.
- Removed ineffective hero padding overrides whose precedence changed with Nuxt 4's
  stylesheet ordering. Hero and all section geometry now match the retained Nuxt 2
  artifact at both comparison widths. Removed homepage-link prefetching to avoid
  NuxtLink's observer error in browsers without IntersectionObserver.
- Fixed the selected lint stack's template-order/formatting warnings. Added pinned
  Playwright and `npm run test:browser` with a plain static file server.
- Removed PWA registration, installability metadata, and manifest generation.
  Retained favicon, touch icon, theme color, and site metadata. `/sw.js` remains the
  retirement worker: it removes only Workbox runtime/precache names ending in its
  registration scope, claims clients, and unregisters. It neither intercepts requests
  nor reloads pages. The client plugin updates existing historical workers and never
  registers a worker for fresh visitors.

## Installation and automated checks

All application commands ran with **Node 24.22.2 / npm 11.6.2**. The available Node
binary was `/tmp/nuxt4-node/node_modules/node/bin/node`, prepended to `PATH`.

| Check | Actual result |
| --- | --- |
| `npm install` | Passed; regenerated npm lockfile from the new package manifest |
| Fresh `npm ci` | Passed, including `nuxt prepare`; no force, legacy peer flags, or overrides |
| `npm run lint` | Passed; ESLint and Stylelint, zero warnings/errors |
| `npm test` | 3 service-worker tests passed |
| `npm run build` | Passed; Nuxt 4.6.4 / Nitro 2.13.6 / Vite 8.3.7 / Vue 3.5.45 |
| `npm run generate` | Passed; 49 prerendered routes, including 45 image files |
| `npm run test:browser` | 12 Chromium tests passed against files in `.output/public` |
| `git diff --check` | Passed |

Dependency inspection confirms Vue 3 throughout, with no Vue 2, Nuxt 2, Webpack,
`nuxt-responsive-loader`, `sass-loader`, `vue-observe-visibility`, `@nuxtjs/pwa`, or
old Nuxt lint modules in the new lockfile/tree. npm also lists six optional/native
helper packages as extraneous after the successful clean install/build; these are
Sharp/Parcel helper dependencies, not the previous application stack.

The explicit final `npm audit --json` reported **39 affected dependency entries
(4 low, 35 moderate; no high/critical)**. The underlying advisories are for
`deepmerge@4.3.1`, `glob@13.0.7`, and `minimatch@10.2.6`, propagated through Nitro
and lint tooling. Deepmerge's latest registry release remains 4.3.1; the other fixes
require newer majors outside their parents' declared ranges. No forced audit fixes
or dependency overrides were applied. Installation's inline audit summary reported
23 entries; the explicit audit above is the recorded final result.

## Browser validation

Chromium **158.0.8127.18**, Playwright **1.65.0**, served by the repository's plain
file server. No Nuxt server or runtime image transformation endpoint was available.

- **320, 390, 768, 1440px:** no horizontal overflow, all five project images loaded
  with responsive candidates and correct cover cropping. Every emitted image URL
  referenced by the page returned 200; double-density mobile images also loaded.
- Prerendered content, title/description, favicon, touch icon, PDF, fonts, all three
  experiment previews, 30 hexagonal tiles, writing cards, and wave sections passed.
  Unknown paths returned HTTP 404 on the test server; generated `404.html` and
  `200.html` exist for host-specific handling.
- System light/dark detection and live system changes, sunrise/sunset cycling,
  localStorage persistence, initial theme before application JavaScript, and actual
  light/dark/sunrise/sunset CSS palettes passed. Desktop/mobile theme screenshots
  were captured and reviewed.
- Hero and heading animations ran once; preview pause/play, reduced motion,
  keyboard navigation/focus, and section hash destinations passed. Text and full
  images remained readable with JavaScript disabled and with the observer missing.
- Normal application checks had no runtime errors, hydration warnings, failed
  asset requests, or browser console errors/warnings. No Panelbear script loaded.
- Compared fresh desktop/mobile captures with `/tmp/nuxt4-baseline`. Hero positions,
  heading sizes, and all section positions/dimensions matched exactly at 390/1440px.
  The migration also fixes the old reduced-motion hero's unreadable text fallback.
- **Returning visitor:** installed the original worker fixture with actual Workbox
  4.3.1 and its CacheFirst/NetworkFirst strategies, established control, populated
  scoped and unrelated caches, and confirmed a stale cached asset was served.
  Navigating to the new site updated `/sw.js`, removed only the owned caches,
  unregistered, served the fresh asset, and did not force an extra navigation.
  A subsequent reload had no controller. Fresh profiles registered no worker.

## Reproducing and retained evidence

See the README for normal commands. Install Chromium with `npx playwright install
chromium`, generate, then run `npm run test:browser`. The returning-visitor test
loads the historical, pinned Workbox 4.3.1 CDN and needs network access. For this
restricted workspace Chromium was installed under `/tmp/nuxt4-playwright-browsers`;
use `PLAYWRIGHT_BROWSERS_PATH=/tmp/nuxt4-playwright-browsers` to reuse it this session.
Playwright emitted an unsupported-OS notice and used its Ubuntu 24.04 fallback;
Chromium launched and all checks passed. Other browser engines were not tested.

- Previous artifact: `dist/`, also copied to `/tmp/nuxt4-baseline`.
- Previous lockfile, dependencies, and generated Nuxt files:
  `/tmp/nuxt2-migration-backup/`.
- Command logs: `/tmp/nuxt4-{install-resumed,ci,lint,test,build,generate,browser}.log`.
- Post-removal logs: `/tmp/nuxt4-remove-panelbear-{lint,test,build,generate,browser}.log`.
- Baseline comparison measurements: `/tmp/nuxt4-baseline-comparison.log`; captures
  `/tmp/{baseline,nuxt4}-{390,1440}-{hero,full}.png`.
- Browser screenshots: ignored `test-results/`; failing tests retain traces.
- Audit detail: `/tmp/nuxt4-audit-final.json`.

Temporary paths are session evidence, not durable release storage. The browser
suite and original worker fixture are retained in `tests/browser/`.

## Hosting handoff — not performed

No hosting credentials/settings were changed and nothing was published. Before a
future authorized deployment, confirm host support for Node 24.22.2, run
`npm ci && npm run generate`, publish `.output/public`, and confirm host-specific
404 handling and environment variables. Static files were validated locally;
external hosting behavior cannot be established by these checks.

Serve `/sw.js` as JavaScript with **`Cache-Control: no-cache`**, without an HTML
fallback or redirect. Keep it available for returning visitors. Retain the previous
artifact for rollback and account for retired service-worker state when rolling
back. Review the remaining upstream advisories before rollout.
