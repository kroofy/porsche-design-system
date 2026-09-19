# land-input-number

**unit:** playground `p-input-number` from Mitosis Lit (not Stencil, not `lit-input-number`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `4675988989`
**accept SHA:** (this commit)

Playground `p-input-number` is Mitosis Lit (`LitInputNumber` / `@customElement("p-input-number")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `input-date`.

## Playground

- URL: `http://localhost:3333/?components=input-number`
- Card: `[data-card="input-number"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 6 `<p-input-number>` (default, loading, success+message, error+message, disabled, read-only). All set `controls="true"` and `value="123"`.
- Constructor: `LitInputNumber`
- Nested: `<p-icon>` / `LitIcon`, `<p-spinner>` / `LitSpinner`, `<p-button-pure>` / `LitButtonPure`. Plus/minus controls use `icon="minus"` / `icon="plus"` with CDN `icon-source` (`minus.f6d964c.svg`, `plus.319993e.svg`). Message icons use `check` / `exclamation` with CDN `source` (`check.8ba06be.svg`, `exclamation.46cd17b.svg`) because `LitIcon` files map only has `car` and `arrow-right`.
- Shadow: `style` cssText + native `input[type=number]` + two `p-button-pure.button` + `<p-spinner>` + message `<p-icon>` + label/message, no `my-fragment`
- Native input: `.value` bound, `?disabled` / `?readonly`, `maxLength` / `readOnly` set in `updated()`
- Stencil loader: exact `"p-input-number"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-input-number.iife.js` HTTP 200, 40115 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-input-number` vs stored baseline | 460×1370 | 0 | 630200 |

After PNG is the same 50095 bytes as the stored baseline (SHA-256 `e20f51d61f91b10ad397b52739f7b6d4af0960d0bf6f9e30e53899cc6453e6ab`). Baseline PNG was not edited.

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-input-tel.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-input-number` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_number_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_input_number_after.png`
- `/opt/cursor/artifacts/land_input_number_verify.log`

## Wiring

Same pattern as land-input-tel / land-input-url. Stencil 4 `excludeComponents` is prod-only. `input-number.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-input-number` from the loader.

`HTMLPInputNumberElement` stays on the stub (`declare global`) and in `html-p-input-number-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PInputNumber` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/input-number/InputNumber.lite.tsx` (`tagName: 'p-input-number'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons, spinners, and buttons stay `<p-icon>` / `<p-spinner>` / `<p-button-pure>`. `scripts/build-lit-input-number.mjs` strips `<my-fragment>` after `mitosis build`, binds `.value` / `?disabled` / `?readonly` / `updated()` IDL, maps `hideLabel` / `readOnly` / `maxLength` / `minLength` to kebab attrs, reads `controls` from the attribute, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-input-number.iife.js`. Playground `index.html` loads that IIFE next to the input-tel bundle.

Generated `InputNumber.ts` has `@customElement("p-input-number")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `InputNumber` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start input-date.
