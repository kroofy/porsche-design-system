# Migrate p-button to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     7cfe6546ef (source, bundle; baseline and this report land on top)
TAG      p-button only. LIT_TAG lit-button. packages/components untouched.

## Verdict

`Button.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=button` swapped in-card to `lit-button` diffs 0 of 754,400 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop the visible `[data-card="button"]` intersection with the viewport.

Inner icons stay `p-icon`. Loading indicators stay `p-spinner`. They were not swapped to `lit-icon` / `lit-spinner`.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Button-pure and earlier sources were not rewritten.

- `src/Button.lite.tsx` mirrors `p-button`. `useMetadata({ tagName: 'lit-button' })`. Static `:host` display and `:host([hidden])` in `useStyle`. Variant, hideLabel, compact, icon, iconSource, disabled, and loading live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />` inside the single root `<button class="root">`. That is the `attachComponentCss` analog. Colors use `var(--p-button-*,var(--p-color-*))`. Scaling is `--_p-button-a`. Radius still uses the shared `--_p-link-button-a`. Destructive paints `var(--p-color-error)` / hover `error-medium`. Disabled sets `opacity: 0.4`, `cursor: not-allowed`, and skips hover. Loading keeps the icon in layout at `opacity: 0` and overlays `p-spinner.spinner`. Forced-colors uses `LinkText` / `ButtonText` / `Highlight`, plus `GrayText` when disabled.
- Stencil's shadow is `<Host><button class="root">…</button><LoadingMessage /></Host>`. The probe keeps one real root (`button`) and mounts the sr-only `.loading` span inside it so there is no JSX fragment. Default type is `submit`. Default icon is `none`. The probe always emits `<p-icon>` and `<p-spinner>` and hides the unused one with `display:none` except when loading, where the icon stays for layout. No JSX fragment. `rg my-fragment output/lit/src/Button.ts` is empty.
- Mitosis pretty-prints the template and drops classes. `harness/strip-button-whitespace.mjs` restores a single-line shadow tree, reads hyphenated `icon-source` / `hide-label`, omits empty `name`/`source`/`aria-disabled` via Lit `nothing`, and interpolates the loading status text.
- Pixel-diff copies attributes **and** light-DOM children onto `lit-button`. Attribute-only swap would drop the slotted label. Host `class` is copied so `--p-button-bg` / `--p-button-fg` / `--p-button-radius` theming stays.
- Loading `p-spinner` animates. Capture and pixel-diff set `--p-animation-duration: 0s` on `documentElement` on both sides. The visible crop ends before the loading hosts, so the pause is insurance, not the thing that made the control pass.
- hideLabel / compact parse JSON when the string starts with `{`. `m` compiles to `@media(min-width:1000px)`. The card does not use breakpoint JSON. The file harness proves 999 vs 1000 (`hide-label` clipped → visible, width 55.95 → 97.75).
- Stencil sets `shadow: { delegatesFocus: true }` and `formAssociated: true`. Mitosis Lit does not emit those. Static pixel-diff does not focus or submit. Follow-up only.
- Generated `output/lit/src/Button.ts` and `harness/lit-button.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. `build:button` re-strips prior units so accepted files stay clean, then uses the repo-root esbuild.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
node harness/strip-flag-fragment.mjs
node harness/strip-model-signature-fragment.mjs
node harness/strip-icon-fragment.mjs
node harness/strip-heading-whitespace.mjs
node harness/strip-text-whitespace.mjs
node harness/strip-display-whitespace.mjs
node harness/strip-spinner-whitespace.mjs
node harness/strip-tag-whitespace.mjs
node harness/strip-tag-dismissible-whitespace.mjs
node harness/strip-link-pure-whitespace.mjs
node harness/strip-link-whitespace.mjs
node harness/strip-button-pure-whitespace.mjs
node harness/strip-button-whitespace.mjs
rg my-fragment output/lit/src/Button.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Button.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-button.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-button-baseline.mjs
node harness/verify-button.mjs            # exit 0, failures: []
node harness/pixel-diff-button.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `Button.ts` has none.

## Live verification

`node harness/verify-button.mjs`, exit 0:

```json
{
  "live": {
    "isDefined": true,
    "hasShadowRoot": true,
    "dynamicStyleTag": true,
    "cssTextHasRoot": true,
    "cssTextHasForcedColors": true,
    "cssTextHasButtonText": true,
    "cssTextHasPrimary": true,
    "cssTextHasScale": true,
    "unknownWrapper": null,
    "rootTag": "BUTTON",
    "rootClass": "root",
    "buttonType": "submit",
    "innerIconTag": "P-ICON",
    "innerIsLitIcon": false,
    "backgroundMatch": true,
    "colorMatch": true,
    "hostDisplay": "inline-block"
  },
  "secondary": { "backgroundMatch": true },
  "destructive": { "cssHasError": true, "backgroundMatch": true },
  "loading": {
    "spinnerTag": "P-SPINNER",
    "iconOpacity": "0",
    "labelOpacity": "0",
    "loadingText": "Loading"
  },
  "disabled": { "ariaDisabled": "true", "opacity": "0.4" },
  "at999": { "labelOverflow": "hidden", "cssHasMedia": true },
  "at1000": { "labelOverflow": "visible" },
  "failures": []
}
```

`node harness/pixel-diff-button.mjs`, exit 0:

```json
{
  "swap": { "swapped": 21, "litRendered": 21, "fragment": false, "innerLitIcon": false },
  "controlStencilVsBaseline": { "aSize": "460x1640", "strictMismatch": 0, "totalPixels": 754400 },
  "litVsBaseline": { "aSize": "460x1640", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 754400 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_button_before.png`
- `/opt/cursor/artifacts/mitosis_lit_button_after.png`
- `/opt/cursor/artifacts/button_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_button_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-button.md`

## Follow-ups

- Mitosis Lit does not emit `delegatesFocus` or `formAssociated`. Form submit/reset and focus delegation are untested here.
- Loading and disabled hosts sit below the 900px crop. They passed the file harness, not the card screenshot.
