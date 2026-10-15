# land-input-time

**unit:** playground `p-input-time` from Mitosis Lit (not Stencil, not `lit-input-time`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `d87db22f35`
**accept SHA:** (this commit)

Playground `p-input-time` is Mitosis Lit (`LitInputTime` / `@customElement("p-input-time")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `input-week`.

## Playground

- URL: `http://localhost:3333/?components=input-time`
- Card: `[data-card="input-time"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 6 `<p-input-time>` (default with slotted `p-popover` `label-after`, loading, success+message, error+message, disabled, read-only). All use `value="09:11"`.
- Constructor: `LitInputTime`
- Nested: `<p-icon>` / `LitIcon`, `<p-spinner>` / `LitSpinner`, `<p-button-pure>` / `LitButtonPure`. Clock control uses `icon="clock"` with CDN `icon-source` `clock.c88a1ef.svg`. Message icons use `check` / `exclamation` with CDN `source` (`check.8ba06be.svg`, `exclamation.46cd17b.svg`) because `LitIcon` files map only has `car` and `arrow-right`. First host keeps `<p-popover slot="label-after">` in light DOM (`p-popover` stays Stencil).
- Shadow: `style` cssText + native `input[type=time]` + `p-button-pure.button` + `<p-spinner>` + message `<p-icon>` + label/message, no `my-fragment`
- Native picker: `input::-webkit-calendar-picker-indicator{display:none}`
- Native input: `.value` bound, `?disabled` / `?readonly`, `readOnly` set in `updated()`
- Stencil loader: exact `"p-input-time"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-input-time.entry.js`.
- IIFE: `/assets/p-input-time.iife.js` HTTP 200, 38914 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-input-time` vs stored baseline | 460×1370 | 0 | 630200 |

After PNG is the same 66054 bytes as the stored baseline (SHA-256 `f095076a7af30a3431912314c40e4c56358cc9285bc3b4cc74f9f0b74554be09`). Baseline PNG was not edited.

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-input-month.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-input-time` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_time_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_input_time_after.png`
- `/opt/cursor/artifacts/land_input_time_verify.log`

## Wiring

Same pattern as land-input-month / land-input-date. Stencil 4 `excludeComponents` is prod-only. `input-time.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-input-time` from the loader.

`HTMLPInputTimeElement` stays on the stub (`declare global`) and in `html-p-input-time-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PInputTime` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/input-time/InputTime.lite.tsx` (`tagName: 'p-input-time'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons, spinners, and buttons stay `<p-icon>` / `<p-spinner>` / `<p-button-pure>`. `scripts/build-lit-input-time.mjs` strips `<my-fragment>` after `mitosis build`, binds `.value` / `?disabled` / `?readonly` / `updated()` IDL, maps `hideLabel` / `readOnly` to kebab attrs, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-input-time.iife.js`. Playground `index.html` loads that IIFE next to the input-month bundle.

Generated `InputTime.ts` has `@customElement("p-input-time")`. `rg my-fragment` on it is empty.

The clock button is always in the Lit template, matching Stencil `hasShowPickerSupport()`.

Probe `packages/mitosis-probe-lit/src/InputTime.lite.tsx` `tagName` is now `'p-input-time'`.

## Follow-ups

- `generateConstructorMap` still imports the stub `InputTime` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start input-week.
