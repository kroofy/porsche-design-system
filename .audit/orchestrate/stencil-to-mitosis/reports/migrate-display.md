# Migrate p-display to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     0a231395bc (source, bundle; baseline and this report land on top)
TAG      p-display only. LIT_TAG lit-display. packages/components untouched.

## Verdict

`Display.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=display` swapped in-card to `lit-display` diffs 0 of 402,040 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop the visible `[data-card="display"]` intersection with the viewport.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Text, Heading, and earlier sources were not rewritten.

- `src/Display.lite.tsx` mirrors `p-display`. `useMetadata({ tagName: 'lit-display' })`. Static `:host` / `:host([hidden])` in `useStyle`. Size, align, color, and ellipsis live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />` inside the single root `<h3>`. That is the `attachComponentCss` analog. Font shorthand is `var(--p-font-weight-normal) var(--p-typescale-5xl)/var(--p-leading-normal) var(--p-font-porsche-next)`. Font-size uses `var(--p-typescale-3xl|4xl|5xl)` for small/medium/large, or `inherit`. Color uses `var(--p-color-primary)` or `currentcolor`. Default size is `large`. `::slotted(:is(h1,h2,h3,h4,h5,h6)){all:unset!important}` matches the snapshot. No weight or hyphens. `m` is 1000px. JSON size attributes are parsed in the getter.
- Stencil's render is `<TagType class="root"><slot /></TagType>` via `getDisplayTagType`. Mitosis has no dynamic tag and drops `class="root"`. The probe always emits `<h3>` and puts the snapshot `.root` rules on `h3`. The playground card sets `tag="h3"` on every host, so that matches. No JSX fragment. `rg my-fragment output/lit/src/Display.ts` is empty.
- Mitosis pretty-prints a space between `<style>` and `<slot>` inside the heading, which would be a visible text node. `harness/strip-display-whitespace.mjs` compacts the render template after `mitosis build`. The committed `Display.ts` is `<h3><style></style><slot></slot></h3>`.
- Pixel-diff copies light-DOM children onto `lit-display` when swapping, so the default slot still gets `ABC`.
- `harness/verify-display.mjs` and `harness/pixel-diff-display.mjs` retarget the heading/text scripts. Capture script `.audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-display-baseline.mjs` keeps 1440x900 and dsf 2. `build:display` re-strips Flag/Icon/Heading/Text so accepted units stay clean, then uses the repo-root esbuild (workspace `esbuild` rejects `--alias`).
- Generated `output/lit/src/Display.ts` and `harness/lit-display.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. Generated file is not hand-edited except the whitespace compact.

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
rg my-fragment output/lit/src/Display.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Display.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-display.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-display-baseline.mjs
node harness/verify-display.mjs            # exit 0, failures: []
node harness/pixel-diff-display.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `Display.ts` has none.

## Live verification

`node harness/verify-display.mjs`, exit 0:

```json
{
  "live": {
    "isDefined": true,
    "hasShadowRoot": true,
    "dynamicStyleTag": true,
    "cssTextHasRoot": true,
    "cssTextHasTypescale": true,
    "cssTextHasSlotted": true,
    "cssTextHasMedia": true,
    "adoptedSheets": 1,
    "unknownWrapper": null,
    "rootTag": "H3",
    "hasSlot": true,
    "assigned": 1,
    "fontSize": "55.824px",
    "fontSizeRef": "55.824px",
    "fontSizeMatch": true,
    "color": "rgb(1, 2, 5)",
    "colorRef": "rgb(1, 2, 5)",
    "colorMatch": true,
    "hostDisplay": "block"
  },
  "xl": { "h": 112.34375, "fontSize": "94.72px" },
  "inherit": { "cssHasInherit": true, "cssHasCurrentcolor": true },
  "hidden": "none",
  "rich": { "hasItalic": true, "hasBold": true },
  "attrChange": { "afterHas5xl": true },
  "at999": { "fontSize": "45.1959px" },
  "at1000": { "fontSize": "71.84px" },
  "consoleErrors": [],
  "failures": []
}
```

Font-size and color are asserted equal to reference elements using `var(--p-typescale-3xl)` and `var(--p-color-primary)` on the same page, not hardcoded px/rgba. Breakpoint size `{"base":"small","m":"large"}` stays small at 999 and flips at 1000.

## Pixel diff

`node harness/pixel-diff-display.mjs`, live JSON:

```json
{
  "swap": { "swapped": 4, "litRendered": 4, "fragment": false },
  "controlStencilVsBaseline": {
    "aSize": "460x874", "bSize": "460x874",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 402040
  },
  "litVsBaseline": {
    "aSize": "460x874", "bSize": "460x874",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 402040,
    "diffPng": "/opt/cursor/artifacts/display_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_display_before.png`
- `/opt/cursor/artifacts/mitosis_lit_display_after.png`
- `/opt/cursor/artifacts/display_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_display_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including breakpoint media queries. Slot lives inside the `h3` root, so no fragment.
- Breakpoint props. Expressible. JSON size parsed in the getter, compiled to `@media(min-width:1000px)`, flip verified at 999 vs 1000.

## Follow-ups

1. Semantic tag is always `h3`. Stencil's `tag` prop and `hasSpecificDirectChildTag` (wrap with `div`) and size-inferred h1/h2 are not implemented. The playground card always sets `tag="h3"`.
2. JSS was hand-mirrored from the display-styles snapshot. No `getCss` port.
3. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. Display.ts is clean. Do not treat the divider leak as this unit's fail.
4. `p-display` is deprecated (`warnIfDeprecatedComponentIsUsed`). The Stencil host still warns on the playground; pixel-diff only fails on `console` type `error`.

## Deviations

- Tag is `lit-display` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `Display.ts`, not the whole `output/lit` tree, because that tree still contains the divider probe.
- Screenshot path is `page.screenshot({ clip })` of the visible card. The card is 437 CSS px tall and fits the 900px viewport. Viewport stayed 1440x900, dsf 2.
- Swap copies light-DOM children onto the Lit host. Attribute-only swap would drop the slot text.
- `build:display` calls `/workspace/node_modules/.bin/esbuild`. The workspace `esbuild` on PATH rejects `--alias`.
