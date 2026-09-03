# land-input-search

**unit:** playground `p-input-search` from Mitosis Lit (not Stencil, not `lit-input-search`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `b3c7415d2d`
**accept SHA:** (this commit)

Playground `p-input-search` is Mitosis Lit (`LitInputSearch` / `@customElement("p-input-search")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `input-url`.

## Playground

- URL: `http://localhost:3333/?components=input-search`
- Card: `[data-card="input-search"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 6 `<p-input-search>` (indicator+clear, loading, success+message, error+message, disabled, read-only)
- Constructor: `LitInputSearch`
- Nested: `<p-icon>` / `LitIcon` search indicator, `<p-button-pure>` / `LitButtonPure` clear (`icon="close"`), `<p-spinner>` / `LitSpinner`. Indicator uses CDN `source` `search.3f0f1ce.svg`. Clear uses CDN `icon-source` `close.eec3c5d.svg`. Message icons use `check` / `exclamation` with CDN `source` (`check.8ba06be.svg`, `exclamation.46cd17b.svg`) because `LitIcon` files map only has `car` and `arrow-right`
- Shadow: `style` cssText + native `input[type=search]` + search `<p-icon>` + clear `<p-button-pure class="button">` + `<p-spinner>` + message `<p-icon>` + label/message, no `my-fragment`
- Native input: `.value` bound, `?disabled` / `?readonly`, `maxLength` / `readOnly` set in `updated()`
- Stencil loader: exact `"p-input-search"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-input-search.iife.js` HTTP 200, 40351 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-input-search` vs stored baseline | 460×1370 | 0 | 630200 |

After PNG is the same 63484 bytes as the stored baseline (SHA-256 `8b803948b72ed77fa10f355be8da593f16a1d112d7f5cab96e8c92101c425ef9`). Baseline PNG was not edited (mtime `2026-08-30`).

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-input-password.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-input-search` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_search_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_input_search_after.png`
- `/opt/cursor/artifacts/land_input_search_verify.log`

## Wiring

Same pattern as land-input-password. Stencil 4 `excludeComponents` is prod-only. `input-search.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-input-search` from the loader.

`HTMLPInputSearchElement` stays on the stub (`declare global`) and in `html-p-input-search-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PInputSearch` block; the sidecar keeps the host type so search is not left without the interface.

Mitosis Lit is built from `packages/components/mitosis/input-search/InputSearch.lite.tsx` (`tagName: 'p-input-search'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons, spinners, and the clear button stay `<p-icon>` / `<p-spinner>` / `<p-button-pure>`. `scripts/build-lit-input-search.mjs` strips `<my-fragment>` after `mitosis build`, binds `.value` / `?disabled` / `?readonly` / `updated()` IDL (same patches as the probe harness), maps `hideLabel` / `readOnly` / `maxLength` / `minLength` to kebab attrs, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-input-search.iife.js`. Playground `index.html` loads that IIFE next to the input-password bundle.

Generated `InputSearch.ts` has `@customElement("p-input-search")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `InputSearch` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start input-url.
