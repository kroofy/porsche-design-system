# Migrate p-link-pure to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     f5750fd536 (source, bundle; baseline and this report land on top)
TAG      p-link-pure only. LIT_TAG lit-link-pure. packages/components untouched.

## Verdict

`LinkPure.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=link-pure` swapped in-card to `lit-link-pure` diffs 0 of 1,610,480 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop the visible `[data-card="link-pure"]` intersection with the viewport.

Inner icons stay `p-icon` (the live Stencil custom element). They were not swapped to `lit-icon`.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Tag-dismissible and earlier sources were not rewritten. Leftover `Tag.ts` indent drift from the shared mitosis rebuild was restored and not committed.

- `src/LinkPure.lite.tsx` mirrors `p-link-pure`. `useMetadata({ tagName: 'lit-link-pure' })`. Static `:host` transform and `:host([hidden])` in `useStyle`. Size, color, underline, active, stretch, hideLabel, alignLabel, icon, iconSource, and href live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />` inside the single root `<span class="root">`. That is the `attachComponentCss` analog. Colors use `var(--p-color-*)` or `currentcolor`. Active paints `.root::before` with `var(--p-blur-frosted)` / `var(--p-color-frosted)`. Forced-colors uses `LinkText` / `ButtonText` / `Highlight`. Hover only paints `.root:hover::before` and does not affect the static screenshot.
- Playground hosts all slot `<a href="#">Some anchor</a>` (no host `href`). Root stays a `span`. When `href` is set, cssText drops `::slotted(a)` and adds `.root:focus-visible::before`. The probe always emits `<p-icon>` and hides it with `p-icon{display:none}` when `icon="none"` and there is no `icon-source`. No JSX fragment. `rg my-fragment output/lit/src/LinkPure.ts` is empty.
- Mitosis pretty-prints the template and drops classes. `harness/strip-link-pure-whitespace.mjs` restores a single-line shadow tree (`class="root"`, `class="icon"`, `class="label"`), reads hyphenated `icon-source` / `align-label` / `hide-label`, and omits empty `name`/`source` via Lit `nothing`.
- Pixel-diff copies attributes **and** light-DOM children onto `lit-link-pure`. Attribute-only swap would drop the slotted `<a>`.
- Size / stretch / hideLabel / alignLabel parse JSON when the string starts with `{`. `m` compiles to `@media(min-width:1000px)`. The card does not use breakpoint JSON. The file harness proves 999 vs 1000 (`sm` 16px → `5xl` 71.84px).
- Stencil sets `shadow: { delegatesFocus: true }`. Mitosis Lit does not emit `shadowRootOptions`. Static pixel-diff does not focus. Follow-up only.
- Generated `output/lit/src/LinkPure.ts` and `harness/lit-link-pure.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. `build:link-pure` re-strips prior units so accepted files stay clean, then uses the repo-root esbuild.

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
rg my-fragment output/lit/src/LinkPure.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/LinkPure.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-link-pure.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-link-pure-baseline.mjs
node harness/verify-link-pure.mjs            # exit 0, failures: []
node harness/pixel-diff-link-pure.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `LinkPure.ts` has none.

## Live verification

`node harness/verify-link-pure.mjs`, exit 0:

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
    "cssTextHasIcon": true,
    "unknownWrapper": null,
    "rootTag": "SPAN",
    "rootClass": "root",
    "innerIconTag": "P-ICON",
    "innerIsLitIcon": false,
    "iconName": "arrow-right",
    "hasSlot": true,
    "assignedAnchor": true,
    "colorMatch": true,
    "hostDisplay": "inline-block"
  },
  "active": { "cssHasFrosted": true, "cssHas5xl": true, "cssHasUnderline": true },
  "href": { "cssHasFocus": true, "cssHasNoSlotted": true },
  "noicon": { "cssHidesIcon": true, "iconDisplay": "none" },
  "hidden": "none",
  "attrChange": { "afterHasContrast": true },
  "at999": { "fontSize": "16px", "cssHasMedia": true, "cssHas5xl": true },
  "at1000": { "fontSize": "71.84px" },
  "consoleErrors": [],
  "failures": []
}
```

Color is asserted equal to a reference element using `var(--p-color-primary)` on the same page, not hardcoded rgba. Viewport 999 keeps `sm` (16px). Viewport 1000 applies `m` → `5xl`.

## Pixel diff

`node harness/pixel-diff-link-pure.mjs`, live JSON:

```json
{
  "swap": { "swapped": 12, "litRendered": 12, "fragment": false, "innerLitIcon": false },
  "controlStencilVsBaseline": {
    "aSize": "982x1640", "bSize": "982x1640",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 1610480
  },
  "litVsBaseline": {
    "aSize": "982x1640", "bSize": "982x1640",
    "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 1610480,
    "diffPng": "/opt/cursor/artifacts/link_pure_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_link_pure_before.png`
- `/opt/cursor/artifacts/mitosis_lit_link_pure_after.png`
- `/opt/cursor/artifacts/link_pure_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_pure_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including hover media and forced-colors. Slot and `p-icon` live inside the span root, so no fragment.
- Breakpoint props. Expressible. JSON `size='{"base":"sm","m":"5xl"}'` compiles to `@media(min-width:1000px)`. File harness flips 999 vs 1000. The playground card does not use `m`.

## Follow-ups

1. `delegatesFocus` is not set on the Lit shadow root. Mitosis does not emit `shadowRootOptions`. Static card swap does not focus.
2. The optional host-`href` path still renders a `span.root`, not an `<a>`. cssText switches slotted vs focus-visible. Pixel-diff card is slotted-only.
3. The optional `p-icon` node is always mounted and hidden with CSS when `icon="none"`. Stencil omits the node.
4. JSS was hand-mirrored from the snapshot. No `getCss` port.
5. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. LinkPure.ts is clean.

## Deviations

- Tag is `lit-link-pure` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `LinkPure.ts`, not the whole `output/lit` tree.
- Screenshot path is `page.screenshot({ clip })` of the visible card. The card is 981 CSS px tall; clip height is 820 (viewport remainder). Viewport stayed 1440x900, dsf 2.
- Swap copies light-DOM children onto the Lit host.
- `build:link-pure` calls `/workspace/node_modules/.bin/esbuild`. The workspace `esbuild` on PATH rejects `--alias`.
- Shared mitosis rebuild re-indented one line in `Tag.ts`. That file was restored and not committed.
