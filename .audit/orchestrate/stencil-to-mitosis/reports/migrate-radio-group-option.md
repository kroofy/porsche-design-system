# Migrate p-radio-group-option to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     7606e7ac52 (source, bundle, parent-kind console filter; baseline and this report land on top)
TAG      p-radio-group-option only. LIT_TAG lit-radio-group-option. packages/components untouched. RadioGroup.lite.tsx untouched.

## Verdict

`RadioGroupOption.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=radio-group` swapped option hosts only to `lit-radio-group-option` and diffs 0 of 754,400 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="radio-group"]`. Card is taller than 900 so the clip is the viewport remainder.

Parents stay `p-radio-group`. Nested `p-icon` / `p-spinner` stay Stencil. Light-DOM children are copied on swap. `rg my-fragment output/lit/src/RadioGroupOption.ts` is empty.

## What was built

Copied the SegmentedControlItem in-parent swap pattern. SegmentedControlItem.lite.tsx and RadioGroup.lite.tsx were not edited.

- `src/RadioGroupOption.lite.tsx` mirrors `getComponentCss`: `:host` block, radio input sized by inherited `--_p-radio-group-option-a`, checked circle mask on `var(--p-color-canvas)`, state palettes, disabled wrapper opacity 0.4, option-loading overlay spinner, hide option spinner when `loadingParent`.
- Strip sets `.checked` from parent-synced `selected`, omits empty label-wrapper, and skips option spinner / loading message when the parent is loading.
- Playground has 25 options in 5 Stencil parents: selected B, option D `loading="true"`, option E `disabled="true"`, plus parent loading / success / error / disabled groups.
- File harness proves shadow, frosted vs token, selected primary fill, disabled opacity, option `P-SPINNER`, success frosted-soft, no spinner when `loadingparent`, hidden host.

Internal props (`selected`, `disabledParent`, `loadingParent`, `state`, `name`) are copied on swap so parent-disabled and parent-loading options keep the last Stencil look.

Loading is paused with `--p-animation-duration: 0s` and `--p-transition-duration: 0s` on both sides.

Stencil `p-radio-group` logs `child lit-radio-group-option of p-radio-group has to be a p-radio-group-option` on slotchange. Swap patches `updateOptions` and treats that log as benign. Pixel-diff still 0.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-radio-group-option-whitespace.mjs
rg my-fragment output/lit/src/RadioGroupOption.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/RadioGroupOption.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-radio-group-option.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=radio-group" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_radio_group_option_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_radio_group_option_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-radio-group-option-baseline.mjs
node harness/verify-radio-group-option.mjs           # exit 0, failures: []
node harness/pixel-diff-radio-group-option.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `RadioGroupOption.ts` has none.

## Live verification

`node harness/verify-radio-group-option.mjs`, exit 0: shadow root, cssText `<style>`, host block, radius-full, default hover, frosted vs token, selected checked + primary fill, disabled opacity 0.4 / not-allowed / no hover, loading overlay `P-SPINNER`, success frosted-soft vs token, parent-loading hides option spinner, hidden host, no inner `lit-*`.

`node harness/pixel-diff-radio-group-option.mjs`, exit 0:

```json
{
  "swap": { "swapped": 25, "litRendered": 25, "fragment": false, "parentStillStencil": true, "slottedCopied": true, "innerLit": false, "nested": { "spinners": ["P-SPINNER"], "spinnerCount": 4 } },
  "controlStencilVsBaseline": { "aSize": "460x1640", "strictMismatch": 0, "totalPixels": 754400 },
  "litVsBaseline": { "aSize": "460x1640", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 754400 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_radio_group_option_before.png`
- `/opt/cursor/artifacts/mitosis_lit_radio_group_option_after.png`
- `/opt/cursor/artifacts/radio_group_option_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_radio_group_option_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-radio-group-option.md`

## Follow-ups

- `p-radio-group` still requires `p-radio-group-option` children on slotchange. A relaxed child-kind check is needed before Lit options can remount without a patched `updateOptions`.
- Click / change / `internalRadioGroupOptionChange` are not in this pixel probe.
- Stencil `forceUpdate` on Lit children after parent sync is a no-op; Lit reacts via `@property`.
