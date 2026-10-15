# Migrate p-link to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     4e5087b71a (source, bundle; baseline and this report land on top)
TAG      p-link only. LIT_TAG lit-link. packages/components untouched.

## Verdict

`Link.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=link` swapped in-card to `lit-link` diffs 0 of 540,040 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop the visible `[data-card="link"]` intersection with the viewport.

Inner icons stay `p-icon` (the live Stencil custom element). They were not swapped to `lit-icon`.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Link-pure and earlier sources were not rewritten. Leftover `Tag.ts` indent drift from the shared mitosis rebuild was restored and not committed.

- `src/Link.lite.tsx` mirrors `p-link`. `useMetadata({ tagName: 'lit-link' })`. Static `:host` / `:host([hidden])` in `useStyle` (`inline-block`, `vertical-align: top`). Variant, hideLabel, compact, icon, iconSource, and href live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />` inside the single root `<span class="root">`. That is the `attachComponentCss` analog. Host scale is `:host{--_p-link-a:1}` or `0.64285714` when compact. Padding, gap, and icon margin use the snapshot calcs (`28px` / `33.6px` / `11.2px` with `--_p-link-a`). Colors use `var(--p-link-bg,var(--p-color-primary))` / `var(--p-link-fg,var(--p-color-canvas))` for primary and `var(--p-color-frosted-strong)` / `var(--p-color-primary)` for secondary. Forced-colors uses `Canvas` / `LinkText` / `Highlight`. Hover only paints `.root:hover` and does not affect the static screenshot.
- Playground hosts all slot `<a href="#">Some label</a>` (no host `href`). Root stays a `span`. When `href` is set, cssText drops `::slotted(a)` and adds `.root:focus-visible`. Default icon is `none`. The probe always emits `<p-icon>` and hides it with `p-icon{display:none}` when there is no icon and no `icon-source`. No JSX fragment. `rg my-fragment output/lit/src/Link.ts` is empty.
- Mitosis pretty-prints the template and drops classes. `harness/strip-link-whitespace.mjs` restores a single-line shadow tree (`class="root"`, `class="icon"`, `class="label"`), reads hyphenated `icon-source` / `hide-label`, and omits empty `name`/`source` via Lit `nothing`.
- Pixel-diff copies attributes **and** light-DOM children onto `lit-link`. Attribute-only swap would drop the slotted `<a>`. Host `class` is copied so the themed CSS-variable host keeps `--p-link-bg` / `--p-link-fg` / `--p-link-radius` / `--p-link-gap` / `--p-link-px` / `--p-link-py`.
- hideLabel / compact parse JSON when the string starts with `{`. `m` compiles to `@media(min-width:1000px)`. The card does not use breakpoint JSON. The file harness proves 999 vs 1000 (`hide-label` absolute at 999 → static at 1000).
- Stencil sets `shadow: { delegatesFocus: true }`. Mitosis Lit does not emit `shadowRootOptions`. Static pixel-diff does not focus. Follow-up only.
- Generated `output/lit/src/Link.ts` and `harness/lit-link.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. `build:link` re-strips prior units so accepted files stay clean, then uses the repo-root esbuild.

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
node harness/strip-link-pure-whitespace.mjs
node harness/strip-link-whitespace.mjs
rg my-fragment output/lit/src/Link.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Link.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-link.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-link-baseline.mjs
node harness/verify-link.mjs            # exit 0, failures: []
node harness/pixel-diff-link.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `Link.ts` has none.

## Live verification

`node harness/verify-link.mjs`, exit 0:

```json
{
  "live": {
    "isDefined": true,
    "hasShadowRoot": true,
    "dynamicStyleTag": true,
    "cssTextHasRoot": true,
    "cssTextHasSlotted": true,
    "cssTextHasForcedColors": true,
    "cssTextHasLinkText": true,
    "cssTextHasPrimary": true,
    "cssTextHasScale": true,
    "unknownWrapper": null,
    "rootTag": "SPAN",
    "rootClass": "root",
    "innerIconTag": "P-ICON",
    "innerIsLitIcon": false,
    "iconHidden": true,
    "hasSlot": true,
    "assignedAnchor": true,
    "backgroundMatch": true,
    "colorMatch": true,
    "hostDisplay": "inline-block"
  },
  "secondary": { "cssHasFrostedStrong": true, "backgroundMatch": true },
  "withIcon": { "iconName": "car", "innerTag": "P-ICON" },
  "hideLabel": { "cssHasFullRadius": true, "labelPosition": "absolute" },
  "href": { "cssHasFocus": true, "cssHasNoSlotted": true },
  "hidden": "none",
  "attrChange": { "afterHasSecondary": true },
  "at999": { "labelPosition": "absolute", "cssHasMedia": true },
  "at1000": { "labelPosition": "static" },
  "consoleErrors": [],
  "failures": []
}
```

Background and text are asserted equal to reference elements using `var(--p-color-primary)`, `var(--p-color-canvas)`, and `var(--p-color-frosted-strong)` on the same page, not hardcoded rgba. Viewport 999 keeps hide-label (`absolute`). Viewport 1000 applies `m` → label `static`.

## Pixel diff

`node harness/pixel-diff-link.mjs`, live JSON:

```json
{
  "swap": { "swapped": 7, "litRendered": 7, "fragment": false, "innerLitIcon": false },
  "controlStencilVsBaseline": {
    "aSize": "460x1174", "bSize": "460x1174",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 540040
  },
  "litVsBaseline": {
    "aSize": "460x1174", "bSize": "460x1174",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 540040,
    "diffPng": "/opt/cursor/artifacts/link_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_link_before.png`
- `/opt/cursor/artifacts/mitosis_lit_link_after.png`
- `/opt/cursor/artifacts/link_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including hover media and forced-colors. Slot and `p-icon` live inside the span root, so no fragment.
- Breakpoint props. Expressible. JSON `hide-label='{"base":true,"m":false"}'` compiles to `@media(min-width:1000px)`. File harness flips 999 vs 1000. The playground card does not use `m`.

## Follow-ups

1. `delegatesFocus` is not set on the Lit shadow root. Mitosis does not emit `shadowRootOptions`. Static card swap does not focus.
2. The optional host-`href` path still renders a `span.root`, not an `<a>`. cssText switches slotted vs focus-visible. Pixel-diff card is slotted-only.
3. The optional `p-icon` node is always mounted and hidden with CSS when `icon="none"`. Stencil omits the node.
4. JSS was hand-mirrored from the snapshot. No `getCss` port.
5. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. Link.ts is clean.

## Deviations

- Tag is `lit-link` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `Link.ts`, not the whole `output/lit` tree.
- Screenshot path is `page.screenshot({ clip })` of the visible card. The card is 587 CSS px tall and fits the 900px viewport. Viewport stayed 1440x900, dsf 2.
- Swap copies light-DOM children onto the Lit host, including `class` for the CSS-variable themed host.
- `build:link` calls `/workspace/node_modules/.bin/esbuild`. The workspace `esbuild` on PATH rejects `--alias`.
- Shared mitosis rebuild re-indented one line in `Tag.ts`. That file was restored and not committed.
