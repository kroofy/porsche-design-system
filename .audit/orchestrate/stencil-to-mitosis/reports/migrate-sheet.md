# migrate-sheet

**unit:** `p-sheet` → `lit-sheet`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `e98b7e33d4`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=sheet`
- Card: `[data-card="sheet"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`) — default hosts are closed, so card-only is correct
- Hosts swapped: `3` (`p-sheet` → `lit-sheet` only)
- Nested kept as Stencil: `p-heading`, `p-text`, sibling `p-button`
- Light-DOM children and named `header` slot copied on swap
- Motion paused with `--p-animation-duration: 0s` / `--p-transition-duration: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 460×700 | 0 | 322000 |
| Lit vs baseline | 460×700 | 0 | 322000 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_sheet_before.png`
- `/opt/cursor/artifacts/stencil_sheet_before.png`
- `/opt/cursor/artifacts/mitosis_lit_sheet_after.png`
- `/opt/cursor/artifacts/sheet_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `:host` is `display: contents`. Closed `<dialog>` collapses to `width: 0` / `height: 0` / `visibility: hidden`. No JSX fragments.
- DialogBase markup is inlined (`dialog > .scroller > .sheet` + native `button.dismiss` + header/default slots). No second custom element. FCDismissButton is a native button + CSS mask. Label is `Dismiss sheet`.
- Simpler than flyout: no footer, sub-footer, position, fullscreen, or sticky-top var. Backdrop is always shading. Panel slides from the bottom (`translate3d(0,25vh,0)`). Scroller is fullscreen `inset: 0`.
- `hasHeader` does not change CSS. Header slot styles always emit. Child MutationObserver still forces a re-render when light-DOM slots change.
- `dismissButton` defaults true. `false` / `"false"` drops the button and its CSS.
- Strip removes the Mitosis wrapper. `updated` calls `showModal` only when `open`. Default closed card never opens a dialog.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:sheet` exit 0. `rg my-fragment` on `Sheet.ts` is empty.
- No second tag started. Flyout and modal were not re-worked.
