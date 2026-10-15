# Mitosis playground screenshots

Captured from the playground (`packages/mitosis-compare`) on `cursor/mitosis-migration-41e6` after merging #6, at a 1280 px (`compare`) or 2200 px (`all-targets`) viewport. Each folder has `light/` and `dark/`.

- [`compare/`](compare): React next to upstream Stencil 4.8.0, every variant of every component
- [`all-targets/`](all-targets): React, Vue, Svelte, Angular, Lit and upstream side by side
- [`diff/`](diff): React | upstream | pixel diff strip for every variant above 0.5% mismatch
- [`diff-report.md`](diff-report.md): mismatch per variant (494 comparisons)
- [`target-status.md`](target-status.md): per-target and per-component status
- [`react-variant-crops.zip`](react-variant-crops.zip): every React variant cropped on its own

Overlay components (modal, flyout, sheet, banner, drilldown, canvas) have one file per variant (`<tag>--<variant>.png`).
