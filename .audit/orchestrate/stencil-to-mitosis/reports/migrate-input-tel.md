# Migrate p-input-tel to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     1ecb7e1510 (source, bundle; baseline and this report land on top)
TAG      p-input-tel only. LIT_TAG lit-input-tel. packages/components untouched.

## Verdict

`InputTel.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=input-tel` swapped in-card to `lit-input-tel` diffs 0 of 630,200 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="input-tel"]`.

The phone indicator stays Stencil `p-icon` (`name="phone"`, `color="contrast-low"`). Playground hosts omit `indicator`, so the icon is `display:none`. Message icons stay `p-icon`. Loading stays `p-spinner`. None of them were swapped to Lit tags.

## What was built

Copied the accepted input-url probe and retargeted it. InputUrl.lite.tsx was not edited.

- `src/InputTel.lite.tsx` mirrors `p-input-tel` via `InputBase`. Native control is `type="tel"` with `id="input-tel"`. `indicator` renders a Stencil `p-icon` (`name="phone"`, `color="contrast-low"`) before the input and hides with `.wrapper > p-icon{display:none}` when off. RTL wrapper stays LTR (`:host(:dir(rtl)) .wrapper,:host(:dir(rtl)) input:placeholder-shown{direction:ltr}`), same as url. `rg my-fragment output/lit/src/InputTel.ts` is empty.
- Hyphenated `read-only` / `hide-label` / `max-length` are re-read from attributes after `mitosis build`. `indicator` is a real attribute so Lit observes it. Pixel-diff copies attributes including `class` (`w-full`).
- Capture and pixel-diff wait for every visible `p-icon`, loading `p-spinner`, and pause `--p-animation-duration: 0s`.
- hideLabel JSON parses; `m` is `@media(min-width:1000px)`. File harness proves 999 vs 1000 and the phone indicator when `indicator="true"`.
- Stencil `delegatesFocus`, `formAssociated`, `pattern`, and `input`/`change`/`blur` are not in Mitosis Lit. Static pixel-diff does not type a phone number. Follow-up only.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-input-tel-whitespace.mjs
rg my-fragment output/lit/src/InputTel.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/InputTel.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-input-tel.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=input-tel" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_input_tel_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_tel_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-input-tel-baseline.mjs
node harness/verify-input-tel.mjs           # exit 0, failures: []
node harness/pixel-diff-input-tel.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `InputTel.ts` has none.

## Live verification

`node harness/verify-input-tel.mjs`, exit 0: shadow root, cssText `<style>`, `--_p-input-base-a:1`, `input type=tel` value `Some value`, indicator `P-ICON` name `phone` color `contrast-low`, RTL LTR override in cssText, token wrapper background match, loading `P-SPINNER` with no hover rule, disabled 0.4, success message `check`, error `exclamation` + `aria-invalid`, read-only transparent border, hide-label clipped, 999 hidden vs 1000 visible.

`node harness/pixel-diff-input-tel.mjs`, exit 0:

```json
{
  "swap": { "swapped": 6, "litRendered": 6, "fragment": false, "innerLit": false },
  "controlStencilVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "totalPixels": 630200 },
  "litVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 630200 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_input_tel_before.png`
- `/opt/cursor/artifacts/mitosis_lit_input_tel_after.png`
- `/opt/cursor/artifacts/input_tel_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_tel_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-input-tel.md`

## Follow-ups

- Mitosis Lit does not emit `delegatesFocus`, `formAssociated`, or `input`/`change`/`blur`. Native tel `pattern` validation is untested here.
