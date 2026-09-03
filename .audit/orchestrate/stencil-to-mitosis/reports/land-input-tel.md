# land-input-tel

**unit:** playground `p-input-tel` from Mitosis Lit (not Stencil, not `lit-input-tel`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `91acf3533c`
**accept SHA:** (this commit)

Playground `p-input-tel` is Mitosis Lit (`LitInputTel` / `@customElement("p-input-tel")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `input-number`.

## Playground

- URL: `http://localhost:3333/?components=input-tel`
- Card: `[data-card="input-tel"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 6 `<p-input-tel>` (default, loading, success+message, error+message, disabled, read-only). None set `indicator`.
- Constructor: `LitInputTel`
- Nested: `<p-icon>` / `LitIcon` and `<p-spinner>` / `LitSpinner`. Wrapper phone icon stays in the template but CSS hides it when `indicator` is unset. Message icons use `check` / `exclamation` with CDN `source` (`check.8ba06be.svg`, `exclamation.46cd17b.svg`) because `LitIcon` files map only has `car` and `arrow-right`.
- Shadow: `style` cssText + native `input[type=tel]` + hidden phone `<p-icon>` + `<p-spinner>` + message `<p-icon>` + label/message, no `my-fragment`
- Native input: `.value` bound, `?disabled` / `?readonly`, `maxLength` / `readOnly` set in `updated()`
- Stencil loader: exact `"p-input-tel"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-input-tel.iife.js` HTTP 200, 39483 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-input-tel` vs stored baseline | 460×1370 | 0 | 630200 |

After PNG is the same 58624 bytes as the stored baseline (SHA-256 `cf25aad40596a31c4752bff18ddd181259d5a0a2c5bc208afe2f4c8911384a4c`). Baseline PNG was not edited.

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-input-url.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-input-tel` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_tel_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_input_tel_after.png`
- `/opt/cursor/artifacts/land_input_tel_verify.log`

## Wiring

Same pattern as land-input-url / land-input-search. Stencil 4 `excludeComponents` is prod-only. `input-tel.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-input-tel` from the loader.

`HTMLPInputTelElement` stays on the stub (`declare global`) and in `html-p-input-tel-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PInputTel` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/input-tel/InputTel.lite.tsx` (`tagName: 'p-input-tel'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons and spinners stay `<p-icon>` / `<p-spinner>`. `scripts/build-lit-input-tel.mjs` strips `<my-fragment>` after `mitosis build`, binds `.value` / `?disabled` / `?readonly` / `updated()` IDL (same patches as the probe harness), maps `hideLabel` / `readOnly` / `maxLength` / `minLength` to kebab attrs, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-input-tel.iife.js`. Playground `index.html` loads that IIFE next to the input-url bundle.

Generated `InputTel.ts` has `@customElement("p-input-tel")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `InputTel` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start input-number.
