# Migrate p-textarea to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     f7f494ed7b (source, bundle; baseline and this report land on top)
TAG      p-textarea only. LIT_TAG lit-textarea. packages/components untouched.

## Verdict

`Textarea.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=textarea` swapped in-card to `lit-textarea` diffs 0 of 665,160 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="textarea"]`.

This is not InputBase. The probe is Label + native `textarea` + StateMessage. Nested message icons stay Stencil `p-icon`. None of them were swapped to Lit tags.

## What was built

Copied an input harness and retargeted `[data-card="textarea"]`. InputWeek.lite.tsx was not edited.

- `src/Textarea.lite.tsx` mirrors `p-textarea`. Native control is `<textarea id="textarea">`. Scale var is `--_p-textarea-a`. Counter and sr-only are always emitted as siblings (no JSX fragments); CSS hides them when `counter` is off. `rg my-fragment output/lit/src/Textarea.ts` is empty.
- Playground has 5 hosts: rows 1/2/2/2/1, counter on the first three, success/error messages, disabled, read-only. Value `Some value` (10 chars) with `max-length="100"` shows `10/100`.
- Hyphenated `read-only` / `hide-label` / `max-length` / `counter` are re-read from attributes after `mitosis build`. Pixel-diff copies attributes including `class` (`w-full`) and light-DOM children.
- hideLabel JSON parses; `m` is `@media(min-width:1000px)`. File harness proves 999 hidden vs 1000 visible.
- Stencil `delegatesFocus`, `formAssociated`, and `input`/`change`/`blur` are not in Mitosis Lit. Follow-up only.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-textarea-whitespace.mjs
rg my-fragment output/lit/src/Textarea.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Textarea.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-textarea.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=textarea" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_textarea_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_textarea_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-textarea-baseline.mjs
node harness/verify-textarea.mjs           # exit 0, failures: []
node harness/pixel-diff-textarea.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `Textarea.ts` has none.

## Live verification

`node harness/verify-textarea.mjs`, exit 0: shadow root, cssText `<style>`, `--_p-textarea-a:1`, native textarea value `Some value`, rows `1`, counter `10/100`, disabled wrapper opacity 0.4, success/error icons stay `P-ICON`, readonly transparent border, hide-label overflow, 999 hidden vs 1000 visible.

`node harness/pixel-diff-textarea.mjs`, exit 0:

```json
{
  "swap": { "swapped": 5, "litRendered": 5, "fragment": false, "innerLit": false },
  "controlStencilVsBaseline": { "aSize": "460x1446", "strictMismatch": 0, "totalPixels": 665160 },
  "litVsBaseline": { "aSize": "460x1446", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 665160 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_textarea_before.png`
- `/opt/cursor/artifacts/mitosis_lit_textarea_after.png`
- `/opt/cursor/artifacts/textarea_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_textarea_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-textarea.md`

## Follow-ups

- Mitosis Lit does not emit `delegatesFocus`, `formAssociated`, or `input`/`change`/`blur`.
