# land-stepper-horizontal-item

**unit:** playground `p-stepper-horizontal-item` from Mitosis Lit (not Stencil, not `lit-stepper-horizontal-item`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `2e13d0c1c0`
**accept SHA:** (this commit)

Playground `p-stepper-horizontal-item` is Mitosis Lit (`LitStepperHorizontalItem` / `@customElement("p-stepper-horizontal-item")`). Pixel-diff vs stored Stencil stepper-horizontal-item baseline is **0**.

Do not start `button-tile`. Do not re-touch `p-stepper-horizontal`, `p-tabs`, `p-tabs-item`, `p-tabs-bar`, `p-multi-select`, or `p-multi-select-option`.

## Playground

- URL: `http://localhost:3333/?components=stepper-horizontal`
- Card: `[data-card="stepper-horizontal"]` (no separate item card; same crop as land-stepper-horizontal)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 3 parent `p-stepper-horizontal` (`LitStepperHorizontal`), 11 `p-stepper-horizontal-item` (current/unset/unset; complete/warning/current/unset twice, last parent `size=medium`). 4 `p-icon` (complete/warning) and 7 `span.icon` number masks. Nested `p-scroller` is `LitScroller`. Nested `p-icon` is `LitIcon`. Sibling `p-button` / `p-text` stay Mitosis.
- Constructor: `LitStepperHorizontalItem`
- Shadow: `style` cssText + `button` with `p-icon` or `span.icon` + optional `.sr-only` + default `<slot>`. Host `role=listitem`. `@property() state` stays so already-landed `LitStepperHorizontal.currentItem()` can still read `el.state`. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-stepper-horizontal-item"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-stepper-horizontal-item.entry.js`. `"p-stepper-horizontal"` stays out of the loader.
- IIFE: `/assets/p-stepper-horizontal-item.iife.js` HTTP 200, 34081 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no breakpoint objects on the item host.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-stepper-horizontal-item` vs stored baseline | 982×610 | 0 | 599020 |

After PNG is the same 56074 bytes as the stored baseline (SHA-256 `502b71aef339f4c1453c2c83fb7ece59476ac6794e944c5876f3231b976ef7da`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-stepper-horizontal-item` host left to photograph.

LitIcon only maps `car` and `arrow-right`. The item stamps `success.b16d4c1.svg` / `warning.59927e6.svg` on its own `p-icon`. Parent land stamps remain in place. No extra `scrollCurrentIntoView` in the harness. Parent already recenters with `behavior: "instant"` after layout.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_stepper_horizontal_item_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_stepper_horizontal_item_after.png`
- `/opt/cursor/artifacts/mitosis_land_stepper_horizontal_item_after_pass.png`
- `/opt/cursor/artifacts/land_stepper_horizontal_item_pixel_diff.png`
- `/opt/cursor/artifacts/land_stepper_horizontal_item_verify.log`

## Wiring

Same isolated pattern as land-tabs-item. Stencil 4 `excludeComponents` is prod-only. `stepper-horizontal-item.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-stepper-horizontal-item` from the loader.

`HTMLPStepperHorizontalItemElement` stays on the stub (`declare global`) and in `html-p-stepper-horizontal-item-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PStepperHorizontalItem` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/stepper-horizontal-item/StepperHorizontalItem.lite.tsx` (`tagName: 'p-stepper-horizontal-item'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-stepper-horizontal-item.mjs` strips `<my-fragment>` after `mitosis build`, renders `p-icon` for complete/warning and `span.icon` plus nth-of-type number masks for current/unset, sets host `role=listitem`, stops click on non-clickable items, observes childList/`slotchange` plus `queueMicrotask` so light-DOM children still land after CE-in-head, stamps LitIcon `source` for success/warning, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-stepper-horizontal-item.iife.js`. Playground `index.html` loads that IIFE after the already-landed parent bundle.

Generated `StepperHorizontalItem.ts` has `@customElement("p-stepper-horizontal-item")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/StepperHorizontalItem.lite.tsx` `tagName` is now `'p-stepper-horizontal-item'`.

Dummyassets 3002 down is benign. `throwIfParentIsNotOfKind` on in-parent reconnect is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `StepperHorizontalItem` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start button-tile.
