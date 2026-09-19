# land-ai-tag

**unit:** playground `p-ai-tag` from Mitosis Lit (not Stencil, not `lit-ai-tag`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `5e18afdd61`
**accept SHA:** (this commit)

Playground `p-ai-tag` is Mitosis Lit (`LitAiTag` / `@customElement("p-ai-tag")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `inline-notification`. Do not re-touch `text-list-item` or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=ai-tag`
- Card: `[data-card="ai-tag"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 3 `<p-ai-tag>` — default (`AI-generated`), `variant="modified"` (`AI-modified`), `variant="abbreviation"` (`<abbr>` `AI`)
- Constructor: `LitAiTag`
- Shadow: `style` cssText + pill `<div>` + spark `div::before` mask + `abbr` only for abbreviation, no `my-fragment`
- Stencil loader: exact `"p-ai-tag"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-ai-tag.entry.js`.
- IIFE: `/assets/p-ai-tag.iife.js` HTTP 200, 29425 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-ai-tag` vs stored baseline | 460×316 | 0 | 145360 |

After PNG is the same 10583 bytes as the stored baseline (SHA-256 `c51807f21e37a58384f11e093ba089e209b1b93d11c555e2eabaabf2b2a4f32f`). Baseline PNG was not edited.

The land script uses `page.screenshot({ clip })`, same recipe as land-text-list-item.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-ai-tag` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_ai_tag_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_ai_tag_after.png`
- `/opt/cursor/artifacts/land_ai_tag_pixel_diff.png`
- `/opt/cursor/artifacts/land_ai_tag_verify.log`

## Wiring

Same pattern as land-text-list-item / land-fieldset. Stencil 4 `excludeComponents` is prod-only. `ai-tag.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-ai-tag` from the loader.

`HTMLPAiTagElement` stays on the stub (`declare global`) and in `html-p-ai-tag-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PAiTag` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/ai-tag/AiTag.lite.tsx` (`tagName: 'p-ai-tag'`, own `mitosis.config.js` so prior lands are not regenerated). `scripts/build-lit-ai-tag.mjs` strips `<my-fragment>` after `mitosis build`, binds `locale` / `variant` from attributes, renders `<abbr>` only for `abbreviation`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-ai-tag.iife.js`. Playground `index.html` loads that IIFE next to the text-list-item bundle.

Generated `AiTag.ts` has `@customElement("p-ai-tag")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/AiTag.lite.tsx` `tagName` is now `'p-ai-tag'`.

## Follow-ups

- `generateConstructorMap` still imports the stub `AiTag` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start inline-notification.
