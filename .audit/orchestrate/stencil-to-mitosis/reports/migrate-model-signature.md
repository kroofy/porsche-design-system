# Migrate p-model-signature to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     13521b838f (source, bundle; baseline and this report land on top)
TAG      p-model-signature only. LIT_TAG lit-model-signature. packages/components untouched.

## Verdict

`ModelSignature.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=model-signature` swapped in-card to `lit-model-signature` diffs 0 of 573,160 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop the visible `[data-card="model-signature"]` intersection with the viewport.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Crest, Wordmark, Flag, and Divider sources were not rewritten.

- `src/ModelSignature.lite.tsx` mirrors `p-model-signature`. `useMetadata({ tagName: 'lit-model-signature' })`. Static `:host` / `:host([hidden])` in `useStyle`. Prop-dependent `:host` mask, width, aspect-ratio, background, `::slotted`, `img`, and `@media(forced-colors:active)` live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />`. That is the `attachComponentCss` analog. Background uses `var(--p-model-signature-color,var(--p-color-…))` or `currentcolor`, matching the Stencil snapshot. No hardcoded rgba.
- Stencil's render is `<slot />` plus a void `<img>`. A JSX fragment is the only way to put `cssText` next to both. `harness/strip-model-signature-fragment.mjs` removes `<my-fragment>` from `output/lit/src/ModelSignature.ts` after `mitosis build`. The committed `ModelSignature.ts` has none. Shadow tree is `<style>`, `<slot>`, `<img>`.
- Manifest hashes and dimensions are inlined for the 13 playground models. CDN is `http://localhost:3001/model-signatures/`, same as Stencil's playground `ROLLUP_REPLACE_CDN_BASE_URL`. `safeZone` defaults true (aspect height 36). `size` `small` vs `inherit`. `color` maps to the four contrast tokens plus inherit.
- `harness/verify-model-signature.mjs` and `harness/pixel-diff-model-signature.mjs` retarget the flag scripts. Capture script `.audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-model-signature-baseline.mjs` keeps 1440x900 and dsf 2.
- Generated `output/lit/src/ModelSignature.ts` and `harness/lit-model-signature.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. Generated file is not hand-edited except the fragment strip the recipe allows.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
node harness/strip-flag-fragment.mjs
node harness/strip-model-signature-fragment.mjs
rg my-fragment output/lit/src/ModelSignature.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/ModelSignature.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-model-signature.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-model-signature-baseline.mjs
node harness/verify-model-signature.mjs            # exit 0, failures: []
node harness/pixel-diff-model-signature.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `ModelSignature.ts` has none.

## Live verification

`node harness/verify-model-signature.mjs`, exit 0:

```json
{
  "live": {
    "isDefined": true,
    "hasShadowRoot": true,
    "dynamicStyleTag": true,
    "cssTextHasMask": true,
    "cssTextHasForcedColors": true,
    "cssTextHasCanvasText": true,
    "adoptedSheets": 1,
    "unknownWrapper": null,
    "hasSlot": true,
    "imgSrc": "http://localhost:3001/model-signatures/911.b68f913.svg",
    "imgAlt": "911",
    "background": "rgb(1, 2, 5)",
    "backgroundRef": "rgb(1, 2, 5)",
    "backgroundMatch": true,
    "hostDisplay": "inline-block",
    "hostSize": { "w": 94, "h": 36 },
    "aspectRatio": "94 / 36"
  },
  "contrast": { "match": true },
  "noSafeZone": { "cssHasAspect": true, "height": 25 },
  "sizeInherit": { "cssHasAuto": true, "width": 200 },
  "hidden": "none",
  "slotted": { "assigned": 1, "tag": "IMG" },
  "attrChange": { "beforeHas911": true, "afterHasCayenne": true },
  "consoleErrors": [],
  "failures": []
}
```

Background is asserted equal to a reference element using `var(--p-color-primary)` / `var(--p-color-contrast-high)` on the same page, not a hardcoded rgba. `safeZone=false` flips aspect-ratio from `94 / 36` to `94 / 25`.

## Pixel diff

`node harness/pixel-diff-model-signature.mjs`, live JSON:

```json
{
  "swap": { "swapped": 13, "litRendered": 13, "fragment": false },
  "controlStencilVsBaseline": {
    "aSize": "460x1246", "bSize": "460x1246",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 573160
  },
  "litVsBaseline": {
    "aSize": "460x1246", "bSize": "460x1246",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 573160,
    "diffPng": "/opt/cursor/artifacts/model_signature_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_model_signature_before.png`
- `/opt/cursor/artifacts/mitosis_lit_model_signature_after.png`
- `/opt/cursor/artifacts/model_signature_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_model_signature_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including mask URL, aspect-ratio, color tokens, and forced-colors. Slot plus void `img` needed a fragment plus the post-build strip. After strip, no `my-fragment`.
- Breakpoint props. Not present on this tag. `size` is `'small' | 'inherit'`, not a JSON breakpoint map. No 999/1000 flip to prove.

## Follow-ups

1. Manifest is inlined for the 13 playground models. A real package would import `MODEL_SIGNATURES_MANIFEST`.
2. CDN URLs are hardcoded to the staging playground (`http://localhost:3001`). Production `getCDNBaseURL()` is a rollup replace.
3. JSS was hand-mirrored from the model-signature-styles snapshot. No `getCss` port.
4. Lit binds `.fetchpriority` and `.loading` as properties. `fetchPriority` on `HTMLImageElement` is camelCase `fetchPriority`. Harmless for the card (img is opacity 0). A real port should set the HTML attribute.
5. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. ModelSignature.ts is clean. Do not treat the divider leak as this unit's fail.

## Deviations

- Tag is `lit-model-signature` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `ModelSignature.ts`, not the whole `output/lit` tree, because that tree still contains the divider probe.
- Screenshot path is `page.screenshot({ clip })` of the visible card, same as flag. The card is 623 CSS px tall and fits the 900px viewport. Viewport stayed 1440x900, dsf 2.
