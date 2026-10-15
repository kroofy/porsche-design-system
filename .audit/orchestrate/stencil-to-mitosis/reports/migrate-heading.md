# Migrate p-heading to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     c7c75499e8 (source, bundle; baseline and this report land on top)
TAG      p-heading only. LIT_TAG lit-heading. packages/components untouched.

## Verdict

`Heading.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=heading` swapped in-card to `lit-heading` diffs 0 of 754,400 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop the visible `[data-card="heading"]` intersection with the viewport.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Icon, ModelSignature, Flag, Crest, Wordmark, and Divider sources were not rewritten.

- `src/Heading.lite.tsx` mirrors `p-heading`. `useMetadata({ tagName: 'lit-heading' })`. Static `:host` / `:host([hidden])` in `useStyle`. Size, weight, align, color, hyphens, and ellipsis live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />` inside the single root `<h2>`. That is the `attachComponentCss` analog. Font shorthand is `var(--p-font-weight-*) var(--p-typescale-2xl)/var(--p-leading-normal) var(--p-font-porsche-next)`. Font-size uses `var(--p-typescale-*)` or `inherit`. Color uses `var(--p-color-*)` or `currentcolor`. `::slotted(:is(h1,h2,h3,h4,h5,h6)){all:unset}` matches the snapshot. `m` is 1000px. JSON size attributes are parsed in the getter.
- Stencil's render is `<TagType class="root"><slot /></TagType>`. Mitosis has no dynamic tag and drops `class="root"`. The probe always emits `<h2>` and puts the snapshot `.root` rules on `h2`. `all: unset` then the same font-size/color tokens made h2 vs inferred h3–h6 pixel-identical on the card. No JSX fragment. `rg my-fragment output/lit/src/Heading.ts` is empty.
- Mitosis pretty-prints a space between `<style>` and `<slot>` inside the heading, which would be a visible text node. `harness/strip-heading-whitespace.mjs` compacts the render template after `mitosis build`. The committed `Heading.ts` is `<h2><style></style><slot></slot></h2>`.
- Pixel-diff copies light-DOM children onto `lit-heading` when swapping, so the default slot still gets `ABC` and the italic/bold fixture.
- `harness/verify-heading.mjs` and `harness/pixel-diff-heading.mjs` retarget the icon scripts. Capture script `.audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-heading-baseline.mjs` keeps 1440x900 and dsf 2.
- Generated `output/lit/src/Heading.ts` and `harness/lit-heading.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. Generated file is not hand-edited except the whitespace compact.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
node harness/strip-flag-fragment.mjs
node harness/strip-model-signature-fragment.mjs
node harness/strip-icon-fragment.mjs
node harness/strip-heading-whitespace.mjs
rg my-fragment output/lit/src/Heading.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Heading.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-heading.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-heading-baseline.mjs
node harness/verify-heading.mjs            # exit 0, failures: []
node harness/pixel-diff-heading.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `Heading.ts` has none.

## Live verification

`node harness/verify-heading.mjs`, exit 0:

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
    "rootTag": "H2",
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

Font-size and color are asserted equal to reference elements using `var(--p-typescale-sm)` and `var(--p-color-primary)` on the same page, not hardcoded px/rgba. Breakpoint size `{"base":"sm","m":"5xl"}` stays sm at 999 and flips at 1000.

## Pixel diff

`node harness/pixel-diff-heading.mjs`, live JSON:

```json
{
  "swap": { "swapped": 12, "litRendered": 12, "fragment": false },
  "controlStencilVsBaseline": {
    "aSize": "460x1640", "bSize": "460x1640",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 754400
  },
  "litVsBaseline": {
    "aSize": "460x1640", "bSize": "460x1640",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 754400,
    "diffPng": "/opt/cursor/artifacts/heading_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_heading_before.png`
- `/opt/cursor/artifacts/mitosis_lit_heading_after.png`
- `/opt/cursor/artifacts/heading_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_heading_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including breakpoint media queries. Slot lives inside the heading root, so no fragment.
- Breakpoint props. Expressible. JSON size parsed in the getter, compiled to `@media(min-width:1000px)`, flip verified at 999 vs 1000.

## Follow-ups

1. Semantic tag is always `h2`. Stencil infers h2–h6 via `getHeadingTagType`. A real port needs a dynamic tag (or Mitosis support for it). Visual match held because `.root` / `h2` both `all: unset` then the same tokens.
2. `hasSpecificDirectChildTag` (slot a heading, wrap with `div`) is not implemented. The playground card does not use that path.
3. JSS was hand-mirrored from the heading-styles snapshot. No `getCss` port.
4. The card is 924px tall in a 900px viewport. Capture uses `page.screenshot` clipped to the visible card (820 CSS px). The last fixture is partly below the fold. Viewport stayed 1440x900, dsf 2.
5. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. Heading.ts is clean. Do not treat the divider leak as this unit's fail.

## Deviations

- Tag is `lit-heading` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `Heading.ts`, not the whole `output/lit` tree, because that tree still contains the divider probe.
- Screenshot path is `page.screenshot({ clip })` of the visible card, not `locator.screenshot()`, because the card overflows the required 900px viewport.
- Swap copies light-DOM children onto the Lit host. Attribute-only swap would drop the slot text.
