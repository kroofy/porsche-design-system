# land-model-signature

**unit:** playground `p-model-signature` from Mitosis Lit (not Stencil, not `lit-model-signature`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `a500376c45`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=model-signature`
- Card: `[data-card="model-signature"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 13 `<p-model-signature>` (no `lit-model-signature`)
- Constructor: `LitModelSignature` (`elementProperties` present)
- Shadow: `style` cssText + `<slot>` + hidden `<img>`, CSS mask on `:host`, no `my-fragment`
- Stencil loader: `p-model-signature` absent from `bootstrapLazy` after a full `--dev` restart

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-model-signature` vs stored baseline | 460×1246 | 0 | 573160 |

After PNG is the same 66749 bytes as the stored baseline (SHA-256 `6e46ee75db56…`). Baseline PNG was not edited.

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as `capture-stencil-model-signature-baseline.mjs` and land-flag.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-model-signature` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_model_signature_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_model_signature_after.png`
- `/opt/cursor/artifacts/land_model_signature_pixel_diff.png`

## Wiring

Same pattern as land-flag. Stencil 4 `excludeComponents` is prod-only. `model-signature.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-model-signature` from the loader.

Mitosis Lit is built from `packages/components/mitosis/model-signature/ModelSignature.lite.tsx` (`tagName: 'p-model-signature'`, own `mitosis.config.js` so flag/wordmark/crest/divider output is not regenerated). `scripts/build-lit-model-signature.mjs` strips `<my-fragment>` after `mitosis build`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-model-signature.iife.js`. Playground `index.html` loads that IIFE next to the flag, wordmark, crest, and divider bundles.

Generated `ModelSignature.ts` has `@customElement("p-model-signature")`. `rg my-fragment` on it is empty. The lite source still uses a JSX fragment (`<style>` + `<slot>` + `<img>`); the build script strips the generator's `<my-fragment>` wrapper.

## Follow-ups

- `generateConstructorMap` still imports the stub `ModelSignature` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start icon.
