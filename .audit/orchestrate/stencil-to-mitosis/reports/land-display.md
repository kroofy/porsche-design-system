# land-display

**unit:** playground `p-display` from Mitosis Lit (not Stencil, not `lit-display`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `39ee7b02e5`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=display`
- Card: `[data-card="display"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 4 `<p-display>` (no `lit-display`)
- Constructor: `LitDisplay` (`elementProperties` present)
- Shadow: `style` cssText + `<h3>` + `<slot>`, no `my-fragment`
- Stencil loader: exact `"p-display"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-display.iife.js` HTTP 200, 28510 bytes

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-display` vs stored baseline | 460×874 | 0 | 402040 |

After PNG is the same 30525 bytes as the stored baseline (SHA-256 `ac871dda87042741adda451b0ae52e290ec365cc5c3725b45f2374d7f4a36158`). Baseline PNG was not edited.

The land script uses `page.screenshot({ clip })`, same recipe as land-text.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-display` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_display_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_display_after.png`
- `/opt/cursor/artifacts/land_display_pixel_diff.png`

## Wiring

Same pattern as land-text. Stencil 4 `excludeComponents` is prod-only. `display.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-display` from the loader.

Mitosis Lit is built from `packages/components/mitosis/display/Display.lite.tsx` (`tagName: 'p-display'`, own `mitosis.config.js` so text/heading/icon/model-signature/flag/wordmark/crest/divider output is not regenerated). `scripts/build-lit-display.mjs` strips `<my-fragment>` after `mitosis build`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-display.iife.js`. Playground `index.html` loads that IIFE next to the text bundle.

Generated `Display.ts` has `@customElement("p-display")`. `rg my-fragment` on it is empty. The lite source uses a single `<h3>` root (`<style>` + `<slot>`), so the generator never wrapped a fragment.

## Follow-ups

- `generateConstructorMap` still imports the stub `Display` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start spinner.
