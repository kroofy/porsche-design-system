# Migrate p-radio-group to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     7f1d261f90 (source, bundle; baseline and this report land on top)
TAG      p-radio-group only. LIT_TAG lit-radio-group. packages/components untouched.

## Verdict

`RadioGroup.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=radio-group` swapped in-card to `lit-radio-group` diffs 0 of 754,400 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="radio-group"]`. Card is taller than 900 so the clip is the viewport remainder.

This is a `fieldset.root` with Label (`div.label`), a `.wrapper` slot of `p-radio-group-option`, overlay `p-spinner` when loading, StateMessage, and LoadingMessage. Options and nested `p-icon` / `p-spinner` stay Stencil. Light-DOM children are copied on swap. `rg my-fragment output/lit/src/RadioGroup.ts` is empty.

## What was built

Copied the SegmentedControl / PinCode cssText / shadow / slotted-children pattern. SegmentedControl.lite.tsx was not edited.

- `src/RadioGroup.lite.tsx` mirrors `getComponentCss`: host `--_p-radio-group-a` / `--_p-radio-group-option-a` scaling, wrapper flex direction (m is 1000), hideLabel breakpoints, label/message styles, loading slotted opacity + overlay spinner, disabled GrayText.
- Strip omits empty label-wrapper so `.root` row-gap does not add a blank row, renders overlay `p-spinner` only when loading, and syncs option `selected` / `disabledParent` / `loadingParent` / `state` / `name`.
- Playground has 5 hosts, all `class="self-start"` `name="options"` `value="b"` `label="Some label"`: default, `loading="true"`, `state="success"` + message, `state="error"` + message, `disabled="true"`. Each has five `p-radio-group-option`s; option D is `loading="true"`, option E is `disabled="true"`.
- File harness proves shadow, scaling vars, column direction, disabled fieldset + GrayText, label-wrapper, success `P-ICON`, loading overlay `P-SPINNER`, `direction` m=1000 row, hidden host.

Options throw `parent should be of kind p-radio-group` when reparented onto `lit-radio-group`. Swap swallows that connect check; options keep their last Stencil render and then receive synced parent props. Nested icons and spinners stay `P-ICON` / `P-SPINNER`.

Loading is paused with `--p-animation-duration: 0s` and `--p-transition-duration: 0s` on both sides.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-radio-group-whitespace.mjs
rg my-fragment output/lit/src/RadioGroup.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/RadioGroup.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-radio-group.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=radio-group" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_radio_group_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_radio_group_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-radio-group-baseline.mjs
node harness/verify-radio-group.mjs           # exit 0, failures: []
node harness/pixel-diff-radio-group.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `RadioGroup.ts` has none.

## Live verification

`node harness/verify-radio-group.mjs`, exit 0: shadow root, cssText `<style>`, `.root`, host scaling vars, column flex, default slot, disabled fieldset + GrayText, labeled wrapper, success check icon + token color, loading overlay spinner + slotted opacity, `direction` m=1000 row, hidden host, no inner `lit-*`.

`node harness/pixel-diff-radio-group.mjs`, exit 0:

```json
{
  "swap": { "swapped": 5, "litRendered": 5, "fragment": false, "innerLit": false, "slottedCopied": true, "itemsStayStencil": { "count": 25, "tags": ["P-RADIO-GROUP-OPTION"], "spinners": ["P-SPINNER"], "icons": ["P-ICON"] } },
  "controlStencilVsBaseline": { "aSize": "460x1640", "strictMismatch": 0, "totalPixels": 754400 },
  "litVsBaseline": { "aSize": "460x1640", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 754400 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_radio_group_before.png`
- `/opt/cursor/artifacts/mitosis_lit_radio_group_after.png`
- `/opt/cursor/artifacts/radio_group_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_radio_group_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-radio-group.md`

## Follow-ups

- `p-radio-group-option` still requires a `p-radio-group` parent on connect. A future `lit-radio-group-option` or a relaxed parent check is needed before options can remount cleanly.
- `change` / `blur` / native form internals / arrow-key tab stops are not in this pixel probe.
- The disabled host sits below the 900px viewport clip; the live card crop matches Stencil and Lit for the visible remainder.
