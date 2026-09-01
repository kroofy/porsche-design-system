# Mitosis framework comparison

Side-by-side document that mounts the generated Mitosis `react`, `vue`, `angular`, and `svelte` files for every in-flow tag.

Install and start from this folder (not a workspace):

```bash
npm install --workspaces=false --install-strategy=nested
npm run dev
```

Open `http://localhost:5174/`. Each row shows the stored Stencil playground baseline card, the landed Mitosis Lit `p-*` custom element, then the four framework emits. Lit uses the same demo props and children as React/Vue/Angular/Svelte, so it is the fair same-fixture base. Overlay/dialog tags stay off the page (banner, modal, flyout, sheet, toast, popover, drilldown, canvas, carousel, select).

Framework cells mount the native Mitosis emit (same `.lite.tsx` as Lit). A generate post-process wraps each file in a `.p-<tag>` host and scopes `cssText` / `:host` / `::slotted` / `<slot>` so styles do not need a fake shadow root. Angular cells still interpolate the generated class plus template.

Angular cells render the generated class plus template. Vite cannot JIT Angular 22 standalone components in this host. Baselines are the full playground variant matrix, so they will not pixel-match a single emit instance.
