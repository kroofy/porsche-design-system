# land-tabs

**unit:** playground `p-tabs` from Mitosis Lit (not Stencil, not `lit-tabs`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `5a31b39d82`
**fix SHA:** `4371f8356f`
**accept SHA:** (this commit)

Playground `p-tabs` is Mitosis Lit (`LitTabs` / `@customElement("p-tabs")`). Pixel-diff vs stored Stencil tabs baseline is **0**.

Do not start `tabs-item`. Do not re-touch `p-tabs-bar`, `p-multi-select`, or `p-multi-select-option`.

## Playground

- URL: `http://localhost:3333/?components=tabs`
- Card: `[data-card="tabs"]` (grid-column span 2; 5 hosts)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: default, `background=canvas`, `surface`, `frosted`, `size=medium`. Each has three `p-tabs-item` with nested `p-text`. 15 items, 15 texts.
- Nested `p-tabs-bar.root` stays `LitTabsBar`. Items stay Stencil (`HostElement`, hydrated). Nested `p-text` stays `LitText`.
- Constructor: `LitTabs`
- Shadow: `div.wrap` (`display:contents`) + `style` cssText + `p-tabs-bar.root` with three buttons rebuilt from item labels + default `<slot>`. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-tabs"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-tabs.entry.js`. `p-tabs-item` still has an entry chunk. `p-tabs-bar` stays out of the loader.
- IIFE: `/assets/p-tabs.iife.js` HTTP 200, 32287 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no breakpoint objects, so the emitted sheet has no literal `1000`.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-tabs` vs stored baseline | 982×1114 | 0 | 1093948 |

After PNG is the same 91188 bytes as the stored baseline (SHA-256 `32908d37ba81c9f332d32adf0cb11ce7bb72bc1246e992ad86cfb7e70164525c`). Baseline PNG was not edited. Card is taller than 900; clip used `page.screenshot({ clip })` to the viewport remainder.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-tabs` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_tabs_after.png`
- `/opt/cursor/artifacts/mitosis_land_tabs_after_pass.png`
- `/opt/cursor/artifacts/land_tabs_pixel_diff.png`
- `/opt/cursor/artifacts/land_tabs_verify.log`

## Wiring

Same isolated pattern as land-tabs-bar. Stencil 4 `excludeComponents` is prod-only. `tabs.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-tabs` from the loader.

`HTMLPTabsElement` stays on the stub (`declare global`) and in `html-p-tabs-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PTabs` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/tabs/Tabs.lite.tsx` (`tagName: 'p-tabs'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-tabs.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab `active-tab-index`, rebuilds bar buttons from live `p-tabs-item` labels, forwards size / background / compact / `activeTabIndex` (default 0), sets item `role=tabpanel` plus hidden / tabindex like Stencil `setAccessibilityAttributes`, observes childList/`slotchange` plus `queueMicrotask` so light-DOM items still land after CE-in-head, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-tabs.iife.js`. Playground `index.html` loads that IIFE after the already-landed tabs-bar bundle.

Generated `Tabs.ts` has `@customElement("p-tabs")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Tabs.lite.tsx` `tagName` is now `'p-tabs'`.

Dummyassets 3002 down is benign. `throwIfParentIsNotOfKind` on item reconnect is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `Tabs` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start tabs-item.
