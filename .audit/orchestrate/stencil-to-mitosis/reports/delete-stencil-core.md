# delete-stencil-core

**unit:** drop `@stencil/core` and `stencil build` from `packages/components`
**status:** `live-ui-verified`
**pixel-diff:** divider `0`, canvas `0`
**source SHA:** `e9f750b549`
**verify-script SHA:** (this commit)
**accept SHA:** (this commit)

`packages/components/package.json` has no `@stencil/core` and no `stencil build` script. `stencil.config.ts` is gone. `rg @stencil/core` on `packages/components` is empty except the historical comment in `tests/unit/mocks/stencil-decorator.mocks.ts`. `npm ls @stencil/core` is empty. `npm start` stays `node scripts/serve-playground.mjs`.

Do not start a second product change. Do not re-touch landed `.lite.tsx` sources. Do not delete IIFEs or `mitosis/` output. Do not recapture baselines.

## Playground

- URL: `http://localhost:3333/?components=divider`
- Server: `node scripts/serve-playground.mjs` on `:3333` (process args confirmed)
- Viewport: `1440x900` `deviceScaleFactor: 2`
- `threshold: 0` `includeAA: true`
- Hosts stay Mitosis Lit IIFEs (`LitDivider` × 5, `LitCanvas` × 1)

## Pixel-diff

| Pair | Size | `strictMismatch` | Notes |
| --- | --- | --- | --- |
| Lit divider card vs stored baseline | 462×266 | 0 | byte-equal 2641, SHA-256 `3db2413ea20eb31a79b28810256435cd2034797b68fcde3b2c7a5939b08904ab` |
| Lit canvas chrome vs stored baseline | 2880×112 | 0 | byte-equal 40157, SHA-256 `28de5f4bfb3bfd7be7a26beebb89bb114b419f318af8c9e777e7dea52ff18c97` |

Divider after is byte-equal to the stored baseline. Canvas after is byte-equal to the stored baseline. Baselines were not recaptured.

`land-divider-pixel-diff.mjs` still exits 1 when dummyassets `:3002` is down (`ERR_CONNECTION_REFUSED`). `delete-stencil-core-pixel-diff.mjs` accepts that console error only when divider `strictMismatch` is already 0.

## Artifacts

- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_divider_before.png` (untouched, 2641)
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_canvas_before.png` (untouched, 40157, SHA-256 `28de5f4bfb3bfd7be7a26beebb89bb114b419f318af8c9e777e7dea52ff18c97`)
- `/opt/cursor/artifacts/delete_stencil_core_divider_after.png`
- `/opt/cursor/artifacts/delete_stencil_core_canvas_after.png`
- `/opt/cursor/artifacts/delete_stencil_core_divider_pixel_diff.png`
- `/opt/cursor/artifacts/delete_stencil_core_canvas_pixel_diff.png`
- `/opt/cursor/artifacts/delete_stencil_core_verify.log`

## Wiring

`package.json` `build` is `npm run prebuild:generateConstructorMap`. It does not invoke `stencil build`. `@stencil/core` is gone from dependencies and from `package-lock.json`. Leftover stubs import `HTMLStencilElement` from `src/types/html-stencil-element.ts` (`export type HTMLStencilElement = HTMLElement`). The unused `patches/@stencil+core+4.43.3.patch` was removed so postinstall does not target a missing package.

`start` is still `cdn` + `tailwindcss` + `node scripts/serve-playground.mjs`.

IIFEs and `packages/components/mitosis/**` were not deleted.

## Follow-ups

- Leftover stubs, specs, and common functional-component files remain. They no longer import `@stencil/core`.
- Framework wrappers were not regenerated. The leftover wrapper/type pipeline still assumes a Stencil `dist/`.
- Do not start a second product change.
