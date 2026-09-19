# Migrate p-segmented-control-item to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     e429f7cb18 (source, bundle; baseline and this report land on top)
TAG      p-segmented-control-item only. LIT_TAG lit-segmented-control-item. packages/components untouched. SegmentedControl.lite.tsx untouched.

## Verdict

`SegmentedControlItem.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=segmented-control` swapped item hosts only to `lit-segmented-control-item` and diffs 0 of 447,120 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="segmented-control"]`.

Parents stay `p-segmented-control`. Nested `p-icon` stays Stencil. Light-DOM children are copied on swap. `rg my-fragment output/lit/src/SegmentedControlItem.ts` is empty.

## What was built

Copied the TextListItem in-parent swap pattern. TextListItem.lite.tsx and SegmentedControl.lite.tsx were not edited.

- `src/SegmentedControlItem.lite.tsx` mirrors `getComponentCss`: `:host` block + disabled opacity 0.4, button min size from `--_p-segmented-control-a` (compact fallback 0.5), selected frosted-strong / primary border, icon+slot 4-value padding and `.icon` margin, hover only when enabled and unselected, forced-colors GrayText / Highlight.
- Strip hides empty label/icon, re-reads `icon-source` / `disabled` / `selected` / parent-synced `disabledParent` / `compact` / `state`.
- Playground has 12 items in 3 Stencil parents: label, icon+label, icon-only, parent-disabled group, and two item-`disabled="true"`.
- File harness proves shadow, frosted vs token ref, label span, `P-ICON` car + margin, disabled opacity 0.4, selected aria-pressed + frosted-strong, hidden host.

Internal props (`selected`, `compact`, `disabledParent`, `state`, `message`) are copied on swap so parent-disabled items stay dimmed.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-segmented-control-item-whitespace.mjs
rg my-fragment output/lit/src/SegmentedControlItem.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/SegmentedControlItem.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-segmented-control-item.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=segmented-control" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_segmented_control_item_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_segmented_control_item_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-segmented-control-item-baseline.mjs
node harness/verify-segmented-control-item.mjs           # exit 0, failures: []
node harness/pixel-diff-segmented-control-item.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `SegmentedControlItem.ts` has none.

## Live verification

`node harness/verify-segmented-control-item.mjs`, exit 0: shadow root, cssText `<style>`, host block, button font, default hover, frosted vs token, label `Model`, icon `P-ICON` car + margin, disabled opacity 0.4 / not-allowed / no hover, selected `aria-pressed=true` + frosted-strong, hidden host, no inner `lit-*`.

`node harness/pixel-diff-segmented-control-item.mjs`, exit 0:

```json
{
  "swap": { "swapped": 12, "litRendered": 12, "fragment": false, "parentStillStencil": true, "slottedCopied": true, "innerLit": false, "icons": ["P-ICON"] },
  "controlStencilVsBaseline": { "aSize": "460x972", "strictMismatch": 0, "totalPixels": 447120 },
  "litVsBaseline": { "aSize": "460x972", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 447120 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_segmented_control_item_before.png`
- `/opt/cursor/artifacts/mitosis_lit_segmented_control_item_after.png`
- `/opt/cursor/artifacts/segmented_control_item_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_segmented_control_item_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-segmented-control-item.md`

## Follow-ups

- Click / blur / `internalSegmentedControlItemUpdate` are not in this pixel probe.
- Stencil `forceUpdate` on Lit children after parent `observeChildren` is a no-op; Lit reacts via `@property`.
