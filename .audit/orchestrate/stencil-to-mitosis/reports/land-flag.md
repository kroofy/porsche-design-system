# land-flag

**unit:** playground `p-flag` from Mitosis Lit (not Stencil, not `lit-flag`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `a1be5a7f85`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=flag`
- Card: `[data-card="flag"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 12 `<p-flag>` (no `lit-flag`)
- Constructor: `LitFlag` (`elementProperties` present)
- Shadow: `style` cssText + `<img>` (CDN flag SVG loaded), no `my-fragment`
- Stencil loader: `p-flag` absent from `bootstrapLazy` after a full `--dev` restart

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-flag` vs stored baseline | 460×1640 | 0 | 754400 |

After PNG is the same 29543 bytes as the stored baseline (SHA-256 `01ee33ea0ebf…`). Baseline PNG was not edited.

The card is taller than the 900px viewport. `locator.screenshot()` of a clipped `p-canvas` descendant returns the layout box without the flags, so the land script uses the same `page.screenshot({ clip })` recipe as `capture-stencil-flag-baseline.mjs`.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-flag` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_flag_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_flag_after.png`
- `/opt/cursor/artifacts/land_flag_pixel_diff.png`

## Wiring

Same pattern as land-wordmark. Stencil 4 `excludeComponents` is prod-only. `flag.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-flag` from the loader.

Mitosis Lit is built from `packages/components/mitosis/flag/Flag.lite.tsx` (`tagName: 'p-flag'`, own `mitosis.config.js` so wordmark/crest/divider output is not regenerated). `scripts/build-lit-flag.mjs` strips `<my-fragment>` after `mitosis build`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-flag.iife.js`. Playground `index.html` loads that IIFE next to the wordmark, crest, and divider bundles.

Generated `Flag.ts` has `@customElement("p-flag")`. `rg my-fragment` on it is empty. The lite source still uses a JSX fragment (`<style>` + `<img>`); the build script strips the generator's `<my-fragment>` wrapper.

## Follow-ups

- `generateConstructorMap` still imports the stub `Flag` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start model-signature.
