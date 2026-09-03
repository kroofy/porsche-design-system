# land-accordion

**unit:** playground `p-accordion` from Mitosis Lit (not Stencil, not `lit-accordion`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `8e5cf261cc`
**accept SHA:** (this commit)

Playground `p-accordion` is Mitosis Lit (`LitAccordion` / `@customElement("p-accordion")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `segmented-control`. Do not re-touch `pin-code`, `scroller`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=accordion`
- Card: `[data-card="accordion"]` (`grid-column: span 2`, 21 hosts)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: default, `align-marker=start` + `indent` `l`, canvas/surface/frosted, summary-before/after, custom px/py, sticky, heading-slot, last 3 `open=true`. Nested `p-heading` / `p-text` / `p-checkbox` stay Mitosis. `p-popover` stays Stencil (`HostElement`).
- Constructor: `LitAccordion`
- Shadow: `style` cssText + controlled `details`/`summary` + named heading/summary/summary-before/summary-after slots + default slot body, chevron is `summary::after` mask, no `my-fragment`
- Stencil loader: exact `"p-accordion"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-accordion.entry.js`.
- IIFE: `/assets/p-accordion.iife.js` HTTP 200, 37632 bytes
- Animation freeze: `--p-animation-duration: 0s` and `--p-transition-duration: 0s` so open bodies snap

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-accordion` vs stored baseline | 982×1640 | 0 | 1610480 |

After PNG is the same 70863 bytes as the stored baseline (SHA-256 `84c400a3522ed035e8d9497aeb5985996a27677a6a7bc66185814b68b2c6f4cd`). Baseline PNG was not edited.

The card is taller than 900. Clip height is `min(card.height, 900 - card.y)` = 820 CSS px (`page.screenshot({ clip })`), same as the stored baseline capture. `indent` `l` is 1300.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-accordion` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_accordion_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_accordion_after.png`
- `/opt/cursor/artifacts/land_accordion_pixel_diff.png`
- `/opt/cursor/artifacts/land_accordion_verify.log`

## Wiring

Same pattern as land-pin-code. Stencil 4 `excludeComponents` is prod-only. `accordion.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-accordion` from the loader.

`HTMLPAccordionElement` stays on the stub (`declare global`) and in `html-p-accordion-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PAccordion` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/accordion/Accordion.lite.tsx` (`tagName: 'p-accordion'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-accordion.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab attrs (`align-marker`, `heading-tag`), observes light-DOM `childList` and `slotchange` so named slots exist after upgrade, hides unused before/after slots, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-accordion.iife.js`. Playground `index.html` loads that IIFE next to the pin-code bundle.

Generated `Accordion.ts` has `@customElement("p-accordion")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Accordion.lite.tsx` `tagName` is now `'p-accordion'`.

Dummyassets 3002 down is benign; the stored baseline was captured the same way. Chevron is a CSS mask, not `p-icon`.

## Follow-ups

- `generateConstructorMap` still imports the stub `Accordion` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start segmented-control.
