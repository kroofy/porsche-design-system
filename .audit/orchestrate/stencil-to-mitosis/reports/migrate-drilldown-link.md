# migrate-drilldown-link

**unit:** `p-drilldown-link` → `lit-drilldown-link`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `432ed0bf80`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=drilldown`
- Card: `[data-card="drilldown"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: live card (`getBoundingClientRect`) — default hosts are closed, so card-only is correct
- Hosts swapped: `57` (`p-drilldown-link` → `lit-drilldown-link`)
- Parent kept as Stencil: `p-drilldown`, `p-drilldown-item`
- Sibling kept as Stencil: `p-button`, `p-button-tile`
- Light-DOM children copied on swap, including one slotted native `<a>` (href unset)
- Motion paused with `--p-animation-duration: 0s` / `--p-transition-duration: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 460×466 | 0 | 214360 |
| Lit vs baseline | 460×466 | 0 | 214360 |

Before/after PNGs are byte-equal (`18500` bytes).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_drilldown_link_before.png`
- `/opt/cursor/artifacts/stencil_drilldown_link_before.png`
- `/opt/cursor/artifacts/mitosis_lit_drilldown_link_after.png`
- `/opt/cursor/artifacts/drilldown_link_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `:host` is `display: grid`. css branches on `hasSlottedAnchor` (`href` missing) and `active`.
- Host children only: overlay `<a>` + slot when href is set; slot only when href is unset. No `.root`, no `my-fragment`. Unset href is omitted so it does not become `href="undefined"`. `download` / `rel` use `nothing` when absent.
- Stencil uses `shadow: { delegatesFocus: true }`. Mitosis Lit does not emit `delegatesFocus`. No polyfill — closed-card pixel-diff did not need it.
- `throwIfParentIsNotOfKind` after in-parent swap is benign and ignored in the harness.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:drilldown-link` exit 0. `rg my-fragment` on `DrilldownLink.ts` is empty.
- No second tag started. `p-drilldown` and `p-drilldown-item` were not re-worked.
