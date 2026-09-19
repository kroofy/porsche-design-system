# land-multi-select

**unit:** playground `p-multi-select` from Mitosis Lit (not Stencil, not `lit-multi-select`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `1fa8ad03fb`
**accept SHA:** (this commit)

Playground `p-multi-select` is Mitosis Lit (`LitMultiSelect` / `@customElement("p-multi-select")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `multi-select-option`. Do not re-touch `optgroup`, `select`, or `select-option`.

## Playground

- URL: `http://localhost:3333/?components=multi-select`
- Card: `[data-card="multi-select"]` (4 hosts, all `class="w-full"` `label="Some label"` `name="some-name"`)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: default, success+message, error+message, `disabled="true"`. Each has one direct `p-multi-select-option` and two `p-optgroup` children (five options). Options stay Stencil (`HostElement`). Nested `p-optgroup` / `p-icon` stay Mitosis (`LitOptgroup` / `LitIcon`).
- Compare the closed card: combobox `aria-expanded="false"`, popover not `:popover-open`. Built-in filter `p-input-search` and reset `p-button-pure` stay out of the closed Lit tree (playground hosts have no value).
- Constructor: `LitMultiSelect`
- Shadow: `style` cssText + `.root` + Label + closed `button[role=combobox]` + `<div popover="manual">` listbox (`aria-multiselectable="true"`) + default `<slot>` + StateMessage, no `my-fragment`. Does not fake `delegatesFocus` or `formAssociated`.
- Stencil loader: exact `"p-multi-select"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-multi-select.entry.js`. Options still have `p-multi-select-option.entry.js`.
- IIFE: `/assets/p-multi-select.iife.js` HTTP 200, 40831 bytes
- Animation freeze: `--p-animation-duration: 0s` and `--p-transition-duration: 0s`
- `hideLabel` `m` is 1000 in the cssText compiler. This card has no breakpoint objects, so the emitted sheet has no literal `1000`.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-multi-select` vs stored baseline | 460×982 | 0 | 451720 |

After PNG is the same 33197 bytes as the stored baseline (SHA-256 `9f6eac94a24cfed66f10097fb6014d046ee327013484410b757af0a693d40aad`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-multi-select` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_multi_select_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_multi_select_after.png`
- `/opt/cursor/artifacts/land_multi_select_pixel_diff.png`
- `/opt/cursor/artifacts/land_multi_select_verify.log`

## Wiring

Same isolated pattern as land-select. Stencil 4 `excludeComponents` is prod-only. `multi-select.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-multi-select` from the loader.

`HTMLPMultiSelectElement` stays on the stub (`declare global`) and in `html-p-multi-select-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PMultiSelect` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/multi-select/MultiSelect.lite.tsx` (`tagName: 'p-multi-select'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-multi-select.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab attrs (`hide-label`, `dropdown-direction`), stamps icon `source` for `arrow-head-down` / success / error to `http://localhost:3001/icons/arrow-head-down.1e3cbb8.svg`, `http://localhost:3001/icons/check.8ba06be.svg`, and `http://localhost:3001/icons/exclamation.46cd17b.svg` because LitIcon only maps `car` and `arrow-right`, observes childList/`slotchange` plus `queueMicrotask` so light-DOM options still land after CE-in-head, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-multi-select.iife.js`. Playground `index.html` loads that IIFE after the optgroup bundle.

Generated `MultiSelect.ts` has `@customElement("p-multi-select")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/MultiSelect.lite.tsx` `tagName` is now `'p-multi-select'`.

Dummyassets 3002 down is benign; `throwIfParentIsNotOfKind` / `throwIfElementIsNotOfKind` on option/optgroup reconnect is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `MultiSelect` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start multi-select-option.
