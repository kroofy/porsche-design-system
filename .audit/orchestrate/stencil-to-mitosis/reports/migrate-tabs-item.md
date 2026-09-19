# Migrate p-tabs-item to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     e62fa8006c (source, bundle; baseline and this report land on top)
TAG      p-tabs-item only. LIT_TAG lit-tabs-item. packages/components untouched. Existing *.lite.tsx files untouched except TabsItem.lite.tsx.

## Verdict

`TabsItem.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=tabs` swapped in-card `p-tabs-item` hosts to `lit-tabs-item` diffs 0 of 1,093,948 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="tabs"]`.

Parent `p-tabs` stays Stencil. Light-DOM `p-text` children are copied on swap. All 15 item parents remain `P-TABS`. No `lit-tabs` hosts. `rg my-fragment output/lit/src/TabsItem.ts` is empty.

## What was built

Copied the in-parent item swap from text-list-item and multi-select-option. Those lite files were not edited.

- `src/TabsItem.lite.tsx` mirrors `getComponentCss`: host block, primary color, 2px radius, hidden, `:focus-visible` outline, forced-colors `Highlight`. Mitosis root is a dummy `.root` stripped after `mitosis build`. Render is `<style>` + `<slot>`.
- Strip keeps `@property() label` so the parent can still read `tab.label` for bar buttons.
- Pixel-diff patches parent `defineTabsItems` to accept `LIT-TABS-ITEM` (Stencil `throwIfChildrenAreNotOfKind` would fire on slotchange). `throwIfParentIsNotOfKind` is benign because the parent stays `p-tabs`.
- Playground has 5 `p-tabs` hosts, 15 items (5 visible / 10 hidden), each with nested Stencil `p-text`.
- File harness proves shadow, cssText `<style>`, primary token color, focus + HCM rules, slotted span, label, parent `P-TABS`, hidden host, no `.root`, no fragment, no inner `lit-*`.

`--p-animation-duration` and `--p-duration-md` are set to `0s` on both sides so the parent bar's delayed active fill does not race the screenshot.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-tabs-item-whitespace.mjs
rg my-fragment output/lit/src/TabsItem.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/TabsItem.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-tabs-item.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=tabs" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_tabs_item_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_item_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-tabs-item-baseline.mjs
node harness/verify-tabs-item.mjs            # exit 0, failures: []
node harness/pixel-diff-tabs-item.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `TabsItem.ts` has none.

## Live verification

`node harness/verify-tabs-item.mjs`, exit 0: shadow root, cssText `<style>`, `:host` block + primary + radius, focus-visible, forced-colors Highlight, slotted span, label, parent `P-TABS`, hidden host, no `.root`, no inner `lit-*`.

`node harness/pixel-diff-tabs-item.mjs`, exit 0:

```json
{
  "swap": { "swapped": 15, "litRendered": 15, "fragment": false, "parentStillStencil": true, "slottedCopied": true, "innerLit": false, "nested": { "itemCount": 15, "textTags": ["P-TEXT"], "textCount": 15, "hiddenCount": 10, "visibleCount": 5 } },
  "controlStencilVsBaseline": { "aSize": "982x1114", "strictMismatch": 0, "totalPixels": 1093948 },
  "litVsBaseline": { "aSize": "982x1114", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 1093948 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_tabs_item_before.png`
- `/opt/cursor/artifacts/mitosis_lit_tabs_item_after.png`
- `/opt/cursor/artifacts/tabs_item_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_item_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-tabs-item.md`

## Follow-ups

- Parent `update` / label-change `updateParent` is not in this paused pixel probe.
- Keep leftover `harness/stencil_*_control.png` untracked.
