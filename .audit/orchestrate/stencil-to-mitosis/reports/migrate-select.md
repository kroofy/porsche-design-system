# Migrate p-select to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     faa42d1806 (source, bundle; baseline and this report land on top)
TAG      p-select only. LIT_TAG lit-select. packages/components untouched.

## Verdict

`Select.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=select` swapped in-card to `lit-select` diffs 0 of 451,720 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="select"]`. Card is closed (combobox `aria-expanded=false`, popover not `:popover-open`).

This is a `.root` grid with Label (`label` + `htmlFor="button"`), a closed combobox button (empty selected span + `p-icon` `arrow-head-down`), a hidden `popover="manual"` listbox slot, and StateMessage. `p-select-option` / `p-optgroup` and nested `p-icon` stay Stencil. Light-DOM children are copied on swap. `rg my-fragment output/lit/src/Select.ts` is empty.

## What was built

Copied the RadioGroup / PinCode cssText / shadow / slotted-children pattern. RadioGroup.lite.tsx was not edited.

- `src/Select.lite.tsx` mirrors closed-state `getComponentCss(false, …)`: host `--_p-select-a` / `--_p-select-option-a` / `--_p-optgroup-a` scaling, button border/background by form state, hover/focus-visible, disabled opacity + GrayText, icon rotate closed, popover `display:none`, hideLabel breakpoints (m is 1000), label/message styles.
- Strip omits empty label-wrapper / description so `.root` gap does not add a blank row, renders message `p-icon` only when `state` is success/error, and keeps the dropdown closed.
- Filter `p-input-search` lives inside the hidden Stencil popover and is omitted from the closed Lit tree. `filter="true"` is still copied as an attribute.
- Playground has 4 hosts, all `class="w-full"` `label="Some label"` `name="some-name"` `filter="true"`, no value: default, `state="success"` + message, `state="error"` + message, `disabled="true"`. Each has one direct `p-select-option` and two `p-optgroup`s (five options total).

Options and optgroups throw `parent should be of kind p-select` when reparented onto `lit-select`. Swap swallows that connect check. Nested icons stay `P-ICON`.

Transitions are paused with `--p-animation-duration: 0s` and `--p-transition-duration: 0s` on both sides.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-select-whitespace.mjs
rg my-fragment output/lit/src/Select.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Select.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-select.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=select" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_select_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_select_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-select-baseline.mjs
node harness/verify-select.mjs            # exit 0, failures: []
node harness/pixel-diff-select.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `Select.ts` has none.

## Live verification

`node harness/verify-select.mjs`, exit 0: shadow root, cssText `<style>`, `.root`, host scaling vars, closed combobox, empty selected span, arrow `P-ICON` with class `icon`, hidden `popover="manual"`, default slot, disabled button + GrayText, label `for="button"`, success check icon + token color, error `aria-invalid` + exclamation, compact scale 0.64285714, hide-label m=1000, hidden host, no inner `lit-*`.

`node harness/pixel-diff-select.mjs`, exit 0:

```json
{
  "swap": { "swapped": 4, "litRendered": 4, "fragment": false, "innerLit": false, "slottedCopied": true, "closed": true, "itemsStayStencil": { "optionCount": 20, "groupCount": 8, "tags": ["P-SELECT-OPTION", "P-OPTGROUP"], "icons": ["P-ICON"] } },
  "controlStencilVsBaseline": { "aSize": "460x982", "strictMismatch": 0, "totalPixels": 451720 },
  "litVsBaseline": { "aSize": "460x982", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 451720 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_select_before.png`
- `/opt/cursor/artifacts/mitosis_lit_select_after.png`
- `/opt/cursor/artifacts/select_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_select_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-select.md`

## Follow-ups

- `p-select-option` and `p-optgroup` still require a `p-select` parent on connect. A future `lit-select-option` / `lit-optgroup` or a relaxed parent check is needed before items can remount cleanly.
- Open dropdown, filter `p-input-search`, typeahead, `change` / `blur` / native form internals are not in this closed-card pixel probe.
- Keep leftover `harness/stencil_*_control.png` untracked.
