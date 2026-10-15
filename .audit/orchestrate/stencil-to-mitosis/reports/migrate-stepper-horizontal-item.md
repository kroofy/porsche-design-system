# Migrate p-stepper-horizontal-item to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     208c7fcee5 (source, bundle) + c82fbe7a35 (instant recenter after swap; baseline and this report land on top)
TAG      p-stepper-horizontal-item only. LIT_TAG lit-stepper-horizontal-item. packages/components untouched. Existing *.lite.tsx files untouched except StepperHorizontalItem.lite.tsx.

## Verdict

`StepperHorizontalItem.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=stepper-horizontal` swapped in-card `p-stepper-horizontal-item` hosts to `lit-stepper-horizontal-item` diffs 0 of 599,020 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="stepper-horizontal"]`.

Parent `p-stepper-horizontal` stays Stencil. Light-DOM children are copied on swap. Nested `p-icon` stays Stencil. All 11 item parents remain `P-STEPPER-HORIZONTAL`. No `lit-stepper-horizontal` hosts. `rg my-fragment output/lit/src/StepperHorizontalItem.ts` is empty.

## What was built

Copied the in-parent item swap from tabs-item. That lite file was not edited.

- `src/StepperHorizontalItem.lite.tsx` mirrors `getComponentCss(state, disabled)`: host inherit + hidden + FOUC, disabled opacity 0.4, button 2-col grid, current frosted fill, hover when not disabled, focus-visible, HCM. Current/unset use `span.icon` with radial-gradient + `:host(:nth-of-type(1..9)) .icon::before` SVG number masks. Complete/warning keep Stencil `p-icon` (`success` / `warning`, `size="inherit"`). `sr-only` when state is set. Host `role="listitem"` in `connectedCallback`.
- Strip rewrites `render()` to `style + button + (p-icon | span.icon) + optional sr-only + slot`.
- Pixel-diff patches parent `defineStepperHorizontalItems` to accept all children (avoids `throwIfChildrenAreNotOfKind` on slotchange). `throwIfParentIsNotOfKind` is benign because the parent stays `p-stepper-horizontal`. After `replaceWith`, light-DOM replacement resets `p-scroller`; `--p-animation-duration: 0s` does not cancel `scrollIntoView({ behavior: 'smooth' })`. Patch `onSlotChange` and post-swap recenter use `behavior: 'instant'` with the same options as Stencil (`block: 'nearest', inline: 'center', container: 'nearest'`).
- Playground has 3 parents, 11 items: current/unset/unset; complete/warning/current/unset (twice, last parent `size=medium`). 4 `p-icon`, 7 number spans.
- File harness proves shadow, cssText `<style>`, host inherit, current frosted fill, nth-of-type masks, role listitem, parent `P-STEPPER-HORIZONTAL`, slotted text, unset opacity 0.4, complete/warning Stencil `p-icon`, hidden host, no fragment, no inner `lit-*`.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-stepper-horizontal-item-whitespace.mjs
rg my-fragment output/lit/src/StepperHorizontalItem.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/StepperHorizontalItem.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-stepper-horizontal-item.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=stepper-horizontal" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_stepper_horizontal_item_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_stepper_horizontal_item_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-stepper-horizontal-item-baseline.mjs
node harness/verify-stepper-horizontal-item.mjs            # exit 0, failures: []
node harness/pixel-diff-stepper-horizontal-item.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `StepperHorizontalItem.ts` has none.

## Live verification

`node harness/verify-stepper-horizontal-item.mjs`, exit 0: shadow root, cssText `<style>`, host inherit, current frosted fill, nth-of-type number masks, role listitem, parent `P-STEPPER-HORIZONTAL`, slotted text, unset opacity 0.4, complete/warning Stencil `p-icon`, hidden host, no fragment, no inner `lit-*`.

`node harness/pixel-diff-stepper-horizontal-item.mjs`, exit 0:

```json
{
  "swap": { "swapped": 11, "litRendered": 11, "fragment": false, "parentStillStencil": true, "slottedCopied": true, "innerLit": false, "nested": { "itemCount": 11, "iconTags": ["P-ICON"], "iconCount": 4, "spanIconCount": 7 } },
  "controlStencilVsBaseline": { "aSize": "982x610", "strictMismatch": 0, "totalPixels": 599020 },
  "litVsBaseline": { "aSize": "982x610", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 599020 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_stepper_horizontal_item_before.png`
- `/opt/cursor/artifacts/mitosis_lit_stepper_horizontal_item_after.png`
- `/opt/cursor/artifacts/stepper_horizontal_item_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_stepper_horizontal_item_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-stepper-horizontal-item.md`

## Follow-ups

- Click `update` and smooth `scrollIntoView` are not in this paused pixel probe.
- Keep leftover `harness/stencil_*_control.png` untracked.
