# land-inline-notification

**unit:** playground `p-inline-notification` from Mitosis Lit (not Stencil, not `lit-inline-notification`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `1ff377f6c0`
**accept SHA:** (this commit)

Playground `p-inline-notification` is Mitosis Lit (`LitInlineNotification` / `@customElement("p-inline-notification")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `banner`. Do not re-touch `ai-tag` or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=inline-notification`
- Card: `[data-card="inline-notification"]` (2-column, 11 hosts)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: props heading/description (`heading-tag="h2"`), description-only, slotted heading+content, `dismiss-button=false`, success/warning/error, `action-label` + `action-icon="car"` (+ loading). Nested `p-heading` / `p-tag` / `p-text` / `p-button` / `p-button-pure` stay Mitosis.
- Constructor: `LitInlineNotification`
- Shadow: `style` cssText + `.notification` grid + named `heading` slot + default slot + optional `.action` `p-button-pure` + optional `.dismiss`, no `my-fragment`
- Stencil loader: exact `"p-inline-notification"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-inline-notification.entry.js`.
- IIFE: `/assets/p-inline-notification.iife.js` HTTP 200, 36476 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-inline-notification` vs stored baseline | 982×1640 | 0 | 1610480 |

After PNG is the same 127470 bytes as the stored baseline (SHA-256 `ed8957f7ec99bf72e8de3cf9665d222c371bd10def614ad2c5988757f4a778b3`). Baseline PNG was not edited.

The land script uses `page.screenshot({ clip })` because the card is taller than the 900px viewport.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-inline-notification` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_inline_notification_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_inline_notification_after.png`
- `/opt/cursor/artifacts/land_inline_notification_pixel_diff.png`
- `/opt/cursor/artifacts/land_inline_notification_verify.log`

## Wiring

Same pattern as land-ai-tag / land-fieldset. Stencil 4 `excludeComponents` is prod-only. `inline-notification.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-inline-notification` from the loader.

`HTMLPInlineNotificationElement` stays on the stub (`declare global`) and in `html-p-inline-notification-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PInlineNotification` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/inline-notification/InlineNotification.lite.tsx` (`tagName: 'p-inline-notification'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-inline-notification.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab attrs (`heading-tag`, `dismiss-button`, `action-label`, `action-icon`, `action-loading`), observes light-DOM `childList` so named heading slots exist after upgrade, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-inline-notification.iife.js`. Playground `index.html` loads that IIFE next to the ai-tag bundle.

Generated `InlineNotification.ts` has `@customElement("p-inline-notification")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/InlineNotification.lite.tsx` `tagName` is now `'p-inline-notification'`.

Dummyassets 3002 down is benign; the stored baseline was captured the same way. State icons are CSS masks (not `p-icon`). Action `p-button-pure` uses `icon="car"` (already in the LitIcon map).

## Follow-ups

- `generateConstructorMap` still imports the stub `InlineNotification` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start banner.
