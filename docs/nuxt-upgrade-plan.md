# Nuxt upgrade plan

Prepared November 10, 2026. Original planning snapshot. Implementation has since started; see [migration status](nuxt-migration-status.md) for completed source changes and outstanding dependency/build validation. PWA removal is authorized.

Subsequent decision: Panelbear was removed at the user's request. Analytics migration
instructions below are retained as part of this original planning snapshot.

## Recommendation

Migrate directly from Nuxt 2.18.1 / Vue 2.7.16 to **Nuxt 4.6.4**, the latest stable release verified today. Recheck the stable release before implementation and use a newer stable patch if available. Keep server-rendered static generation, the current design, content, URLs, and npm lockfile workflow.

This is a Vue 3 migration, not a package-version bump. A direct migration is reasonable because the repository has one page, local JavaScript content, no implemented Vuex store, and no server routes. Nuxt Bridge or a separately shipped Nuxt 3 migration would add temporary work without much benefit here. Existing Options API components can stay; converting every component to Composition API or TypeScript is outside scope.

Use a supported Node 24 LTS patch, at least **24.15.0**, and record the selected version in `.nvmrc`, package engines, and the README. The current Node 25.2.1 environment is outside Nuxt 4.6.4's declared engine range. Confirm the hosting build environment can use the chosen Node version.

## Repository findings

- `nuxt.config.js` uses Nuxt 2 configuration: `mode`, `target`, `head`, `buildModules`, `publicRuntimeConfig`, and Webpack loader options.
- `layouts/default.vue` contains `<Nuxt />`; there is no application entry component.
- Component auto-imports deliberately disable directory prefixes. Preserve this to avoid changing existing component names.
- `ProjectCard.vue` uses dynamic CommonJS `require()` and expects the responsive loader's `{ placeholder, srcSet }` result.
- `IndexHero.vue` uses `v-observe-visibility`; the older `IndexProjects.vue` also uses it, but appears unused by the current homepage. Confirm references before removing that component.
- `FancyWipeText.vue` already uses native `IntersectionObserver`, but cleans up in Vue 2's `beforeDestroy` hook.
- The page uses Nuxt 2's `head()` API and keys individual children of a repeated template. Vue 3 requires the repeat key on the template.
- The page and `PortfolioPreviewCard.vue` use legacy `::v-deep` selectors.
- Theme switching cycles through `system`, `sunset`, and `sunrise`, with existing `*-mode` CSS selectors. Preserve these behaviors and stored preferences.
- The Panelbear plugin uses Nuxt 2 plugin context and `PANELBEAR_ID`. There is no analytics SDK dependency.
- PWA is enabled with default module settings, with no custom offline configuration in the repository. Its generated metadata and cache behavior still need inspection before removal.
- Stylelint currently has no enabled rules, and `stylelint-config-standard` is commented out. The command passing does not establish meaningful stylesheet lint coverage.
- No deployment configuration or automated browser tests were found in the repository. Hosting settings may exist outside it.

## Dependency decisions

| Dependency | Proposed change | Reason |
| --- | --- | --- |
| `nuxt` | Upgrade to latest stable 4.x verified at implementation | Supported framework and Vue 3 migration |
| `vue`, `vue-router` | Declare compatible Vue 3 / Router versions as required by the selected Nuxt release | Follow the current Nuxt application dependency setup; avoid Vue 2 leftovers |
| `webpack`, `sass-loader` | Remove | Use Nuxt's default Vite builder; delete loader configuration and legacy Sass API suppression |
| `sass` | Keep and update to a compatible stable release | Existing SCSS and Sass modules remain useful |
| `nuxt-responsive-loader` | Replace with `@nuxt/image` | Preserve responsive images and placeholders using static image generation |
| `vue-observe-visibility` | Remove | A small native observer implementation is enough for the remaining hero animation |
| `@nuxtjs/color-mode` | Upgrade to a release supporting the selected Nuxt version | Preserve theme initialization, persistence, and custom themes |
| `@nuxtjs/pwa` | Recommend removal, preserving necessary icons/metadata explicitly | No product-specific offline feature is configured; avoid adding a new service-worker stack by default |
| `@nuxtjs/eslint-config`, `@nuxtjs/eslint-module`, `eslint-plugin-nuxt`, `babel-eslint` | Remove; replace with `@nuxt/eslint` and compatible ESLint | Modern Vue 3/Nuxt rules and flat configuration |
| `eslint-config-prettier` | Remove unless a formatter integration needs it | There is no Prettier dependency or formatting command today |
| `@nuxtjs/stylelint-module` | Remove | Run stylesheet lint explicitly rather than through the Nuxt 2 build module |
| `stylelint`, `postcss-html`, `postcss-scss` | Retain and update together to compatible releases | Continue parsing Vue styles and SCSS through the standalone lint command |
| `stylelint-config-standard` | Remove the unused dependency | Enabling a new full ruleset would create unrelated style churn |
| direct `postcss` | Remove if no selected tool requires it as a direct peer | Let the builder manage its own PostCSS version; verify peer requirements first |

Choose exact ancillary package versions after checking their current peer dependencies against Nuxt, Vue, Node, and ESLint. Avoid a blanket update of every transitive package. Add a small set of useful Stylelint checks with the retained tooling; defer broad formatting and style-rule adoption.

If offline/installable behavior is required, replace the PWA module with a verified compatible `@vite-pwa/nuxt` release instead. Make that choice before finalizing dependency installation and rollout behavior.

## Implementation sequence

### 1. Capture a reproducible baseline

- Work on a migration branch and keep the existing release available for rollback.
- Record current generated HTML metadata, manifest, icon links, service-worker URL/scope, and cache behavior. Capture desktop/mobile screenshots and theme states.
- Confirm the hosting build command, publish directory, environment variables, caching rules, and any deployment assumptions about `dist/`.
- Establish a clean baseline build if needed: the planning-time generation succeeded using an existing cached Webpack build.

### 2. Replace the framework and build configuration

- Set the Node version, update dependencies as above, and regenerate `package-lock.json` through npm. Verify a fresh `npm ci` resolves without forced peer overrides.
- Use `defineNuxtConfig`, default Vite, and SSR with static prerendering. Remove `mode`, `target`, Webpack configuration, and `responsiveLoader` options.
- Adopt the Nuxt 4 `app/` structure for pages, layouts, components, plugins, and styles. Keep `content/portfolio.js` at the repository root and use `~~/content/portfolio` where appropriate. Adjust relative Sass paths and editor aliases consistently.
- Rename `static/` to root-level `public/`, retaining public URLs for favicon, icons, and the historical PDF. Remove scaffold README files from published assets.
- Add `app/app.vue` with `<NuxtLayout><NuxtPage /></NuxtLayout>`; replace the layout's `<Nuxt />` with `<slot />`.
- Preserve `components: [{ path: '~/components', pathPrefix: false }]` and existing global stylesheet order, with explicit file extensions.
- Move global head configuration into `app.head`; migrate page metadata to `useSeoMeta`/`useHead`, removing legacy `hid` handling.
- Move public analytics config into `runtimeConfig.public`. Convert the plugin to `defineNuxtPlugin` in a `.client.js` file using `useRuntimeConfig`. Document `NUXT_PUBLIC_PANELBEAR_ID`, with a temporary `PANELBEAR_ID` fallback if hosting still uses it. For static hosting, set the value at generation time. Verify the existing analytics endpoint before treating analytics as working; defer provider changes unless needed.
- Update scripts to `nuxt dev`, `nuxt build`, `nuxt generate`, `nuxt preview`, and `nuxt prepare` after install. Replace the old `nuxt start` workflow in the README with static preview instructions; document Node server startup separately only if used.
- Add `.output/` and other new generated artifacts to ignore lists. Update editor configuration to use generated Nuxt aliases/types without requiring a full TypeScript conversion.

### 3. Migrate the affected application behavior

- Move project screenshots into `public/images/`; replace the loader result and dynamic `require()` in `ProjectCard.vue` with `NuxtImg` or `NuxtPicture`, explicit responsive sizes, and placeholder support. Ensure all variants are emitted during generation and work on a plain static server.
- Replace the visibility plugin with native `IntersectionObserver` for the hero. Preserve one-time playback, observer cleanup, and readable no-JavaScript/reduced-motion/unsupported-observer fallbacks. Remove `IndexProjects.vue` and its duplicate content only after confirming it is unreferenced; otherwise migrate its observers too.
- Rename `beforeDestroy` to `beforeUnmount` in `FancyWipeText.vue` and inspect remaining components for Vue 2 APIs.
- Move repeated-template keys in `pages/index.vue` onto the `<template v-for>`; migrate legacy deep selectors to `:deep(...)` and verify the reduced-motion and paused-preview rules still apply.
- Upgrade color mode and explicitly preserve class suffixes, storage keys, system detection, and custom sunrise/sunset states. Use `useColorMode` where necessary and verify initial rendering has no hydration mismatch or theme flash.
- Keep existing navigation, slots, cards, wave sections, and content behavior. Check attribute fallthrough and component resolution in Vue 3.

### 4. Modernize linting and remove obsolete scaffolding

- Replace `.eslintrc.js` with `eslint.config.mjs` based on `@nuxt/eslint`; retain useful existing conventions without a repository-wide reformat.
- Convert the standalone Stylelint config to an appropriate ESM or `.cjs` format, with explicit ignores for dependencies and generated output. Update CLI scripts for the selected lint versions.
- Remove empty Nuxt 2 scaffold directories and stale scaffold documentation where they no longer serve a purpose. Keep project documentation and assets unless confirmed unused.
- Check that Vue 2, Webpack 4, the old loaders, and removed modules are absent from the resolved application dependency tree. Explain any remaining transitive legacy dependency rather than forcing overrides.

### 5. Validate and prepare the rollout

- On the selected Node version, run a fresh `npm ci`, `npm run lint`, `npm run build`, and `npm run generate`.
- Serve `.output/public` with a plain static server. Verify `/` includes prerendered content, correct title/description, favicon, fonts, images, and no server-only image endpoint dependency. Check unknown-route behavior against hosting expectations.
- Browser-check 320, 390, 768, and 1440px widths: no horizontal overflow; correct screenshot crops; navigation anchors and keyboard focus; all experiment previews; one-time hero/heading animations; and wave rendering.
- Test system/light/dark and sunrise/sunset themes, persistence across reloads, reduced motion, JavaScript disabled, and observer-unavailable fallback. Check runtime errors, hydration warnings, failed asset requests, and analytics both configured and unset.
- Add a focused browser smoke test for migration-sensitive behavior if a repeatable test runner is introduced. Avoid adding a broad unit-test suite as part of this upgrade.
- Compare generated output and browser screenshots with the baseline. Review dependency changes and installation warnings.
- Change the hosting publish directory from `dist/` to `.output/public`, or deliberately configure a compatible output path if the host requires `dist/`.
- If removing PWA, preserve intentional manifest/icon metadata and retire the old worker at its original URL/scope, including cleanup of its owned caches. Test with a browser profile that previously installed the old worker; a fresh profile alone misses stale-cache failures. Keep retirement behavior available long enough for returning visitors.
- Prepare the static artifact and hosting-setting changes for review. Publish only when requested. Retain the previous artifact and account for service-worker state when rolling back.

## Planning-time validation

- `npm run lint`: passed on the existing stack.
- `npm run generate`: passed after allowing the temporary local listener required by Nuxt 2. Generated `/` and `200.html`; reused the cached Webpack build.
- Existing warning: `mode` is deprecated. The migration removes that configuration.
- No dependency installation or application migration has been performed.

## References

- [Nuxt 4.6.4 stable release](https://github.com/nuxt/nuxt/releases/tag/v4.6.4)
- [Nuxt 4.6.4 package and Node engine requirements](https://github.com/nuxt/nuxt/blob/v4.6.4/packages/nuxt/package.json)
- [Nuxt migration guide](https://nuxt.com/docs/4.x/migration/overview)
- [Nuxt deployment guide](https://nuxt.com/docs/4.x/getting-started/deployment)
- [Nuxt Image static generation](https://image.nuxt.com/advanced/static-images)
- [Nuxt ESLint](https://eslint.nuxt.com/packages/module)
- [Nuxt Color Mode](https://color-mode.nuxtjs.org/)
- [Vite PWA Nuxt integration, if required](https://vite-pwa-org.netlify.app/frameworks/nuxt)
