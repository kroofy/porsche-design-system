# land-drilldown-item

**unit:** playground `p-drilldown-item` from Mitosis Lit (not Stencil, not `lit-drilldown-item`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `7774c4ec64`
**accept SHA:** (this commit)

Playground `p-drilldown-item` is Mitosis Lit (`LitDrilldownItem` / `@customElement("p-drilldown-item")`). Pixel-diff vs stored Stencil drilldown baseline is **0**. After PNG is byte-equal to the stored baseline (18500, SHA-256 `7e397a872604e2ae0b88a78b991751a56ee5ef2f005f4ebae99998be9ce49ddc`).

Do not start `drilldown-link`. Do not re-touch `p-drilldown`, `p-sheet`, `p-flyout`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=drilldown`
- Card: `[data-card="drilldown"]` (two closed `p-drilldown` parents, 17 `p-drilldown-item` hosts, dialogs stay closed)
- Dialogs were not opened. Parent is already Mitosis (`LitDrilldown`). Nested `p-drilldown-link` stays Stencil (`HostElement`, hydrated). Nested `p-button-pure.button` / `p-button-pure.back` are already-landed Mitosis.
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop is the closed card (`460x466` at dsf 2).
- Hosts: 17 `p-drilldown-item` (`LitDrilldownItem`)
- Constructor: `LitDrilldownItem`
- Shadow: `style` cssText + button-or-`slot[name=button]` + `p-button-pure.back` + header-or-h2 + `.drawer` > `.scroller` > slot. `:host` is `display:contents`. Dummy Mitosis `.root` is absent. `stretch` binds as `"true"`. Back `hide-label` is `{"base":true,"s":false}`. `href` is omitted. Desktop media is `s` = 760 (`min-width:760px` / `max-width:759px`). `m` is 1000 (unused as desktop on this tag). No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-drilldown-item"` absent from `bootstrapLazy` after a full `--dev` restart. `"p-drilldown"` stays absent. `"p-drilldown-link"` remains.
- IIFE: `/assets/p-drilldown-item.iife.js` HTTP 200
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-drilldown-item` vs stored baseline | 460×466 | 0 | 214360 |

After PNG is the same 18500 bytes as the stored baseline (SHA-256 `7e397a872604e2ae0b88a78b991751a56ee5ef2f005f4ebae99998be9ce49ddc`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-drilldown-item` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="drilldown"]` (`460x466` at dsf 2). After path is `/opt/cursor/artifacts/mitosis_land_drilldown_item_after.png`.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_drilldown_before.png` (untouched, reused parent closed crop)
- `/opt/cursor/artifacts/mitosis_land_drilldown_item_after.png`
- `/opt/cursor/artifacts/mitosis_land_drilldown_item_after_pass.png`
- `/opt/cursor/artifacts/land_drilldown_item_pixel_diff.png`
- `/opt/cursor/artifacts/land_drilldown_item_verify.log`

## Wiring

Same isolated pattern as land-drilldown. Stencil 4 `excludeComponents` is prod-only. `drilldown-item.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-drilldown-item` from the loader.

`HTMLPDrilldownItemElement` stays on the stub (`declare global`) and in `html-p-drilldown-item-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PDrilldownItem` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/drilldown-item/DrilldownItem.lite.tsx` (`tagName: 'p-drilldown-item'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-drilldown-item.mjs` strips `<my-fragment>` after `mitosis build`, emits button-or-named-button-slot + back + header-or-h2 + `.drawer` > `.scroller` > slot, binds `stretch` as `"true"`, binds back `hide-label` as `{"base":true,"s":false}`, omits `href`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-drilldown-item.iife.js`. Playground `index.html` loads that IIFE after the already-landed parent bundle.

Generated `DrilldownItem.ts` has `@customElement("p-drilldown-item")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/DrilldownItem.lite.tsx` `tagName` is now `'p-drilldown-item'`.

Dummyassets 3002 down is benign. Parent-kind warnings from nested Stencil links under a Lit item are benign. The stored baseline was captured the same way. Custom-layout items yield to `slot="button"` / `slot="header"`.

## Follow-ups

- `generateConstructorMap` still imports the stub `DrilldownItem` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Nested `p-drilldown-link` stays Stencil. Do not start that tag.
