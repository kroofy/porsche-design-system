import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/canvas');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-canvas.iife.js');

const env = {
  ...process.env,
  NODE_PATH: [probeNodeModules, resolve(componentsRoot, '../../node_modules')].join(':'),
};

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Canvas.ts'),
  resolve(mitosisDir, 'output/lit/Canvas.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-canvas: generated Canvas.ts not found');
  process.exit(1);
}

const extraMethods = `  applyHostStyle() {
    const vars = this.hostStyle;
    if (!vars) return;
    for (const name of Object.keys(vars)) {
      const value = vars[name];
      if (value == null || value === "") this.style.removeProperty(name);
      else this.style.setProperty(name, String(value));
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
  }

  updated() {
    this.applyHostStyle();
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }

  _isTrue(v) {
    return v === true || v === "true" || v === "";
  }

  _startOpen() {
    return this._isTrue(this.sidebarStartOpen ?? this.getAttribute("sidebar-start-open") ?? this.getAttribute("sidebarstartopen"));
  }

  _endOpen() {
    return this._isTrue(this.sidebarEndOpen ?? this.getAttribute("sidebar-end-open") ?? this.getAttribute("sidebarendopen"));
  }

  _toggleStart() {
    this.dispatchEvent(new CustomEvent("sidebarStartUpdate", { bubbles: false, detail: { open: !this._startOpen() } }));
  }

  _dismissEnd() {
    this.dispatchEvent(new CustomEvent("sidebarEndDismiss", { bubbles: false }));
  }

  render() {
    const startOpen = this._startOpen();
    const endOpen = this._endOpen();
    const hasTitle = !!this.querySelector(':scope > [slot="title"]');
    const hasSidebarEnd = !!this.querySelector(':scope > [slot="sidebar-end"]');
    const hasFooter = !!this.querySelector(':scope > [slot="footer"]');
    const hasBackground = !!this.querySelector(':scope > [slot="background"]');
    const headerToggle = startOpen
      ? nothing
      : html\`<p-button icon="sidebar" icon-source="http://localhost:3001/icons/sidebar.8e43896.svg" variant="secondary" compact="true" hide-label="true" aria='{"aria-expanded":false}' @click=\${() => this._toggleStart()}>Open navigation sidebar</p-button>\`;
    const titleNode = hasTitle ? html\`<h2><slot name="title"></slot></h2>\` : nothing;
    const sidebarEndNode = hasSidebarEnd
      ? html\`<aside class="sidebar sidebar--end" ?inert=\${!endOpen} aria-label=\${endOpen ? "Settings sidebar open" : "Settings sidebar closed"} tabindex="-1"><div class="sidebar__header sidebar__header--end"><slot name="sidebar-end-header"></slot><p-button icon="close" icon-source="http://localhost:3001/icons/close.eec3c5d.svg" variant="secondary" compact="true" hide-label="true" aria=\${endOpen ? '{"aria-expanded":true}' : '{"aria-expanded":false}'} @click=\${() => this._dismissEnd()}>\${endOpen ? "Close" : "Open"} settings sidebar</p-button></div><slot name="sidebar-end"></slot></aside>\`
      : nothing;
    const footerNode = hasFooter ? html\`<footer class="footer"><slot name="footer"></slot></footer>\` : nothing;
    const backgroundNode = hasBackground ? html\`<slot name="background"></slot>\` : nothing;
    return html\`<div class="root"><header class="header" tabindex="-1"><div class="blur"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div class="header__area header__area--start">\${headerToggle}<slot name="header-start"></slot></div><p-crest class="header__crest"></p-crest><p-wordmark class="header__wordmark" size="inherit"></p-wordmark><div class="header__area header__area--end"><slot name="header-end"></slot></div></header><aside class="sidebar sidebar--start" ?inert=\${!startOpen} aria-label=\${startOpen ? "Navigation sidebar open" : "Navigation sidebar closed"} tabindex="-1"><div class="sidebar__header sidebar__header--start"><p-button icon="sidebar" icon-source="http://localhost:3001/icons/sidebar.8e43896.svg" variant="secondary" compact="true" hide-label="true" aria=\${startOpen ? '{"aria-expanded":true}' : '{"aria-expanded":false}'} @click=\${() => this._toggleStart()}>\${startOpen ? "Close" : "Open"} navigation sidebar</p-button>\${titleNode}</div><slot name="sidebar-start"></slot></aside><main class="main"><slot></slot></main>\${sidebarEndNode}\${footerNode}\${backgroundNode}</div>\`;
  }
}`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace('import { LitElement, html, css } from "lit";', 'import { LitElement, html, css, nothing } from "lit";')
  .replace(/@property\(\)\s+sidebarStartOpen/g, '@property({ attribute: "sidebar-start-open" }) sidebarStartOpen')
  .replace(/@property\(\)\s+sidebarEndOpen/g, '@property({ attribute: "sidebar-end-open" }) sidebarEndOpen');

after = after.replace(
  'const startOpen = isTrue(this.sidebarStartOpen);',
  'const startOpen = isTrue(this.sidebarStartOpen ?? this.getAttribute("sidebar-start-open") ?? this.getAttribute("sidebarstartopen"));',
);
after = after.replace(
  'const endOpen = isTrue(this.sidebarEndOpen);',
  'const endOpen = isTrue(this.sidebarEndOpen ?? this.getAttribute("sidebar-end-open") ?? this.getAttribute("sidebarendopen"));',
);
after = after.replace(
  'const background = this.background === "surface" ? "surface" : "canvas";',
  'const background = (this.background ?? this.getAttribute("background")) === "surface" ? "surface" : "canvas";',
);
after = after.replace(
  'const isSurface = this.background === "surface";',
  'const isSurface = (this.background ?? this.getAttribute("background")) === "surface";',
);

const propsToEnsure = ['sidebarStartOpen', 'sidebarEndOpen', 'background'];
for (const prop of propsToEnsure) {
  if (!after.includes(` ${prop}`) && !after.includes(`${prop}:`)) {
    after = after.replace(
      'export default class LitCanvas extends LitElement {',
      `export default class LitCanvas extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

after = after.replace(/  render\(\) \{[\s\S]*?\n  \}\n\}/, extraMethods);

if (after.includes('my-fragment')) {
  console.error('build-lit-canvas: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-canvas")')) {
  console.error('build-lit-canvas: expected @customElement("p-canvas")');
  process.exit(1);
}
if ((after.match(/class="root"/g) || []).length !== 1) {
  console.error('build-lit-canvas: expected exactly one Stencil .root');
  process.exit(1);
}
if (after.includes('href="undefined"') || after.includes("href='undefined'")) {
  console.error('build-lit-canvas: omit href so it does not become undefined');
  process.exit(1);
}

const required = [
  'display: block',
  'class="root"',
  'class="header"',
  'sidebar__header--start',
  'sidebar__header--end',
  'slot name="title"',
  'slot name="header-start"',
  'slot name="header-end"',
  'slot name="footer"',
  'slot name="sidebar-start"',
  'slot name="sidebar-end"',
  'slot name="sidebar-end-header"',
  'slot name="background"',
  'min-width: 1000px',
  'max-width: 999px',
  'hide-label="true"',
  'compact="true"',
  'icon-source="http://localhost:3001/icons/sidebar.8e43896.svg"',
  'icon-source="http://localhost:3001/icons/close.eec3c5d.svg"',
  'p-button',
  'p-crest',
  'p-wordmark',
  'MutationObserver',
  'static styles',
  'hostStyle',
  'applyHostStyle',
  '--p-cv-primary',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-canvas: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('<style') || after.includes('.innerHTML') || after.includes('get cssText')) {
  console.error('build-lit-canvas: injected style must be gone');
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-canvas', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-canvas: ${err.message}`);
  process.exit(1);
}
if (after.includes('lit-canvas') || after.includes('delegatesFocus') || after.includes('formAssociated')) {
  console.error('build-lit-canvas: generated output must stay p-canvas');
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
