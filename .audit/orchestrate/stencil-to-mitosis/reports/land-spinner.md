# land-spinner

**unit:** playground `p-spinner` from Mitosis Lit (not Stencil, not `lit-spinner`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `85bdd0340f`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=spinner`
- Card: `[data-card="spinner"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 14 `<p-spinner>` (no `lit-spinner`)
- Constructor: `LitSpinner` (`elementProperties` present)
- Shadow: `style` cssText + `<div>` + `<svg>` with two circles, no `my-fragment`
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same as `capture-stencil-spinner-baseline.mjs`), plus `--p-transition-duration` / `--p-duration-md` / `--p-duration-xl` at `0s`
- Stencil loader: exact `"p-spinner"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-spinner.iife.js` HTTP 200, 30353 bytes

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-spinner` vs stored baseline | 460×1640 | 0 | 754400 |

After PNG is the same 41461 bytes as the stored baseline (SHA-256 `b1709c1e01601d3b439954b312939b2b42016e4974bab43384833aec08f43074`). Baseline PNG was not edited.

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-display.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-spinner` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_spinner_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_spinner_after.png`
- `/opt/cursor/artifacts/land_spinner_pixel_diff.png`

## Wiring

Same pattern as land-display. Stencil 4 `excludeComponents` is prod-only. `spinner.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-spinner` from the loader.

Mitosis Lit is built from `packages/components/mitosis/spinner/Spinner.lite.tsx` (`tagName: 'p-spinner'`, own `mitosis.config.js` so display/text/heading/icon/model-signature/flag/wordmark/crest/divider output is not regenerated). `scripts/build-lit-spinner.mjs` strips `<my-fragment>` after `mitosis build`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-spinner.iife.js`. Playground `index.html` loads that IIFE next to the display bundle.

Generated `Spinner.ts` has `@customElement("p-spinner")`. `rg my-fragment` on it is empty. The lite source uses a single `<div>` root (`<style>` + sr-only span + `<svg>`), so the generator never wrapped a fragment.

## Follow-ups

- `generateConstructorMap` still imports the stub `Spinner` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start tag.
