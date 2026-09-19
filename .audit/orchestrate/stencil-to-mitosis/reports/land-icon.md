# land-icon

**unit:** playground `p-icon` from Mitosis Lit (not Stencil, not `lit-icon`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `33e0d257c1`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=icon`
- Card: `[data-card="icon"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 15 `<p-icon>` (no `lit-icon`)
- Constructor: `LitIcon` (`elementProperties` present)
- Shadow: `style` cssText + `<img>` with CSS mask, no `my-fragment`
- Stencil loader: `p-icon` absent from `bootstrapLazy` after a full `--dev` restart

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-icon` vs stored baseline | 460×1640 | 0 | 754400 |

After PNG is the same 35578 bytes as the stored baseline (SHA-256 `1b1181abf9a8…`). Baseline PNG was not edited.

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as `capture-stencil-icon-baseline.mjs` and land-flag.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-icon` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_icon_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_icon_after.png`
- `/opt/cursor/artifacts/land_icon_pixel_diff.png`

## Wiring

Same pattern as land-model-signature. Stencil 4 `excludeComponents` is prod-only. `icon.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-icon` from the loader.

Mitosis Lit is built from `packages/components/mitosis/icon/Icon.lite.tsx` (`tagName: 'p-icon'`, own `mitosis.config.js` so model-signature/flag/wordmark/crest/divider output is not regenerated). `scripts/build-lit-icon.mjs` strips `<my-fragment>` after `mitosis build`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-icon.iife.js`. Playground `index.html` loads that IIFE next to the model-signature, flag, wordmark, crest, and divider bundles.

Generated `Icon.ts` has `@customElement("p-icon")`. `rg my-fragment` on it is empty. The lite source still uses a JSX fragment (`<style>` + `<img>`); the build script strips the generator's `<my-fragment>` wrapper.

## Follow-ups

- `generateConstructorMap` still imports the stub `Icon` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start heading.
