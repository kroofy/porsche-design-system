# migrate-table-row

**unit:** `p-table-row` → `lit-table-row`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `1e7bda6d56`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=table`
- Card: `[data-card="table"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`)
- Hosts swapped: `4` (`p-table-row` → `lit-table-row` only)
- Parent kept as Stencil: `p-table-body`
- Nested kept as Stencil: `p-table-cell`
- Light-DOM children copied on swap

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 982×886 | 0 | 870052 |
| Lit vs baseline | 982×886 | 0 | 870052 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_row_before.png`
- `/opt/cursor/artifacts/stencil_table_row_before.png`
- `/opt/cursor/artifacts/mitosis_lit_table_row_after.png`
- `/opt/cursor/artifacts/table_row_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `:host` is `table-row`. Border uses `var(--_p-table-d)` / `var(--_p-table-c)` from parent Stencil `p-table`. Hover uses `var(--_p-table-b)`. `m` is `1000`. No JSX fragments.
- Strip removes the Mitosis `.root` wrapper so slotted `p-table-cell` stays a direct `table-cell` child of `table-row`. `connectedCallback` sets `role="row"` on the host.
- Reconnecting `p-table-cell` under `lit-table-row` logs Stencil `throwIfParentIsNotOfKind`. That is expected for this probe. `packages/components` was not edited. The harness ignores those logs.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:table-row` exit 0. `rg my-fragment` on `TableRow.ts` is empty.
- No second tag started.
