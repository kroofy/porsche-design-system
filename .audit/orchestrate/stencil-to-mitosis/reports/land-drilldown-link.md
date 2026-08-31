# land-drilldown-link

**unit:** playground `p-drilldown-link` from Mitosis Lit (not Stencil, not `lit-drilldown-link`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `914c818f25`
**accept SHA:** (this commit)

Playground `p-drilldown-link` is Mitosis Lit (`LitDrilldownLink` / `@customElement("p-drilldown-link")`). Pixel-diff vs stored Stencil drilldown baseline is **0**. After PNG is byte-equal to the stored baseline (18500, SHA-256 `7e397a872604e2ae0b88a78b991751a56ee5ef2f005f4ebae99998be9ce49ddc`).

Do not start `carousel` or `canvas`. Do not re-touch `p-drilldown`, `p-drilldown-item`, `p-sheet`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=drilldown`
- Card: `[data-card="drilldown"]` (2 `LitDrilldown` parents, 17 `LitDrilldownItem` hosts, 57 `LitDrilldownLink` hosts, dialogs stay closed)
- Dialogs were not opened. Parent and item stay Mitosis. 56 links wrap `slot` in `<a href="#">`. 1 unset-href host renders only `slot` (slotted `<a>`).
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop is the closed card (`460x466` at dsf 2).
- Hosts: 57 `p-drilldown-link` (`LitDrilldownLink`)
- Constructor: `LitDrilldownLink`
- Shadow: `style` cssText + (`<a href target download rel aria-current>` wrapping slot, or slot only). `:host` is `display:grid`. Dummy Mitosis `.root` is absent. `href` is omitted when unset. Lit `nothing` is not treated as a URL (`href !== nothing && href !== undefined && href !== null`). No `delegatesFocus`. No `my-fragment`.
- Stencil loader: exact `"p-drilldown-link"` absent from `bootstrapLazy` after a full `--dev` restart. `"p-drilldown"` and `"p-drilldown-item"` stay absent.
- IIFE: `/assets/p-drilldown-link.iife.js` HTTP 200
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-drilldown-link` vs stored baseline | 460×466 | 0 | 214360 |

After PNG is the same 18500 bytes as the stored baseline (SHA-256 `7e397a872604e2ae0b88a78b991751a56ee5ef2f005f4ebae99998be9ce49ddc`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-drilldown-link` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="drilldown"]` (`460x466` at dsf 2). After path is `/opt/cursor/artifacts/mitosis_land_drilldown_link_after.png`.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_drilldown_before.png` (untouched, reused parent closed crop)
- `/opt/cursor/artifacts/mitosis_land_drilldown_link_after.png`
- `/opt/cursor/artifacts/mitosis_land_drilldown_link_after_pass.png`
- `/opt/cursor/artifacts/land_drilldown_link_pixel_diff.png`
- `/opt/cursor/artifacts/land_drilldown_link_verify.log`

## Wiring

Same isolated pattern as land-drilldown-item. Stencil 4 `excludeComponents` is prod-only. `drilldown-link.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-drilldown-link` from the loader.

`HTMLPDrilldownLinkElement` stays on the stub (`declare global`) and in `html-p-drilldown-link-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PDrilldownLink` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/drilldown-link/DrilldownLink.lite.tsx` (`tagName: 'p-drilldown-link'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-drilldown-link.mjs` strips `<my-fragment>` after `mitosis build`, emits slotted-anchor or `<a>` wrap, omits unset `href`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-drilldown-link.iife.js`. Playground `index.html` loads that IIFE after the already-landed item bundle.

Generated `DrilldownLink.ts` has `@customElement("p-drilldown-link")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/DrilldownLink.lite.tsx` `tagName` is now `'p-drilldown-link'`.

Dummyassets 3002 down is benign. Parent-kind warnings from Lit links under Lit items are benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `DrilldownLink` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start `carousel` or `canvas`.
