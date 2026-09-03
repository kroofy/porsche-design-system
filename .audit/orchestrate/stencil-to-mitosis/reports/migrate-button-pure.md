# Migrate p-button-pure to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     a7c26c632e (source, bundle; baseline and this report land on top)
TAG      p-button-pure only. LIT_TAG lit-button-pure. packages/components untouched.

## Verdict

`ButtonPure.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=button-pure` swapped in-card to `lit-button-pure` diffs 0 of 1,610,480 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop the visible `[data-card="button-pure"]` intersection with the viewport.

Inner icons stay `p-icon`. Loading indicators stay `p-spinner`. They were not swapped to `lit-icon` / `lit-spinner`.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Link and earlier sources were not rewritten.

- `src/ButtonPure.lite.tsx` mirrors `p-button-pure`. `useMetadata({ tagName: 'lit-button-pure' })`. Static `:host` transform and `:host([hidden])` in `useStyle`. Size, color, underline, active, stretch, hideLabel, alignLabel, icon, iconSource, disabled, and loading live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />` inside the single root `<button class="root">`. That is the `attachComponentCss` analog. Colors use `var(--p-color-*)` or `currentcolor`. Disabled overrides to `var(--p-color-contrast-low)` and `cursor: not-allowed`. Loading/disabled skip hover. Active paints `.root::before` with `var(--p-blur-frosted)` / `var(--p-color-frosted)`. Forced-colors uses `LinkText` / `ButtonText` / `Highlight`.
- Stencil's shadow is `<Host><button class="root">…</button><LoadingMessage /></Host>`. The probe keeps one real root (`button`) and mounts the sr-only `.loading` span inside it so there is no JSX fragment. Default type is `submit`. Default icon is `arrow-right`. The probe always emits `<p-icon>` and `<p-spinner>` and hides the unused one with `display:none`. No JSX fragment. `rg my-fragment output/lit/src/ButtonPure.ts` is empty.
- Mitosis pretty-prints the template and drops classes. `harness/strip-button-pure-whitespace.mjs` restores a single-line shadow tree, reads hyphenated `icon-source` / `align-label` / `hide-label`, omits empty `name`/`source`/`aria-disabled` via Lit `nothing`, and interpolates the loading status text.
- Pixel-diff copies attributes **and** light-DOM children onto `lit-button-pure`. Attribute-only swap would drop the slotted label. Host `class` is copied so `text-[48px]` / `text-[deeppink]` stay.
- Loading `p-spinner` animates. Capture and pixel-diff set `--p-animation-duration: 0s` on `documentElement` on both sides, same as the spinner unit.
- Size / stretch / hideLabel / alignLabel parse JSON when the string starts with `{`. `m` compiles to `@media(min-width:1000px)`. The card does not use breakpoint JSON. The file harness proves 999 vs 1000 (`sm` 16px → `5xl` 71.84px).
- Stencil sets `shadow: { delegatesFocus: true }` and `formAssociated: true`. Mitosis Lit does not emit those. Static pixel-diff does not focus or submit. Follow-up only.
- Generated `output/lit/src/ButtonPure.ts` and `harness/lit-button-pure.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. `build:button-pure` re-strips prior units so accepted files stay clean, then uses the repo-root esbuild.

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
rg my-fragment output/lit/src/ButtonPure.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/ButtonPure.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-button-pure.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-button-pure-baseline.mjs
node harness/verify-button-pure.mjs            # exit 0, failures: []
node harness/pixel-diff-button-pure.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `ButtonPure.ts` has none.

## Live verification

`node harness/verify-button-pure.mjs`, exit 0:

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
    "cssTextHasIcon": true,
    "unknownWrapper": null,
    "rootTag": "BUTTON",
    "rootClass": "root",
    "buttonType": "submit",
    "innerIconTag": "P-ICON",
    "innerIsLitIcon": false,
    "iconName": "arrow-right",
    "spinnerHidden": true,
    "colorMatch": true,
    "hostDisplay": "inline-block"
  },
  "active": { "cssHasFrosted": true, "cssHas5xl": true },
  "disabled": { "cssHasContrastLow": true, "cssHasNotAllowed": true, "cssHasNoHover": true, "ariaDisabled": "true", "colorMatch": true },
  "loading": { "cssHidesIcon": true, "spinnerTag": "P-SPINNER", "spinnerIsLit": false, "loadingText": "Loading" },
  "hideLabel": { "cssHasFullRadius": true },
  "hidden": "none",
  "attrChange": { "afterHasContrast": true },
  "at999": { "fontSize": "16px", "cssHasMedia": true, "cssHas5xl": true },
  "at1000": { "fontSize": "71.84px" },
  "consoleErrors": [],
  "failures": []
}
```

Color is asserted equal to a reference element using `var(--p-color-primary)` / `var(--p-color-contrast-low)` on the same page, not hardcoded rgba. Viewport 999 keeps `sm` (16px). Viewport 1000 applies `m` → `5xl`.

## Pixel diff

`node harness/pixel-diff-button-pure.mjs`, live JSON:

```json
{
  "swap": { "swapped": 19, "litRendered": 19, "fragment": false, "innerLitIcon": false },
  "controlStencilVsBaseline": {
    "aSize": "982x1640", "bSize": "982x1640",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 1610480
  },
  "litVsBaseline": {
    "aSize": "982x1640", "bSize": "982x1640",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 1610480,
    "diffPng": "/opt/cursor/artifacts/button_pure_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_button_pure_before.png`
- `/opt/cursor/artifacts/mitosis_lit_button_pure_after.png`
- `/opt/cursor/artifacts/button_pure_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_button_pure_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including hover media and forced-colors. Slot, `p-icon`, and `p-spinner` live inside the button root, so no fragment.
- Breakpoint props. Expressible. JSON `size='{"base":"sm","m":"5xl"}'` compiles to `@media(min-width:1000px)`. File harness flips 999 vs 1000. The playground card does not use `m`.

## Follow-ups

1. `delegatesFocus` and `formAssociated` are not set on the Lit host. Mitosis does not emit `shadowRootOptions` or ElementInternals. Static card swap does not focus or submit.
2. LoadingMessage lives inside the button instead of as a Host sibling. It is sr-only and does not affect pixels.
3. `p-icon` and `p-spinner` are always mounted; CSS hides the unused one. Stencil omits the unused node.
4. JSS was hand-mirrored from the snapshot. No `getCss` port.
5. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. ButtonPure.ts is clean.

## Deviations

- Tag is `lit-button-pure` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `ButtonPure.ts`, not the whole `output/lit` tree.
- Screenshot path is `page.screenshot({ clip })` of the visible card. The card is 1122 CSS px tall; clip height is 820 (viewport remainder). Viewport stayed 1440x900, dsf 2.
- Swap copies light-DOM children onto the Lit host.
- Loading spinners are paused with `--p-animation-duration: 0s` on both Stencil and Lit shots.
- `build:button-pure` calls `/workspace/node_modules/.bin/esbuild`. The workspace `esbuild` on PATH rejects `--alias`.
