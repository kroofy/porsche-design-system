# migrate-canvas

**unit:** `p-canvas` → `lit-canvas`
**status:** `live-ui-verified`
**pixel-diff:** `0`
**control:** `0` (Stencil-vs-baseline, `strictMismatch`)
**source SHA:** `1cfcd3b96d`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=divider`
- Host: page shell `p-canvas` (no `[data-card="canvas"]`)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop: header plus sidebar headers (`getBoundingClientRect` union). 1440×56 chrome strip. Main is excluded so cards cannot race.
- Hosts swapped: `1` (`p-canvas` → `lit-canvas`)
- Nested kept as Stencil: shadow `p-button`, `p-crest`, `p-wordmark`
- Slotted children kept as Stencil: `p-button`, `p-heading`, `p-input-search`, and the rest of the playground
- Light-DOM children and named slots copied on swap (`title`, `header-end`, `sidebar-start`, `sidebar-end`, `sidebar-end-header`, `background`). Empty `header-start` / `footer` have no light-DOM children.
- Attrs kept: `sidebar-start-open="true"` `sidebar-end-open="true"`. `background="surface"` copied from the Stencil property (it is not an attribute on the live host).
- Motion paused with `--p-animation-duration: 0s` / `--p-transition-duration: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Control Stencil vs baseline | 2880×112 | 0 | 322560 |
| Lit vs baseline | 2880×112 | 0 | 322560 |

Before/after PNGs are byte-equal (`40157` bytes).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_canvas_before.png`
- `/opt/cursor/artifacts/stencil_canvas_before.png`
- `/opt/cursor/artifacts/mitosis_lit_canvas_after.png`
- `/opt/cursor/artifacts/canvas_pixel_diff.png`

## Notes

- cssText getter + `<style innerHTML={state.cssText} />` inside the one Stencil `.root`. `:host` is `display: block`. css branches on `sidebarStartOpen`, `sidebarEndOpen`, `background`. `m` is 1000px (`min-width:1000px` / `max-width:999px`).
- One `.root`. No second Mitosis wrapper. No `my-fragment`.
- Nested `p-button` uses `hide-label="true"` and `compact="true"`. Unset href is omitted.
- Bundle alias: `--alias:lit/decorators=lit/decorators.js`.
- File harness `verify:canvas` exit 0. `rg my-fragment` on `Canvas.ts` is empty.
- No second tag started. `p-carousel` was not re-worked. No `packages/components` divider move.
