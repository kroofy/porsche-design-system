# land-table-cell

**unit:** playground `p-table-cell` from Mitosis Lit (not Stencil, not `lit-table-cell`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `eb81ff4856`
**accept SHA:** (this commit)

Playground `p-table-cell` is Mitosis Lit (`LitTableCell` / `@customElement("p-table-cell")`). Pixel-diff vs stored Stencil table-cell baseline is **0**. After PNG is byte-equal to the stored baseline (57465, SHA-256 `15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3`).

Do not start `toast`. Do not re-touch `p-table-row`, `p-table-body`, `p-table-head-cell`, `p-table-head-row`, `p-table-head`, `p-table`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=table`
- Card: `[data-card="table"]` (no separate table-cell card)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 20 `p-table-cell` (`LitTableCell`) inside 4 parent `p-table-row` (`LitTableRow`) inside 2 `p-table-body` (`LitTableBody`) inside 2 `p-table` (`LitTable`)
- Constructor: `LitTableCell`
- Shadow: `style` cssText + default `<slot>`. `:host` is `table-cell`. `role="cell"` set in `connectedCallback`. Dummy Mitosis `.root` stripped so slotted text stays a direct table-cell child. Padding uses `var(--_p-table-a)` from parent `LitTable`. `multiline` drives `white-space` (`nowrap` default; playground cells are non-multiline). No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-table-cell"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-table-cell.entry.js`.
- IIFE: `/assets/p-table-cell.iife.js` HTTP 200, 27278 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no breakpoint objects.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-table-cell` vs stored baseline | 982×886 | 0 | 870052 |

After PNG is the same 57465 bytes as the stored baseline (SHA-256 `15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-table-cell` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="table"]` (`982x886` at dsf 2). After path is `/opt/cursor/artifacts/mitosis_land_table_cell_after.png` (not the probe `mitosis_lit_table_cell_after.png`).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_cell_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_table_cell_after.png`
- `/opt/cursor/artifacts/mitosis_land_table_cell_after_pass.png`
- `/opt/cursor/artifacts/land_table_cell_pixel_diff.png`
- `/opt/cursor/artifacts/land_table_cell_verify.log`

## Wiring

Same isolated pattern as land-table-row. Stencil 4 `excludeComponents` is prod-only. `table-cell.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-table-cell` from the loader.

`HTMLPTableCellElement` stays on the stub (`declare global`) and in `html-p-table-cell-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PTableCell` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/table-cell/TableCell.lite.tsx` (`tagName: 'p-table-cell'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-table-cell.mjs` strips `<my-fragment>` after `mitosis build`, strips dummy `.root`, sets `role="cell"`, adds a `hasAttribute("multiline")` fallback, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-table-cell.iife.js`. Playground `index.html` loads that IIFE after the already-landed table-row bundle.

Generated `TableCell.ts` has `@customElement("p-table-cell")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/TableCell.lite.tsx` `tagName` is now `'p-table-cell'`.

`throwIfParentIsNotOfKind` on reconnect is benign (cells still expect a Stencil `p-table-row` parent). Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `TableCell` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start toast.
