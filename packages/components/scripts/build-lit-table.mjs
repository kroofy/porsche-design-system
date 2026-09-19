import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/table');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-table.iife.js');

const env = {
  ...process.env,
  NODE_PATH: [probeNodeModules, resolve(componentsRoot, '../../node_modules')].join(':'),
};

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Table.ts'),
  resolve(mitosisDir, 'output/lit/Table.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-table: generated Table.ts not found');
  process.exit(1);
}

const extraMethods = `  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("slotchange", () => this.requestUpdate());
    this.shadowRoot?.addEventListener("internalSortingChange", (e) => {
      e.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("update", { bubbles: false, detail: e.detail }),
      );
    });
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
    this.applyHostStyle();
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

  isTrue(v) {
    return v === true || v === "true" || v === "";
  }

  hasSlottedCaption() {
    return !!this.querySelector('[slot="caption"]');
  }

  captionValue() {
    return this.caption ?? this.getAttribute("caption") ?? "";
  }

  isCompact() {
    return this.isTrue(this.compact ?? this.getAttribute("compact"));
  }

  isSticky() {
    return this.isTrue(this.sticky ?? this.getAttribute("sticky"));
  }

  render() {
    const caption = this.captionValue();
    const slotted = this.hasSlottedCaption();
    const captionEl = slotted
      ? html\`<div id="caption" class="caption"><slot name="caption"></slot></div>\`
      : nothing;
    const label = caption && !slotted ? caption : nothing;
    const labelledBy = !caption && slotted ? "caption" : nothing;
    return html\`\${captionEl}<p-scroller scrollbar="true" ?compact=\${this.isCompact()} ?sticky=\${this.isSticky()}><div class="table" role="table" aria-label=\${label} aria-labelledby=\${labelledBy}><slot></slot></div></p-scroller>\`;
  }
}`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replaceAll(
    'const compact = isTrue(this.compact);',
    'const compact = isTrue(this.compact ?? this.getAttribute("compact"));'
  )
  .replaceAll(
    'const layout = this.layout || "auto";',
    'const layout = this.layout ?? this.getAttribute("layout") ?? "auto";'
  )
  .replace('return this.caption || "";', 'return this.caption ?? this.getAttribute("caption") ?? "";');

const propsToEnsure = ['caption', 'compact', 'layout', 'sticky'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitTable extends LitElement {',
      `export default class LitTable extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace(/  render\(\) \{[\s\S]*?\n  \}\n\}/, extraMethods);

if (after.includes('my-fragment')) {
  console.error('build-lit-table: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-table")')) {
  console.error('build-lit-table: expected @customElement("p-table")');
  process.exit(1);
}
if (/\bclass="root"/.test(after) || after.includes("class='root'")) {
  console.error('build-lit-table: dummy .root must be stripped so slotted rows keep table display');
  process.exit(1);
}

const required = [
  'class="table"',
  'role="table"',
  'p-scroller',
  'scrollbar="true"',
  'isCompact',
  'isSticky',
  'hasSlottedCaption',
  'slot name="caption"',
  'MutationObserver',
  'slotchange',
  'queueMicrotask',
  'static styles',
  'hostStyle',
  'applyHostStyle',
  '--_p-table-a',
  '--p-scroller-indicator-top',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-table: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('get cssText') || after.includes('.innerHTML')) {
  console.error('build-lit-table: cssText/innerHTML stylesheet hack is not allowed');
  process.exit(1);
}
if (after.includes('lit-table') || after.includes('delegatesFocus') || after.includes('formAssociated')) {
  console.error('build-lit-table: generated output must stay p-* and not fake delegatesFocus/formAssociated');
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
