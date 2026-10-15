# land-tag-dismissible

**unit:** playground `p-tag-dismissible` from Mitosis Lit (not Stencil, not `lit-tag-dismissible`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `d2709a7d30`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=tag-dismissible`
- Card: `[data-card="tag-dismissible"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 2 `<p-tag-dismissible>` (no `lit-tag-dismissible`)
- Constructor: `LitTagDismissible` (`elementProperties` present)
- Nested icons: `<p-icon>` / `LitIcon` (no `lit-icon`), source `http://localhost:3001/icons/close.eec3c5d.svg`
- Shadow: `style` cssText + `<button>` + `<p-icon>` + `<slot>`, no `my-fragment`
- Stencil loader: exact `"p-tag-dismissible"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-tag-dismissible.iife.js` HTTP 200, 29517 bytes

Landed `LitIcon` only maps `car` / `arrow-right`. Nested close uses the CDN `source` so `name="close"` does not fall back to arrow-right.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-tag-dismissible` vs stored baseline | 460×370 | 0 | 170200 |

After PNG is the same 13152 bytes as the stored baseline (SHA-256 `05c7ad357255228d7c1b22b9e63edb22a8e99653bd37a8e311cec2dcffcc5603`). Baseline PNG was not edited (mtime `2026-08-30`).

The land script uses `page.screenshot({ clip })`, same recipe as land-tag.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-tag-dismissible` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tag_dismissible_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_tag_dismissible_after.png`
- `/opt/cursor/artifacts/land_tag_dismissible_pixel_diff.png`

## Wiring

Same pattern as land-tag. Stencil 4 `excludeComponents` is prod-only. `tag-dismissible.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-tag-dismissible` from the loader.

Mitosis Lit is built from `packages/components/mitosis/tag-dismissible/TagDismissible.lite.tsx` (`tagName: 'p-tag-dismissible'`, own `mitosis.config.js` so tag/spinner/display/text/heading/icon/model-signature/flag/wordmark/crest/divider output is not regenerated). Nested close stays `<p-icon>`. `scripts/build-lit-tag-dismissible.mjs` strips `<my-fragment>` after `mitosis build`, restores `sr-only` / `label` / `icon` classes Mitosis drops, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-tag-dismissible.iife.js`. Playground `index.html` loads that IIFE next to the tag bundle.

Generated `TagDismissible.ts` has `@customElement("p-tag-dismissible")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `TagDismissible` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start link-pure.
