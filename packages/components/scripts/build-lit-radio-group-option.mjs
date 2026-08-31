import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/radio-group-option');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-radio-group-option.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/RadioGroupOption.ts'),
  resolve(mitosisDir, 'output/lit/RadioGroupOption.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-radio-group-option: generated RadioGroupOption.ts not found');
  process.exit(1);
}

const extraGetters = `  connectedCallback() {
    super.connectedCallback();
    this._lightDomObserver = new MutationObserver(() => this.requestUpdate());
    this._lightDomObserver.observe(this, { childList: true, characterData: true, subtree: true });
    queueMicrotask(() => this.requestUpdate());
    this.addEventListener("click", (e) => {
      if (this.isDisabled || this.isLoading) return;
      const input = this.renderRoot?.querySelector("input");
      if (!input || e.target === input) return;
      input.focus();
      input.click();
    });
    this.addEventListener("change", (e) => {
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent("internalRadioGroupOptionChange", { bubbles: true, detail: e }));
    });
    this.addEventListener("blur", (e) => {
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent("internalRadioGroupOptionBlur", { bubbles: true }));
    });
  }
  disconnectedCallback() {
    this._lightDomObserver?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
    const input = this.renderRoot?.querySelector("input");
    input?.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  render() {`;

const renderTemplate = `return html\`<div class="root"><style .innerHTML="\${this.cssText}"></style><div class="wrapper"><input id="radio-group-option" type="radio" name=\${this.inputName || nothing} value=\${this.inputValue} .checked=\${!!this.isSelected} ?disabled=\${!!this.isDisabled || !!this.isLoading} aria-invalid=\${this.ariaInvalid || nothing} aria-disabled=\${this.isDisabled || this.isLoading ? "true" : nothing} aria-describedby=\${this.isLoading ? "loading" : nothing}>\${this.spinnerNode}</div>\${this.labelNode}\${this.loadingNode}</div>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+disabledParent/g, '@property({ attribute: "disabled-parent" }) disabledParent')
  .replace(/@property\(\)\s+loadingParent/g, '@property({ attribute: "loading-parent" }) loadingParent')
  .replace(
    'const disabled = isTrue(this.disabled) || isTrue(this.disabledParent);',
    'const disabled = isTrue(this.disabled ?? this.getAttribute("disabled")) || isTrue(this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent"));'
  )
  .replace(
    'const selected = isTrue(this.selected);',
    'const selected = isTrue(this.selected ?? this.getAttribute("selected"));'
  )
  .replace(
    'const optionLoading = isTrue(this.loading) && !selected;',
    'const optionLoading = isTrue(this.loading ?? this.getAttribute("loading")) && !selected;'
  )
  .replace(
    'const loading = optionLoading || isTrue(this.loadingParent);',
    'const loading = optionLoading || isTrue(this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent"));'
  )
  .replace(
    /this\.state === "success" \|\| this\.state === "error" \? this\.state : "none"/,
    '(this.state ?? this.getAttribute("state")) === "success" || (this.state ?? this.getAttribute("state")) === "error" ? (this.state ?? this.getAttribute("state")) : "none"'
  )
  .replaceAll('return this.label || "";', 'return this.label ?? this.getAttribute("label") ?? "";')
  .replaceAll('return this.name || "";', 'return this.name ?? this.getAttribute("name") ?? "";')
  .replace(
    'return this.value == null ? "" : String(this.value);',
    'const rawValue = this.value ?? this.getAttribute("value");\n    return rawValue == null ? "" : String(rawValue);'
  )
  .replace(
    'return this.state === "error" ? "true" : "";',
    'return (this.state ?? this.getAttribute("state")) === "error" ? "true" : "";'
  )
  .replace(
    /this\.disabled === true \|\|[\s\S]*?this\.disabledParent === ""/,
    `(this.disabled ?? this.getAttribute("disabled")) === true ||
      (this.disabled ?? this.getAttribute("disabled")) === "true" ||
      (this.disabled ?? this.getAttribute("disabled")) === "" ||
      (this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent")) === true ||
      (this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent")) === "true" ||
      (this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent")) === ""`
  )
  .replaceAll(
    'this.selected === true || this.selected === "true" || this.selected === ""',
    '(this.selected ?? this.getAttribute("selected")) === true || (this.selected ?? this.getAttribute("selected")) === "true" || (this.selected ?? this.getAttribute("selected")) === ""'
  )
  .replaceAll(
    'this.loading === true || this.loading === "true" || this.loading === ""',
    '(this.loading ?? this.getAttribute("loading")) === true || (this.loading ?? this.getAttribute("loading")) === "true" || (this.loading ?? this.getAttribute("loading")) === ""'
  )
  .replaceAll(
    'this.loadingParent === true || this.loadingParent === "true" || this.loadingParent === ""',
    '(this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === true || (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === "true" || (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === ""'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

const propsToEnsure = [
  'value',
  'label',
  'disabled',
  'loading',
  'selected',
  'disabledParent',
  'loadingParent',
  'name',
  'state',
];
for (const prop of propsToEnsure) {
  const attr =
    prop === 'disabledParent' ? 'disabled-parent' : prop === 'loadingParent' ? 'loading-parent' : null;
  const needle = attr
    ? `@property({ attribute: "${attr}" }) ${prop}`
    : `@property() ${prop}`;
  if (!after.includes(needle) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitRadioGroupOption extends LitElement {',
      attr
        ? `export default class LitRadioGroupOption extends LitElement {\n  @property({ attribute: "${attr}" }) ${prop}: any;`
        : `export default class LitRadioGroupOption extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

const nodeGetters = `  get spinnerNode() {
    if (!this.isOptionLoading || this.isLoadingParent) return nothing;
    return html\`<p-spinner class="spinner" aria-hidden="true"></p-spinner>\`;
  }
  get labelNode() {
    if (!this.labelText && !this.querySelector('[slot="label"]')) return nothing;
    const blocked = this.isDisabled || this.isLoading;
    return html\`<div class="label-wrapper"><label class="label" id="label" for="radio-group-option" aria-disabled=\${blocked ? "true" : nothing}>\${this.labelText}<slot name="label"></slot></label><span class="label-after"><slot name="label-after"></slot></span></div>\`;
  }
  get loadingNode() {
    if (this.isLoadingParent) return nothing;
    return html\`<span class="loading" id="loading" role="status">\${this.loadingText}</span>\`;
  }

`;

after = after.replace('  render() {', `${nodeGetters}${extraGetters}`);

if (after.includes('my-fragment')) {
  console.error('build-lit-radio-group-option: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-radio-group-option")')) {
  console.error('build-lit-radio-group-option: expected @customElement("p-radio-group-option")');
  process.exit(1);
}

const required = [
  'class="root"',
  'class="wrapper"',
  'class="spinner"',
  'radio-group-option',
  'disabled-parent',
  'loading-parent',
  'slotchange',
  'internalRadioGroupOptionChange',
  'p-spinner',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-radio-group-option: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (
  after.includes('lit-radio-group-option') ||
  after.includes('lit-spinner') ||
  after.includes('delegatesFocus')
) {
  console.error('build-lit-radio-group-option: generated output must stay p-* and not fake delegatesFocus');
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
