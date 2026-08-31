# land-select

**unit:** playground `p-select` from Mitosis Lit (not Stencil, not `lit-select`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `94a71c8b2a`
**accept SHA:** (this commit)

Playground `p-select` is Mitosis Lit (`LitSelect` / `@customElement("p-select")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `select-option`. Do not re-touch `radio-group` or `radio-group-option`.

## Playground

- URL: `http://localhost:3333/?components=select`
- Card: `[data-card="select"]` (4 hosts, all `class="w-full"` `label="Some label"` `name="some-name"` `filter="true"`)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: default, success+message, error+message, `disabled="true"`. Each has one direct `p-select-option` and two `p-optgroup` children (five options). Options and optgroups stay Stencil (`HostElement`). Nested `p-icon` stays Mitosis (`LitIcon`).
- Compare the closed card: combobox `aria-expanded="false"`, popover not `:popover-open`. Filter `p-input-search` is omitted from the closed Lit tree; `filter="true"` is still copied as an attribute.
- Constructor: `LitSelect`
- Shadow: `style` cssText + `.root` + Label + closed `button[role=combobox]` + `<div popover="manual">` listbox + default `<slot>` + StateMessage, no `my-fragment`. Does not fake `delegatesFocus` or `formAssociated`.
- Stencil loader: exact `"p-select"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-select.entry.js`. Options still have `p-select-option.entry.js`. Optgroup stays in the loader.
- IIFE: `/assets/p-select.iife.js` HTTP 200, 40697 bytes
- Animation freeze: `--p-animation-duration: 0s` and `--p-transition-duration: 0s`
- `hideLabel` `m` is 1000 in the cssText compiler. This card has no breakpoint objects, so the emitted sheet has no literal `1000`.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-select` vs stored baseline | 460×982 | 0 | 451720 |

After PNG is the same 33197 bytes as the stored baseline (SHA-256 `9f6eac94a24cfed66f10097fb6014d046ee327013484410b757af0a693d40aad`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-select` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_select_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_select_after.png`
- `/opt/cursor/artifacts/land_select_pixel_diff.png`
- `/opt/cursor/artifacts/land_select_verify.log`

## Wiring

Same isolated pattern as land-radio-group. Stencil 4 `excludeComponents` is prod-only. `select.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-select` from the loader.

`HTMLPSelectElement` stays on the stub (`declare global`) and in `html-p-select-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PSelect` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/select/Select.lite.tsx` (`tagName: 'p-select'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-select.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab attrs (`hide-label`, `dropdown-direction`), stamps icon `source` for `arrow-head-down` / success / error to `http://localhost:3001/icons/arrow-head-down.1e3cbb8.svg`, `http://localhost:3001/icons/check.8ba06be.svg`, and `http://localhost:3001/icons/exclamation.46cd17b.svg` because LitIcon only maps `car` and `arrow-right`, observes childList/`slotchange` plus `queueMicrotask` so light-DOM options still land after CE-in-head, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-select.iife.js`. Playground `index.html` loads that IIFE after the radio-group-option bundle.

Generated `Select.ts` has `@customElement("p-select")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Select.lite.tsx` `tagName` is now `'p-select'`.

Dummyassets 3002 down is benign; `throwIfElementIsNotOfKind` on option reconnect is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `Select` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start select-option.
