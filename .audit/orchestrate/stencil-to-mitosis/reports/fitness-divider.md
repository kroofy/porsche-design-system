# Fitness report: p-divider on Mitosis

STATUS   complete, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     0321771cc69542a04cf6ded65557c9d2cc94b7d0 (probe commit; this report lands on top)
VERDICT  dead end for parity-grade replacement. Mitosis compiles a divider and renders it live (screenshot attached), but it cannot express JSS `attachComponentCss` or breakpoint props, two of the three dead-end criteria in standing order 5. The rendered element also regresses HCM and drops attribute reactivity. Details and evidence below.

## What was built

`packages/mitosis-probe/` (throwaway, not wired into the monorepo build):

- `src/Divider.lite.tsx` mirrors p-divider as closely as Mitosis allows. Color map with PDS token vars plus light-theme fallbacks, direction via inline geometry, static shadow CSS with a forced-colors rule, `useMetadata({ isAttachedToShadowDom: true })`.
- `mitosis.config.js` with targets customElement, react, vue, angular. No stencil target.
- `harness/index.html` renders default, all four colors, vertical, and a PDS breakpoint-object attribute.
- `harness/verify.mjs` loads the harness in Chromium, asserts computed styles, tests attribute reactivity and forced-colors, and writes the screenshot.
- Generated output for all four targets is committed under `output/` so the evidence is reviewable without running anything.

## Commands run

```
cd packages/mitosis-probe
npm install --save-dev --workspaces=false @builder.io/mitosis @builder.io/mitosis-cli   # 0.14.0, local lockfile, root lockfile untouched
./node_modules/.bin/mitosis build
node harness/verify.mjs   # playwright-core from the repo root, chromium via npx playwright install chromium --with-deps
```

`npx mitosis build` fails inside the workspace ("could not determine executable to run") because workspace-mode npx resolves from the repo root. The local bin works.

## Compile result

All four targets compile. Final build output:

```
Mitosis: angular: generated 1 components, 0 regular files.
Mitosis: customElement: generated 1 components, 0 regular files.
Mitosis: vue: generated 1 components, 0 regular files.
Mitosis: react: generated 1 components, 0 regular files.
Mitosis: generation completed.
```

No compile errors. Two defects surfaced on the way there, both worked around in config rather than faked:

1. With `typescript: true`, the customElement target emits `export type DividerColor = ...` declarations into a file named `Divider.js`. A browser cannot parse it. Worked around with `customElement: { typescript: false }`.
2. The first build registered `customElements.define("divider", ...)`. A tag without a hyphen is invalid and `define` throws. The `prefix` option does not touch the tag; it only renames internal `data-el` markers. The tag comes from the component name, so the component function is named `ProbeDivider` to get `probe-divider`.

## Live verification

`node harness/verify.mjs`, Chromium 149 headless, final run:

```json
{
  "isDefined": true,
  "default": {
    "hasShadowRoot": true,
    "styleTagInShadowRoot": true,
    "inlineBackground": "var(--p-color-contrast-lower, hsl(234 6% 32.9% / 0.324))",
    "background": "rgba(79, 80, 89, 0.325)",
    "height": "1px",
    "width": "640px",
    "hostDisplay": "block"
  },
  "vertical": { "height": "60px", "width": "1px" },
  "breakpointObject": { "height": "1px", "width": "640px" },
  "attrChangeReactive": false,
  "forcedColors": { "background": "rgba(255, 255, 255, 0.325)" },
  "consoleErrors": []
}
```

Screenshot saved to /opt/cursor/artifacts/mitosis_divider_after.png. It shows the four color weights, a working vertical divider, and the breakpoint-object instance rendering as a plain horizontal divider.

The default background rgba(79, 80, 89, 0.325) matches the PDS light value hsl(234 6% 32.9% / 0.324), so flat-prop light-theme rendering is at parity.

## Capability matrix vs Stencil p-divider

**Shadow DOM: expressible.** `useMetadata({ isAttachedToShadowDom: true })` produces `attachShadow({ mode: 'open' })` and injects the static `<style>` into the shadow root. Verified live (`hasShadowRoot`, `styleTagInShadowRoot`, `:host` display block all true). Caveat that it is opt-in metadata, not a config default, and only the customElement target honors it.

**JSS attachComponentCss: not expressible.** Mitosis styling is a static CSS string extracted at compile time. Stencil p-divider builds a fresh stylesheet per prop combination at runtime (`getComponentCss(color, direction)`). The only dynamic channel Mitosis offers is inline style bindings, and the customElement runtime applies those with `Object.assign(el.style, ...)`, which silently drops CSS custom properties (they need `style.setProperty`). Verified live in an earlier run: binding `--probe-divider-bg` inline left the property unset and the divider transparent. The probe therefore binds `background` directly inline.

**Forced colors / HCM: regressed as a consequence.** PDS sets `background: CanvasText` inside a forced-colors media query, which HCM honors. With the color forced inline, HCM overrides it to Canvas. Verified live: under `forcedColors: 'active'` the computed background is rgba(255, 255, 255, 0.325), a white divider on a white canvas. Invisible. PDS ships HCM VRT tests, so this alone fails the program's pixel-diff-0 done predicate.

**Breakpoint direction props: not expressible.** `BreakpointCustomizable<DividerDirection>` compiles a prop object into media queries at runtime via `buildResponsiveStyles`. Mitosis cannot generate media queries from prop values. Verified live: `direction='{"base":"horizontal","m":"vertical"}'` arrives as a raw string, fails the `=== 'vertical'` check, and silently renders horizontal. No warning, unlike Stencil's `validateProps`, which would console.warn on an invalid value.

**Prop validation: not expressible as PDS does it.** `validateProps(this, propTypes)` runs on every render with host-element access for the warning text. Mitosis has no render-time hook with a host handle. A plain validation function could run in `onMount`, but only once, because of the next gap.

**Attribute reactivity: missing.** The generated element reads attributes once in `connectedCallback`. No `observedAttributes`, no `attributeChangedCallback`. Verified live: setting `color` after connect changes nothing (`attrChangeReactive: false`). Stencil re-renders on every prop change and gates it with `componentShouldUpdate`/`hasPropValueChanged`. Attribute-to-prop mapping is also a case-insensitive regex over dash-stripped names and delivers strings only, so numeric, boolean, and object props have no deserialization path.

**Host CSS: partial.** Static `:host` and `:host([hidden])` rules work in the customElement target. The JSS composition helpers (`addImportantToEachRule`, `hostHiddenStyles`) do not exist; you hand-write the final CSS. In the react and vue outputs the same `:host` selectors are emitted into light-DOM CSS where they match nothing, which is dead code the generator produces without complaint.

**Framework wrappers: different architecture, not a drop-in.** PDS ships one web component wrapped thinly per framework. Mitosis instead compiles four independent implementations. The react output emits a `<style>` element per component instance with unscoped selectors (default is styled-jsx, a Next.js-oriented runtime dependency; `stylesType: 'style-tag'` avoids it but not the per-instance duplication or the global scope). The angular output needs `standalone: true` to avoid a legacy NgModule and still imports CommonModule for ngStyle. The vue output uses `<style scoped>`, the only target where scoping is right by default.

## Deviations from the brief

- Component function is `ProbeDivider`, not `Divider`, to obtain a valid tag. The file is still `Divider.lite.tsx`.
- `direction` accepts flat values only. The breakpoint form is typed out of the probe and documented here instead, since it cannot work.
- Background is bound inline rather than through a CSS custom property, because the customElement runtime drops custom-property bindings. This is the honest closest-possible rendering, and it is what breaks HCM.
- `react.stylesType: 'style-tag'` and `angular.standalone: true` are set after inspecting the defaults, since the defaults (styled-jsx, NgModule) are further from PDS than the options allow.

## Follow-ups

- `packages/mitosis-probe` sits inside the root `packages/*` workspaces glob. It installs with `--workspaces=false` and keeps its own lockfile, so the root lockfile is untouched, but a plain `npm install` at the root would try to adopt it. If the probe outlives this report, either move it out of `packages/` or adopt it into the workspace deliberately. If the program ends here, delete the directory.
- If the program continues despite this verdict, the honest paths are: the Lit-based `webcomponent` target (untested here), pre-generating all breakpoint-direction class combinations at compile time (works for divider's 2 directions x 6 breakpoints, explodes for components with several breakpoint props), or a custom runtime layer for constructed stylesheets, which reintroduces exactly the framework Mitosis was supposed to replace.
- Ledger entry is the coordinator's write. Suggested verdict vocabulary: probe itself live-ui-verified, Mitosis fitness for p-divider verifier-failed.
