# land-link

**unit:** playground `p-link` from Mitosis Lit (not Stencil, not `lit-link`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `13a60cf48e`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=link`
- Card: `[data-card="link"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 7 `<p-link>` (no `lit-link`), all slotted `<a>`, no host `href`
- Constructor: `LitLink` (`elementProperties` present)
- Nested icons: `<p-icon>` / `LitIcon` (no `lit-icon`); first two hosts hide the icon (`icon` default `none`); others use `car`
- Shadow: `style` cssText + `<span class="root">` + `<p-icon>` + `<slot>`, no `my-fragment`, no `href="undefined"`
- Stencil loader: exact `"p-link"` absent from `bootstrapLazy` after a full `--dev` restart
- IIFE: `/assets/p-link.iife.js` HTTP 200, 34266 bytes

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-link` vs stored baseline | 460×1174 | 0 | 540040 |

After PNG is the same 34250 bytes as the stored baseline (SHA-256 `04d78794976a79fd0dc10ef29eb43a16ebadf08f2bff46f407ac4fe3ff344796`). Baseline PNG was not edited (mtime `2026-08-30`).

The card is taller than the 900px viewport. The land script uses `page.screenshot({ clip })`, same recipe as land-link-pure.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-link` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_link_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_link_after.png`
- `/opt/cursor/artifacts/land_link_pixel_diff.png`

## Wiring

Same pattern as land-link-pure. Stencil 4 `excludeComponents` is prod-only. `link.tsx` lost `@Component` so `--dev` does not emit the host. Incremental watch kept the old lazy chunk; a full stencil restart dropped `p-link` from the loader.

Mitosis Lit is built from `packages/components/mitosis/link/Link.lite.tsx` (`tagName: 'p-link'`, own `mitosis.config.js` so link-pure/tag-dismissible/tag/spinner/display/text/heading/icon/model-signature/flag/wordmark/crest/divider output is not regenerated). Nested icons stay `<p-icon>`. Unset `href` is not bound on the root span (Lit would write `href="undefined"`). `scripts/build-lit-link.mjs` strips `<my-fragment>` after `mitosis build`, restores `root` / `icon` / `label` classes Mitosis drops, maps `iconSource` / `hideLabel` to kebab attributes, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-link.iife.js`. Playground `index.html` loads that IIFE next to the link-pure bundle.

Generated `Link.ts` has `@customElement("p-link")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `Link` class. Fine for this unit.
- Framework wrappers were not regenerated.
- Do not start button-pure.
