# land-button-pure

**unit:** playground `p-button-pure` from Mitosis Lit (not Stencil, not `lit-button-pure`)
**status:** `live-ui-verified`
**pixel-diff:** `0`
**source SHA:** `f8e5f6324b` (type-stub follow-up after `806b33a9e7`)
**accept SHA:** (this commit)

Playground `p-button-pure` is Mitosis Lit (`LitButtonPure` / `@customElement("p-button-pure")`). Pixel-diff vs stored Stencil baseline is **0**.

Do not start `button`.

## Inputs

- Brief: `.audit/orchestrate/stencil-to-mitosis/briefs/land-button-pure.md`
- Skill: `.audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md`
- Probe: `packages/mitosis-probe-lit/src/ButtonPure.lite.tsx` (`tagName` remains `lit-button-pure`)
- Template: `packages/components/mitosis/link/` + `scripts/build-lit-link.mjs`
- Playground: `http://localhost:3333/?components=button-pure`
- Card: `[data-card="button-pure"]` (19 hosts; tall card)
- Stored baseline (not edited): `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_button_pure_before.png` (97644 bytes, 982×1640, mtime 2026-08-30)
- After PNG: `/opt/cursor/artifacts/mitosis_land_button_pure_after.png`

## What landed

Isolated land, same shape as `link`:

- `packages/components/mitosis/button-pure/` with own `mitosis.config.js` (`targets: ['lit']`, `lit: { useShadowDom: true }`)
- Lite copy of the probe with `tagName: 'p-button-pure'` (probe still says `lit-button-pure`)
- `scripts/build-lit-button-pure.mjs`: Mitosis compile, `my-fragment` strip, restore `class="root"` / `icon` / `label` / `loading`, kebab-map `icon-source` / `hide-label` / `align-label`, alias `lit/decorators.js`, IIFE `src/assets/p-button-pure.iife.js`
- Stub `packages/components/src/components/button-pure/button-pure.tsx`: `@Component` stripped, `export class ButtonPure` kept for `generateConstructorMap`. Global `HTMLPButtonPureElement` kept so Stencil `--dev` still typechecks `implicitSubmit.ts` and `carousel.tsx`
- `excludeComponents` + playground `index.html` script `/assets/p-button-pure.iife.js`
- Nested `<p-icon>` and `<p-spinner>` stay Mitosis (`LitIcon` / `LitSpinner`)
- `icon="copy"` / `icon="like"` get CDN `source` (`copy.0fcd086.svg`, `like.a7468cd.svg`) because `LitIcon` files map only has `car` and `arrow-right`

## Pixel-diff

| Field | Value |
| --- | --- |
| Viewport | 1440×900, `deviceScaleFactor: 2` |
| Capture | `page.screenshot({ clip })` — `locator.screenshot()` of a clipped `p-canvas` descendant returns an empty layout box |
| Card box | 982×1640 |
| Threshold | 0, `includeAA: true` |
| `strictMismatch` | **0** / 1610480 |
| After PNG | 97644 bytes |
| SHA-256 | `ad5b0ed568762190d2cca244cf91b0add01034b185ba40a8f18be0ef615810ef` |
| Byte-equal to stored baseline | yes |

## Live proofs

- Constructor: `LitButtonPure`
- Nested: `LitIcon` + `LitSpinner`
- No `lit-button-pure` / `lit-icon` / `lit-spinner` in the document
- `rg my-fragment` on generated `ButtonPure.ts` is empty
- `"p-button-pure"` exact count in `www/build/porsche-design-system.esm.js` is **0**
- No `p-button-pure.entry.js`
- IIFE HTTP 200, 35936 bytes
- Animation freeze: `--p-animation-duration: 0s` on `documentElement` (plus `--p-transition-duration` / `--p-duration-md` / `--p-duration-xl` at `0s`)

## Commits

- Source: `806b33a9e7` `feat(components): land p-button-pure from Mitosis Lit`
- Type-stub follow-up: `f8e5f6324b` `fix(components): keep HTMLPButtonPureElement after stubbing p-button-pure`
- Accept: this report

## Follow-up

Do not start `button`.
