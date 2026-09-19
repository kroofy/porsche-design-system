# migrate-table-body

**unit:** `p-table-body` → `lit-table-body`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `6d7bd9f688`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=table`
- Card: `[data-card="table"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`)
- Hosts swapped: `2` (`p-table-body` → `lit-table-body` only)
- Parent kept as Stencil: `p-table`
- Nested kept as Stencil: `p-table-row`, `p-table-cell`
- Light-DOM children copied on swap

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 982×886 | 0 | 870052 |
| Lit vs baseline | 982×886 | 0 | 870052 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_body_before.png`
- `/opt/cursor/artifacts/stencil_table_body_before.png`
- `/opt/cursor/artifacts/mitosis_lit_table_body_after.png`
- `/opt/cursor/artifacts/table_body_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `:host` is `table-row-group`. `m` is `1000`. No JSX fragments.
- Strip removes the Mitosis `.root` wrapper so slotted `p-table-row` stays a direct `table-row` child of `table-row-group`. `connectedCallback` sets `role="rowgroup"` on the host.
- Reconnecting `p-table-row` under `lit-table-body` logs Stencil `throwIfParentIsNotOfKind`. That is expected for this probe. `packages/components` was not edited. The harness ignores those logs.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:table-body` exit 0. `rg my-fragment` on `TableBody.ts` is empty.
- No second tag started.
