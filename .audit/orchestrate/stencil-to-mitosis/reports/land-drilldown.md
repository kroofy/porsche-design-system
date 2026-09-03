# land-drilldown

**unit:** playground `p-drilldown` from Mitosis Lit (not Stencil, not `lit-drilldown`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `231e43e522`
**accept SHA:** (this commit)

Playground `p-drilldown` is Mitosis Lit (`LitDrilldown` / `@customElement("p-drilldown")`). Pixel-diff vs stored Stencil drilldown baseline is **0**. After PNG is byte-equal to the stored baseline (18500, SHA-256 `7e397a872604e2ae0b88a78b991751a56ee5ef2f005f4ebae99998be9ce49ddc`).

Do not start `drilldown-item` or `drilldown-link`. Do not re-touch `p-sheet`, `p-flyout`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=drilldown`
- Card: `[data-card="drilldown"]` (two closed `p-drilldown` hosts plus already-landed Mitosis `p-button` openers, each wrapped in `nav`)
- Dialogs were not opened. Nested `p-drilldown-item` / `p-drilldown-link` stay Stencil (`HostElement`, hydrated).
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop is the closed card (`460x466` at dsf 2).
- Hosts: 2 `p-drilldown` (`LitDrilldown`)
- Constructor: `LitDrilldown`
- Shadow: `style` cssText + `dialog > .drawer > p-button-pure.back + p-button.dismiss-mobile + p-button.dismiss-desktop + .scroller > slot`. `:host` is `display:block`. Closed dialog is `visibility:hidden` with no width/height collapse. Nested back / dismiss buttons are already-landed Mitosis (`LitButtonPure` / `LitButton`). `hide-label` / `stretch` / `compact` bind as `"true"`. `href` is omitted. `showModal()` runs only when `open`. Desktop media is `s` = 760 (`min-width:760px` / `max-width:759px`). Dummy Mitosis `.root` is not present. `m` is 1000 (unused as desktop on this tag). No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-drilldown"` absent from `bootstrapLazy` after a full `--dev` restart. `"p-drilldown-item"` and `"p-drilldown-link"` remain.
- IIFE: `/assets/p-drilldown.iife.js` HTTP 200, 36035 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-drilldown` vs stored baseline | 460×466 | 0 | 214360 |

After PNG is the same 18500 bytes as the stored baseline (SHA-256 `7e397a872604e2ae0b88a78b991751a56ee5ef2f005f4ebae99998be9ce49ddc`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-drilldown` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="drilldown"]` (`460x466` at dsf 2). After path is `/opt/cursor/artifacts/mitosis_land_drilldown_after.png` (not the probe `mitosis_lit_drilldown_after.png`).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_drilldown_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_drilldown_after.png`
- `/opt/cursor/artifacts/mitosis_land_drilldown_after_pass.png`
- `/opt/cursor/artifacts/land_drilldown_pixel_diff.png`
- `/opt/cursor/artifacts/land_drilldown_verify.log`

## Wiring

Same isolated pattern as land-sheet. Stencil 4 `excludeComponents` is prod-only. `drilldown.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-drilldown` from the loader.

`HTMLPDrilldownElement` stays on the stub (`declare global`) and in `html-p-drilldown-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PDrilldown` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/drilldown/Drilldown.lite.tsx` (`tagName: 'p-drilldown'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-drilldown.mjs` strips `<my-fragment>` after `mitosis build`, emits `dialog > .drawer > back + dismiss-mobile + dismiss-desktop + .scroller > slot`, binds `hide-label` / `stretch` / `compact` as `"true"`, omits `href`, calls `showModal()` only when `open`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-drilldown.iife.js`. Playground `index.html` loads that IIFE after the already-landed sheet bundle.

Generated `Drilldown.ts` has `@customElement("p-drilldown")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Drilldown.lite.tsx` `tagName` is now `'p-drilldown'`.

Dummyassets 3002 down is benign. Parent-kind warnings from nested Stencil items under a Lit host are benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `Drilldown` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Nested `p-drilldown-item` / `p-drilldown-link` stay Stencil. Do not start those tags.
