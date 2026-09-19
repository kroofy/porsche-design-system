# land-optgroup

**unit:** playground `p-optgroup` from Mitosis Lit (not Stencil, not `lit-optgroup`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `6229da722a`
**accept SHA:** (this commit)

Playground `p-optgroup` is Mitosis Lit (`LitOptgroup` / `@customElement("p-optgroup")`). Pixel-diff vs stored Stencil optgroup baseline is **0**.

Do not start `multi-select`. Do not re-touch `p-select` or `p-select-option`.

## Playground

- URL: `http://localhost:3333/?components=select`
- Card: `[data-card="select"]` (no separate optgroup card; same 4-host crop as the select card)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 4 parent `p-select`, already `LitSelect`. 8 optgroups (`label="Some optgroup"`, second group `disabled="true"`, two options each) in a `display:none` popover — wait attached, not visible. Options stay `LitSelectOption`. Nested `p-icon` stays `LitIcon`.
- Constructor: `LitOptgroup`
- Shadow: `style` cssText + `[role=group]` + presentation label + default `<slot>`, no `my-fragment`. Does not fake `delegatesFocus`. Disabled groups stamp `disabledParent` on child options.
- Stencil loader: exact `"p-optgroup"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-optgroup.entry.js`. Parent and option stay out of the loader.
- IIFE: `/assets/p-optgroup.iife.js` HTTP 200, 29003 bytes
- Animation freeze: `--p-animation-duration: 0s` and `--p-transition-duration: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-optgroup` vs stored baseline | 460×982 | 0 | 451720 |

After PNG is the same 33197 bytes as the stored baseline (SHA-256 `9f6eac94a24cfed66f10097fb6014d046ee327013484410b757af0a693d40aad`). Same crop as the select card. Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-optgroup` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_optgroup_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_optgroup_after.png`
- `/opt/cursor/artifacts/land_optgroup_pixel_diff.png`
- `/opt/cursor/artifacts/land_optgroup_verify.log`

## Wiring

Same isolated pattern as land-select-option. Stencil 4 `excludeComponents` is prod-only. `optgroup.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-optgroup` from the loader.

`HTMLPOptgroupElement` stays on the stub (`declare global`) and in `html-p-optgroup-element.d.ts`. Do not declare optional `hidden` on that interface — native `HTMLElement.hidden` is required. Stencil `--dev` regenerates `components.d.ts` and drops the generated `POptgroup` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/optgroup/Optgroup.lite.tsx` (`tagName: 'p-optgroup'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-optgroup.mjs` strips `<my-fragment>` after `mitosis build`, observes childList/`slotchange` plus `queueMicrotask` so light-DOM options still land after CE-in-head, stamps `disabledParent` on children, emits `internalOptgroupUpdate` on slotchange, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-optgroup.iife.js`. Playground `index.html` loads that IIFE after the select-option bundle.

Generated `Optgroup.ts` has `@customElement("p-optgroup")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Optgroup.lite.tsx` `tagName` is now `'p-optgroup'`.

Dummyassets 3002 down is benign; `throwIfParentIsNotOfKind` on option reconnect is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `Optgroup` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start multi-select.
