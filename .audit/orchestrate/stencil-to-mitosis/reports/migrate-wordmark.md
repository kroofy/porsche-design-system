# Migrate p-wordmark to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     d4e4019792 (source, bundle; baseline and this report land on top)
TAG      p-wordmark only. LIT_TAG lit-wordmark. packages/components untouched.

## Verdict

`Wordmark.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=wordmark` swapped in-card to `lit-wordmark` diffs 0 of 68,376 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="wordmark"]`.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Crest and Divider sources were not rewritten.

- `src/Wordmark.lite.tsx` mirrors `p-wordmark`. `useMetadata({ tagName: 'lit-wordmark' })`. Static `:host` / `:host([hidden])` in `useStyle`. Size-dependent host height plus `a` / `svg` rules live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />` inside the single root `<a>`. That is the `attachComponentCss` analog. `@media (forced-colors: active)` and `@supports (height: round(down, 1px, 1px))` stay real stylesheet rules. Fill is `var(--p-color-primary)` with no fallback.
- Root is `<a>`, which is what Stencil renders for the playground fixture (`<p-wordmark class="w-full" href="#">`). Inline SVG (viewBox `0 0 4500 300`, title Porsche, path d copied from Stencil). No JSX fragment, so no `<my-fragment>`.
- `size` defaults to `small` in the getter. `inherit` drops the clamp height. Attributes arrive as strings; Lit's converter is not used.
- `harness/verify-wordmark.mjs` and `harness/pixel-diff-wordmark.mjs` retarget the crest scripts. Capture script `.audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-wordmark-baseline.mjs` keeps 1440x900 and dsf 2.
- Generated `output/lit/src/Wordmark.ts` and `harness/lit-wordmark.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. Generated file not edited.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
rg my-fragment output/lit/src/Wordmark.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Wordmark.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-wordmark.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-wordmark-baseline.mjs
node harness/verify-wordmark.mjs            # exit 0, failures: []
node harness/pixel-diff-wordmark.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `Wordmark.ts` has none.

## Live verification

`node harness/verify-wordmark.mjs`, exit 0:

```json
{
  "live": {
    "isDefined": true,
    "hasShadowRoot": true,
    "dynamicStyleTag": true,
    "cssTextHasForcedColors": true,
    "cssTextHasSvg": true,
    "cssTextHasHostHeight": true,
    "adoptedSheets": 1,
    "unknownWrapper": null,
    "aHref": "#",
    "aTarget": "_self",
    "svgViewBox": "0 0 4500 300",
    "titleText": "Porsche",
    "pathLength": 975,
    "fill": "rgb(1, 2, 5)",
    "fillRef": "rgb(1, 2, 5)",
    "fillMatch": true,
    "hostDisplay": "inline-block",
    "hostSize": { "w": 210, "h": 14 }
  },
  "inherit": {
    "cssTextHasHostHeight": false,
    "hostHeight": "24px"
  },
  "hidden": "none",
  "consoleErrors": [],
  "failures": []
}
```

Fill is asserted equal to a reference element using the same `var(--p-color-primary)` on the same page, not a hardcoded rgba. Wordmark has no breakpoint prop. `m` is 1000px in tokens. Nothing here to flip at 999 vs 1000.

## Pixel diff

`node harness/pixel-diff-wordmark.mjs`, live JSON:

```json
{
  "swap": { "swapped": 1, "litRendered": 1, "fragment": false },
  "controlStencilVsBaseline": {
    "aSize": "462x148", "bSize": "462x148",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 68376
  },
  "litVsBaseline": {
    "aSize": "462x148", "bSize": "462x148",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 68376,
    "diffPng": "/opt/cursor/artifacts/wordmark_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_wordmark_before.png`
- `/opt/cursor/artifacts/mitosis_lit_wordmark_after.png`
- `/opt/cursor/artifacts/wordmark_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_wordmark_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including size-dependent `:host` height, forced-colors, and the Safari round() `@supports` rule.
- Breakpoint props. Not used by p-wordmark. Not a dead end for this tag.

## Follow-ups

1. Missing `href` still renders `<a>` because the playground fixture always has `href="#"`. Mitosis binds `.href=${this.href}`, so an unset prop becomes the string `"undefined"`. Stencil omits the anchor and leaves a bare `<svg>`. A later pass needs a real no-href branch without a fragment, or a generator fix.
2. `aria` and `delegatesFocus` were not ported. The card does not set `aria`. Pixel-diff is unfocused.
3. JSS was hand-mirrored from the wordmark-styles snapshot, same as crest and divider. No `getCss` port.
4. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. Wordmark.ts is clean. Do not treat the divider leak as this unit's fail.

## Deviations

- Tag is `lit-wordmark` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `Wordmark.ts`, not the whole `output/lit` tree, because that tree still contains the divider probe.
