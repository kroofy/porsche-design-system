# land-switch

**unit:** playground `p-switch` from Mitosis Lit (not Stencil, not `lit-switch`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `5136d6e54c`
**accept SHA:** (this commit)

Playground `p-switch` is Mitosis Lit (`LitSwitch` / `@customElement("p-switch")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `checkbox`.

## Playground

- URL: `http://localhost:3333/?components=switch`
- Card: `[data-card="switch"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 6 `<p-switch>` (no `lit-switch`)
- Constructor: `LitSwitch` (`elementProperties` present)
- Nested: `<p-spinner>` / `LitSpinner` (no `lit-spinner`). Hidden unless `loading`
- Shadow: `style` cssText + `<div class="wrap">` + `<button role="switch">` + `<span class="toggle">` + `<p-spinner>` + `<slot>`, no `my-fragment`
- Stencil loader: exact `"p-switch"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-switch.iife.js` HTTP 200, 34252 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-switch` vs stored baseline | 460×586 | 0 | 269560 |

After PNG is the same 35256 bytes as the stored baseline (SHA-256 `e0e91056e2505f04868af3800d38197672d11c6532f05334b202823aa70d953e`). Baseline PNG was not edited (mtime `2026-08-30`).

The land script uses `page.screenshot({ clip })`, same recipe as land-button.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-switch` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_switch_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_switch_after.png`
- `/opt/cursor/artifacts/land_switch_pixel_diff.png`

## Wiring

Same pattern as land-button. Stencil 4 `excludeComponents` is prod-only. `switch.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-switch` from the loader.

`HTMLPSwitchElement` stays on the stub in case other files still type those hosts.

Mitosis Lit is built from `packages/components/mitosis/switch/Switch.lite.tsx` (`tagName: 'p-switch'`, own `mitosis.config.js` so prior lands are not regenerated). Nested spinner stays `<p-spinner>`. `scripts/build-lit-switch.mjs` strips `<my-fragment>` after `mitosis build`, restores `wrap` / `toggle` / `spinner` / `loading` classes Mitosis drops, maps `alignLabel` / `hideLabel` to kebab attributes, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-switch.iife.js`. Playground `index.html` loads that IIFE next to the button bundle.

Generated `Switch.ts` has `@customElement("p-switch")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `Switch` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start checkbox.
