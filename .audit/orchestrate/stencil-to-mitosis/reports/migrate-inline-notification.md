# Migrate p-inline-notification to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     6efe4edc03 (source, bundle; child observer + heading slot land on top)
TAG      p-inline-notification only. LIT_TAG lit-inline-notification. packages/components untouched.

## Verdict

`InlineNotification.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=inline-notification` swapped in-card to `lit-inline-notification` diffs 0 of 1,610,480 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="inline-notification"]`. `--p-animation-duration: 0s` on both sides.

This is NotificationBase: `.notification` grid, heading prop or `slot="heading"`, description `<p>` or default slot, optional Stencil `p-button-pure` action, optional native `.dismiss` button. Nested `p-icon` / `p-spinner` stay inside Stencil `p-button-pure`. Light-DOM `p-heading` / `p-text` / `p-tag` / `p-button` are copied on swap.

## What was built

Copied a fieldset-style harness and retargeted `[data-card="inline-notification"]`. Tag.lite.tsx was not edited.

- `src/InlineNotification.lite.tsx` mirrors `p-inline-notification` + NotificationBase styles. cssText branches on state, action, dismiss, and heading. State icons are `::before` masks at `min-width:760px`. `rg my-fragment output/lit/src/InlineNotification.ts` is empty.
- Playground has 11 hosts (info / success / warning / error, slotted heading, action, action-loading). Card height 1702px is clipped to the 1440x900 viewport (same clip for control and Lit).
- Hyphenated `heading-tag`, `dismiss-button`, `action-label`, `action-loading`, `action-icon` are re-read from attributes. `dismiss-button="false"` is false; dismiss defaults to true.
- Child observer + always-emitted empty `slot name="heading"` when there is no heading prop, so slotted headings assign after connect.
- File harness proves shadow, info/error token backgrounds, h2 heading, dismiss on/off, heading/default slots, `p-button-pure` (not lit-*), loading attribute, alert role, hidden host, state change after connect.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-inline-notification-whitespace.mjs
rg my-fragment output/lit/src/InlineNotification.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/InlineNotification.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-inline-notification.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=inline-notification" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_inline_notification_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_inline_notification_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-inline-notification-baseline.mjs
node harness/verify-inline-notification.mjs           # exit 0, failures: []
node harness/pixel-diff-inline-notification.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `InlineNotification.ts` has none.

## Live verification

`node harness/verify-inline-notification.mjs`, exit 0: shadow root, cssText `<style>`, info-frosted vs token ref, 760px mask `::before` 24px, h2 + description, dismiss default, `dismiss-button=false` omits dismiss, heading/default slots, action stays `P-BUTTON-PURE` with `icon=car`, `action-loading` sets `loading`, error role `alert` + error-frosted, hidden host, state attribute change after connect.

`node harness/pixel-diff-inline-notification.mjs`, exit 0:

```json
{
  "swap": { "swapped": 11, "litRendered": 11, "fragment": false, "innerLit": false, "slottedCopied": true, "actions": ["P-BUTTON-PURE", "P-BUTTON-PURE", "P-BUTTON-PURE"] },
  "controlStencilVsBaseline": { "aSize": "982x1640", "strictMismatch": 0, "totalPixels": 1610480 },
  "litVsBaseline": { "aSize": "982x1640", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 1610480 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_inline_notification_before.png`
- `/opt/cursor/artifacts/mitosis_lit_inline_notification_after.png`
- `/opt/cursor/artifacts/inline_notification_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_inline_notification_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-inline-notification.md`

## Follow-ups

- `dismiss` / `action` events are not in this pixel probe.
- Banner/toast share NotificationBase; they need their own units.
