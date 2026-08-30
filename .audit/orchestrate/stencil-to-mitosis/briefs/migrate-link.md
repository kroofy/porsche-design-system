GOAL         Migrate p-link to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/Link.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-link.md, /opt/cursor/artifacts/mitosis_lit_link_after.png, /opt/cursor/artifacts/link_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except Link, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Link-pure just passed byte-identical card swap. Playground: http://localhost:3333/?components=link. Stencil: packages/components/src/components/link/. Sibling of link-pure: slotted label, nested p-icon, optional href vs slotted <a>. Keep inner icon as p-icon. Copy link-pure harness, retarget the card. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   Link.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on Link.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
