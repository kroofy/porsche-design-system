import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/multi-select');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-multi-select.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/MultiSelect.ts'),
  resolve(mitosisDir, 'output/lit/MultiSelect.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-multi-select: generated MultiSelect.ts not found');
  process.exit(1);
}

const extraGetters = `  itemChildren() {
    return [...this.children].filter(
      (el) =>
        el.slot !== "label" &&
        el.slot !== "label-after" &&
        el.slot !== "description" &&
        el.slot !== "message" &&
        el.slot !== "filter" &&
        el.slot !== "selected",
    );
  }

  selectedLabel() {
    const raw = this.value ?? this.getAttribute("value");
    if (raw === null || raw === undefined || raw === "") return "";
    const values = Array.isArray(raw) ? raw : String(raw).split(",");
    const options = [...this.querySelectorAll("p-multi-select-option")];
    return values
      .map((value) => {
        const match = options.find((option) => String(option.value ?? option.getAttribute("value")) === String(value).trim());
        return (match?.textContent ?? "").toString().trim();
      })
      .filter(Boolean)
      .join(", ");
  }

  comboDescribedBy() {
    const parts = [];
    if (this.messageText) parts.push("message");
    if (this.descriptionText || this.querySelector('[slot="description"]')) parts.push("description");
    return parts.length ? parts.join(" ") : nothing;
  }

  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, characterData: true, subtree: true });
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

  render() {`;

const renderTemplate = `return html\`<div class="root">\${this.labelNode}\${this.descriptionNode}<button type="button" role="combobox" id="button" tabindex="0" aria-haspopup="listbox" aria-expanded="false" aria-required=\${this.isRequired ? "true" : "false"} aria-controls="listbox" aria-autocomplete="none" aria-labelledby=\${this.hasLabel ? "label" : nothing} aria-describedby=\${this.comboDescribedBy()} aria-invalid=\${this.ariaInvalid || nothing} ?disabled=\${!!this.isDisabled}><span>\${this.selectedLabel()}</span><p-icon class="icon" name="arrow-head-down" source="http://localhost:3001/icons/arrow-head-down.1e3cbb8.svg" color="primary" aria-hidden="true"></p-icon></button><div popover="manual" tabindex="0"><div id="listbox" class="options" role="listbox" aria-labelledby=\${this.hasLabel ? "label" : nothing} aria-required=\${this.isRequired ? "true" : "false"} aria-multiselectable="true" tabindex="-1"><slot></slot></div></div><span class="message" id="message" role=\${this.messageRole}>\${this.iconNode}\${this.messageText}</span></div>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+hideLabel/g, '@property({ attribute: "hide-label" }) hideLabel')
  .replace(/@property\(\)\s+dropdownDirection/g, '@property({ attribute: "dropdown-direction" }) dropdownDirection')
  .replace(
    'const disabled = isTrue(this.disabled);',
    'const disabled = isTrue(this.getAttribute("disabled") ?? this.disabled);'
  )
  .replace(
    'const compact = isTrue(this.compact);',
    'const compact = isTrue(this.getAttribute("compact") ?? this.compact);'
  )
  .replace(
    'const hideLabel = parse(this.hideLabel, false);',
    'const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);'
  )
  .replace(
    'const formState = this.state === "success" || this.state === "error" ? this.state : "none";',
    'const formState = (this.getAttribute("state") ?? this.state) === "success" || (this.getAttribute("state") ?? this.state) === "error" ? (this.getAttribute("state") ?? this.state) : "none";'
  )
  .replace(
    'const message = this.message || "";',
    'const message = this.getAttribute("message") ?? this.message ?? "";'
  )
  .replaceAll('return this.label || "";', 'return this.getAttribute("label") ?? this.label ?? "";')
  .replaceAll(
    'return this.description || "";',
    'return this.getAttribute("description") ?? this.description ?? "";'
  )
  .replaceAll(
    'const formState = this.state || "none";',
    'const formState = this.getAttribute("state") ?? this.state ?? "none";'
  )
  .replaceAll(
    'const message = this.message || "";',
    'const message = this.getAttribute("message") ?? this.message ?? "";'
  )
  .replace(
    /this\.disabled === true \|\| this\.disabled === "true" \|\| this\.disabled === ""/,
    '(this.disabled ?? this.getAttribute("disabled")) === true || (this.disabled ?? this.getAttribute("disabled")) === "true" || (this.disabled ?? this.getAttribute("disabled")) === ""'
  )
  .replace(
    /this\.required === true \|\| this\.required === "true" \|\| this\.required === ""/,
    '(this.required ?? this.getAttribute("required")) === true || (this.required ?? this.getAttribute("required")) === "true" || (this.required ?? this.getAttribute("required")) === ""'
  )
  .replaceAll('this.state === "error"', '(this.getAttribute("state") ?? this.state) === "error"')
  .replaceAll('this.state === "success"', '(this.getAttribute("state") ?? this.state) === "success"')
  .replaceAll(
    '? this.state : "none"',
    '? (this.getAttribute("state") ?? this.state) : "none"'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

const propsToEnsure = [
  'label',
  'description',
  'message',
  'state',
  'hideLabel',
  'compact',
  'disabled',
  'required',
  'value',
  'name',
  'form',
  'dropdownDirection',
];
for (const prop of propsToEnsure) {
  const attr =
    prop === 'hideLabel' ? 'hide-label' : prop === 'dropdownDirection' ? 'dropdown-direction' : null;
  const needle = attr
    ? `@property({ attribute: "${attr}" }) ${prop}`
    : `@property() ${prop}`;
  if (!after.includes(needle) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitMultiSelect extends LitElement {',
      attr
        ? `export default class LitMultiSelect extends LitElement {\n  @property({ attribute: "${attr}" }) ${prop}: any;`
        : `export default class LitMultiSelect extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace('  render() {', extraGetters);

const nodeGetters = `  get hasLabel() {
    return !!this.labelText || !!this.querySelector('[slot="label"]');
  }
  get hasDescription() {
    return !!this.descriptionText || !!this.querySelector('[slot="description"]');
  }
  get labelNode() {
    if (!this.hasLabel) return nothing;
    return html\`<div class="label-wrapper"><label class="label" id="label" for="button" aria-disabled=\${this.isDisabled ? "true" : nothing}>\${this.labelText}<slot name="label"></slot></label><slot name="label-after"></slot></div>\`;
  }
  get descriptionNode() {
    if (!this.hasDescription) return nothing;
    return html\`<span class="label" id="description" aria-disabled=\${this.isDisabled ? "true" : nothing}>\${this.descriptionText}<slot name="description"></slot></span>\`;
  }
  get iconNode() {
    const icon = this.iconName;
    if (!icon) return nothing;
    const src =
      icon === "exclamation"
        ? "http://localhost:3001/icons/exclamation.46cd17b.svg"
        : "http://localhost:3001/icons/check.8ba06be.svg";
    return html\`<p-icon name=\${icon} source=\${src} color=\${this.iconColor || nothing} aria-hidden="true"></p-icon>\`;
  }

`;

after = after.replace('  itemChildren() {', `${nodeGetters}  itemChildren() {`);

if (after.includes('my-fragment')) {
  console.error('build-lit-multi-select: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-multi-select")')) {
  console.error('build-lit-multi-select: expected @customElement("p-multi-select")');
  process.exit(1);
}

const required = [
  'class="root"',
  'class="options"',
  'aria-expanded="false"',
  'aria-multiselectable="true"',
  'popover="manual"',
  'hide-label',
  'arrow-head-down.1e3cbb8.svg',
  'p-multi-select-option',
  'p-icon',
  '1000',
  'slotchange',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-multi-select: missing ${missing.join(', ')}`);
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-multi-select', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-multi-select: ${err.message}`);
  process.exit(1);
}
if (
  after.includes('lit-multi-select') ||
  after.includes('lit-icon') ||
  after.includes('p-input-search') ||
  after.includes('p-button-pure') ||
  after.includes('delegatesFocus') ||
  after.includes('formAssociated')
) {
  console.error('build-lit-multi-select: generated output must stay p-*, omit filter/reset, and not fake delegatesFocus/formAssociated');
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
