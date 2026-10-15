# Migrate p-text to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     c398913865 (source, bundle; baseline and this report land on top)
TAG      p-text only. LIT_TAG lit-text. packages/components untouched.

## Verdict

`Text.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=text` swapped in-card to `lit-text` diffs 0 of 744,280 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop the visible `[data-card="text"]` intersection with the viewport.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Heading and earlier sources were not rewritten.

- `src/Text.lite.tsx` mirrors `p-text`. `useMetadata({ tagName: 'lit-text' })`. Static `:host` / `:host([hidden])` in `useStyle`. Size, weight, align, color, hyphens, and ellipsis live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />` inside the single root `<p>`. That is the `attachComponentCss` analog. Font shorthand is `var(--p-font-weight-*) var(--p-typescale-sm)/var(--p-leading-normal) var(--p-font-porsche-next)`. Font-size uses `var(--p-typescale-*)` or `inherit`. Color uses `var(--p-color-*)` (including success/warning/error/info) or `currentcolor`. Default size is `sm`. Default hyphens is `inherit`. `::slotted(:is(p,span,div,address,blockquote,figcaption,cite,time,legend)){all:unset}` matches the snapshot. `m` is 1000px. JSON size attributes are parsed in the getter.
- Stencil's render is `<TagType class="root"><slot /></TagType>` with default tag `p`. The probe always emits `<p>` and puts the snapshot `.root` rules on `p`. Playground hosts do not set `tag`, so that matches. No JSX fragment. `rg my-fragment output/lit/src/Text.ts` is empty.
- Mitosis pretty-prints a space between `<style>` and `<slot>` inside the paragraph. `harness/strip-text-whitespace.mjs` compacts the render template after `mitosis build`. The committed `Text.ts` is `<p><style></style><slot></slot></p>`.
- Pixel-diff copies light-DOM children onto `lit-text` when swapping, so the default slot still gets `ABC` and the italic/bold fixture.
- `harness/verify-text.mjs` and `harness/pixel-diff-text.mjs` retarget the heading scripts. Capture script `.audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-text-baseline.mjs` keeps 1440x900 and dsf 2.
- Generated `output/lit/src/Text.ts` and `harness/lit-text.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. Generated file is not hand-edited except the whitespace compact.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
node harness/strip-flag-fragment.mjs
node harness/strip-model-signature-fragment.mjs
node harness/strip-icon-fragment.mjs
node harness/strip-heading-whitespace.mjs
node harness/strip-text-whitespace.mjs
rg my-fragment output/lit/src/Text.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Text.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-text.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-text-baseline.mjs
node harness/verify-text.mjs            # exit 0, failures: []
node harness/pixel-diff-text.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `Text.ts` has none.

## Live verification

`node harness/verify-text.mjs`, exit 0:

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
    "cssTextHasHyphensInherit": true,
    "adoptedSheets": 1,
    "unknownWrapper": null,
    "rootTag": "P",
    "hasSlot": true,
    "assigned": 1,
    "fontSize": "16px",
    "fontSizeRef": "16px",
    "fontSizeMatch": true,
    "color": "rgb(1, 2, 5)",
    "colorRef": "rgb(1, 2, 5)",
    "colorMatch": true,
    "hostDisplay": "block"
  },
  "xl": { "h": 112.34375, "fontSize": "94.72px" },
  "info": { "color": "rgb(26, 68, 234)", "match": true },
  "bold": { "cssHasBold": true, "fontWeight": "700" },
  "hidden": "none",
  "rich": { "hasItalic": true, "hasBold": true },
  "attrChange": { "afterHas5xl": true },
  "at999": { "fontSize": "16px" },
  "at1000": { "fontSize": "71.84px" },
  "consoleErrors": [],
  "failures": []
}
```

Font-size and color are asserted equal to reference elements using `var(--p-typescale-sm)`, `var(--p-color-primary)`, and `var(--p-color-info)` on the same page, not hardcoded px/rgba. Breakpoint size `{"base":"sm","m":"5xl"}` stays sm at 999 and flips at 1000.

## Pixel diff

`node harness/pixel-diff-text.mjs`, live JSON:

```json
{
  "swap": { "swapped": 12, "litRendered": 12, "fragment": false },
  "controlStencilVsBaseline": {
    "aSize": "460x1618", "bSize": "460x1618",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 744280
  },
  "litVsBaseline": {
    "aSize": "460x1618", "bSize": "460x1618",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 744280,
    "diffPng": "/opt/cursor/artifacts/text_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_text_before.png`
- `/opt/cursor/artifacts/mitosis_lit_text_after.png`
- `/opt/cursor/artifacts/text_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_text_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including breakpoint media queries. Slot lives inside the `p` root, so no fragment.
- Breakpoint props. Expressible. JSON size parsed in the getter, compiled to `@media(min-width:1000px)`, flip verified at 999 vs 1000.

## Follow-ups

1. Semantic tag is always `p`. Stencil's `tag` prop and `hasSpecificDirectChildTag` (wrap with `div`) are not implemented. The playground card does not use those paths.
2. JSS was hand-mirrored from the text-styles snapshot. No `getCss` port.
3. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. Text.ts is clean. Do not treat the divider leak as this unit's fail.

## Deviations

- Tag is `lit-text` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `Text.ts`, not the whole `output/lit` tree, because that tree still contains the divider probe.
- Screenshot path is `page.screenshot({ clip })` of the visible card. The card is 809 CSS px tall and fits the 900px viewport. Viewport stayed 1440x900, dsf 2.
- Swap copies light-DOM children onto the Lit host. Attribute-only swap would drop the slot text.
