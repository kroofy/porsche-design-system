# Migrate p-tag-dismissible to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     f77c9670dc (source, bundle; baseline and this report land on top)
TAG      p-tag-dismissible only. LIT_TAG lit-tag-dismissible. packages/components untouched.

## Verdict

`TagDismissible.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=tag-dismissible` swapped in-card to `lit-tag-dismissible` diffs 0 of 170,200 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop the visible `[data-card="tag-dismissible"]` intersection with the viewport.

The close icon stays `p-icon` (the live Stencil custom element). It was not swapped to `lit-icon`.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Tag and earlier sources were not rewritten.

- `src/TagDismissible.lite.tsx` mirrors `p-tag-dismissible`. `useMetadata({ tagName: 'lit-tag-dismissible' })`. Static `:host` / `:host([hidden])` in `useStyle` (`inline-block`, `vertical-align: top`). Label, compact, and aria live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />` inside the single root `<button type="button">`. That is the `attachComponentCss` analog. Host scale is `:host{--_p-tag-dismissible-a:1}` or `0.64285714` when compact. Padding uses the snapshot calcs (`16.8px` with label, `28px + 6px` without). Colors use `var(--p-color-frosted)` / `var(--p-color-primary)` / `var(--p-color-contrast-high)`. Forced-colors uses `CanvasText` / `Highlight`. Hover only paints `.icon` and does not affect the static screenshot.
- Stencil's render is a button wrapping `span.sr-only`, a content span (optional `.label` + slot), and `span.icon > p-icon[name=close]`. The probe always emits the label span and hides it with `.label{display:none}` when `label` is empty, so the first playground host stays single-line. No JSX fragment. `rg my-fragment output/lit/src/TagDismissible.ts` is empty.
- Mitosis pretty-prints the template. `harness/strip-tag-dismissible-whitespace.mjs` restores a compact shadow tree and omits empty `aria-label` via Lit `nothing`.
- Pixel-diff copies attributes **and** light-DOM children onto `lit-tag-dismissible`. Attribute-only swap would drop the slotted "Some label".
- `p-tag-dismissible` has no breakpoint props. The 999/1000 flip is N/A. Dead-end criterion 3 does not apply.
- Stencil sets `shadow: { delegatesFocus: true }`. Mitosis Lit does not emit `shadowRootOptions`. Static pixel-diff does not focus. Follow-up only.
- Generated `output/lit/src/TagDismissible.ts` and `harness/lit-tag-dismissible.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. `build:tag-dismissible` re-strips prior units so accepted files stay clean, then uses the repo-root esbuild.

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
rg my-fragment output/lit/src/TagDismissible.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/TagDismissible.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-tag-dismissible.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-tag-dismissible-baseline.mjs
node harness/verify-tag-dismissible.mjs            # exit 0, failures: []
node harness/pixel-diff-tag-dismissible.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `TagDismissible.ts` has none.

## Live verification

`node harness/verify-tag-dismissible.mjs`, exit 0:

```json
{
  "live": {
    "isDefined": true,
    "hasShadowRoot": true,
    "dynamicStyleTag": true,
    "cssTextHasButton": true,
    "cssTextHasScale": true,
    "cssTextHasFrosted": true,
    "cssTextHasForcedColors": true,
    "cssTextHasCanvasText": true,
    "cssTextHasNoLabelPad": true,
    "unknownWrapper": null,
    "rootTag": "BUTTON",
    "buttonType": "button",
    "innerIconTag": "P-ICON",
    "innerIsLitIcon": false,
    "iconName": "close",
    "hasSlot": true,
    "labelHidden": true,
    "srOnly": "Remove:",
    "background": "rgba(175, 175, 182, 0.15)",
    "backgroundRef": "rgba(175, 175, 182, 0.15)",
    "backgroundMatch": true,
    "color": "rgb(1, 2, 5)",
    "colorMatch": true,
    "hostDisplay": "inline-block"
  },
  "withLabel": {
    "cssHasLabelPad": true,
    "labelText": "Some label",
    "labelDisplay": "block",
    "labelColorMatch": true
  },
  "compact": { "cssHasCompactScale": true, "cssHasLgRadius": true },
  "hidden": "none",
  "attrChange": { "afterHasLabelPad": true, "labelText": "Extra" },
  "consoleErrors": [],
  "failures": []
}
```

Background, text, and label color are asserted equal to reference elements using `var(--p-color-frosted)`, `var(--p-color-primary)`, and `var(--p-color-contrast-high)` on the same page, not hardcoded rgba.

## Pixel diff

`node harness/pixel-diff-tag-dismissible.mjs`, live JSON:

```json
{
  "swap": { "swapped": 2, "litRendered": 2, "fragment": false, "innerLitIcon": false },
  "controlStencilVsBaseline": {
    "aSize": "460x370", "bSize": "460x370",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 170200
  },
  "litVsBaseline": {
    "aSize": "460x370", "bSize": "460x370",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 170200,
    "diffPng": "/opt/cursor/artifacts/tag_dismissible_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_tag_dismissible_before.png`
- `/opt/cursor/artifacts/mitosis_lit_tag_dismissible_after.png`
- `/opt/cursor/artifacts/tag_dismissible_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tag_dismissible_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including hover media and forced-colors. Slot and `p-icon` live inside the button root, so no fragment.
- Breakpoint props. N/A. `p-tag-dismissible` has no breakpoint-customizable props.

## Follow-ups

1. `delegatesFocus` is not set on the Lit shadow root. Mitosis does not emit `shadowRootOptions`. Static card swap does not focus.
2. The optional `.label` node is always mounted and hidden with CSS when `label` is empty. Stencil omits the node.
3. JSS was hand-mirrored from the snapshot. No `getCss` port.
4. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. TagDismissible.ts is clean.

## Deviations

- Tag is `lit-tag-dismissible` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `TagDismissible.ts`, not the whole `output/lit` tree.
- Screenshot path is `page.screenshot({ clip })` of the visible card. The card is 185 CSS px tall and fits the 900px viewport. Viewport stayed 1440x900, dsf 2.
- Swap copies light-DOM children onto the Lit host.
- `build:tag-dismissible` calls `/workspace/node_modules/.bin/esbuild`. The workspace `esbuild` on PATH rejects `--alias`.
