# land-fieldset

**unit:** playground `p-fieldset` from Mitosis Lit (not Stencil, not `lit-fieldset`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `27a5c989ed`
**accept SHA:** (this commit)

Playground `p-fieldset` is Mitosis Lit (`LitFieldset` / `@customElement("p-fieldset")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `text-list`.

## Playground

- URL: `http://localhost:3333/?components=fieldset`
- Card: `[data-card="fieldset"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 4 `<p-fieldset>` (default, `label-size=small`, success+message, error+message). Each slots two `<p-input-text>` in the default slot (`p-input-text` is already Mitosis / `LitInputText`).
- Constructor: `LitFieldset`
- Nested: `<p-icon>` / `LitIcon` for state messages. Message icons use `check` / `exclamation` with CDN `source` (`check.8ba06be.svg`, `exclamation.46cd17b.svg`) because `LitIcon` files map only has `car` and `arrow-right`.
- Shadow: `style` cssText + native `<fieldset>` + `<legend>` + default `<slot>` + message `<p-icon>`, no `my-fragment`
- Stencil loader: exact `"p-fieldset"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-fieldset.entry.js`.
- IIFE: `/assets/p-fieldset.iife.js` HTTP 200, 29559 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-fieldset` vs stored baseline | 460×1640 | 0 | 754400 |

After PNG is the same 57315 bytes as the stored baseline (SHA-256 `f28641108c3c39f8cf7668ca741c177780cf9e5bedb180ed6b5d7898992511d6`). Baseline PNG was not edited.

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-textarea.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-fieldset` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_fieldset_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_fieldset_after.png`
- `/opt/cursor/artifacts/land_fieldset_verify.log`

## Wiring

Same pattern as land-textarea / land-input-week. Stencil 4 `excludeComponents` is prod-only. `fieldset.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-fieldset` from the loader.

`HTMLPFieldsetElement` stays on the stub (`declare global`) and in `html-p-fieldset-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PFieldset` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/fieldset/Fieldset.lite.tsx` (`tagName: 'p-fieldset'`, own `mitosis.config.js` so prior lands are not regenerated). Nested inputs stay `<p-input-text>` in the default slot. Same tag name, so light-DOM children stay in place. `scripts/build-lit-fieldset.mjs` strips `<my-fragment>` after `mitosis build`, maps `labelSize` to `label-size`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-fieldset.iife.js`. Playground `index.html` loads that IIFE next to the textarea bundle.

Generated `Fieldset.ts` has `@customElement("p-fieldset")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Fieldset.lite.tsx` `tagName` is now `'p-fieldset'`.

## Follow-ups

- `generateConstructorMap` still imports the stub `Fieldset` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start text-list.
