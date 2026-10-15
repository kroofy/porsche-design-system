GOAL         Migrate p-link-tile to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/LinkTile.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-link-tile.md, /opt/cursor/artifacts/mitosis_lit_link_tile_after.png, /opt/cursor/artifacts/link_tile_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except LinkTile, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Button-tile just passed byte-identical card swap. Playground: http://localhost:3333/?components=link-tile. Stencil: packages/components/src/components/link-tile/. Keep nested p-link, p-tag, p-text as Stencil. Copy light-DOM children and named slots on in-card swap. Unset href still becomes href="undefined" unless omitted. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   LinkTile.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on LinkTile.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
