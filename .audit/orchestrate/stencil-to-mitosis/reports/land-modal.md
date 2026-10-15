# land-modal

**unit:** playground `p-modal` from Mitosis Lit (not Stencil, not `lit-modal`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `84e6337016`
**accept SHA:** (this commit)

Playground `p-modal` is Mitosis Lit (`LitModal` / `@customElement("p-modal")`). Pixel-diff vs stored Stencil modal baseline is **0**. After PNG is byte-equal to the stored baseline (48122, SHA-256 `daa2e78d1785ad54b32a07611c2a433512d48dce4cebd09407ac9f125aa7c038`).

Do not start `flyout`. Do not re-touch `p-toast-item`, `p-toast`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=modal`
- Card: `[data-card="modal"]` (five closed `p-modal` hosts plus already-landed Mitosis `p-button` openers)
- Dialogs were not opened. Nested `p-text` / `p-heading` / `p-button` stay already-landed Mitosis.
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop is the closed card, clipped to the viewport remainder with `page.screenshot({ clip })`.
- Hosts: 5 `p-modal` (`LitModal`)
- Constructor: `LitModal`
- Shadow: `style` cssText + `dialog > .scroller > .modal` + native `button.dismiss` + header / default / footer slots. `:host` is `display:contents`. Closed dialog is `width:0` / `height:0` / `visibility:hidden`. `showModal()` runs only when `open`. `fullscreen` parses JSON attrs that start with `{`. Dummy Mitosis `.root` is not present. `m` is 1000. No nested `p-button-pure`. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-modal"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-modal.entry.js`.
- IIFE: `/assets/p-modal.iife.js` HTTP 200, 37155 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-modal` vs stored baseline | 460×1120 | 0 | 515200 |

After PNG is the same 48122 bytes as the stored baseline (SHA-256 `daa2e78d1785ad54b32a07611c2a433512d48dce4cebd09407ac9f125aa7c038`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-modal` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="modal"]` (`460x1120` at dsf 2). After path is `/opt/cursor/artifacts/mitosis_land_modal_after.png` (not the probe `mitosis_lit_modal_after.png`).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_modal_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_modal_after.png`
- `/opt/cursor/artifacts/mitosis_land_modal_after_pass.png`
- `/opt/cursor/artifacts/land_modal_pixel_diff.png`
- `/opt/cursor/artifacts/land_modal_verify.log`

## Wiring

Same isolated pattern as land-toast-item. Stencil 4 `excludeComponents` is prod-only. `modal.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-modal` from the loader.

`HTMLPModalElement` stays on the stub (`declare global`) and in `html-p-modal-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PModal` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/modal/Modal.lite.tsx` (`tagName: 'p-modal'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-modal.mjs` strips `<my-fragment>` after `mitosis build`, inlines DialogBase (`dialog > .scroller > .modal`), uses a native dismiss button, calls `showModal()` only when `open`, parses JSON `fullscreen` attrs, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-modal.iife.js`. Playground `index.html` loads that IIFE after the already-landed toast-item bundle.

Generated `Modal.ts` has `@customElement("p-modal")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Modal.lite.tsx` `tagName` is now `'p-modal'`.

Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `Modal` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start flyout.
