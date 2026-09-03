# land-toast-item

**unit:** playground `p-toast-item` from Mitosis Lit (not Stencil, not `lit-toast-item`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `b9a06927dd`
**accept SHA:** (this commit)

Playground `p-toast-item` is Mitosis Lit (`LitToastItem` / `@customElement("p-toast-item")`). Pixel-diff vs stored Stencil toast-item baseline is **0**. After PNG is byte-equal to the stored baseline (106421, SHA-256 `9f4ccf71694021cbac6df325a046b66cc584b08d93b70c9823ea493e417b32ba`).

Do not start `modal`. Do not re-touch `p-toast`, `p-table-cell`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=toast`
- Card: `[data-card="toast"]` (four already-landed Mitosis `p-button` hosts plus parent `p-toast`)
- Opened the same message: `addMessage({ text: 'Some content' })`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Crop is the union of the card and the open item. The item is a native popover at the viewport bottom. Card-only crop would omit it.
- Hosts: 1 `p-toast-item` (`LitToastItem`) inside parent `p-toast` (`LitToast`)
- Constructor: `LitToastItem`
- Shadow: `style` cssText + `.notification` + `<p>` + native `button.dismiss`. Host is `popover="manual"`. `connectedCallback` / `updated` call `showPopover()`. `text` / `state` read as properties or attributes. Dummy Mitosis `.root` is not present. `s` is 760 (icon mask on `.notification::before`). `m` is 1000 (unused on this crop). No nested `p-icon` / `p-button-pure`. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-toast-item"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-toast-item.entry.js`.
- IIFE: `/assets/p-toast-item.iife.js` HTTP 200, 32299 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- Auto-dismiss skip: `--p-temporary-toast-skip-timeout: true`

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-toast-item` vs stored baseline | 1020×1512 | 0 | 1542240 |

After PNG is the same 106421 bytes as the stored baseline (SHA-256 `9f4ccf71694021cbac6df325a046b66cc584b08d93b70c9823ea493e417b32ba`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-toast-item` host left to photograph.

Crop is `page.screenshot({ clip })` of the union of `[data-card="toast"]` and the open item (`1020x1512` at dsf 2). After path is `/opt/cursor/artifacts/mitosis_land_toast_item_after.png` (not the probe `mitosis_lit_toast_item_after.png`).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_toast_item_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_toast_item_after.png`
- `/opt/cursor/artifacts/mitosis_land_toast_item_after_pass.png`
- `/opt/cursor/artifacts/land_toast_item_pixel_diff.png`
- `/opt/cursor/artifacts/land_toast_item_verify.log`

## Wiring

Same isolated pattern as land-toast. Stencil 4 `excludeComponents` is prod-only. `toast-item.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-toast-item` from the loader.

`HTMLPToastItemElement` stays on the stub (`declare global`) and in `html-p-toast-item-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PToastItem` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/toast-item/ToastItem.lite.tsx` (`tagName: 'p-toast-item'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-toast-item.mjs` strips `<my-fragment>` after `mitosis build`, sets `popover="manual"`, calls `showPopover()`, reads `text`/`state` from properties or attributes, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-toast-item.iife.js`. Playground `index.html` loads that IIFE after the already-landed toast bundle.

Generated `ToastItem.ts` has `@customElement("p-toast-item")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/ToastItem.lite.tsx` `tagName` is now `'p-toast-item'`.

`throwIfRootNodeIsNotOneOfKind` on reconnect is benign. Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `ToastItem` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start modal.
