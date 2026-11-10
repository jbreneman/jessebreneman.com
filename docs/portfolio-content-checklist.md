# Portfolio content checklist

The portfolio is the homepage at `/`; the separate `/portfolio` route has been removed. It uses the existing homepage typography, spacing, colors, gradient headings, project cards, and theme control. Editable project, experiment, article, and contact data is in `content/portfolio.js`.

- [ ] Add confirmed problem, contribution, decision, and outcome details for My Virtual Kitchen and Background Gradient Builder. Empty `story` fields are omitted from the public page.
- [ ] Verify the live apps and update screenshots if needed. The portfolio includes the homepage projects, with TeaTimer replaced by Painted Mare Studios. Painted Mare Studios has a new homepage screenshot and a description based on its live site; the other live apps have not been reverified.
- [ ] Confirm the professional biography/current employment before adding employment context. Conflicting historical references are not included on this page.
- [ ] Supply an updated résumé. `static/resume-2020.pdf` is historical and not linked on this page.
- [ ] Confirm the preferred contact destination. LinkedIn and GitHub are retained from existing site navigation; no email address or availability is invented.
- [ ] Confirm the provisional experiment selection. Rotating border and Fancy wipe link to the original CodePen demos and source; Noisy gradients links to its article and playground. No automatic embeds are included. The Fancy wipe effect is also adapted locally for heading entrances (see below).

Source: `/tmp/jessebreneman-portfolio-strategy.md`. Article and CodePen sources were inspected during the initial implementation. No publication or deployment requested.

Validation of the separate page: `npm run lint` and `npm run generate` passed; generation includes `/` and `/portfolio`. The existing Nuxt `mode` deprecation warning remains. Chromium desktop/mobile screenshots reviewed; no overflow at 320, 390, 768, and 1440px; all project images loaded; section anchors, focus outline, inherited theme control, and reduced-motion overrides checked; no runtime errors. The homepage and shared styles were restored before adding the separate page.

Heading entrance update: `components/portfolio/FancyWipeText.vue` adapts https://codepen.io/Chester/pen/LYKWMxO with the existing theme gradient. The h2 headings animate once as soon as they enter the viewport, with mask travel trimmed to remove the initial empty lead-in and render statically for reduced motion, without JavaScript, or without IntersectionObserver/mask support. The animation is limited to the four h2 headings; h1, h3, and the shared project card are unchanged. Lint and static generation passed. Chromium verified one-time playback, readable final text, no replay on returning to a section, reduced-motion/no-JavaScript visibility, no runtime errors, and no overflow at 320/390/768/1440px. Desktop animation and mobile screenshots reviewed.

H2-only update validated with lint, static generation, and Chromium: four animated h2s, no animated h1/h3, zero CSS animation delay, final text visible, and static reduced-motion rendering.
