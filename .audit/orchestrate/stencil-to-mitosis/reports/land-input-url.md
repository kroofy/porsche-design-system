# land-input-url

**unit:** playground `p-input-url` from Mitosis Lit (not Stencil, not `lit-input-url`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `6f3e159f3d`
**accept SHA:** (this commit)

Playground `p-input-url` is Mitosis Lit (`LitInputUrl` / `@customElement("p-input-url")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `input-tel`.

## Playground

- URL: `http://localhost:3333/?components=input-url`
- Card: `[data-card="input-url"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 6 `<p-input-url>` (indicator, loading, success+message, error+message, disabled, read-only)
- Constructor: `LitInputUrl`
- Nested: `<p-icon>` / `LitIcon` and `<p-spinner>` / `LitSpinner`. Indicator icon uses `linked` with CDN `source` `linked.8f30cb5.svg`. Message icons use `check` / `exclamation` with CDN `source` (`check.8ba06be.svg`, `exclamation.46cd17b.svg`) because `LitIcon` files map only has `car` and `arrow-right`
- Shadow: `style` cssText + native `input[type=url]` + linked `<p-icon>` + `<p-spinner>` + message `<p-icon>` + label/message, no `my-fragment`
- Native input: `.value` bound, `?disabled` / `?readonly`, `maxLength` / `readOnly` set in `updated()`
- Stencil loader: exact `"p-input-url"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-input-url.iife.js` HTTP 200, 39485 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-input-url` vs stored baseline | 460×1370 | 0 | 630200 |

After PNG is the same 63042 bytes as the stored baseline (SHA-256 `bdf6bfb33c81b3b83858b8dcefbdd906834ab0c41c5d688c6a0a04945dd43974`). Baseline PNG was not edited (mtime `2026-08-30`).

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-input-search.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-input-url` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_input_url_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_input_url_after.png`
- `/opt/cursor/artifacts/land_input_url_verify.log`

## Wiring

Same pattern as land-input-email / land-input-search. Stencil 4 `excludeComponents` is prod-only. `input-url.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-input-url` from the loader.

`HTMLPInputUrlElement` stays on the stub (`declare global`) and in `html-p-input-url-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PInputUrl` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/input-url/InputUrl.lite.tsx` (`tagName: 'p-input-url'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons and spinners stay `<p-icon>` / `<p-spinner>`. `scripts/build-lit-input-url.mjs` strips `<my-fragment>` after `mitosis build`, binds `.value` / `?disabled` / `?readonly` / `updated()` IDL (same patches as the probe harness), maps `hideLabel` / `readOnly` / `maxLength` / `minLength` to kebab attrs, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-input-url.iife.js`. Playground `index.html` loads that IIFE next to the input-search bundle.

Generated `InputUrl.ts` has `@customElement("p-input-url")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `InputUrl` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start input-tel.
