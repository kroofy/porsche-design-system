# Migrate p-input-search to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     7e3df42fc8 (source, bundle; baseline and this report land on top)
TAG      p-input-search only. LIT_TAG lit-input-search. packages/components untouched.

## Verdict

`InputSearch.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=input-search` swapped in-card to `lit-input-search` diffs 0 of 630,200 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="input-search"]`.

The search indicator stays Stencil `p-icon` (`name="search"`, `color="contrast-medium"`). The clear control stays Stencil `p-button-pure` (`icon="close"`). Message icons stay `p-icon`. Loading stays `p-spinner`. None of them were swapped to Lit tags.

## What was built

Copied the accepted input-password probe and retargeted it. InputPassword.lite.tsx was not edited.

- `src/InputSearch.lite.tsx` mirrors `p-input-search` via `InputBase`. Native control is `type="search"` with `id="input-search"`. `indicator` renders a Stencil `p-icon` (`name="search"`, `color="contrast-medium"`) before the input and hides with `.wrapper > p-icon{display:none}` when off. `clear` renders a Stencil `p-button-pure.button` (`hide-label`, `tabindex="-1"`, icon `close`, label "Clear field") after the input, `hidden` when the value is empty, disabled when the field is disabled or read-only. CSS `.button{padding:var(--ref-p-input-slotted-padding);margin:var(--ref-p-input-slotted-margin)}` matches the Stencil snapshot. Hidden with `.button{display:none}` when clear is off. Extra `input::-webkit-search-cancel-button{display:none}`. `rg my-fragment output/lit/src/InputSearch.ts` is empty.
- Hyphenated `read-only` / `hide-label` / `max-length` are re-read from attributes after `mitosis build`. `indicator` and `clear` are real attributes so Lit observes them.
- Pixel-diff copies attributes. Capture and pixel-diff wait for every visible `p-button-pure` plus its inner `p-icon`, indicator `p-icon`s, message `p-icon`s, and pause `--p-animation-duration: 0s`.
- hideLabel JSON parses; `m` is `@media(min-width:1000px)`. File harness proves 999 vs 1000.
- Stencil `delegatesFocus`, `formAssociated`, clear-click, and `input`/`change`/`blur` are not in Mitosis Lit. Static pixel-diff does not click clear. Follow-up only.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-input-search-whitespace.mjs
rg my-fragment output/lit/src/InputSearch.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/InputSearch.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-input-search.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=input-search" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_input_search_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_search_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-input-search-baseline.mjs
node harness/verify-input-search.mjs           # exit 0, failures: []
node harness/pixel-diff-input-search.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `InputSearch.ts` has none.

## Live verification

`node harness/verify-input-search.mjs`, exit 0: shadow root, cssText `<style>`, `--_p-input-base-a:1`, `input type=search` value `Some value`, indicator `P-ICON` name `search` color `contrast-medium`, clear `P-BUTTON-PURE` icon `close`, token wrapper background match, loading `P-SPINNER` with no hover rule, disabled 0.4, success message `check`, error `exclamation` + `aria-invalid`, read-only transparent border, hide-label clipped, 999 hidden vs 1000 visible.

`node harness/pixel-diff-input-search.mjs`, exit 0:

```json
{
  "swap": { "swapped": 6, "litRendered": 6, "fragment": false, "innerLit": false },
  "controlStencilVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "totalPixels": 630200 },
  "litVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 630200 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_input_search_before.png`
- `/opt/cursor/artifacts/mitosis_lit_input_search_after.png`
- `/opt/cursor/artifacts/input_search_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_search_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-input-search.md`

## Follow-ups

- Mitosis Lit does not emit `delegatesFocus`, `formAssociated`, or `input`/`change`/`blur`. Clicking clear to empty the value is untested here.
