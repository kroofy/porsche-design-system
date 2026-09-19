# Migrate p-accordion to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     556d024093 (source + slotchange fix; baseline and this report land on top)
TAG      p-accordion only. LIT_TAG lit-accordion. packages/components untouched.

## Verdict

`Accordion.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=accordion` swapped in-card to `lit-accordion` diffs 0 of 1,610,480 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="accordion"]` clipped to the viewport remainder (card is taller than 900).

This is a controlled `<details>` with summary / heading / summary-before / summary-after slots and a content `<div><slot /></div>`. The chevron is a CSS `::after` mask, not `p-icon`. Nested `p-icon` inside slotted `p-checkbox` / `p-popover` stays Stencil. Light-DOM children are copied on swap. `rg my-fragment output/lit/src/Accordion.ts` is empty.

## What was built

Copied the Banner cssText / shadow / slotted-children pattern. Banner.lite.tsx was not edited.

- `src/Accordion.lite.tsx` mirrors `getComponentCss`: grid columns from `align-marker` + before/after slots, compact factor padding, background canvas/surface/frosted, sticky summary gradient, indent `l` at 1300, size typography, open/close opacity + `grid-template-rows`, forced-colors `CanvasText` / `LinkText`.
- Dummy `hasBefore` / `hasAfter` / `hasSummary` in the lite getter; strip rewrites them to `querySelector('[slot=…]')` and hides unused slots so empty flex slots do not steal grid cells.
- Strip re-reads `open` / `compact` / `sticky` / `align-marker` / `background` / `indent` / `size` / `heading` / `heading-tag`, rewrites `render()` with `?open` and a heading-tag switch, `preventDefault` on summary click, and `slotchange` → `requestUpdate`.
- Playground has 21 hosts: default, align-start + indent l, canvas/surface/frosted, summary-before/after combinations, custom `--p-accordion-px/py`, sticky, dual summary headings, heading-slot hosts, last 3 `open="true"`.

`--p-animation-duration: 0s` and `--p-transition-duration: 0s` paused on both Stencil control and Lit after so open bodies snap to opacity 1.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-accordion-whitespace.mjs
rg my-fragment output/lit/src/Accordion.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Accordion.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-accordion.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=accordion" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_accordion_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_accordion_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-accordion-baseline.mjs
node harness/verify-accordion.mjs           # exit 0, failures: []
node harness/pixel-diff-accordion.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `Accordion.ts` has none.

## Live verification

`node harness/verify-accordion.mjs`, exit 0: shadow root, cssText `<style>`, keyframes, forced-colors CanvasText / LinkText, closed visibility hidden, open details + opacity 1, heading slot hides summary slot, align-marker start grid, summary-before visible when slotted, hidden host, no inner `lit-*`.

`node harness/pixel-diff-accordion.mjs`, exit 0:

```json
{
  "swap": { "swapped": 21, "litRendered": 21, "fragment": false, "innerLit": false, "slottedCopied": true, "openCount": 3 },
  "controlStencilVsBaseline": { "aSize": "982x1640", "strictMismatch": 0, "totalPixels": 1610480 },
  "litVsBaseline": { "aSize": "982x1640", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 1610480 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_accordion_before.png`
- `/opt/cursor/artifacts/mitosis_lit_accordion_after.png`
- `/opt/cursor/artifacts/accordion_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_accordion_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-accordion.md`

## Follow-ups

- Summary click emits no `update` event; the probe only `preventDefault` to stay controlled.
- Open hosts sit below the 900px clip; the visible card slice still matched 0.
