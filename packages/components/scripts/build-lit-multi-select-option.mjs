import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/multi-select-option');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-multi-select-option.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/MultiSelectOption.ts'),
  resolve(mitosisDir, 'output/lit/MultiSelectOption.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-multi-select-option: generated MultiSelectOption.ts not found');
  process.exit(1);
}

const extraGetters = `  syncHostAria() {
    this.setAttribute("role", "option");
    const selected = !!this.isSelected;
    const disabled = !!this.isDisabled;
    const rawValue = this.value ?? this.getAttribute("value");
    const hasValue = rawValue !== undefined && rawValue !== null;
    this.setAttribute("aria-selected", selected ? "true" : "false");
    if (disabled) this.setAttribute("aria-disabled", "true");
    else this.removeAttribute("aria-disabled");
    if (hasValue) this.removeAttribute("aria-label");
    else this.setAttribute("aria-label", "Empty value");
  }

  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, characterData: true, subtree: true });
    queueMicrotask(() => this.requestUpdate());
    this.addEventListener("click", () => {
      if (this.isDisabled) return;
      this.dispatchEvent(new CustomEvent("internalOptionUpdate", { bubbles: true }));
    });
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.syncHostAria();
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
  }
  updated() {
    this.applyHostStyle();
    this.syncHostAria();
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

const renderTemplate = `const selected = !!this.isSelected;
    const disabled = !!this.isDisabled;
    const highlighted = !!this.isHighlighted;
    const cls = ["option"];
    if (selected) cls.push("option--selected");
    if (highlighted) cls.push("option--highlighted");
    if (disabled) cls.push("option--disabled");
    return html\`<div class="\${cls.join(" ")}"><span class="checkbox" aria-hidden="true"></span><slot></slot></div>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+disabledParent/g, '@property({ attribute: "disabled-parent" }) disabledParent')
  .replace(
    'const disabled = isTrue(this.disabled) || isTrue(this.disabledParent);',
    'const disabled = isTrue(this.disabled ?? this.getAttribute("disabled")) || isTrue(this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent"));'
  )
  .replace(
    'const selected = isTrue(this.selected);',
    'const selected = isTrue(this.selected ?? this.getAttribute("selected"));'
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
    'this.highlighted === true || this.highlighted === "true" || this.highlighted === ""',
    '(this.highlighted ?? this.getAttribute("highlighted")) === true || (this.highlighted ?? this.getAttribute("highlighted")) === "true" || (this.highlighted ?? this.getAttribute("highlighted")) === ""'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

const propsToEnsure = ['value', 'disabled', 'selected', 'highlighted', 'disabledParent'];
for (const prop of propsToEnsure) {
  const attr = prop === 'disabledParent' ? 'disabled-parent' : null;
  const needle = attr
    ? `@property({ attribute: "${attr}" }) ${prop}`
    : `@property() ${prop}`;
  if (!after.includes(needle) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitMultiSelectOption extends LitElement {',
      attr
        ? `export default class LitMultiSelectOption extends LitElement {\n  @property({ attribute: "${attr}" }) ${prop}: any;`
        : `export default class LitMultiSelectOption extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace('  render() {', extraGetters);

if (after.includes('my-fragment')) {
  console.error('build-lit-multi-select-option: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-multi-select-option")')) {
  console.error('build-lit-multi-select-option: expected @customElement("p-multi-select-option")');
  process.exit(1);
}

const required = [
  'cls = ["option"]',
  'option--selected',
  'disabled-parent',
  'class="checkbox"',
  'slotchange',
  'internalOptionUpdate',
  '--_p-multi-select-option-a',
  'static styles',
  'hostStyle',
  'applyHostStyle',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-multi-select-option: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('get cssText') || after.includes('.innerHTML')) {
  console.error('build-lit-multi-select-option: cssText/innerHTML stylesheet hack is not allowed');
  process.exit(1);
}
if (
  after.includes('lit-multi-select-option') ||
  after.includes('delegatesFocus') ||
  after.includes('formAssociated')
) {
  console.error('build-lit-multi-select-option: generated output must stay p-* and not fake delegatesFocus/formAssociated');
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
