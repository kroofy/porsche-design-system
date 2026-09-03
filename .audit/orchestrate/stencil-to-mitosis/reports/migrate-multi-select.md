# Migrate p-multi-select to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     9d8fe17679 (source, bundle; baseline and this report land on top)
TAG      p-multi-select only. LIT_TAG lit-multi-select. packages/components untouched. Select.lite.tsx untouched.

## Verdict

`MultiSelect.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=multi-select` swapped in-card to `lit-multi-select` diffs 0 of 451,720 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="multi-select"]`. Card is closed (combobox `aria-expanded=false`, popover not `:popover-open`).

This is a `.root` grid with Label (`label` + `htmlFor="button"`), a closed combobox button (empty selected span + `p-icon` `arrow-head-down`), a hidden `popover="manual"` listbox slot with `aria-multiselectable="true"`, and StateMessage. `p-multi-select-option` / `p-optgroup` and nested `p-icon` stay Stencil. Light-DOM children are copied on swap. `rg my-fragment output/lit/src/MultiSelect.ts` is empty.

## What was built

Copied the Select closed-card cssText / shadow / slotted-children pattern. Select.lite.tsx was not edited.

- `src/MultiSelect.lite.tsx` mirrors closed-state `getComponentCss(false, …)`: host `--_p-multi-select-a` / `--_p-multi-select-option-a` / `--_p-optgroup-a` scaling, `--p-multi-select-*` button colors, two-icon `.root` min-width (`* 2`), popover `max-height` 242px (option height 44), hover/focus-visible, disabled opacity + GrayText, icon rotate closed, hideLabel breakpoints (m is 1000), label/message styles.
- Strip omits empty label-wrapper / description so `.root` gap does not add a blank row, renders message `p-icon` only when `state` is success/error, and keeps the dropdown closed.
- Built-in filter `p-input-search` and the reset `p-button-pure` live inside the hidden Stencil popover or only when a value is set. Playground hosts have no value, so both stay out of the closed Lit tree.
- Playground has 4 hosts, all `class="w-full"` `label="Some label"` `name="some-name"`, no value: default, `state="success"` + message, `state="error"` + message, `disabled="true"`. Each has one direct `p-multi-select-option` and two `p-optgroup`s (five options total).

Options throw `parent should be of kind p-multi-select | p-optgroup` and optgroups throw `parent should be of kind p-select | p-multi-select` when reparented onto `lit-multi-select`. Swap swallows that connect check. Nested icons stay `P-ICON`.

Transitions are paused with `--p-animation-duration: 0s` and `--p-transition-duration: 0s` on both sides.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-multi-select-whitespace.mjs
rg my-fragment output/lit/src/MultiSelect.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/MultiSelect.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-multi-select.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=multi-select" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_multi_select_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_multi_select_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-multi-select-baseline.mjs
node harness/verify-multi-select.mjs            # exit 0, failures: []
node harness/pixel-diff-multi-select.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `MultiSelect.ts` has none.

## Live verification

`node harness/verify-multi-select.mjs`, exit 0: shadow root, cssText `<style>`, `.root`, host scaling vars, two-icon min-width, 242px popover max-height, closed combobox, empty selected span, arrow `P-ICON` with class `icon`, hidden `popover="manual"`, `aria-multiselectable="true"`, default slot, disabled button + GrayText, label `for="button"`, success check icon + token color, error `aria-invalid` + exclamation, compact scale 0.64285714, hide-label m=1000, hidden host, no inner `lit-*`.

`node harness/pixel-diff-multi-select.mjs`, exit 0:

```json
{
  "swap": { "swapped": 4, "litRendered": 4, "fragment": false, "innerLit": false, "slottedCopied": true, "closed": true, "itemsStayStencil": { "optionCount": 20, "groupCount": 8, "tags": ["P-MULTI-SELECT-OPTION", "P-OPTGROUP"], "icons": ["P-ICON"] } },
  "controlStencilVsBaseline": { "aSize": "460x982", "strictMismatch": 0, "totalPixels": 451720 },
  "litVsBaseline": { "aSize": "460x982", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 451720 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_multi_select_before.png`
- `/opt/cursor/artifacts/mitosis_lit_multi_select_after.png`
- `/opt/cursor/artifacts/multi_select_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_multi_select_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-multi-select.md`

## Follow-ups

- `p-multi-select-option` and `p-optgroup` still require a `p-multi-select` / `p-select` parent on connect. A future `lit-multi-select-option` or a relaxed parent check is needed before items can remount cleanly.
- Open dropdown, filter `p-input-search`, reset `p-button-pure`, selected-value chips, `change` / `blur` / native form internals are not in this closed-card pixel probe.
- Keep leftover `harness/stencil_*_control.png` untracked.
