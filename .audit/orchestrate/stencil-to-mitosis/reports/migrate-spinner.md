# Migrate p-spinner to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     d491d1448e (source, bundle; baseline and this report land on top)
TAG      p-spinner only. LIT_TAG lit-spinner. packages/components untouched.

## Verdict

`Spinner.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=spinner` swapped in-card to `lit-spinner` diffs 0 of 754,400 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop the visible `[data-card="spinner"]` intersection with the viewport.

Animation is paused on both sides with the same `--p-animation-duration: 0s` on `document.documentElement` before the Stencil baseline, the control shot, and the Lit after. That is the playground's own animation-none knob. Neither side was paused alone.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Display and earlier sources were not rewritten.

- `src/Spinner.lite.tsx` mirrors `p-spinner`. `useMetadata({ tagName: 'lit-spinner' })`. Static `:host` / `:host([hidden])` in `useStyle` (`inline-flex`, `vertical-align: top`). Color and size live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />` inside the single root `<div role="alert">`. That is the `attachComponentCss` analog. Width/height use `var(--p-spinner-size,var(--p-leading-normal))`. Font-size uses `var(--p-typescale-*)` or `inherit`. Stroke uses `var(--p-spinner-color,…)` / `var(--p-spinner-track-color,…)` with `var(--p-color-primary)` or `currentcolor`. Staging stroke-dasharray is `var(--p-temporary-spinner-stroke-dasharray,69)` to match the live playground sheet. Keyframes `rotate` and `dash` sit in `cssText` with the animation rules. Forced-colors uses `CanvasText` / `none !important`. oklch track uses `oklch(from var(--p-spinner-color,COLOR) l c h/.2)`. Default size is `sm`. `m` is 1000px. JSON size attributes are parsed in the getter. `aria` JSON is parsed into `aria-label` on the alert div.
- Stencil's render is one `div` wrapping `span.sr-only` and an SVG with two circles. No nested PDS tags. No JSX fragment. `rg my-fragment output/lit/src/Spinner.ts` is empty.
- Mitosis drops `class="sr-only"`, drops the nbsp, and pretty-prints the template. `harness/strip-spinner-whitespace.mjs` restores the compact Stencil shadow tree after `mitosis build`.
- Pixel-diff copies attributes (and any light-DOM children) onto `lit-spinner`. The card hosts are empty of light-DOM text.
- `harness/verify-spinner.mjs` and `harness/pixel-diff-spinner.mjs` retarget the display scripts. Capture script `.audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-spinner-baseline.mjs` keeps 1440x900 and dsf 2 and applies the same animation pause. `build:spinner` re-strips Flag/Icon/Heading/Text/Display so accepted units stay clean, then uses the repo-root esbuild.
- Generated `output/lit/src/Spinner.ts` and `harness/lit-spinner.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. Generated file is not hand-edited except the whitespace compact.

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
rg my-fragment output/lit/src/Spinner.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Spinner.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-spinner.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-spinner-baseline.mjs
node harness/verify-spinner.mjs            # exit 0, failures: []
node harness/pixel-diff-spinner.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `Spinner.ts` has none.

## Live verification

`node harness/verify-spinner.mjs`, exit 0:

```json
{
  "live": {
    "isDefined": true,
    "hasShadowRoot": true,
    "dynamicStyleTag": true,
    "cssTextHasRoot": true,
    "cssTextHasTypescale": true,
    "cssTextHasKeyframes": true,
    "cssTextHasForcedColors": true,
    "cssTextHasCanvasText": true,
    "cssTextHasOklch": true,
    "cssTextHasMedia": true,
    "adoptedSheets": 1,
    "unknownWrapper": null,
    "rootTag": "DIV",
    "role": "alert",
    "ariaLive": "assertive",
    "ariaLabel": "Loading page content",
    "circleCount": 2,
    "svgViewBox": "-16 -16 32 32",
    "fontSize": "16px",
    "fontSizeRef": "16px",
    "fontSizeMatch": true,
    "stroke": "rgb(1, 2, 5)",
    "strokeRef": "rgb(1, 2, 5)",
    "strokeMatch": true,
    "hostDisplay": "inline-flex"
  },
  "xl": { "h": 112.328125 },
  "inherit": { "cssHasInherit": true, "cssHasCurrentcolor": true },
  "cssvar": { "h": "99px" },
  "hidden": "none",
  "attrChange": { "afterHas5xl": true },
  "at999": { "fontSize": "16px" },
  "at1000": { "fontSize": "71.84px" },
  "consoleErrors": [],
  "failures": []
}
```

Font-size and stroke are asserted equal to reference elements using `var(--p-typescale-sm)` and `var(--p-color-primary)` on the same page, not hardcoded px/rgba. Breakpoint size `{"base":"sm","m":"5xl"}` stays sm at 999 and flips at 1000.

## Pixel diff

`node harness/pixel-diff-spinner.mjs`, live JSON:

```json
{
  "swap": { "swapped": 14, "litRendered": 14, "fragment": false },
  "controlStencilVsBaseline": {
    "aSize": "460x1640", "bSize": "460x1640",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 754400
  },
  "litVsBaseline": {
    "aSize": "460x1640", "bSize": "460x1640",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 754400,
    "diffPng": "/opt/cursor/artifacts/spinner_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift after the shared pause. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_spinner_before.png`
- `/opt/cursor/artifacts/mitosis_lit_spinner_after.png`
- `/opt/cursor/artifacts/spinner_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_spinner_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including breakpoint media queries, forced-colors, and `@supports` oklch. SVG animations live in that same sheet.
- Breakpoint props. Expressible. JSON size parsed in the getter, compiled to `@media(min-width:1000px)`, flip verified at 999 vs 1000.

## Follow-ups

1. JSS was hand-mirrored from the live playground sheet and the spinner-styles snapshot. No `getCss` port.
2. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. Spinner.ts is clean. Do not treat the divider leak as this unit's fail.
3. The card is 992 CSS px tall. The clip is the visible intersection with the 900px viewport, same as prior overflowing cards.

## Deviations

- Tag is `lit-spinner` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `Spinner.ts`, not the whole `output/lit` tree, because that tree still contains the divider probe.
- Screenshot path is `page.screenshot({ clip })` of the visible card. Viewport stayed 1440x900, dsf 2.
- Animation is paused on both sides with `--p-animation-duration: 0s`. The playground default is `animated`; two live frames would otherwise differ.
- `build:spinner` calls `/workspace/node_modules/.bin/esbuild`. The workspace `esbuild` on PATH rejects `--alias`.
