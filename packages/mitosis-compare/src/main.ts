import './styles.css';
import { DEMOS, OVERLAY_TAGS, baselineSrc } from './catalog';
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
        Each row shows the stored Stencil playground <strong>baseline</strong> card next to the
        generated <code>react</code>, <code>vue</code>, <code>angular</code>, and
        <code>svelte</code> files from <code>packages/components/mitosis/*/output/frameworks</code>.
        Each emit cell is a shadow root so runtime <code>cssText</code> cannot restyle the grid
        or the baseline images. Baselines are the full playground variant matrix (dsf 2), not a
        single instance — so they will not pixel-match the emit cells. Overlay / dialog tags are
        omitted: ${skipped}. Angular cells render the generated class plus template (Vite cannot
        JIT Angular 22 here).
      </p>
    </header>
    <div class="compare-grid" role="table" aria-label="Framework comparison"></div>
  `;

  const grid = app.querySelector('.compare-grid');
  if (!grid) throw new Error('.compare-grid missing');
  const cells = [
    ...['Tag', 'Baseline', 'React', 'Vue', 'Angular', 'Svelte'].map((label) => {
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

Promise.allSettled([mountReact(), mountVue(), mountAngular(), mountSvelte()]).then((results) => {
  results.forEach((result, i) => {
    if (result.status === 'rejected') {
      console.error(['react', 'vue', 'angular', 'svelte'][i], result.reason);
    }
  });
  document.documentElement.dataset.ready = 'true';
});
