# Migrate p-tabs to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     c6a92f81e3 (source, bundle; baseline and this report land on top)
TAG      p-tabs only. LIT_TAG lit-tabs. packages/components untouched. Existing *.lite.tsx files untouched except Tabs.lite.tsx.

## Verdict

`Tabs.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=tabs` swapped in-card to `lit-tabs` diffs 0 of 1,093,948 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="tabs"]`.

This is a `display:contents` wrap around a Stencil `p-tabs-bar.root` plus the default slot for `p-tabs-item`. Nested `p-tabs-bar` / `p-tabs-item` / `p-text` stay Stencil. Light-DOM children are copied on swap. `p-tabs-item` `throwIfParentIsNotOfKind` is swallowed on reparent. `rg my-fragment output/lit/src/Tabs.ts` is empty.

## What was built

Copied the nested-Stencil + slotted-children pattern from tabs-bar and text-list. Those lite files were not edited.

- `src/Tabs.lite.tsx` mirrors `getComponentCss`: host block, hidden, FOUC, `.root` margin-bottom, wrap contents. Size JSON compiles `@media(min-width:1000px)` for m.
- Strip rebuilds bar buttons from item `label`s, forwards size / background / compact / `activeTabIndex` (default 0), and sets item `role=tabpanel` plus hidden / tabindex the same way Stencil `setAccessibilityAttributes` does.
- Playground has 5 hosts: default, canvas, surface, frosted, `size=medium`. Each has 3 `p-tabs-item` with nested `p-text`.
- File harness proves shadow, cssText `<style>`, wrap `display:contents`, nested `P-TABS-BAR`, slotted items, panel hidden state, canvas / medium forwarding, hide-size m=1000, hidden host, no inner `lit-*`.

`--p-animation-duration`, `--p-transition-duration`, `--p-duration-md`, and `--p-duration-sm` are set to `0s` on both sides so the delayed `background-size` active fill on the inner bar does not race the screenshot.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-tabs-whitespace.mjs
rg my-fragment output/lit/src/Tabs.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Tabs.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-tabs.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=tabs" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_tabs_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-tabs-baseline.mjs
node harness/verify-tabs.mjs            # exit 0, failures: []
node harness/pixel-diff-tabs.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `Tabs.ts` has none.

## Live verification

`node harness/verify-tabs.mjs`, exit 0: shadow root, cssText `<style>`, `:host` block, wrap contents, nested `P-TABS-BAR` with class `root`, three buttons from labels, slotted `P-TABS-ITEM`, first panel visible, others hidden, canvas / medium forwarded, size breakpoint m=1000, hidden host, no inner `lit-*`.

`node harness/pixel-diff-tabs.mjs`, exit 0:

```json
{
  "swap": { "swapped": 5, "litRendered": 5, "fragment": false, "innerLit": false, "slottedCopied": true, "nested": { "hostCount": 5, "barTags": ["P-TABS-BAR"], "itemTags": ["P-TABS-ITEM"], "textTags": ["P-TEXT"], "buttonCount": 15, "itemCount": 15 } },
  "controlStencilVsBaseline": { "aSize": "982x1114", "strictMismatch": 0, "totalPixels": 1093948 },
  "litVsBaseline": { "aSize": "982x1114", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 1093948 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_tabs_before.png`
- `/opt/cursor/artifacts/mitosis_lit_tabs_after.png`
- `/opt/cursor/artifacts/tabs_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_tabs_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-tabs.md`

## Follow-ups

- Click / keyboard `update` from the inner bar is wired but not in this paused pixel probe.
- Keep leftover `harness/stencil_*_control.png` untracked.
