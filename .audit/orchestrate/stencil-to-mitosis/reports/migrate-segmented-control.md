# Migrate p-segmented-control to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     6042c69a33 (source, bundle; baseline and this report land on top)
TAG      p-segmented-control only. LIT_TAG lit-segmented-control. packages/components untouched.

## Verdict

`SegmentedControl.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=segmented-control` swapped in-card to `lit-segmented-control` diffs 0 of 447,120 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="segmented-control"]`.

This is a `fieldset.root` with optional Label, a default slot of `p-segmented-control-item`, and StateMessage. Items and nested `p-icon` stay Stencil. Light-DOM children are copied on swap. `rg my-fragment output/lit/src/SegmentedControl.ts` is empty.

## What was built

Copied the Fieldset / PinCode cssText / shadow / slotted-children pattern. Fieldset.lite.tsx was not edited.

- `src/SegmentedControl.lite.tsx` mirrors `getComponentCss`: `slot:not([name])` grid, auto-fit column width from measured item max, hideLabel breakpoints (m is 1000), label/message styles, disabled GrayText, noWrap column flow.
- Strip measures item widths the same way as Stencil `getItemWidths` (temp box with button font, optional icon + item label) and omits empty label-wrapper so `.root` grid gap does not add a blank row.
- Playground has 3 hosts, all `class="w-full"`, four items each: default, `disabled="true"`, mixed item-disabled. No label/message/columns/noWrap.
- File harness proves shadow, auto-fit, disabled fieldset, label-wrapper when labeled, success `P-ICON`, `columns=2`, hidden host.

Items throw `parent should be of kind p-segmented-control` when reparented onto `lit-segmented-control`. Swap swallows that connect check; items keep their last Stencil render. Nested icons stay `P-ICON`.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-segmented-control-whitespace.mjs
rg my-fragment output/lit/src/SegmentedControl.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/SegmentedControl.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-segmented-control.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=segmented-control" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_segmented_control_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_segmented_control_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-segmented-control-baseline.mjs
node harness/verify-segmented-control.mjs           # exit 0, failures: []
node harness/pixel-diff-segmented-control.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `SegmentedControl.ts` has none.

## Live verification

`node harness/verify-segmented-control.mjs`, exit 0: shadow root, cssText `<style>`, `.root`, `repeat(auto-fit,`, 6px gap, default slot, disabled fieldset + GrayText, labeled wrapper, success check icon + token color, `columns=2` → `repeat(2, minmax(0, 1fr))`, hidden host, no inner `lit-*`.

`node harness/pixel-diff-segmented-control.mjs`, exit 0:

```json
{
  "swap": { "swapped": 3, "litRendered": 3, "fragment": false, "innerLit": false, "slottedCopied": true, "itemsStayStencil": { "count": 12, "tags": ["P-SEGMENTED-CONTROL-ITEM"], "icons": ["P-ICON"] } },
  "controlStencilVsBaseline": { "aSize": "460x972", "strictMismatch": 0, "totalPixels": 447120 },
  "litVsBaseline": { "aSize": "460x972", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 447120 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_segmented_control_before.png`
- `/opt/cursor/artifacts/mitosis_lit_segmented_control_after.png`
- `/opt/cursor/artifacts/segmented_control_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_segmented_control_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-segmented-control.md`

## Follow-ups

- `p-segmented-control-item` still requires a `p-segmented-control` parent on connect. A future `lit-segmented-control-item` or a relaxed parent check is needed before items can remount cleanly.
- `change` / `blur` / native form internals are not in this pixel probe.
- `noWrap` + `p-scroller` is implemented in cssText only; playground hosts do not use it.
