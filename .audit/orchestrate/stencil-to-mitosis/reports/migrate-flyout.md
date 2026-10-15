# migrate-flyout

**unit:** `p-flyout` → `lit-flyout`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `b49bbc9516`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=flyout`
- Card: `[data-card="flyout"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`) — default hosts are closed, so card-only is correct
- Hosts swapped: `9` (`p-flyout` → `lit-flyout` only)
- Nested kept as Stencil: `p-button`, `p-model-signature`, `p-text`, `p-heading`, nested `p-modal` / `p-tag`
- Light-DOM children and named `header` / `footer` / `sub-footer` slots copied on swap
- Motion paused with `--p-animation-duration: 0s` / `--p-transition-duration: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 460×1640 | 0 | 754400 |
| Lit vs baseline | 460×1640 | 0 | 754400 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_flyout_before.png`
- `/opt/cursor/artifacts/stencil_flyout_before.png`
- `/opt/cursor/artifacts/mitosis_lit_flyout_after.png`
- `/opt/cursor/artifacts/flyout_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `:host` is `display: contents`. Closed `<dialog>` collapses to `width: 0` / `height: 0` / `visibility: hidden`. `m` is `1000`. No JSX fragments.
- DialogBase markup is inlined (`dialog > .scroller > .flyout` + native `button.dismiss` + slots). No second custom element. FCDismissButton is a native button + CSS mask, not `p-button-pure`. Label is `Dismiss flyout`.
- Extra vs modal: `position` start/end docks the scroller and slides it on `.scroller` (not `.flyout`). `footerBehavior` emits `grid-template-rows` when `fixed`. `sub-footer` slot is always present. `addStickyTopCssVarStyleSheet` / header ResizeObserver set `--p-flyout-sticky-top`.
- `fullscreen` parses JSON attrs that start with `{`, including unquoted keys like `{ base: true, m: false }`. File harness checks the `m=1000` media query (999 still base stretch, 1000 docked).
- Strip removes the Mitosis wrapper. `updated` calls `showModal` only when `open`. Default closed card never opens a dialog.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:flyout` exit 0. `rg my-fragment` on `Flyout.ts` is empty.
- No second tag started. Modal was not re-worked.
