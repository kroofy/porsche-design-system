# migrate-table-head

**unit:** `p-table-head` → `lit-table-head`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `8fee620d21`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=table`
- Card: `[data-card="table"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`)
- Hosts swapped: `2` (`p-table-head` → `lit-table-head` only)
- Parent kept as Stencil: `p-table`
- Nested kept as Stencil: `p-table-head-row`, `p-table-head-cell`
- Light-DOM children copied on swap

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 982×886 | 0 | 870052 |
| Lit vs baseline | 982×886 | 0 | 870052 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_head_before.png`
- `/opt/cursor/artifacts/stencil_table_head_before.png`
- `/opt/cursor/artifacts/mitosis_lit_table_head_after.png`
- `/opt/cursor/artifacts/table_head_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `:host` is `table-header-group`. Slotted `--_p-table-d` / `--_p-table-b` zero the row divider so the head border is the only line. Parent Stencil `p-table` still supplies `--_p-table-c`. `m` is `1000`. No JSX fragments.
- Strip removes the Mitosis `.root` wrapper so slotted `p-table-head-row` stays a direct `table-row` child of `table-header-group`. `connectedCallback` sets `role="rowgroup"` on the host.
- Reconnecting `p-table-head-row` under `lit-table-head` logs Stencil `throwIfParentIsNotOfKind`. That is expected for this probe. `packages/components` was not edited. The harness ignores those logs.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:table-head` exit 0. `rg my-fragment` on `TableHead.ts` is empty.
- No second tag started.
