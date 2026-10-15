# land-multi-select-option

**unit:** playground `p-multi-select-option` from Mitosis Lit (not Stencil, not `lit-multi-select-option`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `6d5c63a79a`
**accept SHA:** (this commit)

Playground `p-multi-select-option` is Mitosis Lit (`LitMultiSelectOption` / `@customElement("p-multi-select-option")`). Pixel-diff vs stored Stencil option baseline is **0**.

Do not start `tabs-bar`. Do not re-touch `p-multi-select` or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=multi-select`
- Card: `[data-card="multi-select"]` (no separate option card; same 4-host crop as the parent)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 4 parent `p-multi-select`, already `LitMultiSelect`. 20 options in a `display:none` popover — wait attached, not visible. Closed combobox `aria-expanded="false"`. Selected-text stays empty (no value). Optgroups stay `LitOptgroup`. Nested `p-icon` stays `LitIcon`.
- Constructor: `LitMultiSelectOption`
- Shadow: `style` cssText + `.option` + `.checkbox` + default `<slot>`, no `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-multi-select-option"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-multi-select-option.entry.js`. Parent still has no `p-multi-select.entry.js`.
- IIFE: `/assets/p-multi-select-option.iife.js` HTTP 200, 34157 bytes
- Animation freeze: `--p-animation-duration: 0s` and `--p-transition-duration: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-multi-select-option` vs stored baseline | 460×982 | 0 | 451720 |

After PNG is the same 33197 bytes as the stored baseline (SHA-256 `9f6eac94a24cfed66f10097fb6014d046ee327013484410b757af0a693d40aad`). Same crop as the parent card. Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-multi-select-option` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_multi_select_option_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_multi_select_option_after.png`
- `/opt/cursor/artifacts/land_multi_select_option_pixel_diff.png`
- `/opt/cursor/artifacts/land_multi_select_option_verify.log`

## Wiring

Same isolated pattern as land-multi-select. Stencil 4 `excludeComponents` is prod-only. `multi-select-option.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-multi-select-option` from the loader.

`HTMLPMultiSelectOptionElement` stays on the stub (`declare global`) and in `html-p-multi-select-option-element.d.ts`. Do not declare optional `hidden` on that interface — native `HTMLElement.hidden` is required, and `filter.ts` passes options into `setHighlightedSelectOption`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PMultiSelectOption` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/multi-select-option/MultiSelectOption.lite.tsx` (`tagName: 'p-multi-select-option'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-multi-select-option.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab `disabled-parent`, observes childList/`slotchange` plus `queueMicrotask` so light-DOM option copy still lands after CE-in-head, emits `internalOptionUpdate` on click, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-multi-select-option.iife.js`. Playground `index.html` loads that IIFE after the parent bundle.

Generated `MultiSelectOption.ts` has `@customElement("p-multi-select-option")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/MultiSelectOption.lite.tsx` `tagName` is now `'p-multi-select-option'`.

Dummyassets 3002 down is benign; `throwIfParentIsNotOfKind` on in-parent swap is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `MultiSelectOption` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start tabs-bar.
