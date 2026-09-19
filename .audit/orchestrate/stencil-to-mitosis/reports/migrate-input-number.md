# Migrate p-input-number to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     5fe4a038e9 (source, bundle; baseline and this report land on top)
TAG      p-input-number only. LIT_TAG lit-input-number. packages/components untouched.

## Verdict

`InputNumber.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=input-number` swapped in-card to `lit-input-number` diffs 0 of 630,200 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="input-number"]`.

There is no indicator icon. Decrement and increment stay Stencil `p-button-pure` (`icon="minus"` / `icon="plus"`, `hide-label`, `tabindex="-1"`). Message icons stay `p-icon`. Loading stays `p-spinner`. None of them were swapped to Lit tags.

## What was built

Copied the accepted input-tel probe and retargeted it. InputTel.lite.tsx was not edited.

- `src/InputNumber.lite.tsx` mirrors `p-input-number` via `InputBase`. Native control is `type="number"` with `id="input-number"`. No indicator `p-icon`. `controls` always emits two sibling `p-button-pure` nodes after the input (minus then plus) and hides them with `.button{display:none}` when off. Stencil wraps those buttons in a Fragment. Mitosis cannot. `rg my-fragment output/lit/src/InputNumber.ts` is empty.
- Extra CSS matches Stencil: `-moz-appearance:textfield` and `input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{display:none}`. When `controls` is on, `.button` gets the slotted padding/margin refs. No RTL wrapper LTR override (tel/url/email have that; number does not).
- Hyphenated `read-only` / `hide-label` / `controls` are re-read from attributes after `mitosis build`. Pixel-diff copies attributes including `class` (`w-full`).
- Capture and pixel-diff wait for every visible `p-button-pure` plus its inner `p-icon`, loading `p-spinner`, message `p-icon`, and pause `--p-animation-duration: 0s`.
- hideLabel JSON parses; `m` is `@media(min-width:1000px)`. File harness proves 999 vs 1000 and that `controls="false"` hides both buttons.
- Stencil `delegatesFocus`, `formAssociated`, `min`/`max`/`step` increment handlers, and `input`/`change`/`blur` are not in Mitosis Lit. Static pixel-diff does not click plus/minus. Follow-up only.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-input-number-whitespace.mjs
rg my-fragment output/lit/src/InputNumber.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/InputNumber.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-input-number.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=input-number" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_input_number_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_number_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-input-number-baseline.mjs
node harness/verify-input-number.mjs           # exit 0, failures: []
node harness/pixel-diff-input-number.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `InputNumber.ts` has none.

## Live verification

`node harness/verify-input-number.mjs`, exit 0: shadow root, cssText `<style>`, `--_p-input-base-a:1`, spin-button CSS, moz-appearance, `.button` padding, `input type=number` value `123`, minus/plus `P-BUTTON-PURE`, hide-label hides both buttons, 999 hidden vs 1000 visible.

`node harness/pixel-diff-input-number.mjs`, exit 0:

```json
{
  "swap": { "swapped": 6, "litRendered": 6, "fragment": false, "innerLit": false },
  "controlStencilVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "totalPixels": 630200 },
  "litVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 630200 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_input_number_before.png`
- `/opt/cursor/artifacts/mitosis_lit_input_number_after.png`
- `/opt/cursor/artifacts/input_number_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_number_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-input-number.md`

## Follow-ups

- Mitosis Lit does not emit `delegatesFocus`, `formAssociated`, or `input`/`change`/`blur`. Plus/minus click handlers and native `min`/`max`/`step` are untested here.
