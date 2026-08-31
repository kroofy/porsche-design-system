# land-text

**unit:** playground `p-text` from Mitosis Lit (not Stencil, not `lit-text`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `ecd30d0db4`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=text`
- Card: `[data-card="text"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 12 `<p-text>` (no `lit-text`)
- Constructor: `LitText` (`elementProperties` present)
- Shadow: `style` cssText + `<p>` + `<slot>`, no `my-fragment`
- Stencil loader: exact `"p-text"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-text.iife.js` HTTP 200, 29924 bytes

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-text` vs stored baseline | 460×1618 | 0 | 744280 |

After PNG is the same 55035 bytes as the stored baseline (SHA-256 `056a33757df89e9f30032f7fd6e2899e216e3a655d55af17636bd8b658e24743`). Baseline PNG was not edited.

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-heading.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-text` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_text_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_text_after.png`
- `/opt/cursor/artifacts/land_text_pixel_diff.png`

## Wiring

Same pattern as land-heading. Stencil 4 `excludeComponents` is prod-only. `text.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-text` from the loader.

Mitosis Lit is built from `packages/components/mitosis/text/Text.lite.tsx` (`tagName: 'p-text'`, own `mitosis.config.js` so heading/icon/model-signature/flag/wordmark/crest/divider output is not regenerated). `scripts/build-lit-text.mjs` strips `<my-fragment>` after `mitosis build`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-text.iife.js`. Playground `index.html` loads that IIFE next to the heading bundle.

Generated `Text.ts` has `@customElement("p-text")`. `rg my-fragment` on it is empty. The lite source uses a single `<p>` root (`<style>` + `<slot>`), so the generator never wrapped a fragment.

## Follow-ups

- `generateConstructorMap` still imports the stub `Text` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start display.
