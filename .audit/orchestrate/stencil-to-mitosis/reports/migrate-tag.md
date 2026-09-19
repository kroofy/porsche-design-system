# Migrate p-tag to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     f073901dd6 (source, bundle; baseline and this report land on top)
TAG      p-tag only. LIT_TAG lit-tag. packages/components untouched.

## Verdict

`Tag.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=tag` swapped in-card to `lit-tag` diffs 0 of 477,480 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop the visible `[data-card="tag"]` intersection with the viewport.

Inner icons stay `p-icon` (the live Stencil custom element). They were not swapped to `lit-icon`.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Spinner and earlier sources were not rewritten.

- `src/Tag.lite.tsx` mirrors `p-tag`. `useMetadata({ tagName: 'lit-tag' })`. Static `:host` / `:host([hidden])` in `useStyle` (`inline-flex`, `vertical-align: top`, `white-space: nowrap`). Variant, compact, icon, and iconSource live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />` inside the single root `<span>`. That is the `attachComponentCss` analog. Colors use `var(--p-color-*)` (primary/secondary/info/success/warning/error and frosted pairs). Frosted variants add `var(--p-blur-frosted)`. Compact switches padding/radius tokens. Slotted `a`/`button` reset matches the snapshot (`all: unset !important` plus underline and a `::before` hit area). Forced-colors uses `Canvas` / `CanvasText` / `Highlight`. Hover background is in `@media(hover:hover)` and does not affect the static screenshot.
- Stencil's render is `<span>{hasIcon && <p-icon class="icon" … />}<slot /></span>`. The probe always emits `<p-icon>` in the Lit shadow and hides it with `p-icon{display:none}` when there is no icon and no `icon-source`. No JSX fragment. `rg my-fragment output/lit/src/Tag.ts` is empty.
- Mitosis pretty-prints the template and drops compactness. `harness/strip-tag-whitespace.mjs` restores a single-line shadow tree, reads `icon-source` as well as `iconSource`, and omits empty `name`/`source` via Lit `nothing` so the icon-source-only host does not trip `p-icon`'s name validator.
- Pixel-diff copies attributes **and** light-DOM children onto `lit-tag`. Attribute-only swap would drop the slotted `<button>` / label. `icon-source` is also copied to `iconsource` / `iconSource` for Lit's default attribute mapping.
- `p-tag` has no breakpoint props. The 999/1000 flip is N/A. Dead-end criterion 3 does not apply.
- Generated `output/lit/src/Tag.ts` and `harness/lit-tag.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. `build:tag` re-strips prior units so accepted files stay clean, then uses the repo-root esbuild.

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
rg my-fragment output/lit/src/Tag.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Tag.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-tag.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-tag-baseline.mjs
node harness/verify-tag.mjs            # exit 0, failures: []
node harness/pixel-diff-tag.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `Tag.ts` has none.

## Live verification

`node harness/verify-tag.mjs`, exit 0:

```json
{
  "live": {
    "isDefined": true,
    "hasShadowRoot": true,
    "dynamicStyleTag": true,
    "cssTextHasSpan": true,
    "cssTextHasSlotted": true,
    "cssTextHasForcedColors": true,
    "cssTextHasCanvasText": true,
    "cssTextHasPrimaryBg": true,
    "cssTextHasIcon": true,
    "unknownWrapper": null,
    "rootTag": "SPAN",
    "innerIconTag": "P-ICON",
    "innerIsLitIcon": false,
    "iconName": "car",
    "hasSlot": true,
    "assignedButton": true,
    "background": "rgb(1, 2, 5)",
    "backgroundRef": "rgb(1, 2, 5)",
    "backgroundMatch": true,
    "color": "rgb(255, 255, 255)",
    "colorMatch": true,
    "hostDisplay": "inline-flex"
  },
  "secondary": { "cssHasFrostedStrong": true, "cssHasBlur": true },
  "noicon": { "cssHidesIcon": true, "iconDisplay": "none" },
  "compact": { "cssHasCompactPad": true },
  "hidden": "none",
  "attrChange": { "afterHasError": true },
  "consoleErrors": [],
  "failures": []
}
```

Background and color are asserted equal to reference elements using `var(--p-color-primary)` and `var(--p-color-canvas)` on the same page, not hardcoded rgba.

## Pixel diff

`node harness/pixel-diff-tag.mjs`, live JSON:

```json
{
  "swap": { "swapped": 11, "litRendered": 11, "fragment": false, "innerLitIcon": false },
  "controlStencilVsBaseline": {
    "aSize": "460x1038", "bSize": "460x1038",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 477480
  },
  "litVsBaseline": {
    "aSize": "460x1038", "bSize": "460x1038",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 477480,
    "diffPng": "/opt/cursor/artifacts/tag_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_tag_before.png`
- `/opt/cursor/artifacts/mitosis_lit_tag_after.png`
- `/opt/cursor/artifacts/tag_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tag_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including hover media and forced-colors. Slot and `p-icon` live inside the `span` root, so no fragment.
- Breakpoint props. N/A. `p-tag` has no breakpoint-customizable props.

## Follow-ups

1. Semantic `hasIcon` still always mounts a `p-icon` node and hides it with CSS when unused. Stencil omits the node.
2. Hover styles are always emitted. Stencil only emits them when a direct `a`/`button` child exists. Static pixel-diff does not hover.
3. The last playground host points `icon-source` at `http://localhost:3002/icon-custom-kaixin.svg`. That host is down here. Both sides fail the fetch the same way. Pixel-diff ignores that `ERR_CONNECTION_REFUSED`.
4. JSS was hand-mirrored from the live playground sheet and the tag-styles snapshot. No `getCss` port.
5. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. Tag.ts is clean.

## Deviations

- Tag is `lit-tag` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `Tag.ts`, not the whole `output/lit` tree.
- Screenshot path is `page.screenshot({ clip })` of the visible card. The card is 519 CSS px tall and fits the 900px viewport. Viewport stayed 1440x900, dsf 2.
- Swap copies light-DOM children onto the Lit host.
- `build:tag` calls `/workspace/node_modules/.bin/esbuild`. The workspace `esbuild` on PATH rejects `--alias`.
