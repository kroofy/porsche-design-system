# land-link-tile

**unit:** playground `p-link-tile` from Mitosis Lit (not Stencil, not `lit-link-tile`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `8bf2165e06`
**accept SHA:** (this commit)

Playground `p-link-tile` is Mitosis Lit (`LitLinkTile` / `@customElement("p-link-tile")`). Pixel-diff vs stored Stencil link-tile baseline is **0**. After PNG is byte-equal to the stored baseline (397967, SHA-256 `48c6b6bc8a4310330c6b2057eca90c0bdd265eb446a641c72667dfedff1a459d`).

Do not start `link-tile-product`. Do not re-touch `p-button-tile`, `p-stepper-horizontal`, `p-stepper-horizontal-item`, `p-tabs`, `p-tabs-item`, `p-tabs-bar`, `p-multi-select`, or `p-multi-select-option`.

## Playground

- URL: `http://localhost:3333/?components=link-tile`
- Card: `[data-card="link-tile"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 3 `p-link-tile` (`LitLinkTile`). 3/4 default; 9/16 top + gradient + header/footer; auto + gradient + header/footer. All have `href=https://porsche.com` and `target=_blank`. Nested `p-link` is `LitLink` (6). Nested `p-tag` is `LitTag` (2). Nested `p-text` is `LitText` (2).
- Constructor: `LitLinkTile`
- Shadow: `style` cssText + `.root` / `.media` / `.footer`. Stretched overlay `<a tabindex="-1" aria-hidden="true">`. Always both nested `p-link`s (`.link-or-button` and `.link-or-button-pure`). Named `header` / `footer` slots plus default img. `hasFooterSlot` from `querySelector('[slot="footer"]')`. Unset `href` / `download` / `rel` use Lit `nothing` (no `href="undefined"`). Root has no cursor. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-link-tile"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-link-tile.entry.js`. `p-link-tile-product.entry.js` stays.
- IIFE: `/assets/p-link-tile.iife.js` HTTP 200, 38404 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no compact breakpoint objects. Compact JSON still compiles `m` to 1000px.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-link-tile` vs stored baseline | 460×1640 | 0 | 754400 |

After PNG is the same 397967 bytes as the stored baseline (SHA-256 `48c6b6bc8a4310330c6b2057eca90c0bdd265eb446a641c72667dfedff1a459d`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-link-tile` host left to photograph.

Card is taller than 900. Crop is `page.screenshot({ clip })` to the viewport remainder (`460x1640` at dsf 2).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_tile_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_link_tile_after.png`
- `/opt/cursor/artifacts/mitosis_land_link_tile_after_pass.png`
- `/opt/cursor/artifacts/land_link_tile_pixel_diff.png`
- `/opt/cursor/artifacts/land_link_tile_verify.log`

## Wiring

Same isolated pattern as land-button-tile. Stencil 4 `excludeComponents` is prod-only. `link-tile.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-link-tile` from the loader.

`HTMLPLinkTileElement` stays on the stub (`declare global`) and in `html-p-link-tile-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PLinkTile` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/link-tile/LinkTile.lite.tsx` (`tagName: 'p-link-tile'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-link-tile.mjs` strips `<my-fragment>` after `mitosis build`, restores `.root` / `.media` / `.footer`, always renders both `p-link`s plus the overlay `<a>`, reads `hasFooterSlot` live, observes childList/`slotchange` plus `queueMicrotask` so named slots and default img still land after CE-in-head, omits unset `href` / `download` / `rel` with Lit `nothing`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-link-tile.iife.js`. Playground `index.html` loads that IIFE after the already-landed button-tile bundle.

Generated `LinkTile.ts` has `@customElement("p-link-tile")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/LinkTile.lite.tsx` `tagName` is now `'p-link-tile'`.

Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `LinkTile` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start link-tile-product.
