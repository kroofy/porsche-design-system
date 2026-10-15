# land-input-month

**unit:** playground `p-input-month` from Mitosis Lit (not Stencil, not `lit-input-month`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `9580183841`
**accept SHA:** (this commit)

Playground `p-input-month` is Mitosis Lit (`LitInputMonth` / `@customElement("p-input-month")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `input-time`.

## Playground

- URL: `http://localhost:3333/?components=input-month`
- Card: `[data-card="input-month"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 6 `<p-input-month>` (default, loading, success+message, error+message, disabled, read-only). All set `controls="true"` and `value="2018-05"`.
- Constructor: `LitInputMonth`
- Nested: `<p-icon>` / `LitIcon`, `<p-spinner>` / `LitSpinner`, `<p-button-pure>` / `LitButtonPure`. Calendar control uses `icon="calendar"` with CDN `icon-source` `calendar.70a6a12.svg`. Message icons use `check` / `exclamation` with CDN `source` (`check.8ba06be.svg`, `exclamation.46cd17b.svg`) because `LitIcon` files map only has `car` and `arrow-right`.
- Shadow: `style` cssText + native `input[type=month]` + `p-button-pure.button` + `<p-spinner>` + message `<p-icon>` + label/message, no `my-fragment`
- Native picker: `input::-webkit-calendar-picker-indicator{display:none}`
- Native input: `.value` bound, `?disabled` / `?readonly`, `readOnly` set in `updated()`
- Stencil loader: exact `"p-input-month"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-input-month.iife.js` HTTP 200, 38974 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-input-month` vs stored baseline | 460×1370 | 0 | 630200 |

After PNG is the same 60956 bytes as the stored baseline (SHA-256 `7dccd9e00ded863e2acb281c4ada0ed96d51ae4705ec152e0e18177cff5a0ada`). Baseline PNG was not edited.

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-input-date.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-input-month` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_month_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_input_month_after.png`
- `/opt/cursor/artifacts/land_input_month_verify.log`

## Wiring

Same pattern as land-input-date / land-input-number. Stencil 4 `excludeComponents` is prod-only. `input-month.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-input-month` from the loader.

`HTMLPInputMonthElement` stays on the stub (`declare global`) and in `html-p-input-month-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PInputMonth` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/input-month/InputMonth.lite.tsx` (`tagName: 'p-input-month'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons, spinners, and buttons stay `<p-icon>` / `<p-spinner>` / `<p-button-pure>`. `scripts/build-lit-input-month.mjs` strips `<my-fragment>` after `mitosis build`, binds `.value` / `?disabled` / `?readonly` / `updated()` IDL, maps `hideLabel` / `readOnly` to kebab attrs, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-input-month.iife.js`. Playground `index.html` loads that IIFE next to the input-date bundle.

Generated `InputMonth.ts` has `@customElement("p-input-month")`. `rg my-fragment` on it is empty.

Stencil `p-input-month` does not declare a `controls` prop. The playground still sets `controls="true"`. The calendar button is always in the Lit template, matching Stencil `hasShowPickerSupport()`.

## Follow-ups

- `generateConstructorMap` still imports the stub `InputMonth` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start input-time.
