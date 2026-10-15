# Migrate p-icon to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     08358c76a2 (source, bundle; baseline and this report land on top)
TAG      p-icon only. LIT_TAG lit-icon. packages/components untouched.

## Verdict

`Icon.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=icon` swapped in-card to `lit-icon` diffs 0 of 754,400 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop the visible `[data-card="icon"]` intersection with the viewport.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Crest, Wordmark, Flag, ModelSignature, and Divider sources were not rewritten.

- `src/Icon.lite.tsx` mirrors `p-icon`. `useMetadata({ tagName: 'lit-icon' })`. Static `:host` / `:host([hidden])` in `useStyle`. Size, color, name, and source-dependent `img` rules live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />`. That is the `attachComponentCss` analog. Width and height use `var(--p-icon-size,var(--p-leading-normal))`. Font size uses `var(--p-typescale-*)` or `inherit`. Background uses `var(--p-icon-color,var(--p-color-…))` or `currentcolor`. Mask is `url("…") center/contain no-repeat` plus `-webkit-mask`. Forced-colors paints `CanvasText` on `img`. `m` is 1000px. JSON size attributes are parsed in the getter.
- Stencil's render is a void `<img>`. A JSX fragment is the only way to put `cssText` next to it. `harness/strip-icon-fragment.mjs` removes `<my-fragment>` from `output/lit/src/Icon.ts` after `mitosis build`. The committed `Icon.ts` has none. Shadow tree is `<style>` then `<img>`.
- CDN src is `http://localhost:3001/icons/` plus the live hashes for `car` and `arrow-right`. `source` that contains `/` (including the playground data URI) is used as-is. `aria` is parsed so `{'aria-label': 'Car'}` becomes the img `alt`. Flippable names emit `img:dir(rtl){transform:scaleX(-1)}` when `source` is empty.
- `harness/verify-icon.mjs` and `harness/pixel-diff-icon.mjs` retarget the flag scripts. Capture script `.audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-icon-baseline.mjs` keeps 1440x900 and dsf 2.
- Generated `output/lit/src/Icon.ts` and `harness/lit-icon.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. Generated file is not hand-edited except the fragment strip the recipe allows.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
node harness/strip-flag-fragment.mjs
node harness/strip-model-signature-fragment.mjs
node harness/strip-icon-fragment.mjs
rg my-fragment output/lit/src/Icon.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Icon.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-icon.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-icon-baseline.mjs
node harness/verify-icon.mjs            # exit 0, failures: []
node harness/pixel-diff-icon.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `Icon.ts` has none.

## Live verification

`node harness/verify-icon.mjs`, exit 0:

```json
{
  "live": {
    "isDefined": true,
    "hasShadowRoot": true,
    "dynamicStyleTag": true,
    "cssTextHasImg": true,
    "cssTextHasTypescale": true,
    "cssTextHasMask": true,
    "cssTextHasForcedColors": true,
    "cssTextHasCanvasText": true,
    "cssTextHasMedia": true,
    "adoptedSheets": 1,
    "unknownWrapper": null,
    "imgSrc": "http://localhost:3001/icons/car.35229c9.svg",
    "imgAlt": "Car",
    "fontSize": "16px",
    "fontSizeRef": "16px",
    "fontSizeMatch": true,
    "background": "rgb(1, 2, 5)",
    "backgroundRef": "rgb(1, 2, 5)",
    "backgroundMatch": true,
    "hostDisplay": "inline-flex",
    "hostSize": { "w": 23.953125, "h": 23.953125 }
  },
  "xl": { "h": 112.328125 },
  "cssvar": { "h": "99px" },
  "hidden": "none",
  "source": { "srcIsData": true, "cssHasData": true, "cssHasLg": true },
  "attrChange": { "afterHas5xl": true },
  "at999": { "fontSize": "16px" },
  "at1000": { "fontSize": "71.84px" },
  "consoleErrors": [],
  "failures": []
}
```

Font-size and background are asserted equal to reference elements using `var(--p-typescale-sm)` and `var(--p-color-primary)` on the same page, not hardcoded px/rgba. Breakpoint size `{"base":"sm","m":"5xl"}` stays sm at 999 and flips at 1000.

## Pixel diff

`node harness/pixel-diff-icon.mjs`, live JSON:

```json
{
  "swap": { "swapped": 15, "litRendered": 15, "fragment": false },
  "controlStencilVsBaseline": {
    "aSize": "460x1640", "bSize": "460x1640",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 754400
  },
  "litVsBaseline": {
    "aSize": "460x1640", "bSize": "460x1640",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 754400,
    "diffPng": "/opt/cursor/artifacts/icon_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_icon_before.png`
- `/opt/cursor/artifacts/mitosis_lit_icon_after.png`
- `/opt/cursor/artifacts/icon_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_icon_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including mask URL, breakpoint media queries, and forced-colors. Void `img` needed a fragment plus the post-build strip. After strip, no `my-fragment`.
- Breakpoint props. Expressible. JSON size parsed in the getter, compiled to `@media(min-width:1000px)`, flip verified at 999 vs 1000.

## Follow-ups

1. `ICONS_MANIFEST` in this probe is only `car` and `arrow-right`. Other names fall back to `arrow-right`. A real package would import the full manifest.
2. CDN URLs are hardcoded to the staging playground (`http://localhost:3001`). Production `getCDNBaseURL()` is a rollup replace.
3. JSS was hand-mirrored from the icon-styles snapshot. No `getCss` port.
4. The card is 1040px tall in a 900px viewport. Capture uses `page.screenshot` clipped to the visible card (820 CSS px). The last few hosts (deeppink, data-URI source) sit below the fold. Viewport stayed 1440x900, dsf 2.
5. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. Icon.ts is clean. Do not treat the divider leak as this unit's fail.

## Deviations

- Tag is `lit-icon` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `Icon.ts`, not the whole `output/lit` tree, because that tree still contains the divider probe.
- Screenshot path is `page.screenshot({ clip })` of the visible card, not `locator.screenshot()`, because the card overflows the required 900px viewport.
