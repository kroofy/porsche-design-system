# land-table

**unit:** playground `p-table` from Mitosis Lit (not Stencil, not `lit-table`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `2c3ec35fd1`
**accept SHA:** (this commit)

Playground `p-table` is Mitosis Lit (`LitTable` / `@customElement("p-table")`). Pixel-diff vs stored Stencil table baseline is **0**. After PNG is byte-equal to the stored baseline (57465, SHA-256 `15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3`).

Do not start `table-head`. Do not re-touch `p-popover`, `p-link-tile-product`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=table`
- Card: `[data-card="table"]` (grid-column span 2)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 2 `p-table` (`LitTable`). Table 1 caption property → `aria-label` on `.table`. Table 2 slotted `p-heading` caption + `--p-table-scroll-indicator-*` CSS variables. Nested `p-table-head` / `p-table-body` / rows / cells stay Stencil (`hydrated`). Nested `p-scroller` is `LitScroller` with `scrollbar="true"`. Nested `p-heading` is `LitHeading`.
- Constructor: `LitTable`
- Shadow: `style` cssText + `p-scroller` + `.table`. Dummy Mitosis `.root` stripped so slotted rows keep `display: table`. Host CSS variables (`--_p-table-*`, `--p-scroller-indicator-*`) inherit into nested table parts. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-table"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-table.entry.js`.
- IIFE: `/assets/p-table.iife.js` HTTP 200, 29510 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no breakpoint objects.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-table` vs stored baseline | 982×886 | 0 | 870052 |

After PNG is the same 57465 bytes as the stored baseline (SHA-256 `15473ff5d4cd1628d1a45e2704990b7e617d6753c9a6173446754df3361519e3`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-table` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="table"]` (`982x886` at dsf 2).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_table_after.png`
- `/opt/cursor/artifacts/mitosis_land_table_after_pass.png`
- `/opt/cursor/artifacts/land_table_pixel_diff.png`
- `/opt/cursor/artifacts/land_table_verify.log`

## Wiring

Same isolated pattern as land-popover. Stencil 4 `excludeComponents` is prod-only. `table.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-table` from the loader.

`HTMLPTableElement` stays on the stub (`declare global`) and in `html-p-table-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PTable` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/table/Table.lite.tsx` (`tagName: 'p-table'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-table.mjs` strips `<my-fragment>` after `mitosis build`, strips dummy `.root`, wraps default slot in `p-scroller` + `.table`, copies named caption slot, forwards `compact` / `sticky`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-table.iife.js`. Playground `index.html` loads that IIFE after the already-landed popover bundle.

Generated `Table.ts` has `@customElement("p-table")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Table.lite.tsx` `tagName` is now `'p-table'`.

`throwIfParentIsNotOfKind` on reconnect is benign. Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `Table` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start table-head.
