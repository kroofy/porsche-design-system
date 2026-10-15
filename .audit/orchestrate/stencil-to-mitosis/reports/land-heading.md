# land-heading

**Unit:** land-heading  
**Tag:** `p-heading`  
**Status:** live-ui-verified  
**Date:** 2026-08-31  
**Source SHA:** `7d8a28e367`  
**Accept SHA:** (this commit)

## Goal

Playground `p-heading` is Mitosis Lit (`LitHeading` / `@customElement("p-heading")`), not Stencil. Pixel-diff 0 vs the stored Stencil heading baseline.

## Playground

- URL: `http://localhost:3333/?components=heading`
- Card: `[data-card="heading"]`
- Viewport: 1440×900, `deviceScaleFactor: 2`
- Hosts: 12 (`P-HEADING`)
- Constructor: `LitHeading` (`isLit` true)
- `customElements.get('lit-heading')`: undefined
- Shadow: `style` + `h2` + `slot` (no `my-fragment`)
- Loader `p-heading` count in `www/build/porsche-design-system.esm.js`: 0
- IIFE: `/assets/p-heading.iife.js` HTTP 200, 29770 bytes

## Pixel-diff

| Metric | Value |
| --- | --- |
| Card clip | 460×1640 |
| `strictMismatch` | 0 / 754400 |
| After PNG | `/opt/cursor/artifacts/mitosis_land_heading_after.png` |
| After bytes | 55470 |
| Stored baseline | `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_heading_before.png` |
| Baseline bytes | 55470 (unchanged; not edited) |
| Byte-equal | yes |
| SHA-256 | `1e9cbc8602bd71a83f8040b266539429bf80ec7049d350de24f05bf8b128bf95` |

Recipe: `page.screenshot({ clip })` of the heading card, not `locator.screenshot()` of a clipped descendant. Card is taller than the 900px viewport.

## Wiring

Isolated land, same as icon:

- `packages/components/mitosis/heading/` with OWN `mitosis.config.js` (`targets: ['lit']`, `lit: { useShadowDom: true }`). Did not regenerate prior lands.
- Copied probe `Heading.lite.tsx`; land `tagName` is `'p-heading'` (probe still says `lit-heading`).
- Single `<h2>` root with `<style>` + `<slot>` (no JSX fragment).
- `scripts/build-lit-heading.mjs`: strip `my-fragment` if present, alias `lit/decorators` → `lit/decorators.js`, write `src/assets/p-heading.iife.js`.
- Stub `heading.tsx`: keep `export class Heading` for `generateConstructorMap`, strip `@Component` so `--dev` stops compiling the host.
- `excludeComponents` + playground `index.html` script tag.
- Full stencil `--dev` restart (incremental watch keeps the old lazy chunk). `p-heading` left `bootstrapLazy`.
- `rg my-fragment` on generated `Heading.ts` is empty.

## Follow-ups

- Constructor map still lists `Heading` via the stub class. Fine for this land.
- Do not regenerate framework wrappers for this isolated land.
- Do not start `text`.
