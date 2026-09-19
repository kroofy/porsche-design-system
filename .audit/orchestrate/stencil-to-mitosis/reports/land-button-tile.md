# land-button-tile

**unit:** playground `p-button-tile` from Mitosis Lit (not Stencil, not `lit-button-tile`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `0e0a8e971e`
**accept SHA:** (this commit)

Playground `p-button-tile` is Mitosis Lit (`LitButtonTile` / `@customElement("p-button-tile")`). Pixel-diff vs stored Stencil button-tile baseline is **0**. After PNG is byte-equal to the stored baseline (397967, SHA-256 `48c6b6bc8a4310330c6b2057eca90c0bdd265eb446a641c72667dfedff1a459d`).

Do not start `link-tile`. Do not re-touch `p-stepper-horizontal`, `p-stepper-horizontal-item`, `p-tabs`, `p-tabs-item`, `p-tabs-bar`, `p-multi-select`, or `p-multi-select-option`.

## Playground

- URL: `http://localhost:3333/?components=button-tile`
- Card: `[data-card="button-tile"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 5 `p-button-tile` (`LitButtonTile`). 3/4 default; 9/16 top + gradient + header/footer; auto + gradient + header/footer; disabled; loading. Nested `p-button` is `LitButton` (10). Nested `p-tag` is `LitTag` (4). Nested `p-text` is `LitText` (4).
- Constructor: `LitButtonTile`
- Shadow: `style` cssText + `.root` / `.media` / `.footer`. Always both nested `p-button`s (`.link-or-button` and `.link-or-button-pure`). Named `header` / `footer` slots plus default img. `hasFooterSlot` from `querySelector('[slot="footer"]')`. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-button-tile"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-button-tile.entry.js`.
- IIFE: `/assets/p-button-tile.iife.js` HTTP 200, 39471 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no compact breakpoint objects. Compact JSON still compiles `m` to 1000px.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-button-tile` vs stored baseline | 460×1640 | 0 | 754400 |

After PNG is the same 397967 bytes as the stored baseline (SHA-256 `48c6b6bc8a4310330c6b2057eca90c0bdd265eb446a641c72667dfedff1a459d`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-button-tile` host left to photograph.

Card is taller than 900. Crop is `page.screenshot({ clip })` to the viewport remainder (`460x1640` at dsf 2).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_button_tile_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_button_tile_after.png`
- `/opt/cursor/artifacts/mitosis_land_button_tile_after_pass.png`
- `/opt/cursor/artifacts/land_button_tile_pixel_diff.png`
- `/opt/cursor/artifacts/land_button_tile_verify.log`

## Wiring

Same isolated pattern as land-stepper-horizontal-item. Stencil 4 `excludeComponents` is prod-only. `button-tile.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-button-tile` from the loader.

`HTMLPButtonTileElement` stays on the stub (`declare global`) and in `html-p-button-tile-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PButtonTile` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/button-tile/ButtonTile.lite.tsx` (`tagName: 'p-button-tile'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-button-tile.mjs` strips `<my-fragment>` after `mitosis build`, restores `.root` / `.media` / `.footer`, always renders both `p-button`s, reads `hasFooterSlot` live, observes childList/`slotchange` plus `queueMicrotask` so named slots and default img still land after CE-in-head, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-button-tile.iife.js`. Playground `index.html` loads that IIFE after the already-landed stepper-horizontal-item bundle.

Generated `ButtonTile.ts` has `@customElement("p-button-tile")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/ButtonTile.lite.tsx` `tagName` is now `'p-button-tile'`.

Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `ButtonTile` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start link-tile.
