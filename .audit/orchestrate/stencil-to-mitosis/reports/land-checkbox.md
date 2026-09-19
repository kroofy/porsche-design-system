# land-checkbox

**unit:** playground `p-checkbox` from Mitosis Lit (not Stencil, not `lit-checkbox`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `47befa23d6`
**accept SHA:** (this commit)

Playground `p-checkbox` is Mitosis Lit (`LitCheckbox` / `@customElement("p-checkbox")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `input-text`.

## Playground

- URL: `http://localhost:3333/?components=checkbox`
- Card: `[data-card="checkbox"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 13 `<p-checkbox>` (no `lit-checkbox`)
- Constructor: `LitCheckbox` (`elementProperties` present)
- Nested: `<p-icon>` / `LitIcon` and `<p-spinner>` / `LitSpinner`. Spinner hidden unless `loading`. Message icons use `check` / `exclamation` with CDN `source` (`check.8ba06be.svg`, `exclamation.46cd17b.svg`) because `LitIcon` files map only has `car` and `arrow-right`
- Shadow: `style` cssText + `<div class="root">` + native `input[type=checkbox]` + `<p-spinner>` + `<p-icon>` + label, no `my-fragment`
- Native input: `.checked` bound, `indeterminate` set in `updated()`
- Stencil loader: exact `"p-checkbox"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-checkbox.iife.js` HTTP 200, 38237 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-checkbox` vs stored baseline | 460×1436 | 0 | 660560 |

After PNG is the same 80326 bytes as the stored baseline (SHA-256 `73a8bf9c140246d8530807f35dca3c4d1a8703a9ad89983c316a1888ddfb87e0`). Baseline PNG was not edited (mtime `2026-08-30`).

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-switch.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-checkbox` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_checkbox_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_checkbox_after.png`
- `/opt/cursor/artifacts/land_checkbox_pixel_diff.png`

## Wiring

Same pattern as land-switch. Stencil 4 `excludeComponents` is prod-only. `checkbox.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-checkbox` from the loader.

`HTMLPCheckboxElement` stays on the stub in case other files still type those hosts.

Mitosis Lit is built from `packages/components/mitosis/checkbox/Checkbox.lite.tsx` (`tagName: 'p-checkbox'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons and spinners stay `<p-icon>` / `<p-spinner>`. `scripts/build-lit-checkbox.mjs` strips `<my-fragment>` after `mitosis build`, binds `.checked` / `?disabled` / `updated()` indeterminate (same patches as the probe harness), maps `hideLabel` to `hide-label`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-checkbox.iife.js`. Playground `index.html` loads that IIFE next to the switch bundle.

Mitosis Lit does not emit `formAssociated`. The playground card does not need it.

Generated `Checkbox.ts` has `@customElement("p-checkbox")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `Checkbox` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start input-text.
