---
name: migrate-pds-component
description: Migrate exactly one PDS TAG_NAME from Stencil to Mitosis Lit. Use when a worker is assigned one tag (p-divider, p-text, …) and must reach live-ui-verified pixel-diff 0 without rediscovering Lit pitfalls.
---

# Migrate one PDS component (Stencil to Mitosis Lit)

You are migrating **one** `TAG_NAME`. Stop when that tag is live-verified or you hit a dead end. Do not start a second tag. Do not edit `packages/components`.

Worked example (read, do not treat the fragment as a pattern to copy): `packages/mitosis-probe-lit/src/Divider.lite.tsx`, report `.audit/orchestrate/stencil-to-mitosis/reports/fitness-lit.md`.

## Inputs

| Token | How to get it | Example |
| --- | --- | --- |
| `TAG_NAME` | Brief, or a row in `packages/shared/src/lib/tagNames.ts` | `p-divider` |
| `SHORT` | `TAG_NAME` without the `p-` prefix | `divider` |
| `LIT_TAG` | `lit-` + `SHORT` until the program registers `p-` tags | `lit-divider` |
| Stencil source | `packages/components/src/components/{SHORT}/` | `{SHORT}.tsx`, `{SHORT}-styles.ts` |
| Playground card | `packages/components/src/index.html` `[data-card="{SHORT}"]` | `data-card="divider"` |
| Playground URL | `http://localhost:3333/?components={SHORT}` | `?components=divider` |
| Stencil baseline | Capture before you rewrite. Do not edit a baseline to pass a diff. | `.audit/orchestrate/stencil-to-mitosis/baseline/` |

Install any probe or migrate package with `npm install --workspaces=false`. Leave the repo-root lockfile alone. Call the local `./node_modules/.bin/mitosis`, not `npx mitosis` (workspace npx resolves from the root and fails).

## Forbidden generators

Do not set any of these Mitosis `targets`:

| Target | Why it is dead |
| --- | --- |
| `webcomponent` | Mitosis 0.14.0 maps this to `componentToCustomElement`. Same generator as the failed first probe. The name looks like Lit. It is not. |
| `customElement` | No runtime stylesheet channel. Breakpoint media queries and forced-colors die. Attribute reactivity dies. Verdict in `reports/fitness-divider.md`. |
| `stencil` | The program is leaving Stencil. Do not compile back into it. |

The only compile target is `lit`.

Do not generate Mitosis `react` / `vue` / `angular` outputs for this unit. PDS wraps one web component. Those targets were already shown defective.

## Config

`mitosis.config.js` must look like this. `useShadowDom` docs say "Default: enabled". Nothing in the generator sets that default. Unset means light DOM.

```js
/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'src/**',
  dest: 'output',
  targets: ['lit'],
  commonOptions: { typescript: true },
  options: {
    lit: { useShadowDom: true },
  },
};
```

`useMetadata({ tagName: LIT_TAG })` is honored by the Lit generator. Use it. Do not rename the component function to hack the tag.

After `mitosis build`, open `output/lit/src/*.ts` and confirm:

- `import { … } from "lit/decorators"` (invalid specifier, fixed at bundle time)
- `@customElement("lit-…")`
- `static styles` from `useStyle` (host only)
- a `get cssText()` that returns a stylesheet string
- **no** `<my-fragment>`

## Source pattern

Stencil does two things in `render()`: `attachComponentCss(this.host, getComponentCss, …props)` and a small template. Mitosis Lit cannot call `attachComponentCss` (it wants a host and constructed stylesheets). The analog that passed pixel-diff 0 is a `cssText` getter.

### cssText, not inline background

`useStore` exposes `get cssText()` that mirrors `getComponentCss(...)` from `{SHORT}-styles.ts`. The template renders it into the shadow root:

```tsx
<style innerHTML={state.cssText} />
```

That is a real stylesheet. Media queries and `@media (forced-colors: active)` work. HCM honors `background: CanvasText` on a rule. It does not honor the same value when you force it as an inline `style.background`.

The customElement probe bound color as an inline background. Forced-colors then painted a white rule on a white canvas. Invisible. If you catch yourself writing `style={{ background: … }}` for a token color, stop.

Token colors are `var(--p-color-…)` with **no fallback**, same as `ref()` in the Stencil styles. Compare computed background to a reference `div` that uses the same `var()` on the same page. Do not assert hardcoded rgba.

`:host` and `:host([hidden])` stay in `useStyle(\`…\`)` (static). Everything that depends on props goes in `cssText`.

### No JSX fragments

The Lit generator has no Fragment branch. `<>…</>` and `<Fragment>` become a literal `<my-fragment>` element in the shadow root. Stencil does not have that node. It will break `:host > *`, slots, and child selectors even when it happens to pixel-diff 0 (divider did, because `my-fragment` is inline and empty-layout).

Return one real root element that already exists in the Stencil shadow tree. Put `<style innerHTML={state.cssText} />` inside that root when the root can have children.

If Stencil's render is a void element (`hr`, `input`, `img`) you cannot add a sibling without a fragment. Do not wrap it in a layout-affecting extra `div`. Do not ship `my-fragment`. Either:

1. add a shared Mitosis post-plugin / post-build strip that removes `<my-fragment>` / `</my-fragment>` from `output/lit` and fail the build if any remain, or
2. stop and write a dead-end note that this tag needs the generator fix before migrate.

`rg my-fragment output/lit` must print nothing before you bundle.

### Breakpoints

PDS `m` is **1000px**. `s` is 760. Old briefs that say "m is 760" are wrong. Tokens:

| JSS / `buildResponsiveStyles` key | Token | px |
| --- | --- | --- |
| `xs` | `breakpointXs` | 480 |
| `s` | `breakpointSm` | 760 |
| `m` | `breakpointMd` | **1000** |
| `l` | `breakpointLg` | 1300 |
| `xl` | `breakpointXl` | 1760 |
| `xxl` | `breakpoint2Xl` | 1920 |

`base` is the no-media rule. Every other key compiles to `@media(min-width:{px}px){…}`.

Attributes arrive as strings. A breakpoint prop looks like `'{"base":"horizontal","m":"vertical"}'`. Parse JSON in the getter when the string starts with `{`. Lit's default converter will not do this for you.

Prove the flip live at **999** (still base) and **1000** (m active). A 1440 viewport makes `m` active. A 640 viewport does not test `m`.

## Bundle

Generated `from "lit/decorators"` is invalid. lit's export map only exposes `lit/decorators.js`. Alias at bundle time. Do not edit the generated file to hide this.

```bash
./node_modules/.bin/mitosis build
# fail if fragments leaked
if rg -q my-fragment output/lit; then echo 'my-fragment leaked'; exit 1; fi
# from the migrate package, using the repo-root esbuild if needed
esbuild output/lit/src/{Component}.ts --bundle --format=iife \
  --tsconfig=tsconfig.json \
  --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/{LIT_TAG}.bundle.js
```

## Screenshot command and pixel-diff

Acceptance is a same-fixture pixel-diff against the live Stencil playground card, not two unrelated crops.

Capture parameters are the ones in `.audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-divider-baseline.mjs`. Copy them. Do not invent a smaller viewport.

```
viewport: { width: 1440, height: 900 }
deviceScaleFactor: 2
crop: the [data-card="{SHORT}"] element, not the full page
type: png
```

Stencil baseline command (playground already running, `npm run start:components`):

```bash
PLAYGROUND_URL="http://localhost:3333/?components={SHORT}" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_{SHORT}_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_{SHORT}_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-divider-baseline.mjs
```

That script is divider-hardcoded (title Playground, `p-divider`, four horizontal rules). For any other tag, copy the script and swap the selectors / assertions. Keep 1440×900 and `deviceScaleFactor` 2. Do not change those to make a diff pass.

Pixel-diff (the gate). Mirror `packages/mitosis-probe-lit/harness/pixel-diff.mjs`:

1. Open `http://localhost:3333/?components={SHORT}` at 1440×900, dsf 2.
2. Wait for `customElements.whenDefined(TAG_NAME)` and `{TAG_NAME}.hydrated` inside `[data-card="{SHORT}"]`.
3. Control shot first. Screenshot the card. `pixelmatch` against the stored baseline at `threshold: 0`, `includeAA: true`. `strictMismatch` must be 0. If the control is dirty, the environment drifted. Stop. Do not edit the baseline.
4. Inject the Lit bundle. Swap every `TAG_NAME` host **inside the card only** for `LIT_TAG`. Copy attributes verbatim. Leave card markup and CSS untouched.
5. Screenshot the same card with the same parameters.
6. `pixelmatch` Lit-after vs stored baseline, same threshold. `strictMismatch` must be 0.
7. Write `/opt/cursor/artifacts/{SHORT}_pixel_diff.png`. A green (no red pixels) image is the evidence. A compile with no image is not.

Worked pixel-diff for divider, including the in-card swap:

```bash
cd packages/mitosis-probe-lit
node harness/pixel-diff.mjs
```

Functional checks (shadow root, `cssText` `<style>`, colors vs `var()` reference, vertical geometry, 999/1000 flip, attribute change after connect, forced-colors `CanvasText`) live in `packages/mitosis-probe-lit/harness/verify.mjs`. Copy and retarget. Exit nonzero on any failure.

## Dead-end criteria

Write a dead-end report and stop if any of these is not expressible. Do not fake them with inline styles, hardcoded geometry, or a cropped screenshot of something else.

1. **Shadow DOM.** `lit: { useShadowDom: true }` must produce a real `shadowRoot`. Light DOM is a fail.
2. **JSS `attachComponentCss` analog.** A props-derived stylesheet string in the shadow root, re-evaluated on render, able to carry media queries and forced-colors. Inline `background` is not the analog.
3. **Breakpoint props.** JSON attribute parsed in the getter, compiled to `@media(min-width:…)` rules, flip verified at 999 vs 1000.

Also fail the unit (not a program dead end, a worker fail) when:

- generated output contains `my-fragment`
- config target is `webcomponent` or `customElement`
- `useShadowDom` is missing
- bundle has no `lit/decorators.js` alias and the page throws on import
- control Stencil-vs-baseline `strictMismatch !== 0`
- Lit-vs-baseline `strictMismatch !== 0`
- you edited `packages/components` or the baseline PNG to pass

## Do not

- Edit `packages/components/**`.
- Migrate a second `TAG_NAME` in the same unit.
- Rebase, force-push, or run `gt`.
- Touch `packages/mitosis-probe/**` (frozen customElement evidence) or the divider baseline to hide a mismatch.
- Port Mitosis's react/vue/angular outputs as the public API.
- Claim pixel-diff 0 without the after PNG and the diff PNG.

## Done

`TAG_NAME` has a `.lite.tsx`, `mitosis build` emits Lit with shadow DOM, the playground card swap diffs 0 at 1440×900 dsf 2, and the report says `live-ui-verified` with the artifact paths. Then stop.
