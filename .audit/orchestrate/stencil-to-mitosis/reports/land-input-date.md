# land-input-date

**unit:** playground `p-input-date` from Mitosis Lit (not Stencil, not `lit-input-date`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `97690733ef`
**accept SHA:** (this commit)

Playground `p-input-date` is Mitosis Lit (`LitInputDate` / `@customElement("p-input-date")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `input-month`.

## Playground

- URL: `http://localhost:3333/?components=input-date`
- Card: `[data-card="input-date"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 6 `<p-input-date>` (default, loading, success+message, error+message, disabled, read-only). All use `value="1931-04-25"`.
- Constructor: `LitInputDate`
- Nested: `<p-icon>` / `LitIcon`, `<p-spinner>` / `LitSpinner`, `<p-button-pure>` / `LitButtonPure`. Calendar control uses `icon="calendar"` with CDN `icon-source` `calendar.70a6a12.svg`. Message icons use `check` / `exclamation` with CDN `source` (`check.8ba06be.svg`, `exclamation.46cd17b.svg`) because `LitIcon` files map only has `car` and `arrow-right`.
- Shadow: `style` cssText + native `input[type=date]` + `p-button-pure.button` + `<p-spinner>` + message `<p-icon>` + label/message, no `my-fragment`
- Native picker: `input::-webkit-calendar-picker-indicator{display:none}`
- Native input: `.value` bound, `?disabled` / `?readonly`, `readOnly` set in `updated()`
- Stencil loader: exact `"p-input-date"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-input-date.iife.js` HTTP 200, 38926 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-input-date` vs stored baseline | 460×1370 | 0 | 630200 |

After PNG is the same 64681 bytes as the stored baseline (SHA-256 `258e16ee9f6ca30c9270f58f2cc82da8e334e93763f436bd0079e05af456a95e`). Baseline PNG was not edited.

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-input-number.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-input-date` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_date_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_input_date_after.png`
- `/opt/cursor/artifacts/land_input_date_verify.log`

## Wiring

Same pattern as land-input-number / land-input-tel. Stencil 4 `excludeComponents` is prod-only. `input-date.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-input-date` from the loader.

`HTMLPInputDateElement` stays on the stub (`declare global`) and in `html-p-input-date-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PInputDate` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/input-date/InputDate.lite.tsx` (`tagName: 'p-input-date'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons, spinners, and buttons stay `<p-icon>` / `<p-spinner>` / `<p-button-pure>`. `scripts/build-lit-input-date.mjs` strips `<my-fragment>` after `mitosis build`, binds `.value` / `?disabled` / `?readonly` / `updated()` IDL, maps `hideLabel` / `readOnly` to kebab attrs, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-input-date.iife.js`. Playground `index.html` loads that IIFE next to the input-number bundle.

Generated `InputDate.ts` has `@customElement("p-input-date")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `InputDate` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start input-month.
