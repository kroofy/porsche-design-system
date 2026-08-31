# migrate-carousel

**unit:** `p-carousel` → `lit-carousel`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `e69e169b9e`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=carousel`
- Card: `[data-card="carousel"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: closed card (`getBoundingClientRect`). The five hosts sit inside `#popover-carousel`, which stays closed. Card-only is the preferred fixture.
- Hosts swapped: `5` (`p-carousel` → `lit-carousel`)
- Nested kept as Stencil: `p-heading`, `p-scroller`, `p-tag`, `p-text`
- Shadow children kept as Stencil: prev/next `p-button-pure`
- Light-DOM children and named slots `heading` / `description` / `controls` copied on swap
- Motion paused with `--p-animation-duration: 0s` / `--p-transition-duration: 0s` / `--p-duration-md: 0s`. Probe Splide uses `speed: 0`.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 460×220 | 0 | 101200 |
| Lit vs baseline | 460×220 | 0 | 101200 |

Before/after PNGs are byte-equal (`7096` bytes).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_carousel_before.png`
- `/opt/cursor/artifacts/stencil_carousel_before.png`
- `/opt/cursor/artifacts/mitosis_lit_carousel_after.png`
- `/opt/cursor/artifacts/carousel_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />`. `:host` is `display: flex`. Breakpoint padding uses `s=760` and `xxl=1920`. Width `basic` multiplies the grid column term by 2; `extended` by 1.
- Shadow siblings: `.header` (heading/description/controls + nav) then `#splide` track then optional pagination then `.slide-status`. No `.root`, no `my-fragment`.
- `@splidejs/splide` inits after first render, destroys on disconnect, refreshes on child change. Slide children get `slot="slide-N"`.
- `slidesPerPage` / `pagination` parse JSON attrs that start with `{`. PDS `m` is 1000px.
- Unset skip-link href is omitted so it does not become `href="undefined"`. Boolean attrs on nested `p-button-pure` are `"true"`.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:carousel` exit 0. `rg my-fragment` on `Carousel.ts` is empty.
- No second tag started. Drilldown family was not re-worked. `p-canvas` was not started.
