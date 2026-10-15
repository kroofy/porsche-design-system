# Migrate p-input-time to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     6e9d6ccca2 (source, bundle; baseline and this report land on top)
TAG      p-input-time only. LIT_TAG lit-input-time. packages/components untouched.

## Verdict

`InputTime.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=input-time` swapped in-card to `lit-input-time` diffs 0 of 630,200 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="input-time"]`.

The clock control stays Stencil `p-button-pure` (`icon="clock"`, `hide-label`, text "Open time picker"). Message icons stay `p-icon`. Loading stays `p-spinner`. The first host's slotted `p-popover` stays Stencil in light DOM. None of them were swapped to Lit tags.

## What was built

Copied the accepted input-month probe and retargeted it. InputMonth.lite.tsx was not edited.

- `src/InputTime.lite.tsx` mirrors `p-input-time` via `InputBase`. Native control is `type="time"` with `id="input-time"`. Value is `09:11` on the playground. Always emits one sibling `p-button-pure` after the input (clock). `rg my-fragment output/lit/src/InputTime.ts` is empty.
- Extra CSS matches Stencil: `input::-webkit-calendar-picker-indicator{display:none}`. No `-moz-appearance:textfield` (month has that; time does not). `.button` always gets the slotted padding/margin refs.
- Hyphenated `read-only` / `hide-label` are re-read from attributes after `mitosis build`. Pixel-diff copies attributes including `class` (`w-full`) and light-DOM children (`p-popover` on host 1).
- Capture and pixel-diff wait for every visible `p-button-pure` plus its inner `p-icon`, loading `p-spinner`, message `p-icon`, slotted `p-popover`, and pause `--p-animation-duration: 0s`.
- hideLabel JSON parses; `m` is `@media(min-width:1000px)`. File harness proves 999 vs 1000 and that hide-label does not hide the clock button.
- Stencil `delegatesFocus`, `formAssociated`, `showPicker()`, `min`/`max`/`step`, and `input`/`change`/`blur` are not in Mitosis Lit. Static pixel-diff does not open the picker. Follow-up only.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-input-time-whitespace.mjs
rg my-fragment output/lit/src/InputTime.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/InputTime.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-input-time.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=input-time" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_input_time_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_time_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-input-time-baseline.mjs
node harness/verify-input-time.mjs           # exit 0, failures: []
node harness/pixel-diff-input-time.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `InputTime.ts` has none.

## Live verification

`node harness/verify-input-time.mjs`, exit 0: shadow root, cssText `<style>`, `--_p-input-base-a:1`, calendar-picker CSS, no moz-appearance, `.button` padding, `input type=time` value `09:11`, clock `P-BUTTON-PURE` icon `clock`, hide-label keeps the button, 999 hidden vs 1000 visible.

`node harness/pixel-diff-input-time.mjs`, exit 0:

```json
{
  "swap": { "swapped": 6, "litRendered": 6, "fragment": false, "innerLit": false },
  "controlStencilVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "totalPixels": 630200 },
  "litVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 630200 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_input_time_before.png`
- `/opt/cursor/artifacts/mitosis_lit_input_time_after.png`
- `/opt/cursor/artifacts/input_time_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_time_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-input-time.md`

## Follow-ups

- Mitosis Lit does not emit `delegatesFocus`, `formAssociated`, or `input`/`change`/`blur`. Clock `showPicker()` and native `min`/`max`/`step` are untested here.
