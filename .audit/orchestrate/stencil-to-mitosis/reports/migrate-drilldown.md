# migrate-drilldown

**unit:** `p-drilldown` → `lit-drilldown`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `919e9d5271`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=drilldown`
- Card: `[data-card="drilldown"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`) — default hosts are closed, so card-only is correct
- Hosts swapped: `2` (`p-drilldown` → `lit-drilldown` only)
- Nested kept as Stencil: `p-drilldown-item`, `p-drilldown-link`, sibling `p-button`
- Shadow children kept as Stencil: `p-button-pure.back`, `p-button.dismiss-mobile`, `p-button.dismiss-desktop`
- Light-DOM children copied on swap
- Motion paused with `--p-animation-duration: 0s` / `--p-transition-duration: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 460×466 | 0 | 214360 |
| Lit vs baseline | 460×466 | 0 | 214360 |

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_drilldown_before.png`
- `/opt/cursor/artifacts/stencil_drilldown_before.png`
- `/opt/cursor/artifacts/mitosis_lit_drilldown_after.png`
- `/opt/cursor/artifacts/drilldown_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `:host` is `display: block`. Closed `<dialog>` is `visibility: hidden` (no width/height collapse). No JSX fragments.
- Markup is `dialog > .drawer > back + dismiss-mobile + dismiss-desktop + .scroller > slot`. No second custom element. Nested PDS buttons stay Stencil tags. `href` is omitted so it does not become `"undefined"`.
- css depends on `open`, `primary`, and `isSecondaryDrawerVisible` (`!!activeIdentifier`). Desktop media is `s` = 760 (`min-width:760px` / `max-width:759px`). File harness checks 759 vs 760. Do not call 760 `m`.
- Strip binds `hide-label` / `stretch` / `compact` as `"true"`. Empty boolean attrs fail PDS validation.
- `updated` calls `showModal` only when `open`. Default closed card never opens a dialog. slotchange and `internalUpdate` are wired.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:drilldown` exit 0. `rg my-fragment` on `Drilldown.ts` is empty.
- No second tag started. Sheet, flyout, and modal were not re-worked.
