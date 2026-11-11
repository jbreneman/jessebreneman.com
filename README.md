# jessebreneman.com

Personal portfolio built with **Nuxt 4.6.4 / Vue 3**, with prerendered static output.
The local migration is validated; nothing has been deployed. See
[migration status](docs/nuxt-migration-status.md) for results and remaining hosting
considerations.

Use **Node 24.22.2** (`.nvmrc`) and npm 11 (validated with **11.6.2**):

```sh
nvm install
nvm use
npm ci
npm run dev        # local development
npm run lint
npm test           # focused worker-retirement tests
npm run build      # production Node server build
npm run generate   # prerender the static site
```

For a plain static preview and the repeatable Chromium checks:

```sh
node tests/browser/static-server.mjs  # http://127.0.0.1:4173; Ctrl-C to stop
npx playwright install chromium      # once per machine
npm run test:browser                 # starts its own server; port 4173 must be free
```

The browser suite covers four viewport widths, responsive/static images, themes,
animation controls/fallbacks, and retirement of the original Workbox worker. The
worker-transition test needs access to the historical Workbox 4.3.1 CDN.
`npm ci`, lint, three native tests, build, generation, and twelve browser tests passed
on the selected stack. Remaining upstream npm advisories are recorded in the status.

For static hosting, build with `npm run generate` and publish **`.output/public`**
(including its generated image files). The previous `dist/` is not the new output.
Confirm the host's Node version, 404 behavior, and caching rules before deployment.
For a Node server instead, run `npm run build` followed by
`node .output/server/index.mjs`; `npm run preview` previews production output.

Panelbear analytics has been removed. No analytics script or site-ID configuration
is included in the application.

PWA installation/offline support has been removed. Keep `public/sw.js` deployed at
**`/sw.js`**, served as JavaScript with **`Cache-Control: no-cache`**, to retire existing
workers and their scoped Workbox caches. Do not redirect that URL to HTML. The new
application updates an existing worker and never registers one for fresh visitors.
The actual browser update/unregistration and scoped cache cleanup passed against
the original Workbox 4 worker; unrelated caches were preserved. Retain the previous
artifact for rollback, accounting for the retirement of its service worker.
