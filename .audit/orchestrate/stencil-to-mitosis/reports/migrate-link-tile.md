# Migrate p-link-tile to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     7b9a7080e4 (source, bundle; baseline and this report land on top)
TAG      p-link-tile only. LIT_TAG lit-link-tile. packages/components untouched. Existing *.lite.tsx files untouched except LinkTile.lite.tsx.

## Verdict

`LinkTile.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=link-tile` swapped in-card `p-link-tile` hosts to `lit-link-tile` diffs 0 of 754,400 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="link-tile"]`.

Nested `p-link`, `p-tag`, and `p-text` stay Stencil. Light-DOM children and named `header` / `footer` / default `img` slots are copied on swap. Overlay `<a>` and nested `p-link` omit `href` when unset (no `href="undefined"`). `rg my-fragment output/lit/src/LinkTile.ts` is empty.

## What was built

Copied the nested-Stencil + named-slot swap from button-tile. That lite file was not edited.

- `src/LinkTile.lite.tsx` mirrors `getComponentCss`: host flex + dark color-scheme + hidden + FOUC, slotted media, description typescale/weight (m is 1000), aspect-ratio, footer compact grid vs column, gradient `::after`, hover scale. Root has no cursor (unlike button-tile).
- Strip restores `.root` / `.media` / `.footer`, always renders both Stencil `p-link`s (CSS hides the unused one), the stretched overlay `<a tabindex="-1" aria-hidden="true">`, `delegatesFocus`, and footer-slot `hasFooterSlot`. Unset `href` / `download` / `rel` use Lit `nothing`.
- Playground has 3 hosts: 3/4 default; 9/16 top + gradient + header/footer; auto + gradient + header/footer. All have `href` and `target="_blank"`.
- File harness proves shadow, cssText `<style>`, host flex, aspect 3/4, primary token color, overlay href, named slots, compact JSON `m=1000`, omitted unset href, hidden host, no fragment, no inner `lit-*`.

`--p-animation-duration` and `--p-transition-duration` are set to `0s` on both sides so media hover scale does not race the screenshot.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- packages/mitosis-probe-lit/output/lit/src/
node harness/strip-link-tile-whitespace.mjs
rg my-fragment output/lit/src/LinkTile.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/LinkTile.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-link-tile.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=link-tile" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_link_tile_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_tile_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-link-tile-baseline.mjs
node harness/verify-link-tile.mjs            # exit 0, failures: []
node harness/pixel-diff-link-tile.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `LinkTile.ts` has none.

## Live verification

`node harness/verify-link-tile.mjs`, exit 0: shadow root, cssText `<style>`, host flex, aspect-ratio 3/4, primary token color, overlay `<a>`, two Stencil `p-link`s, header/footer slots, compact JSON 1000px, unset href omitted, hidden host, no fragment, no inner `lit-*`.

`node harness/pixel-diff-link-tile.mjs`, exit 0:

```json
{
  "swap": { "swapped": 3, "litRendered": 3, "fragment": false, "innerLit": false, "slottedCopied": true, "hrefOmitted": true, "nested": { "hostCount": 3, "linkTags": ["P-LINK"], "linkCount": 6, "tagTags": ["P-TAG"], "textTags": ["P-TEXT"] } },
  "controlStencilVsBaseline": { "aSize": "460x1640", "strictMismatch": 0, "totalPixels": 754400 },
  "litVsBaseline": { "aSize": "460x1640", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 754400 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_link_tile_before.png`
- `/opt/cursor/artifacts/mitosis_lit_link_tile_after.png`
- `/opt/cursor/artifacts/link_tile_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_tile_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-link-tile.md`

## Follow-ups

- Compact breakpoint swap is not in this paused pixel probe.
- Keep leftover `harness/stencil_*_control.png` untracked.
