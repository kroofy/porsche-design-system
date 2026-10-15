# land-input-email

**unit:** playground `p-input-email` from Mitosis Lit (not Stencil, not `lit-input-email`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `7494f0924f`
**accept SHA:** (this commit)

Playground `p-input-email` is Mitosis Lit (`LitInputEmail` / `@customElement("p-input-email")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `input-password`.

## Playground

- URL: `http://localhost:3333/?components=input-email`
- Card: `[data-card="input-email"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 6 `<p-input-email>` (indicator, loading, success+message, error+message, disabled, read-only)
- Constructor: `LitInputEmail`
- Nested: `<p-icon>` / `LitIcon` and `<p-spinner>` / `LitSpinner`. Indicator icon uses CDN `source` `email.f2530de.svg`. Message icons use `check` / `exclamation` with CDN `source` (`check.8ba06be.svg`, `exclamation.46cd17b.svg`) because `LitIcon` files map only has `car` and `arrow-right`
- Shadow: `style` cssText + native `input[type=email]` + email `<p-icon>` + `<p-spinner>` + message `<p-icon>` + label/message, no `my-fragment`
- Native input: `.value` bound, `?disabled` / `?readonly`, `maxLength` / `readOnly` set in `updated()`
- Stencil loader: exact `"p-input-email"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-input-email.iife.js` HTTP 200, 39531 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-input-email` vs stored baseline | 460×1370 | 0 | 630200 |

After PNG is the same 61833 bytes as the stored baseline (SHA-256 `a3c29073ad522b9f7c2446d0083071284a40a451968482511c77625c8b8a3968`). Baseline PNG was not edited (mtime `2026-08-30`).

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-input-text.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-input-email` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_email_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_input_email_after.png`
- `/opt/cursor/artifacts/land_input_email_verify.log`

## Wiring

Same pattern as land-input-text. Stencil 4 `excludeComponents` is prod-only. `input-email.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-input-email` from the loader.

`HTMLPInputEmailElement` stays on the stub in case other files still type those hosts.

Mitosis Lit is built from `packages/components/mitosis/input-email/InputEmail.lite.tsx` (`tagName: 'p-input-email'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons and spinners stay `<p-icon>` / `<p-spinner>`. `scripts/build-lit-input-email.mjs` strips `<my-fragment>` after `mitosis build`, binds `.value` / `?disabled` / `?readonly` / `updated()` IDL (same patches as the probe harness), maps `hideLabel` / `readOnly` / `maxLength` / `minLength` to kebab attrs, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-input-email.iife.js`. Playground `index.html` loads that IIFE next to the input-text bundle.

Generated `InputEmail.ts` has `@customElement("p-input-email")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `InputEmail` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start input-password.
