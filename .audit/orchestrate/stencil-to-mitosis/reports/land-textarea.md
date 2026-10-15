# land-textarea

**unit:** playground `p-textarea` from Mitosis Lit (not Stencil, not `lit-textarea`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `324c312f3a`
**accept SHA:** (this commit)

Playground `p-textarea` is Mitosis Lit (`LitTextarea` / `@customElement("p-textarea")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `fieldset`.

## Playground

- URL: `http://localhost:3333/?components=textarea`
- Card: `[data-card="textarea"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 5 `<p-textarea>` (default rows=1+counter, success+message, error+message, disabled, read-only). Values are `Some value` with `max-length="100"`.
- Constructor: `LitTextarea`
- Nested: `<p-icon>` / `LitIcon`. Message icons use `check` / `exclamation` with CDN `source` (`check.8ba06be.svg`, `exclamation.46cd17b.svg`) because `LitIcon` files map only has `car` and `arrow-right`.
- Shadow: `style` cssText + native `<textarea>` + `.counter` / `.sr-only` + message `<p-icon>` + label/message, no `my-fragment`
- Native textarea: `.value` bound, `rows`, `maxlength`, `?disabled` / `?readonly`, IDL set in `updated()`
- Stencil loader: exact `"p-textarea"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-textarea.entry.js`.
- IIFE: `/assets/p-textarea.iife.js` HTTP 200, 40139 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-textarea` vs stored baseline | 460×1446 | 0 | 665160 |

After PNG is the same 55279 bytes as the stored baseline (SHA-256 `a65b3790e51d2ab6d35a6da56c7f7372328dadfb5dd386010bfda1e7e5e8c4d4`). Baseline PNG was not edited.

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-input-week.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-textarea` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_textarea_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_textarea_after.png`
- `/opt/cursor/artifacts/land_textarea_verify.log`

## Wiring

Same pattern as land-input-week / land-input-text. Stencil 4 `excludeComponents` is prod-only. `textarea.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-textarea` from the loader.

`HTMLPTextareaElement` stays on the stub (`declare global`) and in `html-p-textarea-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PTextarea` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/textarea/Textarea.lite.tsx` (`tagName: 'p-textarea'`, own `mitosis.config.js` so prior lands are not regenerated). Nested icons stay `<p-icon>`. `scripts/build-lit-textarea.mjs` strips `<my-fragment>` after `mitosis build`, binds `.value` / `rows` / `maxlength` / `?disabled` / `?readonly` / `updated()` IDL, maps `hideLabel` / `readOnly` / `maxLength` to kebab attrs, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-textarea.iife.js`. Playground `index.html` loads that IIFE next to the input-week bundle.

Generated `Textarea.ts` has `@customElement("p-textarea")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Textarea.lite.tsx` `tagName` is now `'p-textarea'`.

## Follow-ups

- `generateConstructorMap` still imports the stub `Textarea` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start fieldset.
