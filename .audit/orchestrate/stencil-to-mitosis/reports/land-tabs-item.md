# land-tabs-item

**unit:** playground `p-tabs-item` from Mitosis Lit (not Stencil, not `lit-tabs-item`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `d47e1875a5`
**accept SHA:** (this commit)

Playground `p-tabs-item` is Mitosis Lit (`LitTabsItem` / `@customElement("p-tabs-item")`). Pixel-diff vs stored Stencil tabs-item baseline is **0**.

Do not start `stepper-horizontal`. Do not re-touch `p-tabs`, `p-tabs-bar`, `p-multi-select`, or `p-multi-select-option`.

## Playground

- URL: `http://localhost:3333/?components=tabs`
- Card: `[data-card="tabs"]` (no separate tabs-item card; same crop as land-tabs)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 5 parent `p-tabs` (`LitTabs`), 15 `p-tabs-item` (5 visible / 10 hidden, index `% 3 === 0` visible). Nested `p-text` is `LitText`. Nested `p-tabs-bar` is `LitTabsBar`.
- Constructor: `LitTabsItem`
- Shadow: `style` cssText + default `<slot>`. Dummy Mitosis `.root` stripped after build. No `my-fragment`. `@property() label` stays so `LitTabs.itemLabel()` can rebuild bar buttons.
- Stencil loader: exact `"p-tabs-item"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-tabs-item.entry.js`. `"p-tabs"` and `"p-tabs-bar"` stay out of the loader.
- IIFE: `/assets/p-tabs-item.iife.js` HTTP 200, 27114 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no breakpoint objects on the item host.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-tabs-item` vs stored baseline | 982×1114 | 0 | 1093948 |

After PNG is the same 91188 bytes as the stored baseline (SHA-256 `32908d37ba81c9f332d32adf0cb11ce7bb72bc1246e992ad86cfb7e70164525c`). Baseline PNG was not edited. Card is taller than 900; clip used `page.screenshot({ clip })` to the viewport remainder.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-tabs-item` host left to photograph.

Hidden items waited `{ state: 'attached' }`, not visible. Scroller arrows settled the same way as land-tabs (prev opacity `< 0.1`, next `> 0.9`) before fonts + double rAF + 100ms. No extra `scrollActiveIntoView` in the harness.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_item_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_tabs_item_after.png`
- `/opt/cursor/artifacts/mitosis_land_tabs_item_after_pass.png`
- `/opt/cursor/artifacts/land_tabs_item_pixel_diff.png`
- `/opt/cursor/artifacts/land_tabs_item_verify.log`

## Wiring

Same isolated pattern as land-tabs / land-multi-select-option. Stencil 4 `excludeComponents` is prod-only. `tabs-item.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-tabs-item` from the loader.

`HTMLPTabsItemElement` stays on the stub (`declare global`) and in `html-p-tabs-item-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PTabsItem` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/tabs-item/TabsItem.lite.tsx` (`tagName: 'p-tabs-item'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-tabs-item.mjs` strips `<my-fragment>` after `mitosis build`, strips the dummy `.root` so slotted `p-text` is not wrapped, keeps `@property() label`, observes childList/`slotchange` plus `queueMicrotask` so light-DOM children still land after CE-in-head, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-tabs-item.iife.js`. Playground `index.html` loads that IIFE after the already-landed tabs bundle.

Generated `TabsItem.ts` has `@customElement("p-tabs-item")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/TabsItem.lite.tsx` `tagName` is now `'p-tabs-item'`.

Dummyassets 3002 down is benign. `throwIfParentIsNotOfKind` on in-parent reconnect is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `TabsItem` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start stepper-horizontal.
