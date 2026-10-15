# land-input-week

**unit:** playground `p-input-week` from Mitosis Lit (not Stencil, not `lit-input-week`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `c43b52f7de`
**accept SHA:** (this commit)

Playground `p-input-week` is Mitosis Lit (`LitInputWeek` / `@customElement("p-input-week")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `textarea`.

## Playground

- URL: `http://localhost:3333/?components=input-week`
- Card: `[data-card="input-week"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 6 `<p-input-week>` (default, loading, success+message, error+message, disabled, read-only). All set `controls="true"` and `value="2017-W01"`.
- Constructor: `LitInputWeek`
- Nested: `<p-icon>` / `LitIcon`, `<p-spinner>` / `LitSpinner`, `<p-button-pure>` / `LitButtonPure`. Calendar control uses `icon="calendar"` with CDN `icon-source` `calendar.70a6a12.svg`. Message icons use `check` / `exclamation` with CDN `source` (`check.8ba06be.svg`, `exclamation.46cd17b.svg`) because `LitIcon` files map only has `car` and `arrow-right`.
- Shadow: `style` cssText + native `input[type=week]` + `p-button-pure.button` + `<p-spinner>` + message `<p-icon>` + label/message, no `my-fragment`
- Native picker: `input::-webkit-calendar-picker-indicator{display:none}`
- Native input: `.value` bound, `?disabled` / `?readonly`, `readOnly` set in `updated()`
- Stencil loader: exact `"p-input-week"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-input-week.entry.js`.
- IIFE: `/assets/p-input-week.iife.js` HTTP 200, 38952 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-input-week` vs stored baseline | 460×1370 | 0 | 630200 |

After PNG is the same 62817 bytes as the stored baseline (SHA-256 `b4f5a34664b6de19536aef20632882519be2f0554896f9d38ad70a52e885f9fe`). Baseline PNG was not edited.

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-input-time.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-input-week` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_week_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_input_week_after.png`
- `/opt/cursor/artifacts/land_input_week_verify.log`

## Wiring

Same pattern as land-input-time / land-input-month. Stencil 4 `excludeComponents` is prod-only. `input-week.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-input-week` from the loader.

`HTMLPInputWeekElement` stays on the stub (`declare global`) and in `html-p-input-week-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PInputWeek` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/input-week/InputWeek.lite.tsx` (`tagName: 'p-input-week'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons, spinners, and buttons stay `<p-icon>` / `<p-spinner>` / `<p-button-pure>`. `scripts/build-lit-input-week.mjs` strips `<my-fragment>` after `mitosis build`, binds `.value` / `?disabled` / `?readonly` / `updated()` IDL, maps `hideLabel` / `readOnly` to kebab attrs, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-input-week.iife.js`. Playground `index.html` loads that IIFE next to the input-time bundle.

Generated `InputWeek.ts` has `@customElement("p-input-week")`. `rg my-fragment` on it is empty.

Stencil `p-input-week` does not declare a `controls` prop. The playground still sets `controls="true"`. The calendar button is always in the Lit template, matching Stencil `hasShowPickerSupport()`.

Probe `packages/mitosis-probe-lit/src/InputWeek.lite.tsx` `tagName` is now `'p-input-week'`.

## Follow-ups

- `generateConstructorMap` still imports the stub `InputWeek` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start textarea.
