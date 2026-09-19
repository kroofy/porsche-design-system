# land-segmented-control-item

**unit:** playground `p-segmented-control-item` from Mitosis Lit (not Stencil, not `lit-segmented-control-item`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `64d0a6171c`
**accept SHA:** (this commit)

Playground `p-segmented-control-item` is Mitosis Lit (`LitSegmentedControlItem` / `@customElement("p-segmented-control-item")`). Pixel-diff vs stored Stencil item baseline is **0**.

Do not start `radio-group`. Do not re-touch `segmented-control` or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=segmented-control`
- Card: `[data-card="segmented-control"]` (no separate item card; same 3-host crop as the parent)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 3 parent `p-segmented-control`, all `class="w-full"`, already `LitSegmentedControl`. Four items each: default, parent `disabled="true"`, mixed item-disabled. Nested `p-icon` stays Mitosis (`LitIcon`).
- Constructor: `LitSegmentedControlItem`
- Shadow: `style` cssText + `<button type="button">` + optional label `<span>` + optional `p-icon.icon` + default `<slot>`, no `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-segmented-control-item"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-segmented-control-item.entry.js`.
- IIFE: `/assets/p-segmented-control-item.iife.js` HTTP 200, 33569 bytes
- Animation freeze: `--p-animation-duration: 0s` and `--p-transition-duration: 0s`
- Parent still stamps `selected` / `compact` / `state` / `message` / `disabledParent` and `like` `iconSource` to `http://localhost:3001/icons/like.a7468cd.svg`.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-segmented-control-item` vs stored baseline | 460×972 | 0 | 447120 |

After PNG is the same 36882 bytes as the stored baseline (SHA-256 `5148d29f2ff83572c9584e06db603f012427de781ffe708a460b9e92fb0f3c5f`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-segmented-control-item` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_segmented_control_item_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_segmented_control_item_after.png`
- `/opt/cursor/artifacts/land_segmented_control_item_pixel_diff.png`
- `/opt/cursor/artifacts/land_segmented_control_item_verify.log`

## Wiring

Same isolated pattern as land-segmented-control. Stencil 4 `excludeComponents` is prod-only. `segmented-control-item.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-segmented-control-item` from the loader.

`HTMLPSegmentedControlItemElement` stays on the stub (`declare global`) and in `html-p-segmented-control-item-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PSegmentedControlItem` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/segmented-control-item/SegmentedControlItem.lite.tsx` (`tagName: 'p-segmented-control-item'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-segmented-control-item.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab attrs (`icon-source`, `disabled-parent`), derives `hasSlotted` from light-DOM children, hides empty label/icon, observes childList/`slotchange` plus `queueMicrotask` so the first render after CE-in-head still copies slotted text, emits `internalSegmentedControlItemUpdate` on click, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-segmented-control-item.iife.js`. Playground `index.html` loads that IIFE after the parent bundle.

Generated `SegmentedControlItem.ts` has `@customElement("p-segmented-control-item")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/SegmentedControlItem.lite.tsx` `tagName` is now `'p-segmented-control-item'`.

Dummyassets 3002 down is benign; the stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `SegmentedControlItem` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start radio-group.
