# land-tabs-bar

**unit:** playground `p-tabs-bar` from Mitosis Lit (not Stencil, not `lit-tabs-bar`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `5f3387a527`
**fix SHA:** `6a3f37a096`
**accept SHA:** (this commit)

Playground `p-tabs-bar` is Mitosis Lit (`LitTabsBar` / `@customElement("p-tabs-bar")`). Pixel-diff vs stored Stencil tabs-bar baseline is **0**.

Do not start `tabs`. Do not re-touch `p-multi-select` or `p-multi-select-option`.

## Playground

- URL: `http://localhost:3333/?components=tabs-bar`
- Card: `[data-card="tabs-bar"]` (grid-column span 2; 7 hosts)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: default 3 buttons; `active-tab-index=1` + 3 links; canvas / surface / frosted rails; `size=medium` with out-of-range 99 and with index 0. 31 slotted `button`/`a` tabs.
- Nested `p-scroller.scroller` stays `LitScroller`. Nested `p-icon` stays `LitIcon`.
- Constructor: `LitTabsBar`
- Shadow: `div.wrap` (`display:contents`) + `style` cssText + `p-scroller.scroller` + default `<slot>` + zero-width `.bar`. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-tabs-bar"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-tabs-bar.entry.js`. `p-tabs` / `p-tabs-item` stay in the loader.
- IIFE: `/assets/p-tabs-bar.iife.js` HTTP 200, 39828 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no breakpoint objects, so the emitted sheet has no literal `1000`.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-tabs-bar` vs stored baseline | 982×1080 | 0 | 1060560 |

After PNG is the same 85161 bytes as the stored baseline (SHA-256 `767cedec698e45d1e370b68d0165898349cf3f4047474c995857f68195e60df9`). Baseline PNG was not edited. Card is taller than 900; clip used `page.screenshot({ clip })` to the viewport remainder.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-tabs-bar` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_bar_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_tabs_bar_after.png`
- `/opt/cursor/artifacts/land_tabs_bar_pixel_diff.png`
- `/opt/cursor/artifacts/land_tabs_bar_verify.log`

## Wiring

Same isolated pattern as land-multi-select-option. Stencil 4 `excludeComponents` is prod-only. `tabs-bar.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-tabs-bar` from the loader.

`HTMLPTabsBarElement` stays on the stub (`declare global`) and in `html-p-tabs-bar-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PTabsBar` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/tabs-bar/TabsBar.lite.tsx` (`tagName: 'p-tabs-bar'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-tabs-bar.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab `active-tab-index`, sanitizes that index against live `a,button` children, observes childList/`slotchange` plus `queueMicrotask` so light-DOM tabs still land after CE-in-head, recenters with `behavior: "instant"` like Stencil `scrollTabIntoView` after layout (not on every `updated`), aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-tabs-bar.iife.js`. Playground `index.html` loads that IIFE after the already-landed scroller bundle.

Generated `TabsBar.ts` has `@customElement("p-tabs-bar")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/TabsBar.lite.tsx` `tagName` is now `'p-tabs-bar'`.

Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `TabsBar` class. Fine for this unit.
- Framework wrappers were not regenerated.
- `p-tabs` still Stencil and still renders a nested `p-tabs-bar` (now Lit). Do not start tabs.
