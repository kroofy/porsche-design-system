# land-segmented-control

**unit:** playground `p-segmented-control` from Mitosis Lit (not Stencil, not `lit-segmented-control`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `23c19ec88e`
**accept SHA:** (this commit)

Playground `p-segmented-control` is Mitosis Lit (`LitSegmentedControl` / `@customElement("p-segmented-control")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `segmented-control-item`. Do not re-touch `accordion`, `pin-code`, or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=segmented-control`
- Card: `[data-card="segmented-control"]` (3 hosts, all `class="w-full"`, four items each)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: default, `disabled="true"`, mixed item-disabled. Nested `p-icon` stays Mitosis (`LitIcon`). Items stay Stencil (`HostElement`).
- Constructor: `LitSegmentedControl`
- Shadow: `style` cssText + `fieldset.root` + omitted empty label-wrapper + default slot + StateMessage, no `my-fragment`
- Stencil loader: exact `"p-segmented-control"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-segmented-control.entry.js`.
- IIFE: `/assets/p-segmented-control.iife.js` HTTP 200, 42050 bytes
- Animation freeze: `--p-animation-duration: 0s` and `--p-transition-duration: 0s`
- `hideLabel` `m` is 1000 in the cssText compiler. This card has no breakpoint objects, so the emitted sheet has no literal `1000`.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-segmented-control` vs stored baseline | 460×972 | 0 | 447120 |

After PNG is the same 36882 bytes as the stored baseline (SHA-256 `5148d29f2ff83572c9584e06db603f012427de781ffe708a460b9e92fb0f3c5f`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-segmented-control` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_segmented_control_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_segmented_control_after.png`
- `/opt/cursor/artifacts/land_segmented_control_pixel_diff.png`
- `/opt/cursor/artifacts/land_segmented_control_verify.log`

## Wiring

Same pattern as land-accordion. Stencil 4 `excludeComponents` is prod-only. `segmented-control.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-segmented-control` from the loader.

`HTMLPSegmentedControlElement` stays on the stub (`declare global`) and in `html-p-segmented-control-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PSegmentedControl` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/segmented-control/SegmentedControl.lite.tsx` (`tagName: 'p-segmented-control'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-segmented-control.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab attrs (`hide-label`, `no-wrap`), measures item widths on `document.body` (Lit render cannot `getComputedStyle` a temp node in `shadowRoot`), stamps `disabledParent` on Stencil items, sets `iconSource` for `like` to `http://localhost:3001/icons/like.a7468cd.svg` because LitIcon only maps `car` and `arrow-right`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-segmented-control.iife.js`. Playground `index.html` loads that IIFE next to the accordion bundle.

Generated `SegmentedControl.ts` has `@customElement("p-segmented-control")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/SegmentedControl.lite.tsx` `tagName` is now `'p-segmented-control'`.

Dummyassets 3002 down is benign; the stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `SegmentedControl` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start segmented-control-item.
