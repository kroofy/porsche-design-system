import './frame.css';
import { DEMO_BY_TAG, type DemoNode, readParams, type Target, type Variant } from './demos';

export type RootNode = Extract<DemoNode, { c: string }>;
export type Renderer = { render: (mount: HTMLElement, root: RootNode) => Promise<void> };

declare global {
  interface Window {
    __frameErrors: string[];
  }
}

const loaders: Record<Target, () => Promise<Renderer>> = {
  react: () => import('./targets/react'),
  vue: () => import('./targets/vue'),
  svelte: () => import('./targets/svelte'),
  angular: () => import('./targets/angular'),
  lit: () => import('./targets/lit'),
  upstream: () => import('./targets/upstream'),
};

window.__frameErrors = [];
const recordError = (message: string) => window.__frameErrors.push(message);
window.addEventListener('error', (event) => recordError(event.message));
window.addEventListener('unhandledrejection', (event) => recordError(String(event.reason?.message ?? event.reason)));

const params = readParams();
const html = document.documentElement;
html.classList.add(params.theme === 'dark' ? 'scheme-dark' : 'scheme-light');
html.dataset.target = params.target;
html.dataset.tag = params.tag;

const postHeights = () => {
  const rows = [...document.querySelectorAll<HTMLElement>('.variant')].map((row) => {
    const prev = row.style.minHeight;
    row.style.minHeight = '';
    const height = row.getBoundingClientRect().height;
    row.style.minHeight = prev;
    return Math.ceil(height);
  });
  parent.postMessage({ type: 'pds-frame-rows', target: params.target, rows }, '*');
};

const postSize = () => parent.postMessage({ type: 'pds-frame-size', target: params.target, height: Math.ceil(document.documentElement.scrollHeight) }, '*');

window.addEventListener('message', (event) => {
  if (event.data?.type !== 'pds-frame-min-rows') return;
  const rows: number[] = event.data.rows;
  document.querySelectorAll<HTMLElement>('.variant').forEach((row, i) => {
    row.style.minHeight = rows[i] ? `${rows[i]}px` : '';
  });
  requestAnimationFrame(postSize);
});

const settle = async () => {
  await document.fonts.ready;
  const loaded = (image: HTMLImageElement) =>
    image.complete ? null : new Promise((done) => image.addEventListener('load', done, { once: true }));
  // Hidden `loading="lazy"` images never fire load; cap the wait.
  await Promise.race([Promise.all([...document.images].map(loaded)), new Promise((done) => setTimeout(done, 3000))]);
  await new Promise((done) => setTimeout(done, 300));
};

const main = async () => {
  const app = document.getElementById('frame') as HTMLElement;
  const demo = DEMO_BY_TAG.get(params.tag);
  if (!demo) {
    app.textContent = `unknown tag ${params.tag}`;
    html.dataset.ready = 'true';
    return;
  }
  if (demo.stage) html.dataset.stage = '';
  const variants: Variant[] = demo.stage
    ? [demo.variants.find((variant) => variant.name === params.variant) ?? demo.variants[0]]
    : demo.variants;

  const renderer = await loaders[params.target]();
  for (const variant of variants) {
    const section = document.createElement('section');
    section.className = 'variant';
    section.dataset.variant = variant.name;
    const label = document.createElement('h3');
    label.className = 'variant-label';
    label.textContent = variant.name;
    const mount = document.createElement('div');
    mount.className = 'variant-mount';
    section.append(label, mount);
    app.append(section);
    try {
      await renderer.render(mount, { c: demo.tag, props: variant.props, children: variant.children });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      recordError(`${variant.name}: ${message}`);
      section.dataset.error = message;
      const pre = document.createElement('pre');
      pre.className = 'variant-error';
      pre.textContent = `${params.target} render failed: ${message}`;
      mount.replaceChildren(pre);
    }
  }

  await settle();
  html.dataset.ready = 'true';
  postHeights();
  postSize();
  new ResizeObserver(() => {
    postHeights();
    postSize();
  }).observe(app);
};

main().catch((error) => {
  recordError(String(error?.stack ?? error));
  html.dataset.ready = 'true';
});
