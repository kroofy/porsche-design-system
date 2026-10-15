# land-text-list

**unit:** playground `p-text-list` from Mitosis Lit (not Stencil, not `lit-text-list`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `4ea8fccca1`
**accept SHA:** (this commit)

Playground `p-text-list` is Mitosis Lit (`LitTextList` / `@customElement("p-text-list")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `text-list-item`.

## Playground

- URL: `http://localhost:3333/?components=text-list`
- Card: `[data-card="text-list"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 3 top-level `<p-text-list>` (`type="unordered"` → `ul`, `numbered` → `ol`, `alphabetically` → `ol`). Each has three `<p-text-list-item>` (still Stencil) and a nested `<p-text-list>` that is also `LitTextList`.
- Constructor: `LitTextList`
- Shadow: `style` cssText + default `<slot>` + `::slotted(*)` bullets/counters, no `my-fragment`
- Stencil loader: exact `"p-text-list"` absent from `bootstrapLazy` after a full `--dev` restart. No `p-text-list.entry.js`. `p-text-list-item.entry.js` remains.
- IIFE: `/assets/p-text-list.iife.js` HTTP 200, 27688 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (same pause as the stored baseline)

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-text-list` vs stored baseline | 460×1012 | 0 | 465520 |

After PNG is the same 31087 bytes as the stored baseline (SHA-256 `64beef21b65b98570384f5e6c2aa99f1815f7460d22f780499d27af7273513f5`). Baseline PNG was not edited.

The land script uses `page.screenshot({ clip })`, same recipe as land-fieldset.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-text-list` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_text_list_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_text_list_after.png`
- `/opt/cursor/artifacts/land_text_list_verify.log`

## Wiring

Same pattern as land-fieldset / land-textarea. Stencil 4 `excludeComponents` is prod-only. `text-list.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-text-list` from the loader.

`HTMLPTextListElement` stays on the stub (`declare global`) and in `html-p-text-list-element.d.ts`. Stencil `--dev` regenerates `components.d.ts` and drops the generated `PTextList` block; the sidecar keeps the host type.

Mitosis Lit is built from `packages/components/mitosis/text-list/TextList.lite.tsx` (`tagName: 'p-text-list'`, own `mitosis.config.js` so prior lands are not regenerated). Items stay `<p-text-list-item>`. Same tag name, so light-DOM children and nested lists stay in place. `scripts/build-lit-text-list.mjs` strips `<my-fragment>` after `mitosis build`, binds `type` from the attribute, renders `ol` when ordered, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-text-list.iife.js`. Playground `index.html` loads that IIFE next to the fieldset bundle.

Generated `TextList.ts` has `@customElement("p-text-list")`. `rg my-fragment` on it is empty.

Probe `packages/mitosis-probe-lit/src/TextList.lite.tsx` `tagName` is now `'p-text-list'`.

## Follow-ups

- `generateConstructorMap` still imports the stub `TextList` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start text-list-item.
