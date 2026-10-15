import './shell.css';
import { DEMO_BY_TAG, DEMOS, NOTES, TARGET_LABEL, TARGETS, type Target } from './demos';

declare global {
  interface Window {
    __PDS_DEMOS: { tag: string; stage: boolean; variants: string[] }[];
  }
}

window.__PDS_DEMOS = DEMOS.map((demo) => ({ tag: demo.tag, stage: !!demo.stage, variants: demo.variants.map((v) => v.name) }));

type State = { tag: string; targets: Target[]; theme: 'light' | 'dark'; variant?: string; filter: string };

const DEFAULT_TARGETS: Target[] = ['react', 'upstream'];

const readState = (): State => {
  const hash = new URLSearchParams(location.hash.slice(1));
  const targets = (hash.get('targets') ?? DEFAULT_TARGETS.join(','))
    .split(',')
    .filter((target): target is Target => (TARGETS as readonly string[]).includes(target));
  const tag = hash.get('tag') ?? 'button';
  return {
    tag: DEMO_BY_TAG.has(tag) ? tag : 'button',
    targets: targets.length ? targets : DEFAULT_TARGETS,
    theme: hash.get('theme') === 'dark' ? 'dark' : 'light',
    variant: hash.get('variant') ?? undefined,
    filter: '',
  };
};

let state = readState();

const writeHash = () => {
  const hash = new URLSearchParams({ tag: state.tag, targets: state.targets.join(','), theme: state.theme });
  if (state.variant) hash.set('variant', state.variant);
  history.replaceState(null, '', `#${hash}`);
};

export const frameUrl = (target: Target, tag: string, theme: string, variant?: string) => {
  const params = new URLSearchParams({ target, tag, theme });
  if (variant) params.set('variant', variant);
  return `frame.html?${params}`;
};

const app = document.getElementById('app') as HTMLElement;
app.innerHTML = `
  <header class="topbar">
    <div class="brand">
      <strong>PDS Mitosis playground</strong>
      <span>One <code>.lite.tsx</code> per component, compiled to React, Vue, Svelte, Angular and Lit, next to upstream Stencil v4.8.0.</span>
    </div>
    <div class="controls">
      <fieldset class="theme" aria-label="Color scheme">
        <label><input type="radio" name="theme" value="light" /> Light</label>
        <label><input type="radio" name="theme" value="dark" /> Dark</label>
      </fieldset>
      <fieldset class="targets" aria-label="Targets">
        ${TARGETS.map((target) => `<label><input type="checkbox" name="target" value="${target}" /> ${TARGET_LABEL[target]}</label>`).join('')}
        <button type="button" class="all-targets">All</button>
      </fieldset>
    </div>
  </header>
  <div class="layout">
    <nav class="sidebar" aria-label="Components">
      <label class="search"><span class="sr-only">Filter components</span><input type="search" placeholder="Filter components" /></label>
      <div class="nav-groups"></div>
    </nav>
    <main class="main">
      <div class="main-head">
        <h1></h1>
        <div class="variant-picker" role="group" aria-label="Variant"></div>
      </div>
      <p class="note" hidden></p>
      <div class="columns"></div>
    </main>
  </div>
`;

const navGroups = app.querySelector('.nav-groups') as HTMLElement;
const columns = app.querySelector('.columns') as HTMLElement;
const heading = app.querySelector('h1') as HTMLElement;
const variantPicker = app.querySelector('.variant-picker') as HTMLElement;
const search = app.querySelector('.search input') as HTMLInputElement;
const note = app.querySelector('.note') as HTMLElement;

type VerifyRow = { target: Target; tag: string; status: 'ok' | 'empty' | 'error' };
let verify: Map<string, VerifyRow['status']> | undefined;
fetch('verify-report.json')
  .then((response) => (response.ok ? response.json() : null))
  .then((report: { results: VerifyRow[] } | null) => {
    if (!report) return;
    verify = new Map(report.results.map((row) => [`${row.target}:${row.tag}`, row.status]));
    renderMain();
  })
  .catch(() => {});

const BADGE: Record<VerifyRow['status'], string> = { ok: 'renders', empty: 'renders nothing', error: 'render error' };

const renderNav = () => {
  const groups = new Map<string, string[]>();
  for (const demo of DEMOS) {
    if (state.filter && !demo.tag.includes(state.filter)) continue;
    groups.set(demo.group, [...(groups.get(demo.group) ?? []), demo.tag]);
  }
  navGroups.innerHTML = [...groups]
    .map(
      ([group, tags]) => `
      <section>
        <h2>${group}</h2>
        <ul>${tags
          .map(
            (tag) =>
              `<li><a href="#" data-tag="${tag}"${tag === state.tag ? ' aria-current="page"' : ''}>p-${tag}</a></li>`
          )
          .join('')}</ul>
      </section>`
    )
    .join('');
};

let generation = 0;
const rowsByFrame = new Map<Window, number[]>();
let lastMinRows = '';

const renderMain = () => {
  generation += 1;
  rowsByFrame.clear();
  lastMinRows = '';
  const demo = DEMO_BY_TAG.get(state.tag);
  if (!demo) return;
  document.documentElement.classList.toggle('scheme-dark', state.theme === 'dark');
  note.hidden = !NOTES[demo.tag];
  note.textContent = NOTES[demo.tag] ?? '';
  heading.innerHTML = `p-${demo.tag} <small>${demo.stage ? 'overlay · one variant per frame' : `${demo.variants.length} variants`}</small>`;
  const variant = demo.stage ? (demo.variants.find((v) => v.name === state.variant) ?? demo.variants[0]).name : undefined;
  variantPicker.innerHTML = demo.stage
    ? demo.variants
        .map((v) => `<button type="button" data-variant="${v.name}" aria-pressed="${v.name === variant}">${v.name}</button>`)
        .join('')
    : '';
  columns.style.setProperty('--columns', String(state.targets.length));
  columns.innerHTML = state.targets
    .map((target) => {
      const url = frameUrl(target, demo.tag, state.theme, variant);
      const status = verify?.get(`${target}:${demo.tag}`);
      const badge = status ? `<span class="badge" data-status="${status}">${BADGE[status]}</span>` : '';
      return `
        <section class="column" data-target="${target}">
          <header><h2>${TARGET_LABEL[target]} ${badge}</h2><a href="${url}" target="_blank" rel="noopener">open frame ↗</a></header>
          <iframe title="${TARGET_LABEL[target]} p-${demo.tag}" src="${url}" loading="eager" style="height:${demo.stage ? 600 : 400}px"></iframe>
        </section>`;
    })
    .join('');
};

const render = () => {
  writeHash();
  for (const input of app.querySelectorAll<HTMLInputElement>('input[name="theme"]')) input.checked = input.value === state.theme;
  for (const input of app.querySelectorAll<HTMLInputElement>('input[name="target"]')) input.checked = state.targets.includes(input.value as Target);
  renderNav();
  renderMain();
};

window.addEventListener('message', (event) => {
  const frames = [...columns.querySelectorAll('iframe')];
  const frame = frames.find((candidate) => candidate.contentWindow === event.source);
  if (!frame) return;
  if (event.data?.type === 'pds-frame-size') {
    frame.style.height = `${Math.max(120, event.data.height)}px`;
  }
  if (event.data?.type === 'pds-frame-rows') {
    rowsByFrame.set(event.source as Window, event.data.rows);
    const max: number[] = [];
    for (const rows of rowsByFrame.values()) rows.forEach((height, i) => (max[i] = Math.max(max[i] ?? 0, height)));
    const key = max.join(',');
    if (key === lastMinRows) return;
    lastMinRows = key;
    for (const candidate of frames) candidate.contentWindow?.postMessage({ type: 'pds-frame-min-rows', rows: max, generation }, '*');
  }
});

app.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const link = target.closest<HTMLAnchorElement>('a[data-tag]');
  if (link) {
    event.preventDefault();
    state = { ...state, tag: link.dataset.tag as string, variant: undefined };
    render();
    return;
  }
  const variantButton = target.closest<HTMLButtonElement>('button[data-variant]');
  if (variantButton) {
    state = { ...state, variant: variantButton.dataset.variant };
    render();
    return;
  }
  if (target.closest('.all-targets')) {
    state = { ...state, targets: [...TARGETS] };
    render();
  }
});

app.addEventListener('change', (event) => {
  const input = event.target as HTMLInputElement;
  if (input.name === 'theme') state = { ...state, theme: input.value as State['theme'] };
  if (input.name === 'target') {
    const targets = TARGETS.filter((target) =>
      target === input.value ? input.checked : state.targets.includes(target)
    );
    state = { ...state, targets: targets.length ? targets : DEFAULT_TARGETS };
  }
  render();
});

search.addEventListener('input', () => {
  state = { ...state, filter: search.value.trim().toLowerCase() };
  renderNav();
});

window.addEventListener('hashchange', () => {
  state = { ...readState(), filter: state.filter };
  render();
});

render();
