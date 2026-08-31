# land-button

**unit:** playground `p-button` from Mitosis Lit (not Stencil, not `lit-button`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `5f7142a48d`
**accept SHA:** (this commit)

Playground `p-button` is Mitosis Lit (`LitButton` / `@customElement("p-button")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `switch`.

## Playground

- URL: `http://localhost:3333/?components=button`
- Card: `[data-card="button"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 21 `<p-button>` (no `lit-button`)
- Constructor: `LitButton` (`elementProperties` present)
- Nested: `<p-icon>` / `LitIcon` and `<p-spinner>` / `LitSpinner` (no `lit-icon` / `lit-spinner`). First four hosts hide the icon (`icon` default `none`); others use `car`
- Shadow: `style` cssText + `<button class="root">` + `<p-icon>` + `<p-spinner>` + `<slot>`, no `my-fragment`
- Stencil loader: exact `"p-button"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-button.iife.js` HTTP 200, 36102 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-button` vs stored baseline | 460×1640 | 0 | 754400 |

After PNG is the same 52720 bytes as the stored baseline (SHA-256 `b0323af739629d1646d9bbd4e30795e6d45cfdd697fb0f38ff0cc06318909c88`). Baseline PNG was not edited (mtime `2026-08-30`).

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-button-pure.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-button` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_button_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_button_after.png`
- `/opt/cursor/artifacts/land_button_pixel_diff.png`

## Wiring

Same pattern as land-button-pure. Stencil 4 `excludeComponents` is prod-only. `button.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-button` from the loader.

`HTMLPButtonElement` stays on the stub because `implicitSubmit.ts` still types those hosts.

Mitosis Lit is built from `packages/components/mitosis/button/Button.lite.tsx` (`tagName: 'p-button'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons and spinners stay `<p-icon>` / `<p-spinner>`. `scripts/build-lit-button.mjs` strips `<my-fragment>` after `mitosis build`, restores `root` / `icon` / `spinner` / `label` / `loading` classes Mitosis drops, maps `iconSource` / `hideLabel` to kebab attributes, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-button.iife.js`. Playground `index.html` loads that IIFE next to the button-pure bundle.

Generated `Button.ts` has `@customElement("p-button")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `Button` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start switch.
