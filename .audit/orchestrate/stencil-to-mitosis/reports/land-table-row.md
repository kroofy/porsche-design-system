# land-table-row

**unit:** playground `p-table-row` from Mitosis Lit (not Stencil, not `lit-table-row`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `beb5becf5c`
**accept SHA:** (this commit)

Playground `p-table-row` is Mitosis Lit (`LitTableRow` / `@customElement("p-table-row")`). Pixel-diff vs stored Stencil table-row baseline is **0**. After PNG is byte-equal to the stored baseline (57465, SHA-256 `15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3`).

Do not start `table-cell`. Do not re-touch `p-table-body`, `p-table-head-cell`, `p-table-head-row`, `p-table-head`, `p-table`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=table`
- Card: `[data-card="table"]` (no separate table-row card)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 4 `p-table-row` (`LitTableRow`) inside 2 parent `p-table-body` (`LitTableBody`) inside 2 `p-table` (`LitTable`). Nested `p-table-cell` stays Stencil (`hydrated`). 20 cells.
- Constructor: `LitTableRow`
- Shadow: `style` cssText + default `<slot>`. `:host` is `table-row`. `role="row"` set in `connectedCallback`. Dummy Mitosis `.root` stripped so slotted `p-table-cell` stays a direct `table-cell` child. Border uses `var(--_p-table-d)` / `var(--_p-table-c)` from parent `LitTable`. Hover uses `var(--_p-table-b)`. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-table-row"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-table-row.entry.js`.
- IIFE: `/assets/p-table-row.iife.js` HTTP 200, 25846 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no breakpoint objects.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-table-row` vs stored baseline | 982×886 | 0 | 870052 |

After PNG is the same 57465 bytes as the stored baseline (SHA-256 `15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-table-row` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="table"]` (`982x886` at dsf 2). After path is `/opt/cursor/artifacts/mitosis_land_table_row_after.png` (not the probe `mitosis_lit_table_row_after.png`).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_row_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_table_row_after.png`
- `/opt/cursor/artifacts/mitosis_land_table_row_after_pass.png`
- `/opt/cursor/artifacts/land_table_row_pixel_diff.png`
- `/opt/cursor/artifacts/land_table_row_verify.log`

## Wiring

Same isolated pattern as land-table-body. Stencil 4 `excludeComponents` is prod-only. `table-row.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-table-row` from the loader.

`HTMLPTableRowElement` stays on the stub (`declare global`) and in `html-p-table-row-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PTableRow` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/table-row/TableRow.lite.tsx` (`tagName: 'p-table-row'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-table-row.mjs` strips `<my-fragment>` after `mitosis build`, strips dummy `.root`, sets `role="row"`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-table-row.iife.js`. Playground `index.html` loads that IIFE after the already-landed table-body bundle.

Generated `TableRow.ts` has `@customElement("p-table-row")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/TableRow.lite.tsx` `tagName` is now `'p-table-row'`.

`throwIfParentIsNotOfKind` on reconnect is benign (nested cells still expect a Stencil `p-table-row` parent). Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `TableRow` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start table-cell.
