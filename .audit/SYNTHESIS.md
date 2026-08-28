# Native elements synthesis

Base: arena candidate 2.
Grafts: candidate 3 `linkAppearance` + `aria-current` + `.p-link` / `data-p-*` + optional icon sheet.
Candidate 1 golden markup test and `a[pLink]` Angular host.
Candidate 4 catalog rule and `@layer pds.elements`.
Rejected as base: candidate 4 schema IR, candidate 3 Angular content mutation, Mitosis, light-DOM CE.

## Contract

If the user interacts with one native element, PDS does not wrap it.
A link is `<a class="p-link">`. `PLink` still exists. Vanilla is HTML plus one stylesheet. No `load()` for this family.
Stencil `p-link` stays frozen until a major removal.

## First slice

`linkAppearance()` plus `toLightDomLinkCss()` in `packages/components/src/elements/link/`.
Next: snapshot the rewritten CSS against a hand-authored `<a class="p-link">` VRT page, then a handwritten React `PLink`.
