# land-popover

**unit:** playground `p-popover` from Mitosis Lit (not Stencil, not `lit-popover`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `7d8b653e99`
**accept SHA:** (this commit)

Playground `p-popover` is Mitosis Lit (`LitPopover` / `@customElement("p-popover")`). Pixel-diff vs stored Stencil popover baseline is **0**. After PNG is byte-equal to the stored baseline (54855, SHA-256 `d63be3f3cf5a954dc2adf4bbaa7914abee530b82a041a7b81fdab7148a63fb8e`).

Do not start `table`. Do not re-touch `p-link-tile-product`, `p-link-tile`, `p-button-tile`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=popover`
- Card: `[data-card="popover"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 12 `p-popover` (`LitPopover`), including 1 nested. Two hosts `open="true"` are `:popover-open` with Floating UI `left`/`top`. Unset `open` stays closed. Nested `p-button-pure` is `LitButtonPure`. Nested `p-button` is `LitButton`. Nested `p-text` is `LitText`.
- Constructor: `LitPopover`
- Shadow: `style` cssText + native `[popover=manual]` + `.arrow`. Default info button when there is no `slot="button"`. Description renders `<p>`; otherwise default slot. Named `button` slot copied. Parent with nested popover children re-shows after those children `updateComplete` so it paints above later sibling panels. No `my-fragment`. Does not fake `delegatesFocus`.
- Stencil loader: exact `"p-popover"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-popover.entry.js`.
- IIFE: `/assets/p-popover.iife.js` HTTP 200, 88096 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no breakpoint objects.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-popover` vs stored baseline | 460×1640 | 0 | 754400 |

After PNG is the same 54855 bytes as the stored baseline (SHA-256 `d63be3f3cf5a954dc2adf4bbaa7914abee530b82a041a7b81fdab7148a63fb8e`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-popover` host left to photograph.

Card is taller than 900. Crop is `page.screenshot({ clip })` to the viewport remainder (`460x1640` at dsf 2).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_popover_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_popover_after.png`
- `/opt/cursor/artifacts/mitosis_land_popover_after_pass.png`
- `/opt/cursor/artifacts/land_popover_pixel_diff.png`
- `/opt/cursor/artifacts/land_popover_verify.log`

## Wiring

Same isolated pattern as land-link-tile-product. Stencil 4 `excludeComponents` is prod-only. `popover.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-popover` from the loader.

`HTMLPPopoverElement` stays on the stub (`declare global`) and in `html-p-popover-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PPopover` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/popover/Popover.lite.tsx` (`tagName: 'p-popover'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-popover.mjs` strips `<my-fragment>` after `mitosis build`, drops the layout-affecting `.wrap`, calls `showPopover()` for controlled `open="true"`, re-shows a parent after nested `p-popover` children update, stamps `information.da41162.svg` on slotted `p-button-pure` (LitIcon only maps `car` / `arrow-right`), observes childList/`slotchange` plus `queueMicrotask` so the named button slot still lands after CE-in-head, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-popover.iife.js`. Playground `index.html` loads that IIFE after the already-landed link-tile-product bundle.

The playground script used to set every `.controlled-popover.open = false` to opt into controlled mode. With CE-in-head that ran after upgrade and closed `open="true"` hosts. It now coerces `.open` from the `open` attribute so those hosts stay visible.

Generated `Popover.ts` has `@customElement("p-popover")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Popover.lite.tsx` `tagName` is now `'p-popover'`.

Dummyassets 3002 down is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `Popover` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start table.
