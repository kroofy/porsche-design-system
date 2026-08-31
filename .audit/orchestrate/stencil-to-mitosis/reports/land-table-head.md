# land-table-head

**unit:** playground `p-table-head` from Mitosis Lit (not Stencil, not `lit-table-head`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `33d229e812`
**accept SHA:** (this commit)

Playground `p-table-head` is Mitosis Lit (`LitTableHead` / `@customElement("p-table-head")`). Pixel-diff vs stored Stencil table-head baseline is **0**. After PNG is byte-equal to the stored baseline (57465, SHA-256 `15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3`).

Do not start `table-head-row`. Do not re-touch `p-table`, `p-popover`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=table`
- Card: `[data-card="table"]` (no separate table-head card)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 2 `p-table-head` (`LitTableHead`) inside 2 parent `p-table` (`LitTable`). Nested `p-table-head-row` / `p-table-head-cell` stay Stencil (`hydrated`).
- Constructor: `LitTableHead`
- Shadow: `style` cssText + default `<slot>`. `:host` is `table-header-group`. `role="rowgroup"` set in `connectedCallback`. Dummy Mitosis `.root` stripped so slotted `p-table-head-row` stays a direct `table-row` child. `::slotted(*)` zeros `--_p-table-d` / `--_p-table-b` so the head border is the only line. Parent `LitTable` supplies `--_p-table-c`. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-table-head"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-table-head.entry.js`.
- IIFE: `/assets/p-table-head.iife.js` HTTP 200, 25874 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no breakpoint objects.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-table-head` vs stored baseline | 982×886 | 0 | 870052 |

After PNG is the same 57465 bytes as the stored baseline (SHA-256 `15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-table-head` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="table"]` (`982x886` at dsf 2).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_head_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_table_head_after.png`
- `/opt/cursor/artifacts/mitosis_land_table_head_after_pass.png`
- `/opt/cursor/artifacts/land_table_head_pixel_diff.png`
- `/opt/cursor/artifacts/land_table_head_verify.log`

## Wiring

Same isolated pattern as land-table. Stencil 4 `excludeComponents` is prod-only. `table-head.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-table-head` from the loader.

`HTMLPTableHeadElement` stays on the stub (`declare global`) and in `html-p-table-head-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PTableHead` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/table-head/TableHead.lite.tsx` (`tagName: 'p-table-head'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-table-head.mjs` strips `<my-fragment>` after `mitosis build`, strips dummy `.root`, sets `role="rowgroup"`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-table-head.iife.js`. Playground `index.html` loads that IIFE after the already-landed table bundle.

Generated `TableHead.ts` has `@customElement("p-table-head")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/TableHead.lite.tsx` `tagName` is now `'p-table-head'`.

`throwIfParentIsNotOfKind` on reconnect is benign. Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `TableHead` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start table-head-row.
