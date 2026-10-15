# land-scroller

**unit:** playground `p-scroller` from Mitosis Lit (not Stencil, not `lit-scroller`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `5e81177baa`
**accept SHA:** (this commit)

Playground `p-scroller` is Mitosis Lit (`LitScroller` / `@customElement("p-scroller")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `pin-code`. Do not re-touch `pagination`, `banner`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=scroller`
- Card: `[data-card="scroller"]` (~230px wide, 5 hosts)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: default slotted `p-tag`; `indicator-position=top`; `scrollbar` + top; `scrollbar` + center; `indicator-sticky` + 600×400 pink box. Nested `p-tag` stays Mitosis. Light-DOM children stay on the host.
- Constructor: `LitScroller`
- Shadow: `style` cssText + `.root` / `.scroll` / `.sentinel` / `.prev` / `.next`, CSS `::after` masks (not `p-icon`), no `my-fragment`
- Overflow: all 5 hosts overflow; `.next` opacity is `1`, `.prev` is `0`. `indicator-sticky` is ignored (prop is `sticky`); no `position:sticky` in cssText.
- Stencil loader: exact `"p-scroller"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-scroller.entry.js`.
- IIFE: `/assets/p-scroller.iife.js` HTTP 200, 34752 bytes
- Animation freeze: `--p-animation-duration: 0s` and `--p-transition-duration: 0s` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-scroller` vs stored baseline | 460×1320 | 0 | 607200 |

After PNG is the same 31123 bytes as the stored baseline (SHA-256 `51b498a668c42badaeb725c68b27cdf6351c2223f7bea37b7f5241d9fa09b703`). Baseline PNG was not edited.

The land script uses `page.screenshot({ clip })` because the card is tall. Clip matches the stored capture (card box).

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-scroller` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_scroller_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_scroller_after.png`
- `/opt/cursor/artifacts/land_scroller_pixel_diff.png`
- `/opt/cursor/artifacts/land_scroller_verify.log`

## Wiring

Same pattern as land-pagination. Stencil 4 `excludeComponents` is prod-only. `scroller.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-scroller` from the loader.

`HTMLPScrollerElement` stays on the stub (`declare global`) and in `html-p-scroller-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PScroller` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/scroller/Scroller.lite.tsx` (`tagName: 'p-scroller'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-scroller.mjs` strips `<my-fragment>` after `mitosis build`, rewrites `prevVis`/`nextVis` from IntersectionObserver on `.sentinel` (`threshold: 0.1`), binds click-to-scroll on `.prev`/`.next`, observes light-DOM `childList`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-scroller.iife.js`. Playground `index.html` loads that IIFE next to the pagination bundle.

Generated `Scroller.ts` has `@customElement("p-scroller")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Scroller.lite.tsx` `tagName` is now `'p-scroller'`.

Dummyassets 3002 down is benign; the stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `Scroller` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start pin-code.
