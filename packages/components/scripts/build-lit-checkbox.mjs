import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/checkbox');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-checkbox.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Checkbox.ts'),
  resolve(mitosisDir, 'output/lit/Checkbox.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-checkbox: generated Checkbox.ts not found');
  process.exit(1);
}

const renderTemplate =
  'return html`<div class="root"><div class="wrapper"><div class="input-wrapper"><input type="checkbox" id="x" .checked=${!!this.isChecked} ?disabled=${!!this.isDisabled} aria-disabled=${this.ariaDisabled || nothing} aria-invalid=${this.ariaInvalid || nothing}><p-spinner class="spinner" aria-hidden="true"></p-spinner></div><div class="label-wrapper"><label class="label" id="label" for="x">${this.labelText}</label></div></div><span class="message" id="message"><p-icon name=${this.iconName || nothing} source=${this.iconSrc || nothing} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>${this.messageText}</span><span class="loading" id="loading" role="status">${this.loadingText}</span></div>`;';

const updatedBlock = `  get iconSrc() {
    const files = {
      check: "check.8ba06be.svg",
      exclamation: "exclamation.46cd17b.svg",
    };
    const name = this.iconName;
    if (files[name]) return "http://localhost:3001/icons/" + files[name];
    return "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
  }

  updated() {
    this.applyHostStyle();
    const input = this.renderRoot?.querySelector("input");
    if (input) {
      const raw = this.indeterminate ?? this.getAttribute("indeterminate");
      input.indeterminate = raw === true || raw === "true" || raw === "";
    }
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

  render() {`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(/@property\(\)\s+hideLabel/g, '@property({ attribute: "hide-label" }) hideLabel')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace('const hideLabel = parse(this.hideLabel, false);', 'const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);')
  .replace('const disabled = isTrue(this.disabled);', 'const disabled = isTrue(this.disabled ?? this.getAttribute("disabled"));')
  .replace('const loading = isTrue(this.loading);', 'const loading = isTrue(this.loading ?? this.getAttribute("loading"));')
  .replace('const compact = isTrue(this.compact);', 'const compact = isTrue(this.compact ?? this.getAttribute("compact"));')
  .replace('const formState = this.state || "none";', 'const formState = this.state ?? this.getAttribute("state") ?? "none";')
  .replace("const message = this.message || '';", 'const message = this.message ?? this.getAttribute("message") ?? "";')
  .replace('const hasLbl = !!(this.label || "");', 'const hasLbl = !!(this.label ?? this.getAttribute("label") ?? "");')
  .replace('@property() checked: any;', '@property() checked: any;\n  @property() indeterminate: any;')
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (after.includes('updated()')) {
  after = after.replace(/  updated\(\) \{[\s\S]*?\n  \}\n\n  render\(\) \{/, updatedBlock);
} else {
  after = after.replace('  render() {', updatedBlock);
}

if (after.includes('my-fragment')) {
  console.error('build-lit-checkbox: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-checkbox")')) {
  console.error('build-lit-checkbox: expected @customElement("p-checkbox")');
  process.exit(1);
}
if (
  !after.includes('class="root"') ||
  !after.includes('class="wrapper"') ||
  !after.includes('class="spinner"') ||
  !after.includes('class="loading"') ||
  !after.includes('.checked=') ||
  !after.includes('input.indeterminate')
) {
  console.error('build-lit-checkbox: expected classes and checked / indeterminate bindings');
  process.exit(1);
}
if (after.includes('lit-checkbox') || after.includes('lit-icon') || after.includes('lit-spinner')) {
  console.error('build-lit-checkbox: generated output must use p-checkbox / p-icon / p-spinner, not lit-*');
  process.exit(1);
}
if (!after.includes('static styles') || !after.includes('hostStyle') || !after.includes('applyHostStyle')) {
  console.error('build-lit-checkbox: expected static styles + hostStyle + applyHostStyle');
  process.exit(1);
}
if (after.includes('get cssText') || after.includes('.innerHTML')) {
  console.error('build-lit-checkbox: cssText/innerHTML stylesheet hack is not allowed');
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
