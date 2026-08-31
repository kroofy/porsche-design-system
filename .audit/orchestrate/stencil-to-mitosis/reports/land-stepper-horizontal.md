# land-stepper-horizontal

**unit:** playground `p-stepper-horizontal` from Mitosis Lit (not Stencil, not `lit-stepper-horizontal`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `0161199f96`
**fix SHA:** `1b74967217`
**accept SHA:** (this commit)

Playground `p-stepper-horizontal` is Mitosis Lit (`LitStepperHorizontal` / `@customElement("p-stepper-horizontal")`). Pixel-diff vs stored Stencil stepper-horizontal baseline is **0**.

Do not start `stepper-horizontal-item`. Do not re-touch `p-tabs`, `p-tabs-item`, `p-tabs-bar`, `p-multi-select`, or `p-multi-select-option`.

## Playground

- URL: `http://localhost:3333/?components=stepper-horizontal`
- Card: `[data-card="stepper-horizontal"]` (grid-column span 2; 3 hosts)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: default 3 items (`current` / unset / unset) plus sibling `p-button` / `p-text`; complete/warning/current/unset; `size=medium` with the same 4 items. 11 `p-stepper-horizontal-item` stay Stencil (`HostElement`, hydrated). Nested `p-scroller.scroller` is `LitScroller`. Sibling `p-button` is `LitButton`. Nested `p-text` is `LitText`.
- Constructor: `LitStepperHorizontal`
- Shadow: `div.wrap` (`display:contents`) + `style` cssText + `p-scroller.scroller` with `.aria={ role: "list" }` + default `<slot>`. No `my-fragment`. Does not fake `delegatesFocus`. Recenter uses `scrollIntoView({ behavior: "instant", block: "nearest", inline: "center", container: "nearest" })` after layout, not on every `updated`.
- Stencil loader: exact `"p-stepper-horizontal"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-stepper-horizontal.entry.js`. `p-stepper-horizontal-item` stays in the loader.
- IIFE: `/assets/p-stepper-horizontal.iife.js` HTTP 200, 32431 bytes
- Animation freeze: `--p-animation-duration: 0s`, `--p-transition-duration: 0s`, `--p-duration-md: 0s`, `--p-duration-sm: 0s`
- `size` `m` is 1000 in the cssText compiler. This card has no breakpoint objects, so the emitted sheet has no literal `1000`.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-stepper-horizontal` vs stored baseline | 982×610 | 0 | 599020 |

After PNG is the same 56074 bytes as the stored baseline (SHA-256 `502b71aef339f4c1453c2c83fb7ece59476ac6794e944c5876f3231b976ef7da`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-stepper-horizontal` host left to photograph.

LitIcon only maps `car` and `arrow-right`. The host stamps `success.b16d4c1.svg` / `warning.59927e6.svg` onto item `p-icon` nodes and `arrow-head-left.cf1395d.svg` onto the playground Previous Step button. First pixel-diff without those stamps was 1991 / 599020 (arrows instead of check / warning / left chevron).

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_stepper_horizontal_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_stepper_horizontal_after.png`
- `/opt/cursor/artifacts/mitosis_land_stepper_horizontal_after_pass.png`
- `/opt/cursor/artifacts/land_stepper_horizontal_pixel_diff.png`
- `/opt/cursor/artifacts/land_stepper_horizontal_verify.log`

## Wiring

Same isolated pattern as land-tabs-bar. Stencil 4 `excludeComponents` is prod-only. `stepper-horizontal.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-stepper-horizontal` from the loader.

`HTMLPStepperHorizontalElement` stays on the stub (`declare global`) and in `html-p-stepper-horizontal-element.d.ts`. Do not declare optional `hidden` on that interface. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PStepperHorizontal` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/stepper-horizontal/StepperHorizontal.lite.tsx` (`tagName: 'p-stepper-horizontal'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-stepper-horizontal.mjs` strips `<my-fragment>` after `mitosis build`, sets scroller `role=list`, recenters the `state=current` item with `behavior: "instant"` after layout, observes childList/`slotchange` plus `queueMicrotask` so light-DOM items still land after CE-in-head, stamps LitIcon `source` for names LitIcon does not map, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-stepper-horizontal.iife.js`. Playground `index.html` loads that IIFE after the already-landed scroller bundle.

Generated `StepperHorizontal.ts` has `@customElement("p-stepper-horizontal")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/StepperHorizontal.lite.tsx` `tagName` is now `'p-stepper-horizontal'`.

Dummyassets 3002 down is benign. `throwIfParentIsNotOfKind` on item reconnect is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `StepperHorizontal` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start stepper-horizontal-item.
