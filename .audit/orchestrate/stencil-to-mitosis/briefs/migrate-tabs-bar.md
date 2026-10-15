GOAL         Migrate p-tabs-bar to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/TabsBar.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-tabs-bar.md, /opt/cursor/artifacts/mitosis_lit_tabs_bar_after.png, /opt/cursor/artifacts/tabs_bar_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except TabsBar, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Multi-select-option just passed byte-identical in-parent swap. Playground: http://localhost:3333/?components=tabs-bar. Stencil: packages/components/src/components/tabs-bar/. Keep inner p-scroller and p-icon as Stencil. Copy light-DOM button/a children on in-card swap. Pause bar motion with --p-animation-duration: 0s on both sides. size breakpoint m is 1000. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   TabsBar.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on TabsBar.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
