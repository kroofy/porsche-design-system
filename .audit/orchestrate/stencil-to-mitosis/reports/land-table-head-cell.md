# land-table-head-cell

**unit:** playground `p-table-head-cell` from Mitosis Lit (not Stencil, not `lit-table-head-cell`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `614ad81224`
**accept SHA:** (this commit)

Playground `p-table-head-cell` is Mitosis Lit (`LitTableHeadCell` / `@customElement("p-table-head-cell")`). Pixel-diff vs stored Stencil table-head-cell baseline is **0**. After PNG is byte-equal to the stored baseline (57465, SHA-256 `15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3`).

Do not start `table-body`. Do not re-touch `p-table-head-row`, `p-table-head`, `p-table`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=table`
- Card: `[data-card="table"]` (no separate table-head-cell card)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 10 `p-table-head-cell` (`LitTableHeadCell`) inside 2 parent `p-table-head-row` (`LitTableHeadRow`) inside 2 `p-table-head` (`LitTableHead`) inside 2 `p-table` (`LitTable`). Playground cells are the non-sort path (`span` + default slot). Sort path (`button` + `p-icon` `arrow-up`) compiles but is unused on this card.
- Constructor: `LitTableHeadCell`
- Shadow: `style` cssText + `span` + default `<slot>`. `:host` is `table-cell`. Padding uses `var(--_p-table-a, var(--p-spacing-fluid-sm))` from parent `LitTable`. `scope="col"` and `role="columnheader"` set in `connectedCallback`. `aria-sort` only when sort is active (none on this card). `hideLabel` / `multiline` / `sort` drive cssText. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-table-head-cell"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-table-head-cell.entry.js`.
- IIFE: `/assets/p-table-head-cell.iife.js` HTTP 200, 30768 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no breakpoint objects.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-table-head-cell` vs stored baseline | 982×886 | 0 | 870052 |

After PNG is the same 57465 bytes as the stored baseline (SHA-256 `15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-table-head-cell` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="table"]` (`982x886` at dsf 2).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_head_cell_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_table_head_cell_after.png`
- `/opt/cursor/artifacts/mitosis_land_table_head_cell_after_pass.png`
- `/opt/cursor/artifacts/land_table_head_cell_pixel_diff.png`
- `/opt/cursor/artifacts/land_table_head_cell_verify.log`

## Wiring

Same isolated pattern as land-table-head-row. Stencil 4 `excludeComponents` is prod-only. `table-head-cell.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-table-head-cell` from the loader.

`HTMLPTableHeadCellElement` stays on the stub (`declare global`) and in `html-p-table-head-cell-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PTableHeadCell` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/table-head-cell/TableHeadCell.lite.tsx` (`tagName: 'p-table-head-cell'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-table-head-cell.mjs` strips `<my-fragment>` after `mitosis build`, sets `scope="col"` / `role="columnheader"`, injects the unused sort path (`button` + `p-icon` `arrow-up`), aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-table-head-cell.iife.js`. Playground `index.html` loads that IIFE after the already-landed table-head-row bundle.

Generated `TableHeadCell.ts` has `@customElement("p-table-head-cell")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/TableHeadCell.lite.tsx` `tagName` is now `'p-table-head-cell'`.

`throwIfParentIsNotOfKind` on reconnect is benign. Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `TableHeadCell` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start table-body.
