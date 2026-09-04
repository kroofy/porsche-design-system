import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/tabs');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-tabs.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Tabs.ts'),
  resolve(mitosisDir, 'output/lit/Tabs.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-tabs: generated Tabs.ts not found');
  process.exit(1);
}

const extraGetters = `  tabItems() {
    return [...this.children].filter((el) => el.tagName === "P-TABS-ITEM");
  }

  itemLabel(el) {
    return el.label ?? el.getAttribute("label") ?? "";
  }

  parsedActiveIndex() {
    const raw = this.activeTabIndex ?? this.getAttribute("active-tab-index") ?? this.getAttribute("activetabindex");
    if (raw === undefined || raw === null || raw === "") return 0;
    const n = Number(raw);
    return Number.isInteger(n) ? n : 0;
  }

  parsedSize() {
    return this.getAttribute("size") ?? this.size ?? "small";
  }

  parsedBackground() {
    return this.background ?? this.getAttribute("background") ?? "none";
  }

  parsedCompact() {
    const raw = this.compact ?? this.getAttribute("compact");
    return raw === true || raw === "true" || raw === "";
  }

  parsedAria() {
    let extra = this.aria ?? this.getAttribute("aria");
    if (typeof extra === "string" && extra.charAt(0) === "{") {
      try {
        extra = JSON.parse(extra.replace(/'/g, '"'));
      } catch (e) {
        extra = undefined;
      }
    }
    return extra && typeof extra === "object" ? extra : nothing;
  }

  syncPanels() {
    const items = this.tabItems();
    const active = this.parsedActiveIndex();
    items.forEach((tab, index) => {
      tab.setAttribute("role", "tabpanel");
      tab.setAttribute("aria-label", this.itemLabel(tab));
      if (index === active) {
        tab.removeAttribute("hidden");
        tab.setAttribute("tabindex", "0");
      } else {
        tab.setAttribute("hidden", "");
        tab.removeAttribute("tabindex");
      }
    });
  }

  onBarUpdate = (e) => {
    e.stopPropagation();
    const next = e.detail?.activeTabIndex;
    if (next === undefined || next === null) return;
    this.activeTabIndex = next;
    this.setAttribute("active-tab-index", String(next));
    this.syncPanels();
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent("update", { detail: { activeTabIndex: next }, bubbles: false }));
  };

  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this._childObserver = new MutationObserver(() => {
      this.requestUpdate();
      this.updateComplete.then(() => this.syncPanels());
    });
    this._childObserver.observe(this, { childList: true });
    queueMicrotask(() => {
      this.requestUpdate();
      this.updateComplete.then(() => this.syncPanels());
    });
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    const bar = this.renderRoot?.querySelector("p-tabs-bar");
    bar?.removeEventListener("update", this.onBarUpdate);
    super.disconnectedCallback();
  }
  firstUpdated() {
    const bar = this.renderRoot?.querySelector("p-tabs-bar");
    bar?.addEventListener("update", this.onBarUpdate);
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this.syncPanels();
        this.requestUpdate();
      });
    });
    this.syncPanels();
  }
  applyHostStyle() {
    const vars = this.hostStyle;
    if (!vars) return;
    for (const name of Object.keys(vars)) {
      const value = vars[name];
      if (value == null || value === "") this.style.removeProperty(name);
      else this.style.setProperty(name, String(value));
    }
  }

  updated() {
    this.applyHostStyle();
    this.syncPanels();
  }

  render() {`;

const renderTemplate = `const size = this.parsedSize();
    const background = this.parsedBackground();
    const compact = this.parsedCompact();
    const active = this.parsedActiveIndex();
    const aria = this.parsedAria();
    const labels = this.tabItems().map((el) => this.itemLabel(el));
    return html\`<div class="wrap"><p-tabs-bar class="root" size=\${size} background=\${background} ?compact=\${compact} .activeTabIndex=\${active} .aria=\${aria}>\${labels.map((label) => html\`<button type="button">\${label}</button>\`)}</p-tabs-bar><slot></slot></div>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+activeTabIndex/g, '@property({ attribute: "active-tab-index" }) activeTabIndex')
  .replace(
    'const size = parse(this.size, "small");',
    'const size = parse(this.getAttribute("size") ?? this.size, "small");'
  )
  .replace(
    'return this.size || "small";',
    'return this.getAttribute("size") ?? this.size ?? "small";'
  )
  .replace(
    'return this.background || "none";',
    'return this.background ?? this.getAttribute("background") ?? "none";'
  )
  .replace(
    /this\.compact === true \|\| this\.compact === "true" \|\| this\.compact === ""/,
    '(this.compact ?? this.getAttribute("compact")) === true || (this.compact ?? this.getAttribute("compact")) === "true" || (this.compact ?? this.getAttribute("compact")) === ""'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

const propsToEnsure = [
  ['size', null],
  ['activeTabIndex', 'active-tab-index'],
  ['background', null],
  ['compact', null],
  ['weight', null],
  ['aria', null],
];
for (const [prop, attr] of propsToEnsure) {
  const needle = attr
    ? `@property({ attribute: "${attr}" }) ${prop}`
    : `@property() ${prop}`;
  if (!after.includes(needle) && !after.includes(`@property() ${prop}:`) && !after.includes(`@property() ${prop}`)) {
    after = after.replace(
      'export default class LitTabs extends LitElement {',
      attr
        ? `export default class LitTabs extends LitElement {\n  @property({ attribute: "${attr}" }) ${prop}: any;`
        : `export default class LitTabs extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace('  render() {', extraGetters);

if (after.includes('my-fragment')) {
  console.error('build-lit-tabs: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-tabs")')) {
  console.error('build-lit-tabs: expected @customElement("p-tabs")');
  process.exit(1);
}

const required = [
  'class="wrap"',
  'class="root"',
  'p-tabs-bar',
  'tabItems()',
  'syncPanels',
  'slotchange',
  'MutationObserver',
  'active-tab-index',
  'role", "tabpanel"',
  'P-TABS-ITEM',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-tabs: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('lit-tabs') || after.includes('delegatesFocus') || after.includes('formAssociated')) {
  console.error('build-lit-tabs: generated output must stay p-* and not fake delegatesFocus/formAssociated');
  process.exit(1);
}
if (after.includes('<style') || after.includes('.innerHTML') || after.includes('get cssText')) {
  console.error('build-lit-tabs: injected style must be gone');
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-tabs', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-tabs: ${err.message}`);
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
