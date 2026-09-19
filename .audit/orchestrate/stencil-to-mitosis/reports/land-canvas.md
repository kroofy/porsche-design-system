# land-canvas

**unit:** playground `p-canvas` from Mitosis Lit (not Stencil, not `lit-canvas`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `add85629fd`
**accept SHA:** (this commit)

Playground `p-canvas` is Mitosis Lit (`LitCanvas` / `@customElement("p-canvas")`). Pixel-diff vs stored Stencil canvas playground chrome baseline is **0**. After PNG is byte-equal to the stored baseline (40157, SHA-256 `28de5f4bfb3bfd7be7a26beebb89bb114b419f318af8c9e777e7dea52ff18c97`).

Do not start `delete-stencil` or any other tag. Do not re-touch `p-carousel` or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=divider`
- Host: page shell `p-canvas` (no `[data-card="canvas"]`)
- One host. Both sidebars open: `sidebar-start-open="true"` `sidebar-end-open="true"`.
- `background="surface"` is a property, not an attribute on the live host (`backgroundAttr` is null, `backgroundProp` is `surface`).
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop is the union of shadow `.header` + `.sidebar__header--start` + `.sidebar__header--end` (`2880×112` at dsf 2 / `1440×56` CSS). Scrolling main is not cropped.
- Hosts: 1 `p-canvas` (`LitCanvas`)
- Constructor: `LitCanvas`
- Shadow: `style` cssText inside the single Stencil `.root` (no second Mitosis wrapper). Named slots `title` / `header-start` / `header-end` / `footer` / `sidebar-start` / `sidebar-end` / `sidebar-end-header` / `background` / default. `:host` is `display:block`. css branches on `sidebarStartOpen`, `sidebarEndOpen`, `background`. `m` is 1000 (`min-width:1000px` / `max-width:999px`). Nested `p-button` / `p-crest` / `p-wordmark` stay already-landed Mitosis. Nested `p-button` uses `hide-label="true"` and `compact="true"`. Unset `href` is omitted. Hashed `icon-source` on chrome buttons (sidebar / close / configurate) so Mitosis `p-icon` does not fall back to `arrow-right`. No `my-fragment`. No `lit-canvas`.
- Stencil loader: exact `"p-canvas"` absent from `bootstrapLazy` after a full `--dev` restart.
- IIFE: `/assets/p-canvas.iife.js` HTTP 200
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-canvas` vs stored baseline | 2880×112 | 0 | 322560 |

After PNG is the same 40157 bytes as the stored baseline (SHA-256 `28de5f4bfb3bfd7be7a26beebb89bb114b419f318af8c9e777e7dea52ff18c97`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-canvas` host left to photograph.

Crop is `page.screenshot({ clip })` of the header + sidebar-header union (`2880×112` at dsf 2). After path is `/opt/cursor/artifacts/mitosis_land_canvas_after.png`.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_canvas_before.png` (untouched, 40157, SHA-256 `28de5f4bfb3bfd7be7a26beebb89bb114b419f318af8c9e777e7dea52ff18c97`)
- `/opt/cursor/artifacts/mitosis_land_canvas_after.png`
- `/opt/cursor/artifacts/mitosis_land_canvas_after_pass.png`
- `/opt/cursor/artifacts/land_canvas_pixel_diff.png`
- `/opt/cursor/artifacts/land_canvas_verify.log`

## Wiring

Same isolated pattern as land-carousel. Stencil 4 `excludeComponents` is prod-only. `canvas.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-canvas` from the loader.

`HTMLPCanvasElement` stays on the stub (`declare global`) and in `html-p-canvas-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PCanvas` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/canvas/Canvas.lite.tsx` (`tagName: 'p-canvas'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-canvas.mjs` strips `<my-fragment>` after `mitosis build`, injects named slots and nested already-landed Mitosis chrome, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-canvas.iife.js`. Playground `index.html` loads that IIFE after the already-landed carousel bundle.

Generated `Canvas.ts` has `@customElement("p-canvas")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Canvas.lite.tsx` `tagName` is now `'p-canvas'`.

Dummyassets 3002 down is benign. The stored baseline was captured the same way (chrome crop, do not include scrolling main).

## Follow-ups

- `generateConstructorMap` still imports the stub `Canvas` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Mitosis `p-icon` still only hashes `car` and `arrow-right`; chrome buttons pass hashed `icon-source`.
- Do not start `delete-stencil` or a second tag.
