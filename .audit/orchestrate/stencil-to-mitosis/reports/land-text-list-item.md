# land-text-list-item

**unit:** playground `p-text-list-item` from Mitosis Lit (not Stencil, not `lit-text-list-item`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `91a40f445e`
**accept SHA:** (this commit)

Playground `p-text-list-item` is Mitosis Lit (`LitTextListItem` / `@customElement("p-text-list-item")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `ai-tag`. Do not re-touch `text-list` or earlier lands.

## Playground

- URL: `http://localhost:3333/?components=text-list`
- Card: `[data-card="text-list"]` (no separate item card; same 3-host crop as text-list)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 3 top-level `<p-text-list>` already `LitTextList`. Each has three `<p-text-list-item>` that are now `LitTextListItem` (no Stencil `hydrated` class). Nested `<p-text-list>` stays `LitTextList`.
- Constructor: `LitTextListItem`
- Shadow: `style` cssText + `<div class="root">` (`display:contents`) + default `<slot>` + `::slotted(*)` nested-list indent vars (`--_p-text-list-f/g/a/b`), no `my-fragment`
- Stencil loader: exact `"p-text-list-item"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-text-list-item.entry.js`.
- IIFE: `/assets/p-text-list-item.iife.js` HTTP 200, 25320 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-text-list-item` vs stored baseline | 460×1012 | 0 | 465520 |

After PNG is the same 31087 bytes as the stored baseline (SHA-256 `64beef21b65b98570384f5e6c2aa99f1815f7460d22f780499d27af7273513f5`). Baseline PNG was not edited.

The land script uses `page.screenshot({ clip })`, same recipe as land-text-list.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-text-list-item` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_text_list_item_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_text_list_item_after.png`
- `/opt/cursor/artifacts/land_text_list_item_pixel_diff.png`
- `/opt/cursor/artifacts/land_text_list_item_verify.log`

## Wiring

Same pattern as land-text-list / land-fieldset. Stencil 4 `excludeComponents` is prod-only. `text-list-item.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-text-list-item` from the loader.

`HTMLPTextListItemElement` stays on the stub (`declare global`) and in `html-p-text-list-item-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PTextListItem` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/text-list-item/TextListItem.lite.tsx` (`tagName: 'p-text-list-item'`, own `mitosis.config.js` so prior lands are not regenerated). Parent lists stay `<p-text-list>`. Same item tag name, so light-DOM children and nested lists stay in place. `scripts/build-lit-text-list-item.mjs` strips `<my-fragment>` after `mitosis build`, restores `class="root"`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-text-list-item.iife.js`. Playground `index.html` loads that IIFE next to the text-list bundle.

Generated `TextListItem.ts` has `@customElement("p-text-list-item")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/TextListItem.lite.tsx` `tagName` is now `'p-text-list-item'`.

Dummyassets 3002 down is benign; the stored baseline was captured the same way.

## Follow-ups

- `generateConstructorMap` still imports the stub `TextListItem` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start ai-tag.
