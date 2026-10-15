# migrate-popover

**unit:** `p-popover` → `lit-popover`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `489b44deb7`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=popover`
- Card: `[data-card="popover"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`)
- Hosts swapped: `12` (including 1 nested)
- Nested kept as Stencil: `p-button-pure`, `p-button`, `p-text`
- Light-DOM children and named `button` slot copied on swap
- Default closed state, except hosts that already have `open="true"`
- Native `[popover=manual]` on the top-layer. Wait for `:popover-open` and Floating UI `left`/`top` before crop
- A parent that contains nested popover children re-shows after those children update, so it paints above later sibling panels (Stencil hydration order)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 460×1640 | 0 | 754400 |
| Lit vs baseline | 460×1640 | 0 | 754400 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_popover_before.png`
- `/opt/cursor/artifacts/stencil_popover_before.png`
- `/opt/cursor/artifacts/mitosis_lit_popover_after.png`
- `/opt/cursor/artifacts/popover_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `m` is `1000`. No JSX fragments.
- Default info button when there is no `slot="button"`. Description renders `<p>`; otherwise default slot.
- Unset `open` is uncontrolled and stays closed. `open="true"` is controlled and calls `showPopover()`.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:popover` exit 0. `rg my-fragment` on `Popover.ts` is empty.
- No second tag started.
