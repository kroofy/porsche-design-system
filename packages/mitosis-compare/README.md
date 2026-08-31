# Mitosis framework comparison

Side-by-side document that mounts the generated Mitosis `react`, `vue`, `angular`, and `svelte` files for every in-flow tag.

Install and start from this folder (not a workspace):

```bash
npm install --workspaces=false --install-strategy=nested
npm run dev
```

Open `http://localhost:5174/`. Overlay/dialog tags stay off the page (banner, modal, flyout, sheet, toast, popover, drilldown, canvas, carousel, select).

Angular cells render the generated class plus template. Vite cannot JIT Angular 22 standalone components in this host.
