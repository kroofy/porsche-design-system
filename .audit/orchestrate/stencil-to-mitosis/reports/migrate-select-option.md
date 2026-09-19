# Migrate p-select-option to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     8a60d96529 (source, attached wait, disconnect filter; baseline and this report land on top)
TAG      p-select-option only. LIT_TAG lit-select-option. packages/components untouched. Select.lite.tsx untouched.

## Verdict

`SelectOption.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=select` swapped option hosts only to `lit-select-option` and diffs 0 of 451,720 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="select"]`. Card stays closed.

Parents stay `p-select` / `p-optgroup`. Nested `p-icon` stays Stencil. Light-DOM children (`Option A`–`E`) are copied on swap. `rg my-fragment output/lit/src/SelectOption.ts` is empty.

## What was built

Copied the RadioGroupOption in-parent swap pattern. RadioGroupOption.lite.tsx and Select.lite.tsx were not edited.

- `src/SelectOption.lite.tsx` mirrors `getComponentCss`: `:host` block + scroll-margin, disabled host opacity 0.4 + GrayText, `.option` flex from inherited `--_p-select-option-a`, selected/highlighted/disabled classes, check `p-icon` only when selected.
- Strip sets host `role="option"` / `aria-selected`, omits the check icon when not selected, and reads `disabledParent` from the parent-synced property.
- Playground has 20 options in 4 closed Stencil `p-select`s: one direct option plus two `p-optgroup`s each. No value, so the trigger selected-text span stays empty. Options sit in `display:none` popover.
- File harness proves shadow, slotted text, selected check `P-ICON`, disabled / disabledParent opacity, highlighted frosted, hidden host.

Internal props (`selected`, `highlighted`, `disabledParent`) are copied on swap. Parent `updateOptions` is patched to accept `LIT-SELECT-OPTION` so optgroup children do not throw `should be of kind p-select-option`.

Playwright `waitForSelector` uses `{ state: 'attached' }` because closed options are not visible. Stencil `onSlotChange` reads `p-select.children` after disconnect (`Cannot read properties of null (reading 'children')`); that log is treated as benign. Pixel-diff still 0.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-select-option-whitespace.mjs
rg my-fragment output/lit/src/SelectOption.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/SelectOption.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-select-option.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=select" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_select_option_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_select_option_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-select-option-baseline.mjs
node harness/verify-select-option.mjs           # exit 0, failures: []
node harness/pixel-diff-select-option.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `SelectOption.ts` has none.

## Live verification

`node harness/verify-select-option.mjs`, exit 0: shadow root, cssText `<style>`, host block, `.option` flex, default slot text, host `role="option"`, selected check `P-ICON` + primary color, disabled opacity 0.4 / not-allowed / GrayText, disabledParent opacity, highlighted frosted vs token, hidden host, no inner `lit-*`.

`node harness/pixel-diff-select-option.mjs`, exit 0:

```json
{
  "swap": { "swapped": 20, "litRendered": 20, "fragment": false, "parentStillStencil": true, "slottedCopied": true, "closed": true, "innerLit": false, "nested": { "count": 20, "parentTags": ["P-SELECT", "P-OPTGROUP"], "icons": [] } },
  "controlStencilVsBaseline": { "aSize": "460x982", "strictMismatch": 0, "totalPixels": 451720 },
  "litVsBaseline": { "aSize": "460x982", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 451720 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_select_option_before.png`
- `/opt/cursor/artifacts/mitosis_lit_select_option_after.png`
- `/opt/cursor/artifacts/select_option_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_select_option_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-select-option.md`

## Follow-ups

- `p-select.updateOptions` still requires `p-select-option` children inside `p-optgroup`. A relaxed child-kind check is needed before Lit options can remount without a patched `updateOptions`.
- Open dropdown, click / `internalOptionUpdate`, and selected-option text in the trigger (when `value` is set) are not in this closed-card pixel probe.
- Stencil option `onSlotChange` throws after disconnect; that is teardown noise, not a Lit render failure.
- Keep leftover `harness/stencil_*_control.png` untracked.
