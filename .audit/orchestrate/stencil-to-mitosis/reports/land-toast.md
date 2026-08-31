# land-toast

**unit:** playground `p-toast` from Mitosis Lit (not Stencil, not `lit-toast`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `6599277d78`
**accept SHA:** (this commit)

Playground `p-toast` is Mitosis Lit (`LitToast` / `@customElement("p-toast")`). Pixel-diff vs stored Stencil toast baseline is **0**. After PNG is byte-equal to the stored baseline (30687, SHA-256 `f1d76c7bf007f4a2bb3935b1d0a4356c488e7a8428fee03f62089624883a4994`).

Do not start `toast-item`. Do not re-touch `p-table-cell`, `p-table-row`, `p-table-body`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=toast`
- Card: `[data-card="toast"]` (four already-landed Mitosis `p-button` hosts plus one empty `p-toast`)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop is the closed/empty card. Messages were not opened. Nested `p-toast-item` is absent and stays Stencil.
- Constructor: `LitToast`
- Shadow: `style` cssText + default `<slot>`. `:host` is `position:fixed` with `--_p-toast-a`, inset, and `z-index: 999999`. `role="status"` set in `connectedCallback`. Dummy Mitosis `.root` stripped. `s` is 760 (`@media(min-width:760px)`). `m` is 1000 (unused on this card). `addMessage` is a public method on the host. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-toast"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-toast.entry.js`. `"p-toast-item"` remains in the loader.
- IIFE: `/assets/p-toast.iife.js` HTTP 200, 27031 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-toast` vs stored baseline | 460×838 | 0 | 385480 |

After PNG is the same 30687 bytes as the stored baseline (SHA-256 `f1d76c7bf007f4a2bb3935b1d0a4356c488e7a8428fee03f62089624883a4994`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-toast` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="toast"]` (`460x838` at dsf 2). After path is `/opt/cursor/artifacts/mitosis_land_toast_after.png` (not the probe `mitosis_lit_toast_after.png`).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_toast_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_toast_after.png`
- `/opt/cursor/artifacts/mitosis_land_toast_after_pass.png`
- `/opt/cursor/artifacts/land_toast_pixel_diff.png`
- `/opt/cursor/artifacts/land_toast_verify.log`

## Wiring

Same isolated pattern as land-table-cell. Stencil 4 `excludeComponents` is prod-only. `toast.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-toast` from the loader.

`HTMLPToastElement` stays on the stub (`declare global`) and in `html-p-toast-element.d.ts`, including `addMessage`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PToast` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/toast/Toast.lite.tsx` (`tagName: 'p-toast'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-toast.mjs` strips `<my-fragment>` after `mitosis build`, strips dummy `.root`, sets `role="status"`, ports `addMessage`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-toast.iife.js`. Playground `index.html` loads that IIFE after the already-landed table-cell bundle.

Generated `Toast.ts` has `@customElement("p-toast")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Toast.lite.tsx` `tagName` is now `'p-toast'`.

Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `Toast` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Nested `p-toast-item` stays Stencil. Do not start toast-item from this unit.
