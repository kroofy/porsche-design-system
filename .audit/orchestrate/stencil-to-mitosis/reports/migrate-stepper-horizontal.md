# Migrate p-stepper-horizontal to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     a3a8d30eee (source, bundle; baseline and this report land on top)
TAG      p-stepper-horizontal only. LIT_TAG lit-stepper-horizontal. packages/components untouched. Existing *.lite.tsx files untouched except StepperHorizontal.lite.tsx.

## Verdict

`StepperHorizontal.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=stepper-horizontal` swapped in-card to `lit-stepper-horizontal` diffs 0 of 599,020 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="stepper-horizontal"]`.

This is a `display:contents` wrap around a Stencil `p-scroller.scroller` (so `:host` stays `display:grid` and the scroller keeps `place-self: flex-start`) plus the default slot for `p-stepper-horizontal-item`. Nested items, scroller, `p-button`, and `p-text` stay Stencil. Light-DOM children are copied on swap. Item `throwIfParentIsNotOfKind` is swallowed on reparent. `rg my-fragment output/lit/src/StepperHorizontal.ts` is empty.

## What was built

Copied the nested-Stencil scroller wrap from tabs-bar. That lite file was not edited.

- `src/StepperHorizontal.lite.tsx` mirrors `getComponentCss`: host grid, hidden, FOUC, scroller font + `font-size` from size (m is 1000).
- Strip sets `p-scroller` `.aria={ role: "list" }` and recenters the `state=current` item the same way Stencil `scrollStepperHorizontalItemIntoView` does (`instant`).
- Playground has 3 hosts, card `grid-column: span 2`: default 3 items, complete/warning/current/unset, and `size=medium` with the same 4 items. Sibling `p-button` / `p-text` stay in the card.
- File harness proves shadow, cssText `<style>`, wrap `display:contents`, nested `P-SCROLLER`, slotted items, medium typescale, hide-size m=1000, hidden host, no inner `lit-*`.

`--p-animation-duration` and `--p-duration-md` are set to `0s` on both sides so scroller motion does not race the screenshot.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-stepper-horizontal-whitespace.mjs
rg my-fragment output/lit/src/StepperHorizontal.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/StepperHorizontal.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-stepper-horizontal.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=stepper-horizontal" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_stepper_horizontal_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_stepper_horizontal_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-stepper-horizontal-baseline.mjs
node harness/verify-stepper-horizontal.mjs            # exit 0, failures: []
node harness/pixel-diff-stepper-horizontal.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `StepperHorizontal.ts` has none.

## Live verification

`node harness/verify-stepper-horizontal.mjs`, exit 0: shadow root, cssText `<style>`, `:host` grid, wrap contents, nested `P-SCROLLER` with class `scroller` and `aria.role=list`, three slotted items, medium typescale-md, size breakpoint m=1000, hidden host, no inner `lit-*`.

`node harness/pixel-diff-stepper-horizontal.mjs`, exit 0:

```json
{
  "swap": { "swapped": 3, "litRendered": 3, "fragment": false, "innerLit": false, "slottedCopied": true, "nested": { "hostCount": 3, "scrollerTags": ["P-SCROLLER"], "itemTags": ["P-STEPPER-HORIZONTAL-ITEM"], "itemCount": 11, "buttonTags": ["P-BUTTON"], "textTags": ["P-TEXT"] } },
  "controlStencilVsBaseline": { "aSize": "982x610", "strictMismatch": 0, "totalPixels": 599020 },
  "litVsBaseline": { "aSize": "982x610", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 599020 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_stepper_horizontal_before.png`
- `/opt/cursor/artifacts/mitosis_lit_stepper_horizontal_after.png`
- `/opt/cursor/artifacts/stepper_horizontal_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_stepper_horizontal_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-stepper-horizontal.md`

## Follow-ups

- Click `update` and smooth `scrollIntoView` are not in this paused pixel probe.
- Keep leftover `harness/stencil_*_control.png` untracked.
