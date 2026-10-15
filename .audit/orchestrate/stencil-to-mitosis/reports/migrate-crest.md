# Migrate p-crest to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     caa14448e0 (source, bundle, baseline; this report lands on top)
TAG      p-crest only. LIT_TAG lit-crest. packages/components untouched.

## Verdict

`Crest.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=crest` swapped in-card to `lit-crest` diffs 0 of 92,400 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="crest"]`.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Divider files were not rewritten.

- `src/Crest.lite.tsx` mirrors `p-crest`. `useMetadata({ tagName: 'lit-crest' })`. `:host` / `:host([hidden])` in `useStyle`. The rest of `getComponentCss()` in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />` inside the single root `<a>`. That is the `attachComponentCss` analog. Media queries and `@media (forced-colors: active)` stay real stylesheet rules.
- Root is `<a>`, which is what Stencil renders for the playground fixture (`<p-crest href="#">`). No JSX fragment, so no `<my-fragment>`.
- CDN srcsets are the live Stencil strings from `http://localhost:3001` (`CRESTS_MANIFEST` 1x/2x/3x webp then png, img src the 2x png).
- `harness/verify-crest.mjs` and `harness/pixel-diff-crest.mjs` retarget the divider scripts. Capture script `.audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-crest-baseline.mjs` keeps 1440x900 and dsf 2.
- Generated `output/lit/src/Crest.ts` and `harness/lit-crest.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. Generated file not edited.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
rg my-fragment output/lit/src/Crest.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Crest.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-crest.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-crest-baseline.mjs
node harness/verify-crest.mjs            # exit 0, failures: []
node harness/pixel-diff-crest.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `Crest.ts` has none.

## Live verification

`node harness/verify-crest.mjs`, exit 0:

```json
{
  "live": {
    "isDefined": true,
    "hasShadowRoot": true,
    "dynamicStyleTag": true,
    "cssTextHasForcedColors": true,
    "cssTextHasPicture": true,
    "adoptedSheets": 1,
    "unknownWrapper": null,
    "aHref": "#",
    "aTarget": "_self",
    "pictureCount": 1,
    "sourceTypes": ["image/webp", "image/png"],
    "imgSrc": "http://localhost:3001/crest/porsche-crest.8a292fb@2x.png",
    "imgAlt": "Porsche",
    "imgNatural": { "w": 30, "h": 40 },
    "hostDisplay": "inline-block",
    "hostSize": { "w": 30, "h": 40 }
  },
  "hidden": "none",
  "consoleErrors": [],
  "failures": []
}
```

Crest has no breakpoint prop. `m` is 1000px in tokens. Nothing here to flip at 999 vs 1000.

## Pixel diff

`node harness/pixel-diff-crest.mjs`, live JSON:

```json
{
  "swap": { "swapped": 1, "litRendered": 1, "fragment": false },
  "controlStencilVsBaseline": {
    "aSize": "462x200", "bSize": "462x200",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 92400
  },
  "litVsBaseline": {
    "aSize": "462x200", "bSize": "462x200",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 92400,
    "diffPng": "/opt/cursor/artifacts/crest_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_crest_before.png`
- `/opt/cursor/artifacts/mitosis_lit_crest_after.png`
- `/opt/cursor/artifacts/crest_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_crest_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including forced-colors. Crest CSS does not take props. The channel still exists.
- Breakpoint props. Not used by p-crest. Not a dead end for this tag.

## Follow-ups

1. Missing `href` still renders `<a>` because the playground fixture always has `href="#"`. Mitosis binds `.href=${this.href}`, so an unset prop becomes the string `"undefined"`. Stencil omits the anchor and leaves a bare `<picture>`. A later pass needs a real no-href branch without a fragment, or a generator fix.
2. `aria` and `delegatesFocus` were not ported. The card does not set `aria`. Pixel-diff is unfocused.
3. CDN URLs are hardcoded to the staging playground (`http://localhost:3001`). Production `getCDNBaseURL()` is a rollup replace. A real package would need that replace, not a string constant.
4. JSS was hand-mirrored from the crest-styles snapshot, same as divider. No `getCss` port.
5. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. Crest.ts is clean. Do not treat the divider leak as this unit's fail.

## Deviations

- Tag is `lit-crest` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `Crest.ts`, not the whole `output/lit` tree, because that tree still contains the divider probe.
