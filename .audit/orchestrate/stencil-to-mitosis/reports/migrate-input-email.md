# Migrate p-input-email to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     c956f007b6 (source, bundle; baseline and this report land on top)
TAG      p-input-email only. LIT_TAG lit-input-email. packages/components untouched.

## Verdict

`InputEmail.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=input-email` swapped in-card to `lit-input-email` diffs 0 of 630,200 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="input-email"]`.

The email indicator stays `p-icon name="email"`. Message icons stay `p-icon`. Loading stays `p-spinner`. None of them were swapped to Lit tags.

## What was built

Copied the accepted input-text probe and retargeted it. InputText.lite.tsx was not edited.

- `src/InputEmail.lite.tsx` mirrors `p-input-email` via `InputBase`. Native control is `type="email"` with `id="input-email"`. `indicator` renders a Stencil `p-icon` (`name="email"`, `color="contrast-low"`) as a sibling of the input, hidden with `.wrapper > p-icon{display:none}` when the flag is off. Extra host CSS `:host(:dir(rtl)) .wrapper,:host(:dir(rtl)) input:placeholder-shown{direction:ltr}` matches the Stencil snapshot. No counter spans. `rg my-fragment output/lit/src/InputEmail.ts` is empty.
- Hyphenated `read-only` / `hide-label` / `max-length` are re-read from attributes after `mitosis build`, same as input-text. `indicator` is a real attribute so Lit observes it.
- Pixel-diff copies attributes and `class` (`w-full`). Hosts have no light-DOM children. Capture and pixel-diff wait for every visible inner `p-icon` (indicator plus message) and pause `--p-animation-duration: 0s`.
- hideLabel JSON parses; `m` is `@media(min-width:1000px)`. File harness proves 999 vs 1000.
- Stencil `delegatesFocus`, `formAssociated`, and `input`/`change`/`blur` are not in Mitosis Lit. Static pixel-diff does not type. Follow-up only.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
# …all prior strips…
node harness/strip-input-email-whitespace.mjs
rg my-fragment output/lit/src/InputEmail.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/InputEmail.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-input-email.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-input-email-baseline.mjs
node harness/verify-input-email.mjs           # exit 0, failures: []
node harness/pixel-diff-input-email.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `InputEmail.ts` has none.

## Live verification

`node harness/verify-input-email.mjs`, exit 0: shadow root, cssText `<style>`, `--_p-input-base-a:1`, `input type=email` value `Some value`, indicator `P-ICON` email/contrast-low, token wrapper background match, loading `P-SPINNER` with no hover rule, disabled 0.4, success message `check`, error `exclamation` + `aria-invalid`, read-only transparent border, hide-label clipped, 999 hidden vs 1000 visible.

`node harness/pixel-diff-input-email.mjs`, exit 0:

```json
{
  "swap": { "swapped": 6, "litRendered": 6, "fragment": false, "innerLit": false },
  "controlStencilVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "totalPixels": 630200 },
  "litVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 630200 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_input_email_before.png`
- `/opt/cursor/artifacts/mitosis_lit_input_email_after.png`
- `/opt/cursor/artifacts/input_email_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_email_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-input-email.md`

## Follow-ups

- Mitosis Lit does not emit `delegatesFocus`, `formAssociated`, or `input`/`change`/`blur`. Typing and form submit are untested here.
