GOAL         Migrate p-drilldown-link to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/DrilldownLink.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-drilldown-link.md, /opt/cursor/artifacts/mitosis_lit_drilldown_link_after.png, /opt/cursor/artifacts/drilldown_link_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except DrilldownLink, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Parent item just passed byte-identical closed-card swap. Playground: http://localhost:3333/?components=drilldown. Stencil: packages/components/src/components/drilldown/drilldown-link/. Swap link hosts only; leave p-drilldown and p-drilldown-item as Stencil. Copy light-DOM children (including slotted <a>). Compare closed unless a host is already open. throwIfParentIsNotOfKind is benign. Omit unset href so it does not become href="undefined". You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   DrilldownLink.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on DrilldownLink.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
