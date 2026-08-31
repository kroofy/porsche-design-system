import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/optgroup');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-optgroup.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Optgroup.ts'),
  resolve(mitosisDir, 'output/lit/Optgroup.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-optgroup: generated Optgroup.ts not found');
  process.exit(1);
}

const extraGetters = `  syncOptionsDisabled() {
    const disabled = !!this.isDisabled;
    for (const child of this.children) {
      child.disabledParent = disabled;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => {
      this.syncOptionsDisabled();
      this.requestUpdate();
    });
    this._childObserver.observe(this, { childList: true, characterData: true, subtree: true });
    queueMicrotask(() => {
      this.syncOptionsDisabled();
      this.requestUpdate();
    });
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this.syncOptionsDisabled();
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent("internalOptgroupUpdate", { bubbles: true }));
      });
    });
    this.syncOptionsDisabled();
  }
  updated() {
    this.syncOptionsDisabled();
  }

  render() {`;

const renderTemplate = `const disabled = !!this.isDisabled;
    const hidden = !!this.hasAttribute("hidden") || this.hidden === true;
    return html\`<div role="group" aria-labelledby="label" aria-disabled=\${disabled ? "true" : nothing} aria-hidden=\${hidden ? "true" : nothing}><style .innerHTML="\${this.cssText}"></style><span id="label" role="presentation">\${this.labelText}</span><slot></slot></div>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(
    'const disabled = isTrue(this.disabled);',
    'const disabled = isTrue(this.disabled ?? this.getAttribute("disabled"));'
  )
  .replaceAll('return this.label || "";', 'return this.getAttribute("label") ?? this.label ?? "";')
  .replace(
    /this\.disabled === true \|\| this\.disabled === "true" \|\| this\.disabled === ""/,
    '(this.disabled ?? this.getAttribute("disabled")) === true || (this.disabled ?? this.getAttribute("disabled")) === "true" || (this.disabled ?? this.getAttribute("disabled")) === ""'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

const propsToEnsure = ['label', 'disabled'];
for (const prop of propsToEnsure) {
  const needle = `@property() ${prop}`;
  if (!after.includes(needle) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitOptgroup extends LitElement {',
      `export default class LitOptgroup extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace('  render() {', extraGetters);

if (after.includes('my-fragment')) {
  console.error('build-lit-optgroup: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-optgroup")')) {
  console.error('build-lit-optgroup: expected @customElement("p-optgroup")');
  process.exit(1);
}

const required = [
  'role="group"',
  'role="presentation"',
  'disabledParent',
  'slotchange',
  'internalOptgroupUpdate',
  '--_p-select-option-b',
  '--_p-optgroup-a',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-optgroup: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (
  after.includes('lit-optgroup') ||
  after.includes('delegatesFocus') ||
  after.includes('formAssociated')
) {
  console.error('build-lit-optgroup: generated output must stay p-* and not fake delegatesFocus/formAssociated');
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
