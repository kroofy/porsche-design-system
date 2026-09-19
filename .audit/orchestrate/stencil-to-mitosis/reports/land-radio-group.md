# land-radio-group

**unit:** playground `p-radio-group` from Mitosis Lit (not Stencil, not `lit-radio-group`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `b114bf0ccf`
**accept SHA:** (this commit)

Playground `p-radio-group` is Mitosis Lit (`LitRadioGroup` / `@customElement("p-radio-group")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `radio-group-option`. Do not re-touch `segmented-control` or `segmented-control-item`.

## Playground

- URL: `http://localhost:3333/?components=radio-group`
- Card: `[data-card="radio-group"]` (5 hosts, all `class="self-start"` `name="options"` `value="b"` `label="Some label"`)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: default, `loading="true"`, success+message, error+message, `disabled="true"`. Each has five `p-radio-group-option` children. Option D is `loading="true"`, option E is `disabled="true"`. Options stay Stencil (`HostElement`). Nested `p-icon` / `p-spinner` stay Mitosis (`LitIcon` / `LitSpinner`).
- Constructor: `LitRadioGroup`
- Shadow: `style` cssText + `fieldset.root` + Label + `.wrapper` slot + overlay `p-spinner` when loading + StateMessage + LoadingMessage, no `my-fragment`. Does not fake `delegatesFocus` or `formAssociated`.
- Stencil loader: exact `"p-radio-group"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-radio-group.entry.js`. Options still have `p-radio-group-option.entry.js`.
- IIFE: `/assets/p-radio-group.iife.js` HTTP 200, 40950 bytes
- Animation freeze: `--p-animation-duration: 0s` and `--p-transition-duration: 0s`
- `hideLabel` and `direction` `m` are 1000 in the cssText compiler. This card has no breakpoint objects, so the emitted sheet has no literal `1000`.

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-radio-group` vs stored baseline | 460×1640 | 0 | 754400 |

Card is taller than 900. Capture used `page.screenshot({ clip })` with clip height clipped to the viewport remainder (820). After PNG is the same 93075 bytes as the stored baseline (SHA-256 `abc65a990ebcfdb69a4b23e570d0dcde66759c1b3673c3dda3ca33fe7309f838`). Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-radio-group` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_radio_group_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_radio_group_after.png`
- `/opt/cursor/artifacts/land_radio_group_pixel_diff.png`
- `/opt/cursor/artifacts/land_radio_group_verify.log`

## Wiring

Same isolated pattern as land-segmented-control. Stencil 4 `excludeComponents` is prod-only. `radio-group.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-radio-group` from the loader.

`HTMLPRadioGroupElement` stays on the stub (`declare global`) and in `html-p-radio-group-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PRadioGroup` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/radio-group/RadioGroup.lite.tsx` (`tagName: 'p-radio-group'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-radio-group.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab attrs (`hide-label`), stamps `selected` / `disabledParent` / `loadingParent` / `state` / `name` on Stencil options, sets `iconSource` for success/error icons to `http://localhost:3001/icons/check.8ba06be.svg` and `http://localhost:3001/icons/exclamation.46cd17b.svg` because LitIcon only maps `car` and `arrow-right`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-radio-group.iife.js`. Playground `index.html` loads that IIFE next to the segmented-control-item bundle.

Generated `RadioGroup.ts` has `@customElement("p-radio-group")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/RadioGroup.lite.tsx` `tagName` is now `'p-radio-group'`.

Dummyassets 3002 down is benign; `throwIfParentIsNotOfKind` / `throwIfElementIsNotOfKind` on option reconnect is benign. The stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `RadioGroup` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start radio-group-option.
