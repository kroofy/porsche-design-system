# land-tag

**unit:** playground `p-tag` from Mitosis Lit (not Stencil, not `lit-tag`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `6733197e99`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=tag`
- Card: `[data-card="tag"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 11 `<p-tag>` (no `lit-tag`)
- Constructor: `LitTag` (`elementProperties` present)
- Nested icons: `<p-icon>` / `LitIcon` (no `lit-icon`)
- Shadow: `style` cssText + `<span>` + `<p-icon>` + `<slot>`, no `my-fragment`
- Stencil loader: exact `"p-tag"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-tag.iife.js` HTTP 200, 31053 bytes

Last host uses `icon-source` against `http://localhost:3002`. Dummyassets was down when the stored baseline was captured, so that custom icon is unloaded (`naturalWidth` 0). Pixel-diff ignores `ERR_CONNECTION_REFUSED` for that URL.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-tag` vs stored baseline | 460×1038 | 0 | 477480 |

After PNG is the same 53760 bytes as the stored baseline (SHA-256 `02804681d2891a5736e7f267eeb0a0fa6c2a2f9ef03a07c2108545963f27fa29`). Baseline PNG was not edited.

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-spinner.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-tag` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tag_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_tag_after.png`
- `/opt/cursor/artifacts/land_tag_pixel_diff.png`

## Wiring

Same pattern as land-spinner. Stencil 4 `excludeComponents` is prod-only. `tag.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-tag` from the loader.

Mitosis Lit is built from `packages/components/mitosis/tag/Tag.lite.tsx` (`tagName: 'p-tag'`, own `mitosis.config.js` so spinner/display/text/heading/icon/model-signature/flag/wordmark/crest/divider output is not regenerated). Nested icons stay `<p-icon>`. `scripts/build-lit-tag.mjs` strips `<my-fragment>` after `mitosis build`, aliases `lit/decorators` → `lit/decorators.js`, maps `iconSource` to attribute `icon-source`, and writes `src/assets/p-tag.iife.js`. Mitosis drops `class="icon"` on nested `p-icon`; cssText targets `p-icon` for the −2px inset. Playground `index.html` loads that IIFE next to the spinner bundle.

Generated `Tag.ts` has `@customElement("p-tag")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `Tag` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start tag-dismissible.
