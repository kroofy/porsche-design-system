# land-wordmark

**unit:** playground `p-wordmark` from Mitosis Lit (not Stencil, not `lit-wordmark`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `07b5f09d0d`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=wordmark`
- Card: `[data-card="wordmark"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 1 `<p-wordmark class="w-full" href="#">` (no `lit-wordmark`)
- Constructor: `LitWordmark` (`elementProperties` present)
- Shadow: `style` cssText + `<a>` + `<svg title="Porsche">`, no `my-fragment`
- Stencil loader: `p-wordmark` absent from `bootstrapLazy` after a full `--dev` restart

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-wordmark` vs stored baseline | 462×148 | 0 | 68376 |

After PNG is the same 4162 bytes as the stored baseline. Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-wordmark` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_wordmark_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_wordmark_after.png`
- `/opt/cursor/artifacts/land_wordmark_pixel_diff.png`

## Wiring

Same pattern as land-crest. Stencil 4 `excludeComponents` is prod-only. `wordmark.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-wordmark` from the loader.

Mitosis Lit is built from `packages/components/mitosis/wordmark/Wordmark.lite.tsx` (`tagName: 'p-wordmark'`, own `mitosis.config.js` so crest/divider output is not regenerated). `scripts/build-lit-wordmark.mjs` strips `<my-fragment>` if present, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-wordmark.iife.js`. Playground `index.html` loads that IIFE next to the crest and divider bundles.

Generated `Wordmark.ts` has `@customElement("p-wordmark")`. `rg my-fragment` on it is empty. The root is `<a>` (playground fixture always has `href="#"`), so the generator never emitted a fragment.

## Follow-ups

- `generateConstructorMap` still imports the stub `Wordmark` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start flag.
