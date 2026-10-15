# land-link-pure

**unit:** playground `p-link-pure` from Mitosis Lit (not Stencil, not `lit-link-pure`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `461c0b0441`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=link-pure`
- Card: `[data-card="link-pure"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 12 `<p-link-pure>` (no `lit-link-pure`), all slotted `<a>`, no host `href`
- Constructor: `LitLinkPure` (`elementProperties` present)
- Nested icons: `<p-icon>` / `LitIcon` (no `lit-icon`), default `arrow-right`
- Shadow: `style` cssText + `<span class="root">` + `<p-icon>` + `<slot>`, no `my-fragment`, no `href="undefined"`
- Stencil loader: exact `"p-link-pure"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-link-pure.iife.js` HTTP 200, 34957 bytes

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-link-pure` vs stored baseline | 982×1640 | 0 | 1610480 |

After PNG is the same 97024 bytes as the stored baseline (SHA-256 `6dfdebacf3f3f58626925a81e8b6e1b7d5820111b197a52f5a2c2b0874d2f365`). Baseline PNG was not edited (mtime `2026-08-30`).

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-tag-dismissible.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-link-pure` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_pure_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_link_pure_after.png`
- `/opt/cursor/artifacts/land_link_pure_pixel_diff.png`

## Wiring

Same pattern as land-tag-dismissible. Stencil 4 `excludeComponents` is prod-only. `link-pure.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-link-pure` from the loader.

Mitosis Lit is built from `packages/components/mitosis/link-pure/LinkPure.lite.tsx` (`tagName: 'p-link-pure'`, own `mitosis.config.js` so tag-dismissible/tag/spinner/display/text/heading/icon/model-signature/flag/wordmark/crest/divider output is not regenerated). Nested icons stay `<p-icon>`. Unset `href` is not bound on the root span (Lit would write `href="undefined"`). `scripts/build-lit-link-pure.mjs` strips `<my-fragment>` after `mitosis build`, restores `root` / `icon` / `label` classes Mitosis drops, maps `iconSource` / `hideLabel` / `alignLabel` to kebab attributes, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-link-pure.iife.js`. Playground `index.html` loads that IIFE next to the tag-dismissible bundle.

Generated `LinkPure.ts` has `@customElement("p-link-pure")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `LinkPure` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start link.
