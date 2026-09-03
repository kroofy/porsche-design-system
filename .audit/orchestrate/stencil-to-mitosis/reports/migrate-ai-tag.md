# Migrate p-ai-tag to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     d6a050625d (source, bundle; strip lifts style out of the flex div; baseline and this report land on top)
TAG      p-ai-tag only. LIT_TAG lit-ai-tag. packages/components untouched.

## Verdict

`AiTag.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=ai-tag` swapped in-card to `lit-ai-tag` diffs 0 of 145,360 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="ai-tag"]`.

This is self-contained: locale + variant. Not InputBase. No slot. The shadow tree is a cssText `<style>` plus a `div`. Generated and modified paint copy as a text node. Abbreviation paints `<abbr title>`. The spark icon is `div::before` with the snapshot SVG mask, not `p-icon`.

## What was built

Copied a tag harness and retargeted `[data-card="ai-tag"]`. Tag.lite.tsx was not edited.

- `src/AiTag.lite.tsx` mirrors `p-ai-tag`. cssText matches the Stencil snapshot, including frosted fill, `var(--p-blur-frosted)`, forced-colors `CanvasText` on the mask, and the inline SVG path. `rg my-fragment output/lit/src/AiTag.ts` is empty.
- Playground has 3 hosts: default `AI-generated`, `variant="modified"` → `AI-modified`, `variant="abbreviation"` → `AI` with title `artificial intelligence`.
- Locale falls back to `en-US` and resolves by language subtag (`nb` → `no`). Probe table covers `en` and `de`; unknown languages use English.
- File harness proves shadow, host `inline-flex`, color/background vs token refs, `::before` 16px mask, abbreviation `abbr`, `de-DE` → `KI-generiert`, hidden host, variant change after connect.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-ai-tag-whitespace.mjs
rg my-fragment output/lit/src/AiTag.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/AiTag.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-ai-tag.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=ai-tag" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_ai_tag_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_ai_tag_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-ai-tag-baseline.mjs
node harness/verify-ai-tag.mjs           # exit 0, failures: []
node harness/pixel-diff-ai-tag.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `AiTag.ts` has none.

## Live verification

`node harness/verify-ai-tag.mjs`, exit 0: shadow root, cssText `<style>`, host font + frosted + mask + CanvasText, generated `AI-generated`, modified `AI-modified`, abbreviation `AI` / `artificial intelligence`, `de-DE` `KI-generiert`, color/background match token refs, `::before` 16px, hidden host, variant attribute change after connect.

`node harness/pixel-diff-ai-tag.mjs`, exit 0:

```json
{
  "swap": { "swapped": 3, "litRendered": 3, "fragment": false },
  "controlStencilVsBaseline": { "aSize": "460x316", "strictMismatch": 0, "totalPixels": 145360 },
  "litVsBaseline": { "aSize": "460x316", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 145360 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_ai_tag_before.png`
- `/opt/cursor/artifacts/mitosis_lit_ai_tag_after.png`
- `/opt/cursor/artifacts/ai_tag_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_ai_tag_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-ai-tag.md`

## Follow-ups

- Probe translation table is `en` + `de` only. Full `AI_TAG_TRANSLATIONS` from `ai-tag-utils.ts` is a follow-up if this tag is registered as `p-ai-tag`.
