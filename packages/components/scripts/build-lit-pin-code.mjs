import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/pin-code');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-pin-code.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/PinCode.ts'),
  resolve(mitosisDir, 'output/lit/PinCode.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-pin-code: generated PinCode.ts not found');
  process.exit(1);
}

const renderTemplate = `return html\`<fieldset class="root" ?disabled=\${!!this.isDisabled} aria-invalid=\${this.ariaInvalid || nothing} aria-labelledby=\${this.labelText ? "label" : nothing}>\${this.labelNode}<div class="wrapper" dir="ltr">\${this.inputNodes}\${this.spinnerNode}</div>\${this.messageNode}<span class="loading" id="loading" role="status">\${this.loadingText}</span></fieldset>\`;`;

const extraGetters = `  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
  get labelNode() {
    if (!this.labelText) return nothing;
    return html\`<div class="label-wrapper"><label class="label" id="label" for="current-input" aria-disabled=\${this.isDisabled || this.isLoading ? "true" : nothing}>\${this.labelText}</label><slot name="label-after"></slot></div>\`;
  }
  get inputNodes() {
    const n = Number(this.pinLength) || 4;
    const value = this.parsedValue;
    const type = this.inputType;
    const nodes = [];
    for (let i = 0; i < n; i++) {
      const isCurrent = !value ? i === 0 : value.indexOf(" ") === -1 ? i === n - 1 : i === value.indexOf(" ");
      const ch = value[i] && value[i] !== " " ? value[i] : "";
      nodes.push(html\`<input id=\${isCurrent ? "current-input" : nothing} type=\${type} aria-label=\${i + 1 + "-" + n} aria-invalid=\${this.ariaInvalid || nothing} aria-disabled=\${this.isLoading ? "true" : nothing} autocomplete="one-time-code" pattern="\\\\d*" inputmode="numeric" .value=\${ch} ?disabled=\${!!this.isDisabled}>\`);
    }
    return nodes;
  }
  get spinnerNode() {
    if (!this.isLoading) return nothing;
    return html\`<p-spinner class="spinner" size="inherit" aria-hidden="true"></p-spinner>\`;
  }
  get messageNode() {
    const text = this.messageText;
    const icon = this.iconName;
    if (!text) return html\`<span id="message" class="message" role="alert"></span>\`;
    const src =
      icon === "exclamation"
        ? "http://localhost:3001/icons/exclamation.46cd17b.svg"
        : "http://localhost:3001/icons/check.8ba06be.svg";
    return html\`<span id="message" class="message" role=\${this.messageRole}><p-icon name=\${icon} source=\${src} color=\${this.iconColor} aria-hidden="true"></p-icon>\${text}</span>\`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
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

  render() {`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+hideLabel/g, '@property({ attribute: "hide-label" }) hideLabel')
  .replace(/@property\(\)\s+length/g, '@property({ attribute: "length" }) length')
  .replace(/@property\(\)\s+loading/g, '@property({ attribute: "loading" }) loading')
  .replaceAll('isTrue(this.disabled)', 'isTrue(this.getAttribute("disabled") ?? this.disabled)')
  .replaceAll('isTrue(this.loading)', 'isTrue(this.getAttribute("loading") ?? this.loading)')
  .replaceAll('isTrue(this.compact)', 'isTrue(this.getAttribute("compact") ?? this.compact)')
  .replaceAll('isTrue(this.required)', 'isTrue(this.getAttribute("required") ?? this.required)')
  .replaceAll('parse(this.hideLabel, false)', 'parse(this.getAttribute("hide-label") ?? this.hideLabel, false)')
  .replaceAll('Number(this.length)', 'Number(this.getAttribute("length") ?? this.length)')
  .replaceAll('this.state ===', '(this.getAttribute("state") ?? this.state) ===')
  .replaceAll('this.state ||', '(this.getAttribute("state") ?? this.state) ||')
  .replaceAll('this.message ||', '(this.getAttribute("message") ?? this.message) ||')
  .replaceAll('this.label ||', '(this.getAttribute("label") ?? this.label) ||')
  .replaceAll('this.description ||', '(this.getAttribute("description") ?? this.description) ||')
  .replaceAll('this.value == null', '(this.getAttribute("value") ?? this.value) == null')
  .replaceAll('String(this.value)', 'String(this.getAttribute("value") ?? this.value)')
  .replaceAll('this.type ===', '(this.getAttribute("type") ?? this.type) ===')
  .replaceAll(
    'return this.disabled === true || this.disabled === "true" || this.disabled === "";',
    'const disabled = this.getAttribute("disabled") ?? this.disabled;\n      return disabled === true || disabled === "true" || disabled === "";'
  )
  .replaceAll(
    'return this.loading === true || this.loading === "true" || this.loading === "";',
    'const loading = this.getAttribute("loading") ?? this.loading;\n      return loading === true || loading === "true" || loading === "";'
  )
  .replaceAll(
    'if (this.loading === true || this.loading === "true" || this.loading === "") return "Loading";',
    'const loading = this.getAttribute("loading") ?? this.loading;\n      if (loading === true || loading === "true" || loading === "") return "Loading";'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (!after.includes('hide-label')) {
  after = after.replace(
    'export default class LitPinCode extends LitElement {',
    `export default class LitPinCode extends LitElement {
  @property() label: any;
  @property() description: any;
  @property() message: any;
  @property() state: any;
  @property({ attribute: "hide-label" }) hideLabel: any;
  @property() compact: any;
  @property() disabled: any;
  @property({ attribute: "loading" }) loading: any;
  @property() required: any;
  @property() name: any;
  @property() value: any;
  @property({ attribute: "length" }) length: any;
  @property() type: any;
  @property() form: any;`
  );
}

after = after.replace('  render() {', extraGetters);

if (after.includes('my-fragment')) {
  console.error('build-lit-pin-code: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-pin-code")')) {
  console.error('build-lit-pin-code: expected @customElement("p-pin-code")');
  process.exit(1);
}

const required = [
  'class="root"',
  'class="wrapper"',
  'class="label"',
  'class="message"',
  'class="spinner"',
  'p-spinner',
  'p-icon',
  'hide-label',
  'loading',
  'current-input',
  'exclamation.46cd17b.svg',
  'check.8ba06be.svg',
  'delegatesFocus',
  'inputNodes',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-pin-code: missing ${missing.join(', ')}`);
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-pin-code', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-pin-code: ${err.message}`);
  process.exit(1);
}
if (after.includes('lit-pin-code') || after.includes('lit-icon') || after.includes('lit-spinner')) {
  console.error('build-lit-pin-code: generated output must use p-* tags, not lit-*');
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
