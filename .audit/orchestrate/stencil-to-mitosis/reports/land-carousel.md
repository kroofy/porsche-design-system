# land-carousel

**unit:** playground `p-carousel` from Mitosis Lit (not Stencil, not `lit-carousel`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `2b927c6544`
**accept SHA:** (this commit)

Playground `p-carousel` is Mitosis Lit (`LitCarousel` / `@customElement("p-carousel")`). Pixel-diff vs stored Stencil carousel baseline is **0**. After PNG is byte-equal to the stored baseline (7096, SHA-256 `61bd4864ddbae06db394c375ac4320c812a0869863caf1402fe415666cc12b84`).

Do not start `canvas`. Do not re-touch `p-drilldown`, `p-drilldown-item`, `p-drilldown-link`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=carousel`
- Card: `[data-card="carousel"]` (closed native popover, Show Carousel button, 5 `LitCarousel` hosts inside `#popover-carousel`)
- `#popover-carousel` was not opened.
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop is the closed card (`460x220` at dsf 2).
- Hosts: 5 `p-carousel` (`LitCarousel`)
- Constructor: `LitCarousel`
- Shadow: `style` cssText + `.header` + `#splide.splide` > `.splide__track` > `.splide__list` > slide slots + `.slide-status`. `:host` is `display:flex` / `flex-direction:column`. Dummy Mitosis `.root` is absent. Splide `speed: 0`. JSON props parse unquoted keys. Width `basic` multiplies the grid column term by 2; `extended` by 1. `s` is 760, `m` is 1000, `xxl` is 1920. Nested `p-heading` / `p-scroller` / `p-tag` / `p-text` / `p-button-pure` stay already-landed Mitosis. No `my-fragment`. No `lit-carousel`.
- Stencil loader: exact `"p-carousel"` absent from `bootstrapLazy` after a full `--dev` restart.
- IIFE: `/assets/p-carousel.iife.js` HTTP 200
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-carousel` vs stored baseline | 460×220 | 0 | 101200 |

After PNG is the same 7096 bytes as the stored baseline (SHA-256 `61bd4864ddbae06db394c375ac4320c812a0869863caf1402fe415666cc12b84`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-carousel` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="carousel"]` (`460x220` at dsf 2). After path is `/opt/cursor/artifacts/mitosis_land_carousel_after.png`.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_carousel_before.png` (untouched, 7096, SHA-256 `61bd4864ddbae06db394c375ac4320c812a0869863caf1402fe415666cc12b84`)
- `/opt/cursor/artifacts/mitosis_land_carousel_after.png`
- `/opt/cursor/artifacts/mitosis_land_carousel_after_pass.png`
- `/opt/cursor/artifacts/land_carousel_pixel_diff.png`
- `/opt/cursor/artifacts/land_carousel_verify.log`

## Wiring

Same isolated pattern as land-drilldown-link. Stencil 4 `excludeComponents` is prod-only. `carousel.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-carousel` from the loader.

`HTMLPCarouselElement` stays on the stub (`declare global`) and in `html-p-carousel-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PCarousel` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/carousel/Carousel.lite.tsx` (`tagName: 'p-carousel'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-carousel.mjs` strips `<my-fragment>` after `mitosis build`, injects Splide (`speed: 0`), named heading / description / controls slots, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-carousel.iife.js`. Playground `index.html` loads that IIFE after the already-landed drilldown-link bundle.

Generated `Carousel.ts` has `@customElement("p-carousel")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Carousel.lite.tsx` `tagName` is now `'p-carousel'`.

Dummyassets 3002 down is benign. The stored baseline was captured the same way (closed card, do not open the popover).

## Follow-ups

- `generateConstructorMap` still imports the stub `Carousel` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start `canvas`.
