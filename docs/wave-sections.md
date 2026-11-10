# Wavy section edges

Use the auto-imported `WaveSection` component for a section with a single animated bottom edge. Its background stays solid; `next-background` must match the section that follows it so the edge blends seamlessly. IDs, ARIA attributes, and classes pass through to the semantic `<section>` element.

```vue
<wave-section id="examples" aria-labelledby="examples-heading"
  background="var(--grey-100)" next-background="var(--grey-0)">
  <h2 id="examples-heading">Examples</h2>
  <p>Section content</p>
</wave-section>
```

`background` defaults to `var(--grey-100)` and `next-background` defaults to `var(--grey-0)`. Content is centered with the site's existing 90rem maximum width and responsive padding. The bottom padding reserves space for the edge. Use the optional `background` slot for existing decorative artwork; the portfolio uses this only for its original hero artwork.

`WaveSection` automatically varies height, curve amplitude, horizontal crest position, animation duration (13–21 seconds), and negative starting delay by sibling section position, cycling through five combinations. Neighboring waves have different silhouettes and move independently, without JavaScript or random values that could differ between server and client. Heights remain responsive, and bottom padding tracks the chosen height.

Customize `--wave-height`, `--wave-amplitude`, `--wave-crest-position`, `--wave-duration`, `--wave-delay`, and `--section-padding` with inline styles or a section class with enough specificity to override the position selectors. Amplitude is a percentage of the wave's height; keep it between `0%` and `50%` so curve controls stay within the edge. Crest position is a percentage of its width; `40%`–`70%` gives a balanced shape. Padding follows the site's responsive section spacing. A negative delay offsets a section's animation phase. Standalone `WaveTransition` defaults to height `clamp(3rem, 8vw, 6rem)`, amplitude `40%`, crest position `55%`, duration `12s`, and delay `0s`.

For an existing positioned container where you want to keep your own layout, use `<wave-transition color="var(--grey-0)" />` directly. Reserve space below the content for `--wave-height` and clip overflow on the container. This component only draws the edge.

Both components work without JavaScript. Reduced-motion preferences disable movement, and browsers without `clip-path: shape()` support get a static elliptical edge. Theme variables are resolved in CSS so edges follow theme changes.
