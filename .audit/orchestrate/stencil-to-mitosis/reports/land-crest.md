# land-crest

**unit:** playground `p-crest` from Mitosis Lit (not Stencil, not `lit-crest`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `61444dbf29`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=crest`
- Card: `[data-card="crest"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 1 `<p-crest href="#">` (no `lit-crest`)
- Constructor: `LitCrest` (`elementProperties` present)
- Shadow: `style` cssText + `<a>` + `<picture>` + loaded 30×40 img, no `my-fragment`
- Stencil loader: `p-crest` absent from `bootstrapLazy` after a full `--dev` restart

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-crest` vs stored baseline | 462×200 | 0 | 92400 |

After PNG is the same 13322 bytes as the stored baseline. Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-crest` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_crest_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_crest_after.png`
- `/opt/cursor/artifacts/land_crest_pixel_diff.png`

## Wiring

Same pattern as land-divider. Stencil 4 `excludeComponents` is prod-only. `crest.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-crest` from the loader.

Mitosis Lit is built from `packages/components/mitosis/crest/Crest.lite.tsx` (`tagName: 'p-crest'`, own `mitosis.config.js` so divider output is not regenerated). `scripts/build-lit-crest.mjs` strips `<my-fragment>` if present, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-crest.iife.js`. Playground `index.html` loads that IIFE next to the divider bundle.

Generated `Crest.ts` has `@customElement("p-crest")`. `rg my-fragment` on it is empty. The root is `<a>` (playground fixture always has `href="#"`), so the generator never emitted a fragment.

## Follow-ups

- `generateConstructorMap` still imports the stub `Crest` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start wordmark or flag.
