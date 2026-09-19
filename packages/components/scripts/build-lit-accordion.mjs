import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/accordion');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-accordion.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Accordion.ts'),
  resolve(mitosisDir, 'output/lit/Accordion.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-accordion: generated Accordion.ts not found');
  process.exit(1);
}

const renderTemplate = `return html\`<details ?open=\${!!this.isOpenFlag}><summary @click=\${this.onSummaryClick}>\${this.summaryNode}</summary>\${this.beforeNode}\${this.afterNode}<div><slot></slot></div></details>\`;`;

const extraGetters = `  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
  applyHostStyle() {
    const vars = this.hostStyle;
    if (!vars) return;
    for (const name of Object.keys(vars)) {
      const value = vars[name];
      if (value == null || value === "") this.style.removeProperty(name);
      else this.style.setProperty(name, String(value));
    }
  }
  syncHostStateAttrs() {
    const sync = (name, on) => {
      if (on) this.setAttribute(name, "");
      else this.removeAttribute(name);
    };
    sync("data-before", this.hasSummaryBefore);
    sync("data-after", this.hasSummaryAfter);
    sync("data-summary", this.hasSummarySlot);
  }
  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this.syncHostStateAttrs();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true });
    queueMicrotask(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
  }
  updated() {
    this.syncHostStateAttrs();
    this.applyHostStyle();
  }
  onSummaryClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }
  get summaryNode() {
    if (this.hasSummarySlot) return html\`<slot name="summary"></slot>\`;
    const heading = this.headingText;
    const tag = this.headingTagValue;
    const body = heading ? heading : html\`<slot name="heading"></slot>\`;
    if (tag === "h1") return html\`<h1>\${body}</h1>\`;
    if (tag === "h3") return html\`<h3>\${body}</h3>\`;
    if (tag === "h4") return html\`<h4>\${body}</h4>\`;
    if (tag === "h5") return html\`<h5>\${body}</h5>\`;
    if (tag === "h6") return html\`<h6>\${body}</h6>\`;
    return html\`<h2>\${body}</h2>\`;
  }
  get beforeNode() {
    return this.hasSummaryBefore ? html\`<slot name="summary-before"></slot>\` : nothing;
  }
  get afterNode() {
    return this.hasSummaryAfter ? html\`<slot name="summary-after"></slot>\` : nothing;
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
  .replace(/@property\(\)\s+alignMarker/g, '@property({ attribute: "align-marker" }) alignMarker')
  .replace(/@property\(\)\s+headingTag/g, '@property({ attribute: "heading-tag" }) headingTag')
  .replaceAll('isTrue(this.open)', 'isTrue(this.getAttribute("open") ?? this.open)')
  .replaceAll('isTrue(this.compact)', 'isTrue(this.getAttribute("compact") ?? this.compact)')
  .replaceAll('isTrue(this.sticky)', 'isTrue(this.getAttribute("sticky") ?? this.sticky)')
  .replaceAll(
    'const align = this.alignMarker || "end";',
    'const align = (this.getAttribute("align-marker") ?? this.alignMarker) || "end";'
  )
  .replaceAll(
    'const background = this.background || "none";',
    'const background = (this.getAttribute("background") ?? this.background) || "none";'
  )
  .replaceAll('parse(this.indent, false)', 'parse(this.getAttribute("indent") ?? this.indent, false)')
  .replaceAll('parse(this.size, "small")', 'parse(this.getAttribute("size") ?? this.size, "small")')
  .replaceAll(
    'return this.heading || "";',
    'return (this.getAttribute("heading") ?? this.heading) || "";'
  )
  .replaceAll(
    'return this.headingTag || "h2";',
    'return (this.getAttribute("heading-tag") ?? this.headingTag) || "h2";'
  )
  .replaceAll(
    'return this.open === true || this.open === "true" || this.open === "";',
    'const open = this.getAttribute("open") ?? this.open;\n      return open === true || open === "true" || open === "";'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (!after.includes('align-marker')) {
  after = after.replace(
    'export default class LitAccordion extends LitElement {',
    `export default class LitAccordion extends LitElement {
  @property() open: any;
  @property({ attribute: "align-marker" }) alignMarker: any;
  @property() background: any;
  @property() compact: any;
  @property() indent: any;
  @property() sticky: any;
  @property() size: any;
  @property() heading: any;
  @property({ attribute: "heading-tag" }) headingTag: any;`
  );
}

after = after.replace('  render() {', extraGetters);

after = after.replace(
  /get hasSummaryBefore\(\) \{\s*return false;\s*\}/,
  `get hasSummaryBefore() {
    return !!this.querySelector('[slot="summary-before"]');
  }`
);
after = after.replace(
  /get hasSummaryAfter\(\) \{\s*return false;\s*\}/,
  `get hasSummaryAfter() {
    return !!this.querySelector('[slot="summary-after"]');
  }`
);
after = after.replace(
  /get hasSummarySlot\(\) \{\s*return false;\s*\}/,
  `get hasSummarySlot() {
    return !!this.querySelector('[slot="summary"]');
  }`
);

if (after.includes('my-fragment')) {
  console.error('build-lit-accordion: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-accordion")')) {
  console.error('build-lit-accordion: expected @customElement("p-accordion")');
  process.exit(1);
}

const required = [
  '<details',
  '<summary',
  'slot name="summary"',
  'slot name="heading"',
  'slot name="summary-before"',
  'slot name="summary-after"',
  'align-marker',
  'heading-tag',
  'querySelector',
  'slotchange',
  'delegatesFocus',
  '1300',
  'preventDefault',
  'static styles',
  'hostStyle',
  'applyHostStyle',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-accordion: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('<style') || after.includes('.innerHTML') || after.includes('get cssText')) {
  console.error('build-lit-accordion: injected style must be gone');
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-accordion', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-accordion: ${err.message}`);
  process.exit(1);
}
if (after.includes('lit-accordion') || after.includes('lit-heading') || after.includes('lit-checkbox')) {
  console.error('build-lit-accordion: generated output must use p-* tags, not lit-*');
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
