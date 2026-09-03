# Migrate p-tabs-bar to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     167998c4b8 (source, bundle; baseline and this report land on top)
TAG      p-tabs-bar only. LIT_TAG lit-tabs-bar. packages/components untouched. Existing *.lite.tsx files untouched.

## Verdict

`TabsBar.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=tabs-bar` swapped in-card to `lit-tabs-bar` diffs 0 of 1,060,560 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="tabs-bar"]`.

This is a `display:contents` wrap around a Stencil `p-scroller.scroller` (so `:host` stays `display:grid` and the scroller keeps `place-self: flex-start`), the default slot for `button` / `a` tabs, and a zero-width `.bar`. Nested `p-scroller` / `p-icon` stay Stencil. Light-DOM children are copied on swap. `rg my-fragment output/lit/src/TabsBar.ts` is empty.

## What was built

Copied the closed-card cssText / nested-Stencil pattern from scroller and pagination. Those lite files were not edited.

- `src/TabsBar.lite.tsx` mirrors `getComponentCss`: slotted tab reset + padding by background/compact, `font-size` from size (m is 1000), active `nth-child` frosted-strong fill, hover skip on the active child, scroller rail background/padding/radius, frosted backdrop-filter, bar `width:0px`.
- Strip sanitizes `active-tab-index` against the live tab count (so `99` is none), sets tablist / `aria-selected` or `aria-current`, and recenters the active tab in `.scroll` the same way Stencil `scrollTabIntoView` does.
- Playground has 7 hosts, card `grid-column: span 2`: no index + 3 buttons, `active-tab-index=1` + 3 links, canvas / surface / frosted rails, `size=medium` with out-of-range `99` and with index `0`.
- File harness proves shadow, cssText `<style>`, wrap `display:contents`, nested `P-SCROLLER`, slotted buttons, canvas token fill, medium typescale, hide-size m=1000, hidden host, no inner `lit-*`.

`--p-animation-duration`, `--p-transition-duration`, `--p-duration-md`, and `--p-duration-sm` are set to `0s` on both sides so the delayed `background-size` active fill and the JS bar animation do not race the screenshot.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-tabs-bar-whitespace.mjs
rg my-fragment output/lit/src/TabsBar.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/TabsBar.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-tabs-bar.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=tabs-bar" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_tabs_bar_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_bar_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-tabs-bar-baseline.mjs
node harness/verify-tabs-bar.mjs            # exit 0, failures: []
node harness/pixel-diff-tabs-bar.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `TabsBar.ts` has none.

## Live verification

`node harness/verify-tabs-bar.mjs`, exit 0: shadow root, cssText `<style>`, `:host` grid, wrap contents, `::slotted` tabs, nested `P-SCROLLER` with class `scroller`, `.bar`, three slotted buttons, default `role=tab` with no selected tab, links `aria-current` on index 1, canvas token background, medium typescale, size breakpoint m=1000, hidden host, no inner `lit-*`.

`node harness/pixel-diff-tabs-bar.mjs`, exit 0:

```json
{
  "swap": { "swapped": 7, "litRendered": 7, "fragment": false, "innerLit": false, "slottedCopied": true, "nested": { "hostCount": 7, "scrollerTags": ["P-SCROLLER"], "iconTags": [], "tabCount": 31, "tabTags": ["BUTTON", "A"] } },
  "controlStencilVsBaseline": { "aSize": "982x1080", "strictMismatch": 0, "totalPixels": 1060560 },
  "litVsBaseline": { "aSize": "982x1080", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 1060560 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_tabs_bar_before.png`
- `/opt/cursor/artifacts/mitosis_lit_tabs_bar_after.png`
- `/opt/cursor/artifacts/tabs_bar_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_bar_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-tabs-bar.md`

## Follow-ups

- Click / keyboard `update`, JS `animateBar` travel, and `scrollToPosition` are not in this paused pixel probe.
- Overflow hosts on this playground card did not show a visible scroller `p-icon` at 1440. A narrower card would.
- Keep leftover `harness/stencil_*_control.png` untracked.
