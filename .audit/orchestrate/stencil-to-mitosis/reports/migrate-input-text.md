# Migrate p-input-text to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     995554fae4 (source, bundle; baseline and this report land on top)
TAG      p-input-text only. LIT_TAG lit-input-text. packages/components untouched.

## Verdict

`InputText.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=input-text` swapped in-card to `lit-input-text` diffs 0 of 630,200 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="input-text"]`.

Message icons stay `p-icon`. Loading stays `p-spinner`. They were not swapped to `lit-icon` / `lit-spinner`.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe. Checkbox and earlier sources were not rewritten.

- `src/InputText.lite.tsx` mirrors `p-input-text` via `InputBase`. `useMetadata({ tagName: 'lit-input-text' })`. Static `:host([hidden])` in `useStyle`. hideLabel, state, disabled, loading, compact, readOnly, counter, and the label/message strings live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />`. Colors use `var(--p-color-*)`. Scaling is `--_p-input-base-a`. Wrapper padding/gap use the InputBase `22.4px` formulas. Read-only sets `border-color: transparent`, `background: var(--p-color-frosted)`, `color: var(--p-color-contrast-medium)`. Disabled sets `.wrapper` / `.wrapper > *` / `.label` to `opacity: 0.4`. Forced-colors uses `GrayText` / `Highlight`.
- Stencil already has one real root (`div.root`). Counter is two sibling spans (`.sr-only` + `.counter`), not a JSX fragment. Label is a prop. The message `<span>` is always present; without a success/error message it gets `opacity:0;position:absolute` and the icon is `display:none`. Spinner is always in the tree and `display:none` when not loading. `rg my-fragment output/lit/src/InputText.ts` is empty.
- Lit `@property() maxLength` observes `maxlength`, not `max-length`. Same for `read-only`. `harness/strip-input-text-whitespace.mjs` compact the shadow tree, reads hyphenated `hide-label` / `max-length` / `read-only`, omits empty `name`/`aria-*` via Lit `nothing`, and syncs native input `.value` / `maxLength` / `readOnly` in `updated()`.
- Pixel-diff copies attributes **and** `class` (`w-full`). Hosts have no light-DOM children. Hyphenated `max-length` and `read-only` are also assigned as properties.
- Loading `p-spinner` animates. Capture and pixel-diff set `--p-animation-duration: 0s` on both sides.
- hideLabel parses JSON when the string starts with `{`. `m` compiles to `@media(min-width:1000px)`. The card does not use breakpoint JSON. The file harness proves 999 vs 1000 (label clipped → visible).
- Stencil sets `delegatesFocus`, `formAssociated`, and emits `input` / `change` / `blur`. Mitosis Lit does not. Static pixel-diff does not type. Follow-up only.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
# …all prior strips…
node harness/strip-input-text-whitespace.mjs
rg my-fragment output/lit/src/InputText.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/InputText.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-input-text.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-input-text-baseline.mjs
node harness/verify-input-text.mjs           # exit 0, failures: []
node harness/pixel-diff-input-text.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `InputText.ts` has none.

## Live verification

`node harness/verify-input-text.mjs`, exit 0: shadow root, cssText `<style>`, `--_p-input-base-a:1`, native text input value `Some value`, token wrapper background match, counter `10/100`, loading `P-SPINNER` with no hover rule, disabled 0.4, success `p-icon` check + `var(--p-color-success)`, error exclamation + `aria-invalid`, read-only transparent border + contrast-medium, hide-label clipped, 999 hidden vs 1000 visible.

`node harness/pixel-diff-input-text.mjs`, exit 0:

```json
{
  "swap": { "swapped": 6, "litRendered": 6, "fragment": false, "innerLit": false },
  "controlStencilVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "totalPixels": 630200 },
  "litVsBaseline": { "aSize": "460x1370", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 630200 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_input_text_before.png`
- `/opt/cursor/artifacts/mitosis_lit_input_text_after.png`
- `/opt/cursor/artifacts/input_text_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_text_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-input-text.md`

## Follow-ups

- Mitosis Lit does not emit `delegatesFocus`, `formAssociated`, or `input`/`change`/`blur`. Typing and form submit are untested here.
- Hyphenated `max-length` and `read-only` have to be re-read from attributes after `mitosis build`; Lit's default converter observes `maxlength` / `readonly`.
