# Migrate p-text-list to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     26335c49f2 (source, bundle; baseline and this report land on top)
TAG      p-text-list only. LIT_TAG lit-text-list. packages/components untouched.

## Verdict

`TextList.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=text-list` swapped in-card to `lit-text-list` diffs 0 of 465,520 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="text-list"]`.

This is a thin wrapper: `ul` or `ol` + default slot. Nested `p-text-list-item` stays Stencil. Nested `p-text-list` hosts in the card are also swapped (6 hosts: 3 outer, 3 nested). Light-DOM children are copied so list items do not vanish.

## What was built

Copied a wrapper harness and retargeted `[data-card="text-list"]`. Fieldset.lite.tsx was not edited.

- `src/TextList.lite.tsx` mirrors `p-text-list`. Ordered types (`numbered`, `alphabetically`) render `<ol>`; `unordered` and the default render `<ul>`. `rg my-fragment output/lit/src/TextList.ts` is empty.
- Playground: unordered bullets, numbered `1. 2. 3.`, alphabetically `a. b. c.`, each with a nested default list using en-dash markers from the item's slotted CSS vars.
- `::slotted(*)` CSS matches Stencil snapshots, including `counters(...,decimal)` vs `lower-latin` and unordered `var(--_p-text-list-g,'•')`.
- Pixel-diff copies attributes and light-DOM children. `p-text-list-item` `connectedCallback` throws when the parent is `lit-text-list`; the throw is after insert, items keep their existing shadow, and that expected error is filtered.
- Stencil `throwIfParentIsNotOfKind` is a follow-up if this tag is registered as `p-text-list`.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-text-list-whitespace.mjs
rg my-fragment output/lit/src/TextList.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/TextList.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-text-list.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=text-list" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_text_list_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_text_list_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-text-list-baseline.mjs
node harness/verify-text-list.mjs           # exit 0, failures: []
node harness/pixel-diff-text-list.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `TextList.ts` has none.

## Live verification

`node harness/verify-text-list.mjs`, exit 0: shadow root, cssText `<style>`, unordered `UL` with bullet CSS, numbered `OL` + decimal, alphabetically `OL` + lower-latin, default `UL`, hidden host, `type` change UL→OL.

`node harness/pixel-diff-text-list.mjs`, exit 0:

```json
{
  "swap": { "swapped": 6, "litRendered": 6, "listTags": { "ul": 4, "ol": 2 }, "fragment": false, "innerLit": false, "slottedCopied": true },
  "controlStencilVsBaseline": { "aSize": "460x1012", "strictMismatch": 0, "totalPixels": 465520 },
  "litVsBaseline": { "aSize": "460x1012", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 465520 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_text_list_before.png`
- `/opt/cursor/artifacts/mitosis_lit_text_list_after.png`
- `/opt/cursor/artifacts/text_list_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_text_list_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-text-list.md`

## Follow-ups

- `p-text-list-item` still requires a `p-text-list` parent. Registering this tag as `p-text-list` would remove the in-card swap throw. Nested item CSS (en-dash, grid column) stays on the Stencil item.
