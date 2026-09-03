# land-input-password

**unit:** playground `p-input-password` from Mitosis Lit (not Stencil, not `lit-input-password`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `d2d118fd3b`
**accept SHA:** (this commit)

Playground `p-input-password` is Mitosis Lit (`LitInputPassword` / `@customElement("p-input-password")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `input-search`.

## Playground

- URL: `http://localhost:3333/?components=input-password`
- Card: `[data-card="input-password"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 6 `<p-input-password>` (toggle, loading, success+message, error+message, disabled, read-only)
- Constructor: `LitInputPassword`
- Nested: `<p-button-pure>` / `LitButtonPure` visibility toggle (`icon="view"`), `<p-icon>` / `LitIcon`, `<p-spinner>` / `LitSpinner`. Toggle uses CDN `icon-source` `view.5b4d7f6.svg`. Message icons use `check` / `exclamation` with CDN `source` (`check.8ba06be.svg`, `exclamation.46cd17b.svg`) because `LitIcon` files map only has `car` and `arrow-right`
- Shadow: `style` cssText + native `input[type=password]` + toggle `<p-button-pure class="button">` + `<p-spinner>` + message `<p-icon>` + label/message, no `my-fragment`
- Native input: `.value` bound, `?disabled` / `?readonly`, `maxLength` / `readOnly` set in `updated()`
- Stencil loader: exact `"p-input-password"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-input-password.iife.js` HTTP 200, 39736 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-input-password` vs stored baseline | 460×1370 | 0 | 630200 |

After PNG is the same 50036 bytes as the stored baseline (SHA-256 `aeaa6b6f50136663b4224d76f925309d618afce3ba633bec908fe5f5660f8d46`). Baseline PNG was not edited (mtime `2026-08-30`).

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-input-email.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-input-password` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_password_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_input_password_after.png`
- `/opt/cursor/artifacts/land_input_password_verify.log`

## Wiring

Same pattern as land-input-email. Stencil 4 `excludeComponents` is prod-only. `input-password.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-input-password` from the loader.

`HTMLPInputPasswordElement` stays on the stub in case other files still type those hosts.

Mitosis Lit is built from `packages/components/mitosis/input-password/InputPassword.lite.tsx` (`tagName: 'p-input-password'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons, spinners, and the visibility toggle stay `<p-icon>` / `<p-spinner>` / `<p-button-pure>`. `scripts/build-lit-input-password.mjs` strips `<my-fragment>` after `mitosis build`, binds `.value` / `?disabled` / `?readonly` / `updated()` IDL (same patches as the probe harness), maps `hideLabel` / `readOnly` / `maxLength` / `minLength` to kebab attrs, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-input-password.iife.js`. Playground `index.html` loads that IIFE next to the input-email bundle.

Generated `InputPassword.ts` has `@customElement("p-input-password")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `InputPassword` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start input-search.
