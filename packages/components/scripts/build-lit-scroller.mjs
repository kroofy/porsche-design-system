import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/scroller');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-scroller.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Scroller.ts'),
  resolve(mitosisDir, 'output/lit/Scroller.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-scroller: generated Scroller.ts not found');
  process.exit(1);
}

const renderTemplate = `return html\`<div class="root"><style .innerHTML="\${this.cssText}"></style><span class="prev" @click=\${this.scrollPrev}></span><span class="next" @click=\${this.scrollNext}></span><div class="scroll" tabindex=\${this.prevVis || this.nextVis ? 0 : nothing}><span class="sentinel"></span><slot></slot><span class="sentinel"></span></div></div>\`;`;

const extraGetters = `  prevVis = false;
  nextVis = false;
  disconnectedCallback() {
    this._io?.disconnect();
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    const scroll = this.renderRoot.querySelector(".scroll");
    const sentinels = [...this.renderRoot.querySelectorAll(".sentinel")];
    this._io = new IntersectionObserver(
      (entries) => {
        let changed = false;
        for (const { target, isIntersecting } of entries) {
          if (target === sentinels[0]) {
            const v = !isIntersecting;
            if (this.prevVis !== v) {
              this.prevVis = v;
              changed = true;
            }
          } else if (target === sentinels[1]) {
            const v = !isIntersecting;
            if (this.nextVis !== v) {
              this.nextVis = v;
              changed = true;
            }
          }
        }
        if (changed) this.requestUpdate();
      },
      { root: scroll, threshold: 0.1 }
    );
    for (const sentinel of sentinels) this._io.observe(sentinel);
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true });
    queueMicrotask(() => this.requestUpdate());
  }
  scrollPrev() {
    const scroll = this.renderRoot?.querySelector(".scroll");
    if (!scroll) return;
    scroll.scrollBy({ left: -scroll.offsetWidth * 0.5, behavior: "smooth" });
  }
  scrollNext() {
    const scroll = this.renderRoot?.querySelector(".scroll");
    if (!scroll) return;
    scroll.scrollBy({ left: scroll.offsetWidth * 0.5, behavior: "smooth" });
  }

  render() {`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replaceAll('let prevVis: any = false;', 'let prevVis: any = this.prevVis;')
  .replaceAll('let nextVis: any = false;', 'let nextVis: any = this.nextVis;')
  .replaceAll(
    'let hasBar: any = this.scrollbar;',
    'let hasBar: any = this.getAttribute("scrollbar") ?? this.scrollbar;'
  )
  .replaceAll(
    'let isCompact: any = this.compact;',
    'let isCompact: any = this.getAttribute("compact") ?? this.compact;'
  )
  .replaceAll(
    'let isSticky: any = this.sticky;',
    'let isSticky: any = this.getAttribute("sticky") ?? this.sticky;'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (!after.includes('@property() scrollbar') && !after.includes('@property() scrollbar:')) {
  after = after.replace(
    'export default class LitScroller extends LitElement {',
    `export default class LitScroller extends LitElement {
  @property() scrollbar: any;
  @property() compact: any;
  @property() sticky: any;`
  );
}

after = after.replace('  render() {', extraGetters);

if (after.includes('my-fragment')) {
  console.error('build-lit-scroller: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-scroller")')) {
  console.error('build-lit-scroller: expected @customElement("p-scroller")');
  process.exit(1);
}

const required = [
  'class="root"',
  'class="prev"',
  'class="next"',
  'class="scroll"',
  'class="sentinel"',
  'IntersectionObserver',
  'scrollPrev',
  'scrollNext',
  'this.prevVis',
  'this.nextVis',
  'threshold: 0.1',
  'MutationObserver',
  '::after',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-scroller: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('lit-scroller') || after.includes('indicator-sticky')) {
  console.error('build-lit-scroller: generated output must use p-scroller and must not map indicator-sticky');
  process.exit(1);
}
if (after !== before) {
  await writeFile(generated, after);
}

const esb = spawnSync(
  esbuildBin,
  [
    generated,
    '--bundle',
    '--format=iife',
    `--tsconfig=${resolve(componentsRoot, 'mitosis/tsconfig.json')}`,
    '--alias:lit/decorators=lit/decorators.js',
    `--outfile=${outfile}`,
  ],
  { cwd: probeNodeModules, env, stdio: 'inherit' }
);
if (esb.status !== 0) process.exit(esb.status ?? 1);
