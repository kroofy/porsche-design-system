# migrate-link-tile-product

**unit:** `p-link-tile-product` → `lit-link-tile-product`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `47486fdbb5`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=link-tile-product`
- Card: `[data-card="link-tile-product"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`)
- Hosts swapped: `2`
- Nested kept as Stencil: `p-button-pure` (like button), `p-tag` (header)
- Light-DOM children + named slots copied on swap (`header`, `anchor`, default `img`)
- Tile 1: overlay `<a class="anchor">` when `href` is set (`target="_blank"`)
- Tile 2: slotted `<a slot="anchor">` when `href` is unset — Lit `nothing` is truthy so the overlay branch must use `href !== nothing`, not `href ?`
- Unset `href` omitted (`href="undefined"` does not appear)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 460×1208 | 0 | 555680 |
| Lit vs baseline | 460×1208 | 0 | 555680 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_tile_product_before.png`
- `/opt/cursor/artifacts/stencil_link_tile_product_before.png`
- `/opt/cursor/artifacts/mitosis_lit_link_tile_product_after.png`
- `/opt/cursor/artifacts/link_tile_product_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `m` is `1000`. No JSX fragments.
- Sale price: sibling `sr-only` + `<s>` (Stencil `Fragment` stripped).
- `p-button-pure` like-button labels: “Remove from wishlist” / “Add to wishlist”. Icon `heart-filled` when `liked`.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:link-tile-product` exit 0. `rg my-fragment` on `LinkTileProduct.ts` is empty.
- No second tag started.
