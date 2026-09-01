import './styles.css';
import { DEMOS, OVERLAY_TAGS, baselineSrc } from './catalog';
import { mountLit } from './lit/mount';
import { mountReact } from './react/mount';
import { mountVue } from './vue/mount';
import { mountSvelte } from './svelte/mount';
import { mountAngular } from './angular/mount';

const FRAMEWORKS = ['lit', 'react', 'vue', 'angular', 'svelte'] as const;

function renderShell() {
  const app = document.getElementById('app');
  if (!app) throw new Error('#app missing');

  const skipped = OVERLAY_TAGS.join(', ');
  app.innerHTML = `
    <header class="page-header">
      <p class="eyebrow">Mitosis emit</p>
      <h1>Framework output comparison</h1>
      <p class="lede">
        Each row shows the stored Stencil playground <strong>baseline</strong> card, then the
        landed Mitosis <strong>Lit</strong> <code>p-*</code> custom element, then the generated
        <code>react</code>, <code>vue</code>, <code>angular</code>, and <code>svelte</code> files.
        Lit uses the same demo props and children as the framework columns, so it is the fair
        same-instance base for emit — not the 1:1 playground card. The Stencil
        <strong>baseline</strong> card is still byte-equal to the Lit playground screenshot
        (rechecked: crest/heading/button/wordmark pixel-diff 0). Overlay / dialog tags are
        omitted: ${skipped}. Angular cells render the generated class plus template (Vite cannot
        JIT Angular 22 here).
      </p>
    </header>
    <div class="compare-grid" role="table" aria-label="Framework comparison"></div>
  `;

  const grid = app.querySelector('.compare-grid');
  if (!grid) throw new Error('.compare-grid missing');
  const cells = [
    ...['Tag', 'Baseline', 'Lit', 'React', 'Vue', 'Angular', 'Svelte'].map((label) => {
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
      const baseline = document.createElement('div');
      baseline.className = 'cell baseline-cell';
      baseline.setAttribute('role', 'cell');
      const img = document.createElement('img');
      img.src = baselineSrc(demo.tag);
      img.alt = `${demo.tag} Stencil playground baseline`;
      img.loading = 'eager';
      img.onerror = () => {
        baseline.textContent = `no baseline ${demo.tag}`;
      };
      baseline.append(img);
      const frameworkCells = FRAMEWORKS.map((fw) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.cell = `${fw}:${demo.tag}`;
        cell.setAttribute('role', 'cell');
        return cell;
      });
      return [tag, baseline, ...frameworkCells];
    }),
  ];
  grid.append(...cells);
}

renderShell();

Promise.allSettled([mountLit(), mountReact(), mountVue(), mountAngular(), mountSvelte()]).then((results) => {
  results.forEach((result, i) => {
    if (result.status === 'rejected') {
      console.error(['lit', 'react', 'vue', 'angular', 'svelte'][i], result.reason);
    }
  });
  document.documentElement.dataset.ready = 'true';
});
