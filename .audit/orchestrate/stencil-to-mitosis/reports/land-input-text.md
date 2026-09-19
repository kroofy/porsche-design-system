# land-input-text

**unit:** playground `p-input-text` from Mitosis Lit (not Stencil, not `lit-input-text`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `08b9c93ede`
**accept SHA:** (this commit)

Playground `p-input-text` is Mitosis Lit (`LitInputText` / `@customElement("p-input-text")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `input-email`.

## Playground

- URL: `http://localhost:3333/?components=input-text`
- Card: `[data-card="input-text"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 6 `<p-input-text>` (counter, loading, success+message, error+message, disabled, read-only)
- Constructor: `LitInputText`
- Nested: `<p-icon>` / `LitIcon` and `<p-spinner>` / `LitSpinner`. Message icons use `check` / `exclamation` with CDN `source` because `LitIcon` files map only has `car` and `arrow-right`
- Shadow: `style` cssText + native `input[type=text]` + `<p-spinner>` + `<p-icon>` + label/message, no `my-fragment`
- Native input: `.value` bound, `?disabled` / `?readonly`, `maxLength` / `minLength` / `readOnly` set in `updated()`
- Stencil loader: exact `"p-input-text"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-input-text.iife.js` HTTP 200, 40705 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-input-text` vs stored baseline | 460×1370 | 0 | 630200 |

After PNG is the same 62660 bytes as the stored baseline (SHA-256 `b0c9444b2b85dfbdade32bda0455025e9f4e5d561b32d0a158792105af95fdac`). Baseline PNG was not edited (mtime `2026-08-30`).

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-checkbox.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-input-text` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_text_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_input_text_after.png`
- `/opt/cursor/artifacts/land_input_text_verify.log`

## Wiring

Same pattern as land-checkbox. Stencil 4 `excludeComponents` is prod-only. `input-text.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-input-text` from the loader.

`HTMLPInputTextElement` stays on the stub in case other files still type those hosts.

Mitosis Lit is built from `packages/components/mitosis/input-text/InputText.lite.tsx` (`tagName: 'p-input-text'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons and spinners stay `<p-icon>` / `<p-spinner>`. `scripts/build-lit-input-text.mjs` strips `<my-fragment>` after `mitosis build`, binds `.value` / `?disabled` / `?readonly` / `updated()` IDL (same patches as the probe harness), maps `hideLabel` / `readOnly` / `maxLength` / `minLength` to kebab attrs, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-input-text.iife.js`. Playground `index.html` loads that IIFE next to the checkbox bundle.

Generated `InputText.ts` has `@customElement("p-input-text")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `InputText` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start input-email.
