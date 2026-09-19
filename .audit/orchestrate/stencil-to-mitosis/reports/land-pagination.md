# land-pagination

**unit:** playground `p-pagination` from Mitosis Lit (not Stencil, not `lit-pagination`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `0710f7e62f`
**accept SHA:** (this commit)

Playground `p-pagination` is Mitosis Lit (`LitPagination` / `@customElement("p-pagination")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `scroller`. Do not re-touch `banner`, `inline-notification`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=pagination`
- Card: `[data-card="pagination"]` (`grid-column: 1 / -1`, 2 hosts)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: `total-items-count=500` `items-per-page=25` `active-page=1`; second `show-last-page=false`. Nested `p-icon` (`arrow-left` / `arrow-right`) stay Mitosis. No light-DOM children.
- Constructor: `LitPagination`
- Shadow: `style` cssText + `nav>ul` of page items (prev, pages, ellipsis, next), no `my-fragment`
- At 1440, `s=760` is active so `li.ellip-start` is `display:none`. First host has 10 `li` (includes last page 20); second has 9.
- Stencil loader: exact `"p-pagination"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-pagination.entry.js`.
- IIFE: `/assets/p-pagination.iife.js` HTTP 200, 34803 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-pagination` vs stored baseline | 1504×290 | 0 | 436160 |

After PNG is the same 13801 bytes as the stored baseline (SHA-256 `efc02a36beb4f7618696769d8a03c56b2bb32d6747a2b6ba579dac98daaddc4f`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-pagination` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_pagination_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_pagination_after.png`
- `/opt/cursor/artifacts/land_pagination_pixel_diff.png`
- `/opt/cursor/artifacts/land_pagination_verify.log`

## Wiring

Same pattern as land-banner. Stencil 4 `excludeComponents` is prod-only. `pagination.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-pagination` from the loader.

`HTMLPPaginationElement` stays on the stub (`declare global`) and in `html-p-pagination-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PPagination` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/pagination/Pagination.lite.tsx` (`tagName: 'p-pagination'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-pagination.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab attrs (`total-items-count`, `items-per-page`, `active-page`, `show-last-page`), ports `createPaginationItems` into `pageNodes`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-pagination.iife.js`. Playground `index.html` loads that IIFE next to the banner bundle.

Generated `Pagination.ts` has `@customElement("p-pagination")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Pagination.lite.tsx` `tagName` is now `'p-pagination'`.

Landed `p-icon` only maps `car` and `arrow-right` in its file table. Prev uses `source="http://localhost:3001/icons/arrow-left.e03c25b.svg"` so the left chevron is the real asset, not a fallback right arrow. Dummyassets 3002 down is benign.

## Follow-ups

- `generateConstructorMap` still imports the stub `Pagination` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start scroller.
