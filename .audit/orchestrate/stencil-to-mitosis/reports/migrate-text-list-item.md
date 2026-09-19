# Migrate p-text-list-item to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     8ecc8ff920 (source, bundle; baseline and this report land on top)
TAG      p-text-list-item only. LIT_TAG lit-text-list-item. packages/components untouched.

## Verdict

`TextListItem.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=text-list` swapped in-card `p-text-list-item` hosts to `lit-text-list-item` diffs 0 of 465,520 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="text-list"]`.

Parent `p-text-list` stays Stencil. Light-DOM children (text `ABC` and nested Stencil `p-text-list`) are copied on swap. All 15 item parents remain `P-TEXT-LIST`. No `lit-text-list` hosts.

This is a thin wrapper: `role="listitem"` on the host plus a default slot. cssText is static: host 2-column grid, nested en-dash vars on `::slotted(*)`, last slotted child `grid-column: 2`.

## What was built

Copied the text-list harness and retargeted item hosts only. `TextList.lite.tsx` was not edited.

- `src/TextListItem.lite.tsx` mirrors `p-text-list-item`. Mitosis root is a dummy `.root` div stripped after `mitosis build`. Render is `<style>` + `<slot>`. `rg my-fragment output/lit/src/TextListItem.ts` is empty.
- Playground: 15 items (3+2+3+2+3+2) under unordered, numbered, and alphabetically lists, each with a nested default list. Nested lists stay Stencil.
- cssText matches the Stencil snapshot, including en-dash `--_p-text-list-g:"–"` (not a hyphen).
- Pixel-diff copies attributes and light-DOM children. Parent kind check does not throw because the parent remains `p-text-list`.
- File harness proves shadow, host grid, nested last-child `grid-column: 2`, `role=listitem`, hidden host, no `.root`, no fragment.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-text-list-item-whitespace.mjs
rg my-fragment output/lit/src/TextListItem.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/TextListItem.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-text-list-item.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=text-list" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_text_list_item_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_text_list_item_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-text-list-item-baseline.mjs
node harness/verify-text-list-item.mjs           # exit 0, failures: []
node harness/pixel-diff-text-list-item.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `TextListItem.ts` has none.

## Live verification

`node harness/verify-text-list-item.mjs`, exit 0: shadow root, cssText `<style>`, host `display:grid`, `--_p-text-list-e` columns, nested en-dash var, last-child `grid-column: 2`, `role=listitem`, hidden host, no `.root`, no fragment.

`node harness/pixel-diff-text-list-item.mjs`, exit 0:

```json
{
  "swap": { "swapped": 15, "litRendered": 15, "fragment": false, "parentStillStencil": true, "slottedCopied": true, "nestedLists": 3 },
  "controlStencilVsBaseline": { "aSize": "460x1012", "strictMismatch": 0, "totalPixels": 465520 },
  "litVsBaseline": { "aSize": "460x1012", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 465520 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_text_list_item_before.png`
- `/opt/cursor/artifacts/mitosis_lit_text_list_item_after.png`
- `/opt/cursor/artifacts/text_list_item_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_text_list_item_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-text-list-item.md`

## Follow-ups

- Registering this tag as `p-text-list-item` would keep `throwIfParentIsNotOfKind` satisfied when nested under a migrated `lit-text-list` / future `p-text-list`.
