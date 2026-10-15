# land-banner

**unit:** playground `p-banner` from Mitosis Lit (not Stencil, not `lit-banner`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `3a66d6b78f`
**accept SHA:** (this commit)

Playground `p-banner` is Mitosis Lit (`LitBanner` / `@customElement("p-banner")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `pagination`. Do not re-touch `inline-notification` or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=banner`
- Card: `[data-card="banner"]` (5 hosts)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: first `open="true"` heading/description `heading-tag="h3"`; four closed slotted heading+description (`dismiss-button=false`, success, warning, error). Nested `p-heading` / `p-text` / `p-button` stay Mitosis.
- Constructor: `LitBanner`
- Shadow: `style` cssText + `[popover=manual]` + `.notification` grid + optional named heading/description slots + optional `.dismiss`, no `my-fragment`
- Open host: `:popover-open`, heading element `h3`, skipEntryTransition (no `@starting-style` on first render)
- Stencil loader: exact `"p-banner"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-banner.entry.js`.
- IIFE: `/assets/p-banner.iife.js` HTTP 200, 38676 bytes
- Animation freeze: `--p-animation-duration: 0s` and `--p-transition-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-banner` vs stored baseline | 460×1072 | 0 | 493120 |

After PNG is the same 57293 bytes as the stored baseline (SHA-256 `2244203b6e1bbd2615ce867de61dc763dd000e092b4fe768957c06f06f34d28f`). Baseline PNG was not edited.

Host is `display:contents`. Closed popovers are not visible; wait used `attached`, not `visible`. The stored baseline was captured with `page.screenshot({ clip })` of the card box (overlapping top-layer pixels already sit in that rect). Union of card + open popover is larger (900×560.75 CSS) and would not match 460×1072.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-banner` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_banner_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_banner_after.png`
- `/opt/cursor/artifacts/land_banner_pixel_diff.png`
- `/opt/cursor/artifacts/land_banner_verify.log`

## Wiring

Same pattern as land-inline-notification. Stencil 4 `excludeComponents` is prod-only. `banner.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-banner` from the loader.

`HTMLPBannerElement` stays on the stub (`declare global`) and in `html-p-banner-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PBanner` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/banner/Banner.lite.tsx` (`tagName: 'p-banner'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-banner.mjs` strips `<my-fragment>` after `mitosis build`, maps kebab attrs (`heading-tag`, `dismiss-button`), observes light-DOM `childList` so named heading/description slots exist after upgrade, calls `showPopover()` after render, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-banner.iife.js`. Playground `index.html` loads that IIFE next to the inline-notification bundle.

Generated `Banner.ts` has `@customElement("p-banner")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/Banner.lite.tsx` `tagName` is now `'p-banner'`.

Dummyassets 3002 down is benign; the stored baseline was captured the same way. State icons are CSS masks (not `p-icon`). Position default `{base:bottom,s:top}`; `s` is 760, so the open banner is top-layer at 1440.

## Follow-ups

- `generateConstructorMap` still imports the stub `Banner` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start pagination.
