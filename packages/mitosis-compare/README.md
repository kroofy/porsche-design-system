# Mitosis framework comparison

Side-by-side document that mounts the generated Mitosis `react`, `vue`, `angular`, and `svelte` files for every in-flow tag.

Install and start from this folder (not a workspace):

```bash
npm install --workspaces=false --install-strategy=nested
npm run dev
```

Open `http://localhost:5174/`. Each row shows the stored Stencil playground baseline card, the landed Mitosis Lit `p-*` custom element, then the four framework emits. Lit uses the same demo props and children as React/Vue/Angular/Svelte, so it is the fair same-fixture base. Overlay/dialog tags stay off the page (banner, modal, flyout, sheet, toast, popover, drilldown, canvas, carousel, select).

Each emit cell mounts into a shadow root. Generated `cssText()` injects a `<style>` tag with unscoped `button` / `img` / `h2` / `.root` rules that were written for shadow DOM; without isolation those rules restyle the page (including baseline screenshots). Static `:host` blocks still compile to `.mh-<tag>` on the shadow host.

Angular cells render the generated class plus template. Vite cannot JIT Angular 22 standalone components in this host. Baselines are the full playground variant matrix, so they will not pixel-match a single emit instance.
