# Migrate p-input-month to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     145049bed1 (source, bundle; baseline and this report land on top)
TAG      p-input-month only. LIT_TAG lit-input-month. packages/components untouched.

## Verdict

`InputMonth.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=input-month` swapped in-card to `lit-input-month` diffs 0 of 630,200 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="input-month"]`.

The calendar control stays Stencil `p-button-pure` (`icon="calendar"`, `hide-label`, text "Open date picker", same string Stencil ships). Message icons stay `p-icon`. Loading stays `p-spinner`. None of them were swapped to Lit tags.

## What was built

Copied the accepted input-date probe and retargeted it. InputDate.lite.tsx was not edited.

- `src/InputMonth.lite.tsx` mirrors `p-input-month` via `InputBase`. Native control is `type="month"` with `id="input-month"`. Value is YYYY-MM (`2018-05` on the playground). Always emits one sibling `p-button-pure` after the input (calendar). `rg my-fragment output/lit/src/InputMonth.ts` is empty.
- Extra CSS matches Stencil: `-moz-appearance:textfield` and `input::-webkit-calendar-picker-indicator{display:none}`. `.button` always gets the slotted padding/margin refs. Playground `controls="true"` is unused by Stencil month, so it is unused here too.
- Hyphenated `read-only` / `hide-label` are re-read from attributes after `mitosis build`. Pixel-diff copies attributes including `class` (`w-full`) and `placeholder`.
- Capture and pixel-diff wait for every visible `p-button-pure` plus its inner `p-icon`, loading `p-spinner`, message `p-icon`, and pause `--p-animation-duration: 0s`.
- hideLabel JSON parses; `m` is `@media(min-width:1000px)`. File harness proves 999 vs 1000 and that hide-label does not hide the calendar button.
- Stencil `delegatesFocus`, `formAssociated`, `showPicker()`, `min`/`max`/`step`, and `input`/`change`/`blur` are not in Mitosis Lit. Static pixel-diff does not open the picker. Follow-up only.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-input-month-whitespace.mjs
rg my-fragment output/lit/src/InputMonth.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/InputMonth.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-input-month.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=input-month" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_input_month_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_month_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-input-month-baseline.mjs
node harness/verify-input-month.mjs           # exit 0, failures: []
node harness/pixel-diff-input-month.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `InputMonth.ts` has none.

## Live verification

`node harness/verify-input-month.mjs`, exit 0: shadow root, cssText `<style>`, `--_p-input-base-a:1`, calendar-picker CSS, moz-appearance, `.button` padding, `input type=month` value `2018-05`, calendar `P-BUTTON-PURE` icon `calendar`, hide-label keeps the button, 999 hidden vs 1000 visible.

`node harness/pixel-diff-input-month.mjs`, exit 0:

```json
{
  "swap": { "swapped": 6, "litRendered": 6, "fragment": false, "innerLit": false },
  "controlStencilVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "totalPixels": 630200 },
  "litVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 630200 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_input_month_before.png`
- `/opt/cursor/artifacts/mitosis_lit_input_month_after.png`
- `/opt/cursor/artifacts/input_month_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_month_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-input-month.md`

## Follow-ups

- Mitosis Lit does not emit `delegatesFocus`, `formAssociated`, or `input`/`change`/`blur`. Calendar `showPicker()` and native `min`/`max`/`step` are untested here.
