import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

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

const renderTemplate = `return html\`<div class="root"><span class="prev" @click=\${this.scrollPrev}></span><span class="next" @click=\${this.scrollNext}></span><div class="scroll" tabindex=\${this.prevVis || this.nextVis ? 0 : nothing}><span class="sentinel"></span><slot></slot><span class="sentinel"></span></div></div>\`;`;

const extraGetters = `  prevVis = false;
  nextVis = false;
  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
  }
  updated() {
    this.applyHostStyle();
  }
  get fadeStyle() {
    const visRule = (visible, isPrev) => {
      const prefix = isPrev ? "--p-scr-prev" : "--p-scr-next";
      const hiddenTf = isPrev
        ? "translate3d(calc(-1 * var(--p-spacing-static-sm)), 0, 0)"
        : "translate3d(var(--p-spacing-static-sm), 0, 0)";
      return {
        [prefix + "-op"]: visible ? "1" : "0",
        [prefix + "-vis"]: visible ? "inherit" : "hidden",
        [prefix + "-tf"]: visible ? "translate3d(0, 0, 0)" : hiddenTf,
        [prefix + "-delay"]: visible ? "0s" : "var(--p-transition-duration, var(--p-duration-sm))",
      };
    };
    return { ...visRule(!!this.prevVis, true), ...visRule(!!this.nextVis, false) };
  }
  applyHostStyle() {
    const isTrue = (v) => v === true || v === "true" || v === "";
    const vars = { ...this.hostStyle, ...this.fadeStyle };
    for (const name of Object.keys(vars)) {
      const value = vars[name];
      if (value == null || value === "") this.style.removeProperty(name);
      else this.style.setProperty(name, String(value));
    }
    const fade = !this.prevVis && !this.nextVis ? "none" : !this.prevVis ? "right" : !this.nextVis ? "left" : "both";
    if (fade === "none") this.removeAttribute("data-fade");
    else this.setAttribute("data-fade", fade);
    this.toggleAttribute("data-bar", isTrue(this.getAttribute("scrollbar") ?? this.scrollbar));
    this.toggleAttribute("data-compact", isTrue(this.getAttribute("compact") ?? this.compact));
    this.toggleAttribute("data-sticky", isTrue(this.getAttribute("sticky") ?? this.sticky));
  }
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
  'data-fade',
  '--p-scr-prev-op',
  'applyHostStyle',
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
try {
  assertLitIdiom(after, { tag: 'p-scroller', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-scroller: ${err.message}`);
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
