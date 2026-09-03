# migrate-table-cell

**unit:** `p-table-cell` → `lit-table-cell`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `eb4fbf15fc`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=table`
- Card: `[data-card="table"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`)
- Hosts swapped: `20` (`p-table-cell` → `lit-table-cell` only)
- Parent kept as Stencil: `p-table-row`
- Nested kept as Stencil: `p-table-head-cell` (not swapped; query is exact-tag)
- Light-DOM children copied on swap

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 982×886 | 0 | 870052 |
| Lit vs baseline | 982×886 | 0 | 870052 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_cell_before.png`
- `/opt/cursor/artifacts/stencil_table_cell_before.png`
- `/opt/cursor/artifacts/mitosis_lit_table_cell_after.png`
- `/opt/cursor/artifacts/table_cell_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `:host` is `table-cell` with `vertical-align: middle`, `padding: var(--_p-table-a)`, `white-space: nowrap` (or `normal` when `multiline`). `m` is `1000`. No JSX fragments.
- Strip removes the Mitosis `.root` wrapper so the host itself is the `table-cell`. `connectedCallback` sets `role="cell"` on the host.
- Reconnecting `p-table-cell` under a swapped sibling is not in this unit. `throwIfParentIsNotOfKind` on in-parent swap is filtered as benign. `packages/components` was not edited.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:table-cell` exit 0. `rg my-fragment` on `TableCell.ts` is empty.
- No second tag started.
