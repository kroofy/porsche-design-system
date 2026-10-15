# delete-stencil

**unit:** packages/components start path no longer invokes `stencil build`
**status:** `live-ui-verified`
**pixel-diff:** divider `0`, canvas `0`
**source SHA:** `53a8b053e1`
**verify-script SHA:** `91edf6fe64`
**accept SHA:** (this commit)

`npm start` in `packages/components` now runs `node scripts/serve-playground.mjs` on `:3333` with `serve-cdn` and Tailwind watch. It does not invoke `stencil build`. Playground hosts stay Mitosis Lit IIFEs. `rg '^@Component'` on `packages/components/src/**/*.tsx` is empty.

Do not start a second product change. Do not re-touch `p-canvas` or earlier landed tag source. Do not delete IIFEs or `mitosis/` output.

## Playground

- URL: `http://localhost:3333/`
- Server: static Node HTTP over `packages/components/src` (IIFEs, `index.html`, assets)
- `/build/porsche-design-system.esm.js` is a no-op stub (no `"p-canvas"` / `"p-divider"`)
- Stencil loader script tags were removed from `index.html`. IIFE script tags stay.
- Viewport: `1440x900` `deviceScaleFactor: 2`
- Process on `:3333` is `serve-playground.mjs`, not `stencil build --dev`

## Pixel-diff

| Pair | Size | `strictMismatch` | Notes |
| --- | --- | --- | --- |
| Lit divider card vs stored baseline | 462×266 | 0 | `LitDivider` × 5, no `my-fragment` |
| Lit canvas chrome vs stored baseline | 2880×112 | 0 | byte-equal 40157, SHA-256 `28de5f4bfb3bfd7be7a26beebb89bb114b419f318af8c9e777e7dea52ff18c97` |

Divider after is pixel-identical (`strictMismatch` 0). Canvas after is byte-equal to the stored baseline. Baselines were not recaptured.

The original `land-divider-pixel-diff.mjs` still exits 1 when dummyassets `:3002` is down (`ERR_CONNECTION_REFUSED`). Later lands treat that as benign. `delete-stencil-pixel-diff.mjs` accepts that console error only when divider `strictMismatch` is already 0.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_divider_before.png` (untouched)
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_canvas_before.png` (untouched, 40157, SHA-256 `28de5f4bfb3bfd7be7a26beebb89bb114b419f318af8c9e777e7dea52ff18c97`)
- `/opt/cursor/artifacts/delete_stencil_divider_after.png`
- `/opt/cursor/artifacts/delete_stencil_canvas_after.png`
- `/opt/cursor/artifacts/delete_stencil_divider_pixel_diff.png`
- `/opt/cursor/artifacts/delete_stencil_canvas_pixel_diff.png`
- `/opt/cursor/artifacts/delete_stencil_verify.log`

## Wiring

`package.json` `start` is `cdn` + `tailwindcss` + `node scripts/serve-playground.mjs`. `prestart` still builds aria types and stylesheets. It does not call `stencil build`.

`scripts/serve-playground.mjs` serves `src/index.html`, `src/assets/p-*.iife.js`, other playground assets, and a stub Stencil loader. Production `build` still mentions Stencil; that leftover is out of this unit.

IIFEs and `packages/components/mitosis/**/output` were not deleted.

## Follow-ups

- Leftover stubs, specs, `stencil.config.ts`, and `@stencil/core` remain. Do not sweep them in this unit.
- Framework wrappers were not regenerated.
- Do not start a second product change.
