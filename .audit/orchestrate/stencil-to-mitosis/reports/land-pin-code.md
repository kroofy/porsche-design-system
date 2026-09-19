# land-pin-code

**unit:** playground `p-pin-code` from Mitosis Lit (not Stencil, not `lit-pin-code`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `6fe129bf40`
**accept SHA:** (this commit)

Playground `p-pin-code` is Mitosis Lit (`LitPinCode` / `@customElement("p-pin-code")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `accordion`. Do not re-touch `scroller`, `pagination`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=pin-code`
- Card: `[data-card="pin-code"]` (5 hosts)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: default, `loading=true`, `state=success` + message, `state=error` + message, `disabled=true`. All `label="Some label"`, default length 4. Nested `p-icon` / `p-spinner` stay Mitosis. No light-DOM children.
- Constructor: `LitPinCode`
- Shadow: `style` cssText + `fieldset.root` + Label + 4 digit inputs + optional `.spinner` + StateMessage, no `my-fragment`
- Stencil loader: exact `"p-pin-code"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-pin-code.entry.js`.
- IIFE: `/assets/p-pin-code.iife.js` HTTP 200, 38560 bytes
- Animation freeze: `--p-animation-duration: 0s` and `--p-transition-duration: 0s` so the loading spinner does not drift

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-pin-code` vs stored baseline | 460×1176 | 0 | 540960 |

After PNG is the same 42246 bytes as the stored baseline (SHA-256 `039a0ac57947a36bbdd70ec5f0fdb1bc0692b351d5970f623c400afc8624a7a9`). Baseline PNG was not edited.

The land script uses `page.screenshot({ clip })` because the card is taller than a short viewport crop would suggest. Clip height is 588.75 CSS px and fits in 900.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-pin-code` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_pin_code_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_pin_code_after.png`
- `/opt/cursor/artifacts/land_pin_code_pixel_diff.png`
- `/opt/cursor/artifacts/land_pin_code_verify.log`

## Wiring

Same pattern as land-scroller. Stencil 4 `excludeComponents` is prod-only. `pin-code.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-pin-code` from the loader.

`HTMLPPinCodeElement` stays on the stub (`declare global`) and in `html-p-pin-code-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PPinCode` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/pin-code/PinCode.lite.tsx` (`tagName: 'p-pin-code'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-pin-code.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab attrs (`hide-label`, `length`, `loading`), renders four digit inputs plus optional `p-spinner` and StateMessage `p-icon`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-pin-code.iife.js`. Playground `index.html` loads that IIFE next to the scroller bundle.

Generated `PinCode.ts` has `@customElement("p-pin-code")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/PinCode.lite.tsx` `tagName` is now `'p-pin-code'`.

Landed `p-icon` only maps `car` and `arrow-right` in its file table. Success/error messages pass `source` for `check.8ba06be.svg` and `exclamation.46cd17b.svg`. Dummyassets 3002 down is benign. `hideLabel` `m` is 1000.

## Follow-ups

- `generateConstructorMap` still imports the stub `PinCode` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start accordion.
