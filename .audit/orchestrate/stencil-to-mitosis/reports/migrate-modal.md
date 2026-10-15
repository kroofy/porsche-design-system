# migrate-modal

**unit:** `p-modal` → `lit-modal`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `ba6334587f`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=modal`
- Card: `[data-card="modal"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`) — default hosts are closed, so card-only is correct
- Hosts swapped: `5` (`p-modal` → `lit-modal` only)
- Nested kept as Stencil: `p-text`, `p-button`, `p-heading`, `p-button` in footers
- Light-DOM children and named `header` / `footer` slots copied on swap
- Motion paused with `--p-animation-duration: 0s` / `--p-transition-duration: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 460×1120 | 0 | 515200 |
| Lit vs baseline | 460×1120 | 0 | 515200 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_modal_before.png`
- `/opt/cursor/artifacts/stencil_modal_before.png`
- `/opt/cursor/artifacts/mitosis_lit_modal_after.png`
- `/opt/cursor/artifacts/modal_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `:host` is `display: contents`. Closed `<dialog>` collapses to `width: 0` / `height: 0` / `visibility: hidden`. `m` is `1000`. No JSX fragments.
- DialogBase markup is inlined (`dialog > .scroller > .modal` + native `button.dismiss` + slots). No second custom element. FCDismissButton is a native button + CSS mask, not `p-button-pure`.
- `fullscreen` parses JSON attrs that start with `{`. File harness checks the `m=1000` media query (999 still base stretch, 1000 centered).
- Strip removes the Mitosis wrapper. `updated` calls `showModal` only when `open`. Default closed card never opens a dialog.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:modal` exit 0. `rg my-fragment` on `Modal.ts` is empty.
- No second tag started.
