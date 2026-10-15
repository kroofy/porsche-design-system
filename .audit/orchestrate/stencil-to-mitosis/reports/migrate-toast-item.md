# migrate-toast-item

**unit:** `p-toast-item` → `lit-toast-item`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `41b8142c1c`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=toast`
- Card: `[data-card="toast"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: union of the live card and the open toast-item (item is a `popover` at the viewport bottom; card-only crop would omit it)
- Hosts swapped: `1` (`p-toast-item` → `lit-toast-item` only, inside `p-toast` shadow)
- Parent kept as Stencil: `p-toast`
- Sibling kept as Stencil: `p-button` (4)
- Opened the same message on both sides: `addMessage({ text: 'Some content' })`
- Motion paused with `--p-animation-duration: 0s`; timeout skipped with `--p-temporary-toast-skip-timeout: true`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 1020×1512 | 0 | 1542240 |
| Lit vs baseline | 1020×1512 | 0 | 1542240 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_toast_item_before.png`
- `/opt/cursor/artifacts/stencil_toast_item_before.png`
- `/opt/cursor/artifacts/mitosis_lit_toast_item_after.png`
- `/opt/cursor/artifacts/toast_item_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. Host is `popover="manual"` with Stencil popover resets. `.notification` uses `var(--p-color-*-frosted)` and `box-shadow: var(--p-shadow-lg)`. Icon is a CSS mask on `::before` at `s` (760). `m` is `1000` (unused here). No JSX fragments.
- Current Stencil `p-toast-item` does not nest `p-icon` or `p-button-pure`. Dismiss is a native `button.dismiss`. Those tags were not introduced.
- Strip removes the Mitosis wrapper. `connectedCallback` sets `popover="manual"`. `updated` calls `showPopover()`.
- `text` / `state` are Stencil properties, not attributes, on the playground item. The swap copies both.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:toast-item` exit 0. `rg my-fragment` on `ToastItem.ts` is empty.
- No second tag started.
