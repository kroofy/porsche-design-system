# migrate-drilldown-item

**unit:** `p-drilldown-item` → `lit-drilldown-item`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `84322dac41`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=drilldown`
- Card: `[data-card="drilldown"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`) — default hosts are closed, so card-only is correct
- Hosts swapped: `17` (`p-drilldown-item` → `lit-drilldown-item`, including nested items)
- Parent kept as Stencil: `p-drilldown`
- Nested kept as Stencil: `p-drilldown-link`, `p-button`, `p-button-pure`, `p-button-tile`, `p-model-signature`
- Shadow children kept as Stencil: cascade / back `p-button-pure`
- Light-DOM children and named slots `button` / `header` copied on swap (direct children only)
- Motion paused with `--p-animation-duration: 0s` / `--p-transition-duration: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 460×466 | 0 | 214360 |
| Lit vs baseline | 460×466 | 0 | 214360 |

Before/after PNGs are byte-equal (`18500` bytes).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_drilldown_item_before.png`
- `/opt/cursor/artifacts/stencil_drilldown_item_before.png`
- `/opt/cursor/artifacts/mitosis_lit_drilldown_item_after.png`
- `/opt/cursor/artifacts/drilldown_item_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `:host` is `display: contents`. css branches on `primary`, `secondary`, `cascade`. Desktop media is `s` = 760 (`min-width:760px` / `max-width:759px`). File harness checks 759 vs 760. Do not call 760 `m`.
- Markup is cascade `p-button-pure` or `slot[name=button]`, back `p-button-pure`, header `slot[name=header]` or `h2`, `.drawer > .scroller > slot`. Host siblings, no `.root`, no `my-fragment`. Nested PDS buttons stay Stencil tags. `href` is omitted so it does not become `"undefined"`.
- Back `hide-label` is `{"base":true,"s":false}`. Boolean attrs on `p-button-pure` are `"true"`.
- Named slots match Stencil `hasNamedSlot`: `:scope > [slot=…]` so a parent does not steal a nested item's `button` / `header`.
- `updated` calls `scroller.scrollTo(0,0)`. MutationObserver watches direct children. Cascade / back emit `internalUpdate`.
- `throwIfParentIsNotOfKind` after in-parent swap is benign and ignored in the harness.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:drilldown-item` exit 0. `rg my-fragment` on `DrilldownItem.ts` is empty.
- No second tag started. Parent `p-drilldown` was not re-worked.
