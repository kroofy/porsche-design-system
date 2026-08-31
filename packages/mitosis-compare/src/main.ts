import './styles.css';
import { DEMOS, OVERLAY_TAGS } from './catalog';
import { mountReact } from './react/mount';
import { mountVue } from './vue/mount';
import { mountSvelte } from './svelte/mount';
import { mountAngular } from './angular/mount';

const FRAMEWORKS = ['react', 'vue', 'angular', 'svelte'] as const;

function renderShell() {
  const app = document.getElementById('app');
  if (!app) throw new Error('#app missing');

  const skipped = OVERLAY_TAGS.join(', ');
  app.innerHTML = `
    <header class="page-header">
      <p class="eyebrow">Mitosis emit</p>
      <h1>Framework output comparison</h1>
      <p class="lede">
        Each row mounts the generated <code>react</code>, <code>vue</code>, <code>angular</code>, and
        <code>svelte</code> files from <code>packages/components/mitosis/*/output/frameworks</code>
        in one document so the four emits can be compared in place.
        Overlay / dialog tags are omitted: ${skipped}.
        Angular cells render the generated class plus template (Vite cannot JIT Angular 22 here).
      </p>
    </header>
    <div class="compare-grid" role="table" aria-label="Framework comparison"></div>
  `;

  const grid = app.querySelector('.compare-grid');
  if (!grid) throw new Error('.compare-grid missing');
  const cells = [
    ...['Tag', 'React', 'Vue', 'Angular', 'Svelte'].map((label) => {
      const head = document.createElement('div');
      head.className = 'head';
      head.setAttribute('role', 'columnheader');
      head.textContent = label;
      return head;
    }),
    ...DEMOS.flatMap((demo) => {
      const tag = document.createElement('div');
      tag.className = 'tag-cell';
      tag.id = demo.tag;
      tag.setAttribute('role', 'rowheader');
      tag.innerHTML = `<a href="#${demo.tag}">${demo.title}</a>`;
      const frameworkCells = FRAMEWORKS.map((fw) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.cell = `${fw}:${demo.tag}`;
        cell.setAttribute('role', 'cell');
        return cell;
      });
      return [tag, ...frameworkCells];
    }),
  ];
  grid.append(...cells);
}

renderShell();

Promise.allSettled([mountReact(), mountVue(), mountAngular(), mountSvelte()]).then((results) => {
  results.forEach((result, i) => {
    if (result.status === 'rejected') {
      console.error(['react', 'vue', 'angular', 'svelte'][i], result.reason);
    }
  });
  document.documentElement.dataset.ready = 'true';
});
