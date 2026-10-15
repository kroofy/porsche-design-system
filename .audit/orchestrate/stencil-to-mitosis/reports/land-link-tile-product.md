# land-link-tile-product

**unit:** playground `p-link-tile-product` from Mitosis Lit (not Stencil, not `lit-link-tile-product`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `bbce24639c`
**accept SHA:** (this commit)

Playground `p-link-tile-product` is Mitosis Lit (`LitLinkTileProduct` / `@customElement("p-link-tile-product")`). Pixel-diff vs stored Stencil link-tile-product baseline is **0**. After PNG is byte-equal to the stored baseline (88764, SHA-256 `84eb86167149dac700e4b8bf34f87dc099eb67c1b8dd954fd0d7356faa4c3a79`).

Do not start `popover`. Do not re-touch `p-link-tile`, `p-button-tile`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=link-tile-product`
- Card: `[data-card="link-tile-product"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 2 `p-link-tile-product` (`LitLinkTileProduct`). Tile 1 liked + href overlay. Tile 2 9/16 + price-original + slotted anchor + header tag. Nested `p-button-pure` is `LitButtonPure`. Nested `p-tag` is `LitTag`. Nested `p-icon` is `LitIcon`.
- Constructor: `LitLinkTileProduct`
- Shadow: `style` cssText + `.root` / `.header` / `.image` / `.wrapper`. Tile 1 overlay `<a class="anchor">` when href is set. Tile 2 `<slot name="anchor">` when href is unset (`href !== nothing`, not `href ?`). Unset href omitted. Sale price is sibling `.sr-only` + `<s>` (no fragment). Like labels “Remove from wishlist” / “Add to wishlist”. Heart / heart-filled CDN sources stamped on nested `p-button-pure` (`.iconSource`). No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-link-tile-product"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-link-tile-product.entry.js`.
- IIFE: `/assets/p-link-tile-product.iife.js` HTTP 200, 36248 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no breakpoint objects on aspect-ratio besides the 9/16 literal.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-link-tile-product` vs stored baseline | 460×1208 | 0 | 555680 |

After PNG is the same 88764 bytes as the stored baseline (SHA-256 `84eb86167149dac700e4b8bf34f87dc099eb67c1b8dd954fd0d7356faa4c3a79`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-link-tile-product` host left to photograph.

Card is taller than 900. Crop is `page.screenshot({ clip })` to the viewport remainder (`460x1208` at dsf 2).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_tile_product_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_link_tile_product_after.png`
- `/opt/cursor/artifacts/mitosis_land_link_tile_product_after_pass.png`
- `/opt/cursor/artifacts/land_link_tile_product_pixel_diff.png`
- `/opt/cursor/artifacts/land_link_tile_product_verify.log`

## Wiring

Same isolated pattern as land-link-tile. Stencil 4 `excludeComponents` is prod-only. `link-tile-product.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-link-tile-product` from the loader.

`HTMLPLinkTileProductElement` stays on the stub (`declare global`) and in `html-p-link-tile-product-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PLinkTileProduct` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/link-tile-product/LinkTileProduct.lite.tsx` (`tagName: 'p-link-tile-product'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-link-tile-product.mjs` strips `<my-fragment>` after `mitosis build`, restores classes, branches overlay vs slotted anchor with `href !== nothing`, stamps `heart.9a5962e.svg` / `heart-filled.dd7decf.svg` on nested `p-button-pure`, observes childList/`slotchange` plus `queueMicrotask` so named slots and default img still land after CE-in-head, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-link-tile-product.iife.js`. Playground `index.html` loads that IIFE after the already-landed link-tile bundle.

Generated `LinkTileProduct.ts` has `@customElement("p-link-tile-product")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/LinkTileProduct.lite.tsx` `tagName` is now `'p-link-tile-product'`.

Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `LinkTileProduct` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start popover.
