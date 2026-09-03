# Migrate p-scroller to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     51d325b7da (source, bundle; baseline and this report land on top)
TAG      p-scroller only. LIT_TAG lit-scroller. packages/components untouched.

## Verdict

`Scroller.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=scroller` swapped in-card to `lit-scroller` diffs 0 of 607,200 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="scroller"]`.

This is a `.root` wrapper with prev/next fade indicators and a default slot. Light-DOM children (`p-tag`, pink `div`) are copied on swap. Nested `p-tag` stays Stencil. Indicators are CSS `::after` masks, not `p-icon`. `rg my-fragment output/lit/src/Scroller.ts` is empty.

## What was built

Copied a fieldset-style slotted harness and retargeted `[data-card="scroller"]`. Fieldset.lite.tsx was not edited.

- `src/Scroller.lite.tsx` mirrors `getComponentCss`: smooth-mask fade (edge 24 / fade 96 / steps 20), scrollbar pad + extra mask layer, sticky indicator offsets, compact gap/pad, forced-colors `CanvasText`, hover arrow nudge, `pointer:coarse` mask/margin override.
- Strip rewrites dummy `prevVis` / `nextVis` to `this._prevVisible` / `this._nextVisible`, re-reads `scrollbar` / `compact` / `sticky` from attributes, injects `IntersectionObserver` on `.sentinel` (root = `.scroll`, threshold 0.1), and click-to-scroll on `.prev` / `.next`.
- Playground has 5 hosts. Card is 230.65625px wide so every host overflows and `.next` opacity is `1`. Hosts 3–4 have `scrollbar="true"`. Host 5 has `indicator-sticky="true"` (Stencil prop is `sticky`; that attr is ignored) plus a 600×400 pink box.
- File harness proves shadow, cssText `<style>`, forced-colors / CanvasText, overflow next-visible, fit next-hidden (no mask), scrollbar thin + 16px pad, hidden host, slotted buttons, no `my-fragment`.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-scroller-whitespace.mjs
rg my-fragment output/lit/src/Scroller.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Scroller.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-scroller.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=scroller" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_scroller_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_scroller_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-scroller-baseline.mjs
node harness/verify-scroller.mjs           # exit 0, failures: []
node harness/pixel-diff-scroller.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `Scroller.ts` has none.

## Live verification

`node harness/verify-scroller.mjs`, exit 0: shadow root, cssText `<style>`, forced-colors, CanvasText, overflow next opacity 1 / prev 0, fit fixture next 0 and no fade mask, scrollbar thin + `calc(4px + 12px)` pad, hidden host `display:none`, six slotted buttons, no inner `lit-*`.

`node harness/pixel-diff-scroller.mjs`, exit 0:

```json
{
  "swap": { "swapped": 5, "litRendered": 5, "fragment": false, "innerLit": false, "slottedCopied": true },
  "controlStencilVsBaseline": { "aSize": "460x1320", "strictMismatch": 0, "totalPixels": 607200 },
  "litVsBaseline": { "aSize": "460x1320", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 607200 }
}
```

Nested slotted tags stay `P-TAG` (24). `--p-transition-duration: 0s` paused indicator fades before both shots.

## Artifacts

- `/opt/cursor/artifacts/stencil_scroller_before.png`
- `/opt/cursor/artifacts/mitosis_lit_scroller_after.png`
- `/opt/cursor/artifacts/scroller_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_scroller_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-scroller.md`

## Follow-ups

- Click-to-scroll and `scrollToPosition` are not in this pixel probe.
- Playground `indicator-position` / `indicator-sticky` are no-ops on Stencil; Lit matches that.
