# Mitosis playground

Every Mitosis component (`packages/components/mitosis/*/*.lite.tsx`) rendered by each generated target, next to the
published upstream Stencil components (`@porsche-design-system/components-js@4.8.0`, loaded from the Porsche CDN with
the `upstream` prefix).

| Column         | What runs                                                                          |
| -------------- | ---------------------------------------------------------------------------------- |
| React          | `output/frameworks/react/*.tsx`, React 18                                          |
| Vue            | `output/frameworks/vue/*.vue`, Vue 3                                               |
| Svelte         | `output/frameworks/svelte/*.svelte`, Svelte 4                                      |
| Angular        | `output/frameworks/angular/*.ts`, Angular 22 standalone components, JIT            |
| Lit            | `packages/components/src/assets/p-*.iife.js`, the Lit custom elements (Shadow DOM) |
| Upstream 4.8.0 | `upstream-p-*` from the published package                                          |

Each column is its own iframe, so CSS emitted by one target cannot style another. Rows are height-aligned across
columns. Theme toggles `.scheme-light` / `.scheme-dark` on `<html>`, exactly like PDS v4.

## Hosted preview

The `Mitosis Playground` workflow builds, verifies and force-pushes the site to the `gh-pages` branch on every push to
`cursor/mitosis-migration-41e6` or `cursor/mitosis-sync-preview-89b3`.

- https://raw.githack.com/kroofy/porsche-design-system/gh-pages/index.html works without any repo setting. githack shows
  a one-time "One more step → Open the page" screen first.
- https://kroofy.github.io/porsche-design-system/ works once **Settings → Pages → Build and deployment → Deploy from a
  branch → `gh-pages` / `(root)`** is enabled.

## Run it locally (macOS)

Node 24 (Volta reads it from the root `package.json`).

```bash
git clone https://github.com/kroofy/porsche-design-system.git
cd porsche-design-system
git checkout cursor/mitosis-sync-preview-89b3

npm ci
npm run build:core-dependencies
npm run generate:frameworks-all --workspace=@porsche-design-system/components
npm run dev --workspace=mitosis-compare
open http://localhost:5174/
```

After editing a `.lite.tsx`:

```bash
npm run build:lit-<tag> --workspace=@porsche-design-system/components   # Lit iife, e.g. build:lit-button
npm run generate:frameworks-all --workspace=@porsche-design-system/components
```

`npm run build:lit-all --workspace=@porsche-design-system/components` rebuilds all 75 Lit bundles.

Assets (icons, flags, crest, fonts) come from `https://cdn.ui.porsche.com/porsche-design-system`. To work offline, run
`npm run start --workspace=@porsche-design-system/components` (serves `http://localhost:3001`) and start the playground
with `PDS_CDN_BASE_URL=http://localhost:3001`.

## Checks

```bash
npm run build --workspace=mitosis-compare          # production build in dist/
npm run check:emit --workspace=mitosis-compare     # tsc (React), ngc strictTemplates (Angular), vue-tsc (Vue)
npm run test:mitosis --workspace=@porsche-design-system/components   # adapter + runtime unit tests

npx playwright install chromium
npm run verify --workspace=mitosis-compare -- --base http://localhost:5174
npm run screenshots --workspace=mitosis-compare -- --base http://localhost:5174 --out screenshots
```

`verify` loads every demo in every target and writes `verify-report.json` (render errors, empty variants). The deployed
site reads it to badge each column. `screenshots` writes React-vs-upstream and all-target images per theme, plus a
per-variant pixel diff (`diff-report.md`).

## Layout

- `src/playground/demos.ts` holds the variants per component, the child-node tree shared by all renderers, and known
  gaps.
- `src/playground/targets/*` holds one renderer per target.
- `vite-plugin-pds.ts` rewrites the hardcoded dev CDN, serves and emits the Lit bundles, and maps Lit dependencies.
- `emit-check/` holds the type-check configs for the generated framework files.
