import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/drilldown-link');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-drilldown-link.iife.js');

const env = {
  ...process.env,
  NODE_PATH: [probeNodeModules, resolve(componentsRoot, '../../node_modules')].join(':'),
};

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/DrilldownLink.ts'),
  resolve(mitosisDir, 'output/lit/DrilldownLink.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-drilldown-link: generated DrilldownLink.ts not found');
  process.exit(1);
}

const extraMethods = `  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("slotchange", () => this.requestUpdate());
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
  }

  get hrefValue() {
    const raw = this.href;
    if (raw !== nothing && raw !== undefined && raw !== null && raw !== "undefined") return raw;
    if (this.hasAttribute("href")) {
      const attr = this.getAttribute("href");
      if (attr !== "undefined") return attr;
    }
    return nothing;
  }

  get hasHrefFlag() {
    const href = this.hrefValue;
    return href !== nothing && href !== undefined && href !== null;
  }

  get isActiveFlag() {
    const raw = this.active ?? this.getAttribute("active");
    return raw === true || raw === "true" || raw === "";
  }

  get ariaAttrs() {
    const raw = this.aria ?? this.getAttribute("aria");
    if (raw && typeof raw === "object") return raw;
    if (typeof raw === "string" && raw.charAt(0) === "{") {
      try {
        return JSON.parse(raw.replace(/'/g, '"'));
      } catch (e) {
        return {};
      }
    }
    return {};
  }

  render() {
    const href = this.hrefValue;
    const hasHref = href !== nothing && href !== undefined && href !== null;
    const target = this.target ?? this.getAttribute("target") ?? "_self";
    const download = this.download ?? this.getAttribute("download");
    const rel = this.rel ?? this.getAttribute("rel");
    const downloadAttr = (download !== nothing && download !== undefined && download !== null && download !== "undefined") ? download : nothing;
    const relAttr = (rel !== nothing && rel !== undefined && rel !== null && rel !== "undefined") ? rel : nothing;
    const ariaLabel = this.ariaAttrs["aria-label"] || nothing;
    if (hasHref) {
      return html\`<a href=\${href} target=\${target} download=\${downloadAttr} rel=\${relAttr} aria-current=\${this.isActiveFlag ? "true" : "false"} aria-label=\${ariaLabel}><slot></slot></a>\`;
    }
    return html\`<slot></slot>\`;
  }
}`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  );

after = after.replace(
  'const isActive = isTrue(this.active);',
  'const isActive = isTrue(this.active ?? this.getAttribute("active"));'
);

const propsToEnsure = ['href', 'active', 'target', 'download', 'rel', 'aria'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitDrilldownLink extends LitElement {',
      `export default class LitDrilldownLink extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace(/  render\(\) \{[\s\S]*?\n  \}\n\}/, extraMethods);

if (after.includes('my-fragment')) {
  console.error('build-lit-drilldown-link: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-drilldown-link")')) {
  console.error('build-lit-drilldown-link: expected @customElement("p-drilldown-link")');
  process.exit(1);
}
if (/\bclass="root"/.test(after) || after.includes("class='root'")) {
  console.error('build-lit-drilldown-link: dummy .root must not wrap the shadow tree');
  process.exit(1);
}
if (after.includes('href="undefined"') || after.includes("href='undefined'")) {
  console.error('build-lit-drilldown-link: omit href so it does not become undefined');
  process.exit(1);
}
if (after.includes('delegatesFocus')) {
  console.error('build-lit-drilldown-link: do not fake delegatesFocus');
  process.exit(1);
}

const required = [
  'display: grid',
  '<slot></slot>',
  'href !== nothing',
  'hasHrefFlag',
  'MutationObserver',
  'queueMicrotask',
  'static styles',
  'hostStyle',
  'applyHostStyle',
  '::slotted(a)',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-drilldown-link: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('lit-drilldown-link') || after.includes('formAssociated')) {
  console.error('build-lit-drilldown-link: generated output must stay p-drilldown-link');
  process.exit(1);
}
if (after.includes('<style') || after.includes('.innerHTML') || after.includes('get cssText')) {
  console.error('build-lit-drilldown-link: injected style must be gone');
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-drilldown-link', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-drilldown-link: ${err.message}`);
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
