# Migrate p-banner to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     4942ddd4a8 (source, bundle; attached wait for display:contents host lands on top)
TAG      p-banner only. LIT_TAG lit-banner. packages/components untouched.

## Verdict

`Banner.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=banner` swapped in-card to `lit-banner` diffs 0 of 493,120 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="banner"]`. `--p-animation-duration: 0s` and `--p-transition-duration: 0s` on both sides.

This is NotificationBase inside a `popover="manual"` top-layer panel. Host is `display: contents`. Default position is `{base:bottom, s:top}` so at 1440 the open banner sits at `top: 56px`. Playground has one `open="true"` host; the other four stay closed (`display:none`, `inert`). Nested `p-heading` / `p-text` stay Stencil in light DOM. Openers stay `p-button`.

## What was built

Copied the inline-notification harness and retargeted `[data-card="banner"]`. InlineNotification.lite.tsx was not edited.

- `src/Banner.lite.tsx` mirrors `p-banner` + NotificationBase styles plus popover chrome: `[popover]` fixed/centered, box-shadow, opacity, `@supports` overlay transition, 760px state mask. `skipEntryTransition` stays true so an initially-open host does not run `@starting-style`. `rg my-fragment output/lit/src/Banner.ts` is empty.
- Playground has 5 hosts. Host 1 is `open="true"` heading-tag `h3`. Hosts 2-5 are slotted heading/description (`slot="description"`), one with `dismiss-button="false"`. Card clip 230.66x536.75 overlaps the left of the open popover (900x94 at y=56).
- Hyphenated `heading-tag` / `dismiss-button` re-read from attributes. `open="true"` / `""` is open; absent is closed. `updated()` calls `showPopover()` / `hidePopover()`.
- Child observer + heading slot when there is no heading prop, description named slot when `slot="description"` is present, else the default slot.
- File harness proves shadow, info/error token backgrounds, h3 heading, dismiss on/off, heading/description slots, closed inert, `open` after connect, position JSON base-bottom / s-top at 760 (no m/1000 rule).

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-banner-whitespace.mjs
rg my-fragment output/lit/src/Banner.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Banner.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-banner.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=banner" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_banner_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_banner_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-banner-baseline.mjs
node harness/verify-banner.mjs           # exit 0, failures: []
node harness/pixel-diff-banner.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `Banner.ts` has none.

## Live verification

`node harness/verify-banner.mjs`, exit 0: shadow root, cssText `<style>`, info-frosted vs token ref, 760px mask `::before` 24px, h3 + description, dismiss default ("Close banner"), `dismiss-button=false` omits dismiss, heading/description slots, error role `alert` + error-frosted, hidden host, closed not `:popover-open` and inert, `open="true"` after connect calls `showPopover`, position JSON compiles 760 not 1000.

`node harness/pixel-diff-banner.mjs`, exit 0:

```json
{
  "swap": { "swapped": 5, "litRendered": 5, "openPopover": 1, "fragment": false, "innerLit": false, "slottedCopied": true, "buttonsLeft": ["P-BUTTON", "P-BUTTON", "P-BUTTON", "P-BUTTON", "P-BUTTON"] },
  "controlStencilVsBaseline": { "aSize": "460x1072", "strictMismatch": 0, "totalPixels": 493120 },
  "litVsBaseline": { "aSize": "460x1072", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 493120 }
}
```

Playwright `waitForSelector` uses `{ state: "attached" }` because `:host { display: contents }` has no visible box.

## Artifacts

- `/opt/cursor/artifacts/stencil_banner_before.png`
- `/opt/cursor/artifacts/mitosis_lit_banner_after.png`
- `/opt/cursor/artifacts/banner_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_banner_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-banner.md`

## Follow-ups

- `dismiss` event and Escape listener are not in this pixel probe.
- Toast still shares NotificationBase and needs its own unit.
