# land-flyout

**unit:** playground `p-flyout` from Mitosis Lit (not Stencil, not `lit-flyout`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `05f321d3dc`
**accept SHA:** (this commit)

Playground `p-flyout` is Mitosis Lit (`LitFlyout` / `@customElement("p-flyout")`). Pixel-diff vs stored Stencil flyout baseline is **0**. After PNG is byte-equal to the stored baseline (66802, SHA-256 `0a79ad2d8e2031d819091f71a8c17bc0cd8a15d0531f39705e1e7814da1cb1b6`).

Do not start `sheet`. Do not re-touch `p-modal`, `p-toast-item`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=flyout`
- Card: `[data-card="flyout"]` (nine closed `p-flyout` hosts plus already-landed Mitosis `p-button` openers)
- Dialogs were not opened. Nested `p-button` / `p-model-signature` / `p-text` / `p-heading` / `p-modal` / `p-tag` stay already-landed Mitosis.
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop is the closed card, clipped to the viewport remainder with `page.screenshot({ clip })` (`460x1640` at dsf 2).
- Hosts: 9 `p-flyout` (`LitFlyout`)
- Constructor: `LitFlyout`
- Shadow: `style` cssText + `dialog > .scroller > .flyout` + native `button.dismiss` + header / default / footer / sub-footer slots. `:host` is `display:contents`. Closed dialog is `width:0` / `height:0` / `visibility:hidden`. `showModal()` runs only when `open`. `position` docks the scroller. `footerBehavior` emits `grid-template-rows` when `fixed`. `fullscreen` parses JSON attrs that start with `{`, including unquoted keys. Header `ResizeObserver` sets `--p-flyout-sticky-top`. Dummy Mitosis `.root` is not present. `m` is 1000. No nested `p-button-pure`. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-flyout"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-flyout.entry.js`.
- IIFE: `/assets/p-flyout.iife.js` HTTP 200, 39978 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-flyout` vs stored baseline | 460×1640 | 0 | 754400 |

After PNG is the same 66802 bytes as the stored baseline (SHA-256 `0a79ad2d8e2031d819091f71a8c17bc0cd8a15d0531f39705e1e7814da1cb1b6`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-flyout` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="flyout"]` (`460x1640` at dsf 2). After path is `/opt/cursor/artifacts/mitosis_land_flyout_after.png` (not the probe `mitosis_lit_flyout_after.png`).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_flyout_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_flyout_after.png`
- `/opt/cursor/artifacts/mitosis_land_flyout_after_pass.png`
- `/opt/cursor/artifacts/land_flyout_pixel_diff.png`
- `/opt/cursor/artifacts/land_flyout_verify.log`

## Wiring

Same isolated pattern as land-modal. Stencil 4 `excludeComponents` is prod-only. `flyout.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-flyout` from the loader.

`HTMLPFlyoutElement` stays on the stub (`declare global`) and in `html-p-flyout-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PFlyout` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/flyout/Flyout.lite.tsx` (`tagName: 'p-flyout'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-flyout.mjs` strips `<my-fragment>` after `mitosis build`, inlines DialogBase (`dialog > .scroller > .flyout`), uses a native dismiss button labeled `Dismiss flyout`, calls `showModal()` only when `open`, parses JSON `fullscreen` attrs including unquoted keys, adopts a stylesheet for `--p-flyout-sticky-top`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-flyout.iife.js`. Playground `index.html` loads that IIFE after the already-landed modal bundle.

Generated `Flyout.ts` has `@customElement("p-flyout")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Flyout.lite.tsx` `tagName` is now `'p-flyout'`.

Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `Flyout` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start sheet.
