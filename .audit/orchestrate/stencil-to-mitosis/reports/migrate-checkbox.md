# Migrate p-checkbox to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     61b40145b5 (source, bundle; baseline and this report land on top)
TAG      p-checkbox only. LIT_TAG lit-checkbox. packages/components untouched.

## Verdict

`Checkbox.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=checkbox` swapped in-card to `lit-checkbox` diffs 0 of 660,560 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="checkbox"]`.

Message icons stay `p-icon`. Loading stays `p-spinner`. They were not swapped to `lit-icon` / `lit-spinner`.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe. Switch and earlier sources were not rewritten.

- `src/Checkbox.lite.tsx` mirrors `p-checkbox`. `useMetadata({ tagName: 'lit-checkbox' })`. Static `:host([hidden])` in `useStyle`. hideLabel, state, disabled, loading, compact, checked, and the label/message strings live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />`. Colors use `var(--p-checkbox-*,var(--p-color-*))`. Scaling is `--_p-checkbox-scaling`. Checked and indeterminate use the same inline SVG masks as Stencil. Loading skips those fills and overlays `p-spinner`. Disabled sets `.input-wrapper` / `.label` to `opacity: 0.4`. Forced-colors uses `GrayText` / `CanvasText` / `Highlight`.
- Stencil already has one real root (`div.root`). No fragment. Label is a prop, not a default slot. When `label` is empty the probe hides `.label-wrapper` so the last playground host (wrapped in a native `<label>`) does not grow a second grid column. The message `<span>` is always present; without a success/error message it gets the same `opacity:0;position:absolute` treatment as `:empty`. `rg my-fragment output/lit/src/Checkbox.ts` is empty.
- Mitosis dropped `@property() indeterminate`. `harness/strip-checkbox-whitespace.mjs` restores it, compacts the shadow tree, reads hyphenated `hide-label`, omits empty `name`/`aria-*` via Lit `nothing`, and sets `input.indeterminate` in `updated()`.
- Pixel-diff copies attributes **and** light-DOM children. Host `class` is copied so `self-start` stays. The last host has no light-DOM children.
- Loading `p-spinner` animates. Capture and pixel-diff set `--p-animation-duration: 0s` on both sides.
- hideLabel parses JSON when the string starts with `{`. `m` compiles to `@media(min-width:1000px)`. The card does not use breakpoint JSON. The file harness proves 999 vs 1000 (label clipped → visible).
- Stencil sets `delegatesFocus`, `formAssociated`, and emits `change` / `blur`. Mitosis Lit does not. Static pixel-diff does not toggle. Follow-up only.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
# …all prior strips…
node harness/strip-checkbox-whitespace.mjs
rg my-fragment output/lit/src/Checkbox.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Checkbox.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-checkbox.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-checkbox-baseline.mjs
node harness/verify-checkbox.mjs            # exit 0, failures: []
node harness/pixel-diff-checkbox.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `Checkbox.ts` has none.

## Live verification

`node harness/verify-checkbox.mjs`, exit 0: shadow root, cssText `<style>`, `--_p-checkbox-scaling:1`, native checkbox, token background match, checked fill, `input.indeterminate`, loading `P-SPINNER`, disabled 0.4, success `p-icon` check + `var(--p-color-success)`, error exclamation + `aria-invalid`, hide-label clipped, no-label wrapper `display:none`, 999 hidden vs 1000 visible.

`node harness/pixel-diff-checkbox.mjs`, exit 0:

```json
{
  "swap": { "swapped": 13, "litRendered": 13, "fragment": false, "innerLit": false },
  "controlStencilVsBaseline": { "aSize": "460x1436", "strictMismatch": 0, "totalPixels": 660560 },
  "litVsBaseline": { "aSize": "460x1436", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 660560 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_checkbox_before.png`
- `/opt/cursor/artifacts/mitosis_lit_checkbox_after.png`
- `/opt/cursor/artifacts/checkbox_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_checkbox_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-checkbox.md`

## Follow-ups

- Mitosis Lit does not emit `delegatesFocus`, `formAssociated`, or `change`/`blur`. Toggle and form submit are untested here.
- `indeterminate` has to be re-declared after `mitosis build`; the generator does not emit that property from the `.lite.tsx` getter-only usage.
