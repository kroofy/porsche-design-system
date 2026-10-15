# land-table-body

**unit:** playground `p-table-body` from Mitosis Lit (not Stencil, not `lit-table-body`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `755e65ba30`
**accept SHA:** (this commit)

Playground `p-table-body` is Mitosis Lit (`LitTableBody` / `@customElement("p-table-body")`). Pixel-diff vs stored Stencil table-body baseline is **0**. After PNG is byte-equal to the stored baseline (57465, SHA-256 `15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3`).

Do not start `table-row` or `table-cell`. Do not re-touch `p-table-head-cell`, `p-table-head-row`, `p-table-head`, `p-table`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=table`
- Card: `[data-card="table"]` (no separate table-body card)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 2 `p-table-body` (`LitTableBody`) inside 2 parent `p-table` (`LitTable`). Nested `p-table-row` / `p-table-cell` stay Stencil (`hydrated`). 4 rows, 20 cells.
- Constructor: `LitTableBody`
- Shadow: `style` cssText + default `<slot>`. `:host` is `table-row-group`. `role="rowgroup"` set in `connectedCallback`. Dummy Mitosis `.root` stripped so slotted `p-table-row` stays a direct `table-row` child. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-table-body"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-table-body.entry.js`.
- IIFE: `/assets/p-table-body.iife.js` HTTP 200, 25624 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no breakpoint objects.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-table-body` vs stored baseline | 982×886 | 0 | 870052 |

After PNG is the same 57465 bytes as the stored baseline (SHA-256 `15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-table-body` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="table"]` (`982x886` at dsf 2). After path is `/opt/cursor/artifacts/mitosis_land_table_body_after.png` (not the probe `mitosis_lit_table_body_after.png`).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_body_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_table_body_after.png`
- `/opt/cursor/artifacts/mitosis_land_table_body_after_pass.png`
- `/opt/cursor/artifacts/land_table_body_pixel_diff.png`
- `/opt/cursor/artifacts/land_table_body_verify.log`

## Wiring

Same isolated pattern as land-table-head-row. Stencil 4 `excludeComponents` is prod-only. `table-body.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-table-body` from the loader.

`HTMLPTableBodyElement` stays on the stub (`declare global`) and in `html-p-table-body-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PTableBody` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/table-body/TableBody.lite.tsx` (`tagName: 'p-table-body'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-table-body.mjs` strips `<my-fragment>` after `mitosis build`, strips dummy `.root`, sets `role="rowgroup"`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-table-body.iife.js`. Playground `index.html` loads that IIFE after the already-landed table-head-cell bundle.

Generated `TableBody.ts` has `@customElement("p-table-body")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/TableBody.lite.tsx` `tagName` is now `'p-table-body'`.

`throwIfParentIsNotOfKind` on reconnect is benign (nested rows still expect a Stencil `p-table-body` parent). Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `TableBody` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start table-row.
