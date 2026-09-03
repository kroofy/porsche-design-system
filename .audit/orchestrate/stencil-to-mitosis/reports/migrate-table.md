# migrate-table

**unit:** `p-table` → `lit-table`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `f91446e884`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=table`
- Card: `[data-card="table"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`)
- Hosts swapped: `2`
- Nested kept as Stencil: `p-scroller` (shadow), `p-table-head`, `p-table-body`, `p-table-row`, `p-table-cell`, `p-table-head-row`, `p-table-head-cell`, `p-heading` (caption slot)
- Light-DOM children and named `caption` slot copied on swap
- Table 1: `caption` property → `aria-label` on `.table`
- Table 2: slotted `p-heading` caption + scroll-indicator CSS variables on the host

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 982×886 | 0 | 870052 |
| Lit vs baseline | 982×886 | 0 | 870052 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_table_before.png`
- `/opt/cursor/artifacts/stencil_table_before.png`
- `/opt/cursor/artifacts/mitosis_lit_table_after.png`
- `/opt/cursor/artifacts/table_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. Host CSS variables (`--_p-table-*`, `--p-scroller-indicator-*`) inherit into nested Stencil table parts. `m` is `1000`. No JSX fragments.
- Nested `p-scroller` keeps `scrollbar="true"` and forwards `compact` / `sticky`.
- Reconnecting `p-table-head` / `p-table-body` under `lit-table` logs Stencil `throwIfParentIsNotOfKind`. That is expected for this probe. `packages/components` was not edited. The harness ignores those logs.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:table` exit 0. `rg my-fragment` on `Table.ts` is empty.
- No second tag started.
