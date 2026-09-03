# Migrate p-multi-select-option to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     78d9002118 (source, bundle; baseline and this report land on top)
TAG      p-multi-select-option only. LIT_TAG lit-multi-select-option. packages/components untouched. MultiSelect.lite.tsx and SelectOption.lite.tsx untouched.

## Verdict

`MultiSelectOption.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=multi-select` swapped option hosts only to `lit-multi-select-option` and diffs 0 of 451,720 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="multi-select"]`. Card stays closed.

Parents stay `p-multi-select` / `p-optgroup`. The option has no nested icon. Light-DOM children (`Option A`–`E`) are copied on swap. `rg my-fragment output/lit/src/MultiSelectOption.ts` is empty.

## What was built

Copied the SelectOption in-parent swap pattern. SelectOption.lite.tsx and MultiSelect.lite.tsx were not edited.

- `src/MultiSelectOption.lite.tsx` mirrors `getComponentCss`: `:host` block + scroll-margin + `--_p-checkbox-scaling`, disabled host opacity 0.4 + GrayText, `.option` flex from inherited `--_p-multi-select-option-a`, selected/highlighted/disabled classes, a CSS `.checkbox` span (unchecked on the playground, check mask when `selected`).
- Strip sets host `role="option"` / `aria-selected`, keeps the checkbox span, and reads `disabledParent` from the parent-synced property.
- Playground has 20 options in 4 closed Stencil `p-multi-select`s: one direct option plus two `p-optgroup`s each. No value, so the trigger selected-text span stays empty. Options sit in `display:none` popover.
- File harness proves shadow, slotted text, checkbox span, selected check mask + primary fill, disabled / disabledParent opacity, highlighted frosted, hidden host, no inner `lit-*`.

Internal props (`selected`, `highlighted`, `disabledParent`) are copied on swap. Parent `updateOptions` is patched to accept `LIT-MULTI-SELECT-OPTION` so optgroup children do not throw `should be of kind p-multi-select-option`.

Playwright `waitForSelector` uses `{ state: 'attached' }` because closed options are not visible. Parent-kind throws on swap are treated as benign, same as select-option.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-multi-select-option-whitespace.mjs
rg my-fragment output/lit/src/MultiSelectOption.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/MultiSelectOption.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-multi-select-option.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=multi-select" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_multi_select_option_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_multi_select_option_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-multi-select-option-baseline.mjs
node harness/verify-multi-select-option.mjs           # exit 0, failures: []
node harness/pixel-diff-multi-select-option.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `MultiSelectOption.ts` has none.

## Live verification

`node harness/verify-multi-select-option.mjs`, exit 0: shadow root, cssText `<style>`, host block, `.option` flex, checkbox scaling var, default slot text, host `role="option"`, checkbox `span` with `aria-hidden`, selected check mask + primary fill, disabled opacity 0.4 / not-allowed / GrayText / pointer-events none, disabledParent opacity, highlighted frosted vs token, hidden host, no inner `lit-*`.

`node harness/pixel-diff-multi-select-option.mjs`, exit 0:

```json
{
  "swap": { "swapped": 20, "litRendered": 20, "fragment": false, "parentStillStencil": true, "slottedCopied": true, "closed": true, "innerLit": false, "nested": { "count": 20, "parentTags": ["P-MULTI-SELECT", "P-OPTGROUP"], "icons": [], "checkboxCount": 20 } },
  "controlStencilVsBaseline": { "aSize": "460x982", "strictMismatch": 0, "totalPixels": 451720 },
  "litVsBaseline": { "aSize": "460x982", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 451720 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_multi_select_option_before.png`
- `/opt/cursor/artifacts/mitosis_lit_multi_select_option_after.png`
- `/opt/cursor/artifacts/multi_select_option_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_multi_select_option_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-multi-select-option.md`

## Follow-ups

- `p-multi-select.updateOptions` still requires `p-multi-select-option` children inside `p-optgroup`. A relaxed child-kind check is needed before Lit options can remount without a patched `updateOptions`.
- Open dropdown, click / `internalOptionUpdate`, selected chips, and the reset button are not in this closed-card pixel probe.
- Keep leftover `harness/stencil_*_control.png` untracked.
