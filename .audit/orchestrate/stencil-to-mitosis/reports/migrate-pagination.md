# Migrate p-pagination to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     82f5e2d918 (source, bundle; baseline and this report land on top)
TAG      p-pagination only. LIT_TAG lit-pagination. packages/components untouched.

## Verdict

`Pagination.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=pagination` swapped in-card to `lit-pagination` diffs 0 of 436,160 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="pagination"]`.

This is a `nav > ul` of page items. Nested `p-icon` (arrow-left / arrow-right) stay Stencil. No light-DOM children on the playground hosts. `show-last-page="false"` drops the last-page item. At 1440, `s` (760) is active so start ellipsis is hidden.

## What was built

Copied a tag-style harness and retargeted `[data-card="pagination"]`. Tag.lite.tsx was not edited.

- `src/Pagination.lite.tsx` mirrors `getComponentCss` plus page-item generation from `pagination-utils`. cssText branches on `pageTotal`, `activePage`, and `showLastPage` for 760 / 759 hide rules, forced-colors `CanvasText` / `GrayText`, and hover frost. `rg my-fragment output/lit/src/Pagination.ts` is empty.
- Playground has 2 hosts: `total-items-count=500` `items-per-page=25` `active-page=1` (20 pages). Host 2 has `show-last-page="false"` (9 `li` vs 10).
- Hyphenated `total-items-count`, `items-per-page`, `active-page`, `show-last-page` are re-read from attributes. `show-last-page="false"` is false; show-last defaults to true.
- File harness proves shadow, current-page frosted-strong vs token ref, prev disabled on page 1, last page 20 on/off, `p-icon` (not lit-*), hidden host, `active-page` change after connect.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-pagination-whitespace.mjs
rg my-fragment output/lit/src/Pagination.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Pagination.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-pagination.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=pagination" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_pagination_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_pagination_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-pagination-baseline.mjs
node harness/verify-pagination.mjs           # exit 0, failures: []
node harness/pixel-diff-pagination.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `Pagination.ts` has none.

## Live verification

`node harness/verify-pagination.mjs`, exit 0: shadow root, cssText `<style>`, 760 and 759 media, CanvasText, current page 1 + `aria-current=page`, frosted-strong vs token ref, last page 20 present by default and omitted when `show-last-page=false`, icons stay `P-ICON` with `arrow-left` / `arrow-right`, prev `aria-disabled`, hidden host, `active-page=5` after connect.

`node harness/pixel-diff-pagination.mjs`, exit 0:

```json
{
  "swap": { "swapped": 2, "litRendered": 2, "fragment": false, "innerLit": false, "icons": ["P-ICON", "P-ICON", "P-ICON", "P-ICON"] },
  "controlStencilVsBaseline": { "aSize": "1504x290", "strictMismatch": 0, "totalPixels": 436160 },
  "litVsBaseline": { "aSize": "1504x290", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 436160 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_pagination_before.png`
- `/opt/cursor/artifacts/mitosis_lit_pagination_after.png`
- `/opt/cursor/artifacts/pagination_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_pagination_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-pagination.md`

## Follow-ups

- `update` event and keyboard activation are not in this pixel probe.
