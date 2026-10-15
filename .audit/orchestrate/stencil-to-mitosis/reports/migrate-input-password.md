# Migrate p-input-password to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     4521801133 (source, bundle; baseline and this report land on top)
TAG      p-input-password only. LIT_TAG lit-input-password. packages/components untouched.

## Verdict

`InputPassword.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=input-password` swapped in-card to `lit-input-password` diffs 0 of 630,200 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="input-password"]`.

The visibility toggle stays Stencil `p-button-pure` (`icon="view"`). Message icons stay `p-icon`. Loading stays `p-spinner`. None of them were swapped to Lit tags.

## What was built

Copied the accepted input-email probe and retargeted it. InputEmail.lite.tsx was not edited.

- `src/InputPassword.lite.tsx` mirrors `p-input-password` via `InputBase`. Native control is `type="password"` with `id="input-password"`. `toggle` renders a Stencil `p-button-pure.button` (`hide-label`, icon `view`, label "Toggle password visibility") after the input. CSS `.button{padding:var(--ref-p-input-slotted-padding);margin:var(--ref-p-input-slotted-margin)}` matches the Stencil snapshot. Hidden with `.button{display:none}` when toggle is off. No email RTL override. `rg my-fragment output/lit/src/InputPassword.ts` is empty.
- Hyphenated `read-only` / `hide-label` / `max-length` are re-read from attributes after `mitosis build`. `toggle` is a real attribute so Lit observes it.
- Pixel-diff copies attributes and `class` (`w-full`). Capture and pixel-diff wait for every visible `p-button-pure` plus its inner `p-icon`, message `p-icon`s, and pause `--p-animation-duration: 0s`.
- hideLabel JSON parses; `m` is `@media(min-width:1000px)`. File harness proves 999 vs 1000.
- Stencil `delegatesFocus`, `formAssociated`, `showPassword` click-to-unmask, and `input`/`change`/`blur` are not in Mitosis Lit. Static pixel-diff does not click the toggle. Follow-up only.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
# …all prior strips…
node harness/strip-input-password-whitespace.mjs
rg my-fragment output/lit/src/InputPassword.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/InputPassword.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-input-password.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-input-password-baseline.mjs
node harness/verify-input-password.mjs           # exit 0, failures: []
node harness/pixel-diff-input-password.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `InputPassword.ts` has none.

## Live verification

`node harness/verify-input-password.mjs`, exit 0: shadow root, cssText `<style>`, `--_p-input-base-a:1`, `input type=password` value `Some value`, toggle `P-BUTTON-PURE` icon `view`, token wrapper background match, loading `P-SPINNER` with no hover rule, disabled 0.4, success message `check`, error `exclamation` + `aria-invalid`, read-only transparent border, hide-label clipped, 999 hidden vs 1000 visible.

`node harness/pixel-diff-input-password.mjs`, exit 0:

```json
{
  "swap": { "swapped": 6, "litRendered": 6, "fragment": false, "innerLit": false },
  "controlStencilVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "totalPixels": 630200 },
  "litVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 630200 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_input_password_before.png`
- `/opt/cursor/artifacts/mitosis_lit_input_password_after.png`
- `/opt/cursor/artifacts/input_password_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_password_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-input-password.md`

## Follow-ups

- Mitosis Lit does not emit `delegatesFocus`, `formAssociated`, or `input`/`change`/`blur`. Clicking the toggle to switch `type` to `text` is untested here.
