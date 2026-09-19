# land-radio-group-option

**unit:** playground `p-radio-group-option` from Mitosis Lit (not Stencil, not `lit-radio-group-option`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `731cd9b8e9`
**accept SHA:** (this commit)

Playground `p-radio-group-option` is Mitosis Lit (`LitRadioGroupOption` / `@customElement("p-radio-group-option")`). Pixel-diff vs stored Stencil option baseline is **0**.

Do not start `select`. Do not re-touch `radio-group` or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=radio-group`
- Card: `[data-card="radio-group"]` (no separate option card; same 5-host crop as the parent)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 5 parent `p-radio-group`, already `LitRadioGroup`. 25 options: selected B, option D `loading="true"`, option E `disabled="true"`, plus parent loading / success / error / disabled. Nested `p-icon` / `p-spinner` stay Mitosis (`LitIcon` / `LitSpinner`).
- Constructor: `LitRadioGroupOption`
- Shadow: `style` cssText + `.root` + `.wrapper` radio input + overlay `p-spinner` when the option itself is loading + Label + LoadingMessage, no `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-radio-group-option"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-radio-group-option.entry.js`.
- IIFE: `/assets/p-radio-group-option.iife.js` HTTP 200, 37696 bytes
- Animation freeze: `--p-animation-duration: 0s` and `--p-transition-duration: 0s`
- Parent still stamps `selected` / `disabledParent` / `loadingParent` / `state` / `name`.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-radio-group-option` vs stored baseline | 460×1640 | 0 | 754400 |

Card is taller than 900. Capture used `page.screenshot({ clip })` with clip height clipped to the viewport remainder (820). After PNG is the same 93075 bytes as the stored baseline (SHA-256 `abc65a990ebcfdb69a4b23e570d0dcde66759c1b3673c3dda3ca33fe7309f838`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-radio-group-option` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_radio_group_option_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_radio_group_option_after.png`
- `/opt/cursor/artifacts/land_radio_group_option_pixel_diff.png`
- `/opt/cursor/artifacts/land_radio_group_option_verify.log`

## Wiring

Same isolated pattern as land-radio-group. Stencil 4 `excludeComponents` is prod-only. `radio-group-option.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-radio-group-option` from the loader.

`HTMLPRadioGroupOptionElement` stays on the stub (`declare global`) and in `html-p-radio-group-option-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PRadioGroupOption` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/radio-group-option/RadioGroupOption.lite.tsx` (`tagName: 'p-radio-group-option'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-radio-group-option.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab attrs (`disabled-parent`, `loading-parent`), hides empty label and the option spinner unless the option itself is loading, observes childList/`slotchange` plus `queueMicrotask` so slotted label copy still lands after CE-in-head, emits `internalRadioGroupOptionChange` on change, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-radio-group-option.iife.js`. Playground `index.html` loads that IIFE after the parent bundle.

Generated `RadioGroupOption.ts` has `@customElement("p-radio-group-option")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/RadioGroupOption.lite.tsx` `tagName` is now `'p-radio-group-option'`.

Dummyassets 3002 down is benign; `throwIfParentIsNotOfKind` on in-parent swap is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `RadioGroupOption` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start select.
