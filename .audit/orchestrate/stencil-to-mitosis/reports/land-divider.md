# land-divider

**unit:** playground `p-divider` from Mitosis Lit (not Stencil, not `lit-divider`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `eda1dbe65c`
**accept SHA:** (this commit)

## Playground

- URL: `http://localhost:3333/?components=divider`
- Card: `[data-card="divider"]`
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Hosts: 5 `<p-divider>` (no `lit-divider`)
- Constructor: `LitDivider` (`elementProperties` present)
- Shadow: `style` cssText + `hr`, no `my-fragment`
- Stencil loader: `p-divider` absent from `bootstrapLazy` after a full `--dev` restart

## Pixel-diff

| Pair | Size | `strictMismatch` | `totalPixels` |
| --- | --- | --- | --- |
| Lit `p-divider` vs stored baseline | 462×266 | 0 | 122892 |

After PNG is the same 2641 bytes as the stored baseline. Baseline PNG was not edited.

Control Stencil-vs-baseline was skipped. After land there is no Stencil `p-divider` host left to photograph.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_divider_before.png` (untouched)
- `/opt/cursor/artifacts/mitosis_land_divider_after.png`
- `/opt/cursor/artifacts/land_divider_pixel_diff.png`

## Wiring

Stencil 4 has no `excludeSrc`. `excludeComponents: ['p-divider']` is prod-only, so `--dev` still compiled the old host until `divider.tsx` lost `@Component`. Incremental watch kept the lazy chunk in memory; a full stencil restart dropped `p-divider` from the loader.

Mitosis Lit is built from `packages/components/mitosis/divider/Divider.lite.tsx` (`tagName: 'p-divider'`, `useShadowDom: true`). `scripts/build-lit-divider.mjs` strips `<my-fragment>`, aliases `lit/decorators` → `lit/decorators.js`, and writes `src/assets/p-divider.iife.js`. Playground `index.html` loads that IIFE.

Generated `Divider.ts` has `@customElement("p-divider")`. `rg my-fragment` on it is empty.

## Follow-ups

- `generateConstructorMap` still imports the stub `Divider` class. Fine for this unit.
- Framework wrappers were not regenerated. Do not run full `npm run build` until a later land owns that.
- Do not start a second TAG_NAME.
