# migrate-table-head-cell

**unit:** `p-table-head-cell` → `lit-table-head-cell`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `b2cc71f145`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=table`
- Card: `[data-card="table"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`)
- Hosts swapped: `10` (`p-table-head-cell` → `lit-table-head-cell` only)
- Parent kept as Stencil: `p-table-head-row`
- Nested kept as Stencil: `p-icon` (sort path only; playground card has no sort)
- Light-DOM children copied on swap

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 982×886 | 0 | 870052 |
| Lit vs baseline | 982×886 | 0 | 870052 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_head_cell_before.png`
- `/opt/cursor/artifacts/stencil_table_head_cell_before.png`
- `/opt/cursor/artifacts/mitosis_lit_table_head_cell_after.png`
- `/opt/cursor/artifacts/table_head_cell_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `:host` is `table-cell`. Padding uses `var(--_p-table-a, var(--p-spacing-fluid-sm))` from parent Stencil `p-table`. `m` is `1000`. No JSX fragments.
- Playground cells are the non-sort path: `span` + default slot. Sort path renders a `button` plus Stencil `p-icon` (`arrow-up`). `hideLabel` / `multiline` / `sort` drive cssText.
- Host `scope="col"` and `role="columnheader"`. `aria-sort` when sort is active.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:table-head-cell` exit 0. `rg my-fragment` on `TableHeadCell.ts` is empty.
- No second tag started. `packages/components` was not edited.
