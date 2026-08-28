# Native elements synthesis

Base: arena candidate 2.
Grafts: candidate 3 `linkAppearance` + `aria-current` + `.p-link` / `data-p-*` + optional icon sheet.
Candidate 1 golden markup test and `a[pLink]` Angular host.
Candidate 4 catalog rule and `@layer pds.elements`.
Rejected as base: candidate 4 schema IR, candidate 3 Angular content mutation, Mitosis, light-DOM CE.

## Contract

If the user interacts with one native element, PDS does not wrap it.
`PLink` is `<a class="p-link">`. `PButton` is `<button class="p-button">`.
Vanilla is HTML plus one stylesheet. No `load()` for this family.
Stencil `p-link` / `p-button` stay frozen until a major removal.

## Done

- `linkAppearance()` and `rewriteShadowLinkCss()`
- `buttonAppearance()` and `rewriteShadowButtonCss()`
- Shared `serializeResponsive` and `rewriteShadowElementCss`
- Handwritten React `PButton` that returns a bare `<button>`. Public export still the CE wrapper.

## Next

VRT a hand-authored `<a class="p-link">` / `<button class="p-button">` against current pixels.
Handwritten React `PLink`. Vue same. Angular `a[pLink]` / `button[pButton]`.
Icon / spinner children. Then `link-pure` / `button-pure`.
