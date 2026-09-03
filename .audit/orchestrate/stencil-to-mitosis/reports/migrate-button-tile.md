# Migrate p-button-tile to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     8c4ecc1167 (source, bundle) + d145bf6677 (harness token check; baseline and this report land on top)
TAG      p-button-tile only. LIT_TAG lit-button-tile. packages/components untouched. Existing *.lite.tsx files untouched except ButtonTile.lite.tsx.

## Verdict

`ButtonTile.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=button-tile` swapped in-card `p-button-tile` hosts to `lit-button-tile` diffs 0 of 754,400 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="button-tile"]`.

Nested `p-button`, `p-tag`, and `p-text` stay Stencil. Light-DOM children and named `header` / `footer` / default `img` slots are copied on swap. No `lit-button` / `lit-tag` / `lit-text` hosts. `rg my-fragment output/lit/src/ButtonTile.ts` is empty.

## What was built

Copied the nested-Stencil + named-slot swap from banner. That lite file was not edited.

- `src/ButtonTile.lite.tsx` mirrors `getComponentCss`: host flex + dark color-scheme + hidden + FOUC, slotted media, description typescale/weight (m is 1000), aspect-ratio, footer compact grid vs column, current/disabled cursor, gradient `::after` (to-top / to-bottom), hover scale when not disabled.
- Strip restores `.root` / `.media` / `.footer` (Mitosis dropped class names), always renders both Stencil `p-button`s (CSS hides the unused one), `delegatesFocus`, and footer-slot `hasFooterSlot` for compact grid-row.
- Playground has 5 hosts: 3/4 default; 9/16 top + gradient + header/footer; auto + gradient + header/footer; disabled; loading. Card is taller than the 900 viewport; crop is the visible card (`460x1640` at dsf 2).
- File harness proves shadow, cssText `<style>`, host flex, aspect 3/4, primary token color, named slots, compact JSON `m=1000`, disabled cursor / no hover, hidden host, no fragment, no inner `lit-*`.

`--p-animation-duration` and `--p-transition-duration` are set to `0s` on both sides so the loading spinner and media hover scale do not race the screenshot.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-button-tile-whitespace.mjs
rg my-fragment output/lit/src/ButtonTile.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/ButtonTile.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-button-tile.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=button-tile" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_button_tile_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_button_tile_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-button-tile-baseline.mjs
node harness/verify-button-tile.mjs            # exit 0, failures: []
node harness/pixel-diff-button-tile.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `ButtonTile.ts` has none.

## Live verification

`node harness/verify-button-tile.mjs`, exit 0: shadow root, cssText `<style>`, host flex, aspect-ratio 3/4, primary token color, two Stencil `p-button`s, header/footer slots, compact JSON 1000px, disabled cursor, hidden host, no fragment, no inner `lit-*`.

`node harness/pixel-diff-button-tile.mjs`, exit 0:

```json
{
  "swap": { "swapped": 5, "litRendered": 5, "fragment": false, "innerLit": false, "slottedCopied": true, "nested": { "hostCount": 5, "buttonTags": ["P-BUTTON"], "buttonCount": 10, "tagTags": ["P-TAG"], "textTags": ["P-TEXT"] } },
  "controlStencilVsBaseline": { "aSize": "460x1640", "strictMismatch": 0, "totalPixels": 754400 },
  "litVsBaseline": { "aSize": "460x1640", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 754400 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_button_tile_before.png`
- `/opt/cursor/artifacts/mitosis_lit_button_tile_after.png`
- `/opt/cursor/artifacts/button_tile_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_button_tile_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-button-tile.md`

## Follow-ups

- Compact breakpoint swap and click-disabled capture are not in this paused pixel probe.
- Keep leftover `harness/stencil_*_control.png` untracked.
