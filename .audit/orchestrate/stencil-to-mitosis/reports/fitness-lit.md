# Fitness report: p-divider on Mitosis Lit target

STATUS   complete, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     4431950927 (probe commit; this report lands on top)
VERDICT  live-ui-verified, pixel-diff 0. The Lit generator expresses everything the customElement target could not: shadow DOM, a runtime attachComponentCss analog, breakpoint direction props, forced-colors CanvasText, and attribute reactivity. Same-fixture pixel diff against the frozen Stencil baseline is 0 of 122,892 pixels at threshold 0 with anti-aliasing included. All three standing-order-5 dead-end criteria are expressible. Remaining gaps are real but none is a dead end; they are listed below.

## One naming trap, stated up front

The brief's acceptance line says the config target must be `webcomponent (Lit)`. In Mitosis 0.14.0, `targets.js` maps `webcomponent` to `componentToCustomElement`, the exact generator the first probe disqualified; the Lit generator is the target named `lit`. Running `webcomponent` would have silently re-run the dead probe. The config uses `targets: ['lit']` and documents why. This is a deviation from the acceptance wording, not from its intent.

## What was built

`packages/mitosis-probe-lit/` (throwaway, local lockfile, installed with `--workspaces=false`, root lockfile untouched):

- `src/Divider.lite.tsx` mirrors p-divider. The key design move over the failed probe: a `cssText` getter derives a full stylesheet string from props, exactly what `getComponentCss(color, direction)` does, and the template renders it into the shadow root as `<style innerHTML={state.cssText}>`. Real stylesheet rules can carry media queries, so breakpoint direction and the forced-colors override live in CSS where HCM honors them, instead of inline styles where it forces them away. Colors are `var(--p-color-contrast-*)` with no fallback, same as `ref()` in divider-styles.ts.
- `mitosis.config.js` with `targets: ['lit']` and `lit: { useShadowDom: true }`.
- `harness/verify.mjs` runs the functional checks live in Chromium and exits nonzero on any failure.
- `harness/pixel-diff.mjs` swaps the five `p-divider` hosts inside the live playground's `[data-card="divider"]` card for `lit-divider` (attributes copied verbatim, card markup and CSS untouched), re-captures with the baseline script's exact parameters (viewport 1440x900, deviceScaleFactor 2, same element crop), and runs pixelmatch against the stored baseline. It also captures a fresh Stencil control shot first.
- Generated `output/lit/src/Divider.ts` and the esbuild bundle are committed so the evidence is reviewable without running anything.

## Commands run

```
cd packages/mitosis-probe-lit
npm install --workspaces=false          # local lockfile, root untouched
./node_modules/.bin/mitosis build       # lit: generated 1 components
/workspace/node_modules/.bin/esbuild output/lit/src/Divider.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-divider.bundle.js
node harness/verify.mjs                 # exit 0, failures: []
node harness/pixel-diff.mjs             # exit 0, strictMismatch: 0
```

## Live verification (Chromium headless, viewport 1440x640)

`node harness/verify.mjs`, condensed live JSON (full run exits 0 with `failures: []`):

```json
{
  "isDefined": true,
  "default": { "hasShadowRoot": true, "dynamicStyleTag": true, "adoptedSheets": 1,
               "background": "rgba(79, 80, 89, 0.325)", "height": "1px", "width": "640px",
               "hostDisplay": "block", "unknownWrapper": "my-fragment" },
  "colors": { "contrast-lower": { "match": true }, "contrast-low": { "match": true },
              "contrast-medium": { "match": true }, "contrast-high": { "match": true } },
  "vertical": { "height": "60px", "width": "1px" },
  "breakpointFlip": {
    "at640":  { "vertical": false }, "at999": { "vertical": false },
    "at1000": { "vertical": true },  "at1440": { "vertical": true }
  },
  "attrChangeReactive": true,
  "forcedColors": { "background": "rgb(0, 0, 0)", "expectedCanvasText": "rgb(0, 0, 0)" },
  "consoleErrors": [],
  "failures": []
}
```

Each color's computed background is asserted equal to a reference div using the same `var(--p-color-*)` on the same page, not against hardcoded rgba literals.

## Pixel diff (the acceptance gate)

`node harness/pixel-diff.mjs`, live JSON:

```json
{
  "stencilBreakpointFlip": {
    "at640": { "vertical": false }, "at999": { "vertical": false },
    "at1000": { "vertical": true }, "at1440": { "vertical": true }
  },
  "swap": { "swapped": 5, "litRendered": 5 },
  "controlStencilVsBaseline": { "aSize": "462x266", "bSize": "462x266",
                                "strictMismatch": 0, "perceptualMismatch": 0 },
  "litVsBaseline": { "aSize": "462x266", "bSize": "462x266",
                     "strictMismatch": 0, "perceptualMismatch": 0,
                     "totalPixels": 122892,
                     "diffPng": "/opt/cursor/artifacts/divider_pixel_diff.png" },
  "consoleErrors": []
}
```

- Same fixture: the live playground card, five hosts swapped in place, identical capture parameters as `capture-stencil-divider-baseline.mjs`.
- Control first: a fresh Stencil capture diffs 0 against the stored baseline, so the environment has not drifted and the lit diff is attributable to the component alone.
- `strictMismatch` uses threshold 0 with `includeAA: true`. Zero pixels differ.
- Artifacts: `/opt/cursor/artifacts/mitosis_lit_divider_after.png` (capture) and `/opt/cursor/artifacts/divider_pixel_diff.png` (diff image, no red pixels).

## Breakpoint m is 1000px, not 760px

The brief and standing order 10 say "PDS m breakpoint is 760px". The shipped tokens say otherwise: `breakpointMd = 1000` maps to `m`, and 760 is `s` (`breakpointSm`), per `packages/tokens/src/breakpoint/` and `@porsche-design-system/emotion/src/mediaQuery/`. Verified live on both implementations: Stencil's own `p-divider` with `{"base":"horizontal","m":"vertical"}` stays horizontal at 999px and flips at 1000px, and the Lit probe flips at the same boundary (tables above). The brief's ">= 760" viewport instruction is still satisfied since verification ran at 1440, where m is active under either reading. Standing order 10's number should be corrected before any fan-out brief inherits it.

## Standing-order-5 dead-end criteria

- **Shadow DOM: expressible.** `lit: { useShadowDom: true }` gives Lit's native shadow root with `static styles`. Verified live.
- **JSS attachComponentCss: expressible as an analog.** Not by calling PDS's `attachComponentCss` (that helper needs a host element and constructed stylesheets), but the channel it needs finally exists: a props-derived stylesheet string rendered into the shadow root, re-evaluated on every Lit render. Media queries, forced-colors blocks, and per-prop-combination CSS all work, which is what the customElement target structurally could not do. Verified live and by pixel diff.
- **Breakpoint props: expressible.** The JSON attribute parses in the getter and compiles to `@media(min-width:...)` rules, byte-for-byte the same geometry Stencil produces. Verified live at 640/999/1000/1440.

None of the three dead-end criteria remains. Gaps that do remain:

1. **`webcomponent` target is a customElement alias.** Any tooling, config, or brief that says `webcomponent` gets the dead generator. Migration configs must say `lit`.
2. **JSX fragments emit a literal `<my-fragment>` element.** The Lit generator has no Fragment branch; the root fragment became an undefined `<my-fragment>` wrapper inside the shadow root. It rendered without pixel cost here (inline, empty-layout), but it is foreign DOM Stencil does not have, and it would break child selectors, slots, or `:host > *` styling in bigger components. A migration needs a generator fix or plugin, not per-component workarounds.
3. **Generated import specifier `lit/decorators` is invalid.** lit's exports map only exposes `lit/decorators.js`; every bundle needs an alias (worked around in esbuild flags, generated file untouched).
4. **`useShadowDom` default is documented wrong.** The option docs say "Default: enabled" but nothing sets it; unset means light DOM. Must be explicit in every config.
5. **The JSS pipeline itself was not imported.** The probe hand-mirrors `getComponentCss`. A real migration must either port `getCss`/`buildResponsiveStyles`/JSS composition helpers into the lite world or restate every component's styles; the probe proves the runtime channel, not the library port. Stencil also dedupes constructed stylesheets across instances; the probe's per-instance `<style>` re-renders on every prop change with no caching.
6. **Prop validation not replicated.** `validateProps` console.warns on invalid values on every render with host access. The probe silently falls back (bad JSON becomes horizontal). Lit's `willUpdate`/`updated` hooks make an analog plausible via Mitosis `onUpdate`, but it was not probed.
7. **Attribute deserialization is per-prop hand code.** Lit's default converter delivers strings; the breakpoint JSON parse lives in the getter. A migration would write Lit converters per prop type (numbers, booleans, breakpoint objects); Mitosis offers no way to declare them from lite source.
8. **Framework wrappers unprobed for Lit.** Standing preference 2 selects react/vue/angular targets too. This unit generated only `lit`. The PDS-parity architecture (one web component, thin wrappers) would wrap the Lit element rather than use Mitosis's per-framework outputs, whose defects the first report documented. That is a program decision, not a divider question.

## Deviations from the brief

- Config target is `lit`, not `webcomponent`, for the alias reason above.
- Tag is `lit-divider` via `useMetadata({ tagName })`, which the Lit generator honors (the customElement generator did not), so no component renaming hack was needed.
- Breakpoint m tested at 1000px per shipped tokens and live Stencil behavior, with the brief's >=760 viewport condition also satisfied at 1440.

## Follow-ups

- `packages/mitosis-probe-lit` sits inside the root `packages/*` workspaces glob, same caveat as the first probe: local lockfile and `--workspaces=false` keep the root clean, but a plain root `npm install` would try to adopt it. Move it out of `packages/` or delete both probe dirs when the program decides.
- Standing order 10's "m is 760px" should be corrected to 1000px (760 is s) before fan-out briefs copy it.
- Ledger entry is the coordinator's write. Suggested verdict: Lit fitness for p-divider live-ui-verified, pixel-diff 0. Fan-out is now unblocked per standing order 10's own criterion, but gaps 2 (fragment element), 3 (import specifier), and 5 (JSS port) deserve a generator-level answer before dozens of components inherit per-component workarounds.
