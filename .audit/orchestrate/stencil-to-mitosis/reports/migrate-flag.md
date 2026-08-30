# Migrate p-flag to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     bb6675c251 (source, bundle, baseline; this report lands on top)
TAG      p-flag only. LIT_TAG lit-flag. packages/components untouched.

## Verdict

`Flag.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=flag` swapped in-card to `lit-flag` diffs 0 of 754,400 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop the visible `[data-card="flag"]` intersection with the viewport.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe (local lockfile, `--workspaces=false`, root lockfile untouched). Crest, Wordmark, and Divider sources were not rewritten.

- `src/Flag.lite.tsx` mirrors `p-flag`. `useMetadata({ tagName: 'lit-flag' })`. Static `:host` / `:host([hidden])` in `useStyle`. Size-dependent `img` rules live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />`. That is the `attachComponentCss` analog. Width and height use `var(--p-flag-size,var(--p-leading-normal))`. Font size uses `var(--p-typescale-*)` or `inherit`, matching the Stencil snapshot. `m` is 1000px. JSON size attributes are parsed in the getter.
- Stencil's render is a void `<img>`. A JSX fragment is the only way to put `cssText` next to it. `harness/strip-flag-fragment.mjs` removes `<my-fragment>` from `output/lit/src/Flag.ts` after `mitosis build`. The committed `Flag.ts` has none. Shadow tree is `<style>` then `<img>`, same two roles as Stencil's constructed sheet plus img.
- CDN src is `http://localhost:3001/flags/` plus the live hashes for `de`, `ch`, `pt`, with `xx` as fallback. `aria` is parsed like Stencil's `parseJSONAttribute` so `{'aria-label': 'Flag of Germany'}` becomes the img `alt`.
- `harness/verify-flag.mjs` and `harness/pixel-diff-flag.mjs` retarget the wordmark scripts. Capture script `.audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-flag-baseline.mjs` keeps 1440x900 and dsf 2.
- Generated `output/lit/src/Flag.ts` and `harness/lit-flag.bundle.js` are committed. Bundle aliases `lit/decorators` to `lit/decorators.js`. Generated file is not hand-edited except the fragment strip the recipe allows.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
node harness/strip-flag-fragment.mjs
rg my-fragment output/lit/src/Flag.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Flag.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-flag.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-flag-baseline.mjs
node harness/verify-flag.mjs            # exit 0, failures: []
node harness/pixel-diff-flag.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. That leak is the known divider probe. `Flag.ts` has none.

## Live verification

`node harness/verify-flag.mjs`, exit 0:

```json
{
  "live": {
    "isDefined": true,
    "hasShadowRoot": true,
    "dynamicStyleTag": true,
    "cssTextHasImg": true,
    "cssTextHasTypescale": true,
    "cssTextHasMedia": true,
    "adoptedSheets": 1,
    "unknownWrapper": null,
    "imgSrc": "http://localhost:3001/flags/de.b575e11.svg",
    "imgAlt": "Flag of Germany",
    "fontSize": "16px",
    "fontSizeRef": "16px",
    "fontSizeMatch": true,
    "hostDisplay": "inline-flex",
    "hostSize": { "w": 23.953125, "h": 23.953125 }
  },
  "xl": { "h": 112.328125 },
  "cssvar": { "h": "99px" },
  "hidden": "none",
  "attrChange": { "afterHas5xl": true },
  "at999": { "fontSize": "16px" },
  "at1000": { "fontSize": "71.84px" },
  "consoleErrors": [],
  "failures": []
}
```

Font-size is asserted equal to a reference element using `var(--p-typescale-sm)` on the same page, not a hardcoded px. Breakpoint size `{"base":"sm","m":"5xl"}` stays sm at 999 and flips at 1000.

## Pixel diff

`node harness/pixel-diff-flag.mjs`, live JSON:

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
    "diffPng": "/opt/cursor/artifacts/flag_pixel_diff.png"
  },
  "consoleErrors": []
}
```

Control Stencil vs stored baseline is 0, so the environment did not drift. Lit-after vs baseline is 0. Artifacts:

- `/opt/cursor/artifacts/stencil_flag_before.png`
- `/opt/cursor/artifacts/mitosis_lit_flag_after.png`
- `/opt/cursor/artifacts/flag_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_flag_before.png`

## Dead-end criteria

- Shadow DOM. Expressible. `useShadowDom: true` produced a real `shadowRoot` with `static styles`. Verified live.
- JSS `attachComponentCss` analog. Expressible. Props-derived `cssText` in the shadow root, including breakpoint media queries. Void `img` needed a fragment plus the post-build strip. After strip, no `my-fragment`.
- Breakpoint props. Expressible. JSON size parsed in the getter, compiled to `@media(min-width:1000px)`, flip verified at 999 vs 1000.

## Follow-ups

1. `FLAGS_MANIFEST` is only `de`, `ch`, `pt`, and `xx` in this probe. Other names fall back to `xx`. A real package would import the full manifest.
2. CDN URLs are hardcoded to the staging playground (`http://localhost:3001`). Production `getCDNBaseURL()` is a rollup replace.
3. JSS was hand-mirrored from the flag-styles snapshot. No `getCss` port.
4. The card is 917px tall in a 900px viewport. `locator.screenshot()` of that node inside `p-canvas` returned the layout box without the flags. Capture uses `page.screenshot` clipped to the visible card (820 CSS px). Portugal is partly below the fold. Viewport stayed 1440x900, dsf 2.
5. `rg my-fragment output/lit` is not empty because Divider.ts still has the fragment. Flag.ts is clean. Do not treat the divider leak as this unit's fail.

## Deviations

- Tag is `lit-flag` until the program registers `p-` tags, per the recipe.
- Functional verify ran on the file harness, not the playground. Pixel-diff ran on the live playground card.
- `rg my-fragment` was gated on `Flag.ts`, not the whole `output/lit` tree, because that tree still contains the divider probe.
- Screenshot path is `page.screenshot({ clip })` of the visible card, not `locator.screenshot()`, because the card overflows the required 900px viewport.
