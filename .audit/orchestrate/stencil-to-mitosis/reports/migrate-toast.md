# migrate-toast

**unit:** `p-toast` → `lit-toast`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `13bf53daa9`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=toast`
- Card: `[data-card="toast"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`)
- Hosts swapped: `1` (`p-toast` → `lit-toast` only)
- Sibling kept as Stencil: `p-button` (4)
- Nested `p-toast-item` not present (closed/empty card)
- Light-DOM children copied on swap (empty)
- Motion paused with `--p-animation-duration: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 460×838 | 0 | 385480 |
| Lit vs baseline | 460×838 | 0 | 385480 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_toast_before.png`
- `/opt/cursor/artifacts/stencil_toast_before.png`
- `/opt/cursor/artifacts/mitosis_lit_toast_after.png`
- `/opt/cursor/artifacts/toast_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `:host` is `position: fixed` with `--_p-toast-a`, inset, and `z-index: 999999`. `s` is `760`. `m` is `1000` (unused here). No JSX fragments.
- Staging animation uses `var(--p-animation-duration,.4s)` on `.hydrated`. Empty card has no `p-toast-item`, so those keyframes do not paint.
- Strip removes the Mitosis `.root` wrapper. `connectedCallback` sets `role="status"` on the host.
- `addMessage` / toast manager were not ported. Pixel-diff compares the closed empty host. `packages/components` was not edited.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:toast` exit 0 (759 bottom `56px`, 760 inset `64px`). `rg my-fragment` on `Toast.ts` is empty.
- No second tag started.
