# land-sheet

**unit:** playground `p-sheet` from Mitosis Lit (not Stencil, not `lit-sheet`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `186a1fea5a`
**accept SHA:** (this commit)

Playground `p-sheet` is Mitosis Lit (`LitSheet` / `@customElement("p-sheet")`). Pixel-diff vs stored Stencil sheet baseline is **0**. After PNG is byte-equal to the stored baseline (27148, SHA-256 `777fc399a77ec9006c63bbe599f958bfae5ec378d9d9c352eca0cc4c12033dfe`).

Do not start `drilldown`. Do not re-touch `p-flyout`, `p-modal`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=sheet`
- Card: `[data-card="sheet"]` (three closed `p-sheet` hosts plus already-landed Mitosis `p-button` openers)
- Dialogs were not opened. Nested `p-heading` / `p-text` / `p-button` stay already-landed Mitosis.
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop is the closed card (`460x700` at dsf 2).
- Hosts: 3 `p-sheet` (`LitSheet`)
- Constructor: `LitSheet`
- Shadow: `style` cssText + `dialog > .scroller > .sheet` + native `button.dismiss` + header / default slots. `:host` is `display:contents`. Closed dialog is `width:0` / `height:0` / `visibility:hidden`. `showModal()` runs only when `open`. Backdrop is always shading. Panel slides from the bottom (`translate3d(0,25vh,0)`). Scroller is fullscreen `inset:0`. `dismissButton` defaults true. Dummy Mitosis `.root` is not present. `m` is 1000 (unused on this tag). No footer / sub-footer / position / fullscreen / sticky-top. No nested `p-button-pure`. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-sheet"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-sheet.entry.js`.
- IIFE: `/assets/p-sheet.iife.js` HTTP 200, 34521 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-sheet` vs stored baseline | 460×700 | 0 | 322000 |

After PNG is the same 27148 bytes as the stored baseline (SHA-256 `777fc399a77ec9006c63bbe599f958bfae5ec378d9d9c352eca0cc4c12033dfe`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-sheet` host left to photograph.

Crop is `page.screenshot({ clip })` of `[data-card="sheet"]` (`460x700` at dsf 2). After path is `/opt/cursor/artifacts/mitosis_land_sheet_after.png` (not the probe `mitosis_lit_sheet_after.png`).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_sheet_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_sheet_after.png`
- `/opt/cursor/artifacts/mitosis_land_sheet_after_pass.png`
- `/opt/cursor/artifacts/land_sheet_pixel_diff.png`
- `/opt/cursor/artifacts/land_sheet_verify.log`

## Wiring

Same isolated pattern as land-flyout. Stencil 4 `excludeComponents` is prod-only. `sheet.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-sheet` from the loader.

`HTMLPSheetElement` stays on the stub (`declare global`) and in `html-p-sheet-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PSheet` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/sheet/Sheet.lite.tsx` (`tagName: 'p-sheet'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-sheet.mjs` strips `<my-fragment>` after `mitosis build`, inlines DialogBase (`dialog > .scroller > .sheet`), uses a native dismiss button labeled `Dismiss sheet` (dropped when `dismissButton` is false / `"false"`), calls `showModal()` only when `open`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-sheet.iife.js`. Playground `index.html` loads that IIFE after the already-landed flyout bundle.

Generated `Sheet.ts` has `@customElement("p-sheet")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Sheet.lite.tsx` `tagName` is now `'p-sheet'`.

Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `Sheet` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start drilldown.
