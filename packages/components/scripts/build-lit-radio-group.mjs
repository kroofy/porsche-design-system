import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/radio-group');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-radio-group.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/RadioGroup.ts'),
  resolve(mitosisDir, 'output/lit/RadioGroup.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-radio-group: generated RadioGroup.ts not found');
  process.exit(1);
}

const extraGetters = `  itemChildren() {
    return [...this.children].filter(
      (el) => el.slot !== "label" && el.slot !== "label-after" && el.slot !== "message" && el.slot !== "description",
    );
  }

  stampOption(option) {
    const value = this.value ?? this.getAttribute("value");
    const disabled = !!this.isDisabled;
    const loading = !!this.isLoading;
    const state = this.state ?? this.getAttribute("state") ?? "none";
    const name = this.name ?? this.getAttribute("name") ?? "";
    const optionValue = option.value ?? option.getAttribute("value");
    option.selected = optionValue === value && value !== null && value !== undefined;
    option.disabledParent = disabled;
    option.loadingParent = loading;
    option.state = state;
    option.name = name;
  }

  syncOptions() {
    for (const option of this.itemChildren()) this.stampOption(option);
  }

  fieldsetDescribedBy() {
    const parts = [];
    if (this.isLoading) parts.push("loading");
    if (this.messageText) parts.push("message");
    if (this.descriptionText || this.querySelector('[slot="description"]')) parts.push("description");
    return parts.length ? parts.join(" ") : nothing;
  }

  connectedCallback() {
    super.connectedCallback();
    const stampArg = (node) => {
      if (node && node.localName === "p-radio-group-option") this.stampOption(node);
      if (node && node.nodeType === 11) {
        for (const child of node.childNodes) stampArg(child);
      }
    };
    for (const name of ["appendChild", "insertBefore", "append", "prepend"]) {
      const orig = this[name];
      if (typeof orig !== "function") continue;
      this[name] = (...args) => {
        for (const arg of args) stampArg(arg);
        return orig.apply(this, args);
      };
    }
    this._childObserver = new MutationObserver(() => {
      this.syncOptions();
      this.requestUpdate();
    });
    this._childObserver.observe(this, { childList: true });
    queueMicrotask(() => {
      this.syncOptions();
      this.requestUpdate();
    });
    customElements.whenDefined("p-radio-group-option").then(() => {
      this.syncOptions();
      this.requestUpdate();
    });
    this.addEventListener("internalRadioGroupOptionChange", (e) => {
      e.stopPropagation();
      if (this.isDisabled || this.isLoading) return;
      const option = e.target;
      this.value = option.value ?? option.getAttribute("value");
      this.syncOptions();
      this.requestUpdate();
    });
    this.addEventListener("internalRadioGroupOptionBlur", (e) => {
      e.stopPropagation();
    });
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this.syncOptions();
        this.requestUpdate();
      });
    });
    this.syncOptions();
  }
  updated() {
    this.syncOptions();
  }

  render() {`;

const renderTemplate = `return html\`<fieldset class="root" ?disabled=\${!!this.isDisabled} role="radiogroup" aria-required=\${this.isRequired ? "true" : nothing} aria-invalid=\${this.ariaInvalid || nothing} aria-labelledby=\${this.hasLabel ? "label" : nothing} aria-describedby=\${this.fieldsetDescribedBy()}><style .innerHTML="\${this.cssText}"></style>\${this.labelNode}\${this.descriptionNode}<div class="wrapper"><slot></slot>\${this.spinnerNode}</div><span class="message" id="message" role=\${this.messageRole}>\${this.iconNode}\${this.messageText}</span><span class="loading" id="loading" role="status">\${this.loadingText}</span></fieldset>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+hideLabel/g, '@property({ attribute: "hide-label" }) hideLabel')
  .replace(
    'const disabled = isTrue(this.disabled);',
    'const disabled = isTrue(this.getAttribute("disabled") ?? this.disabled);'
  )
  .replace(
    'const loading = isTrue(this.loading);',
    'const loading = isTrue(this.getAttribute("loading") ?? this.loading);'
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
    'const direction = parse(this.direction, "column");',
    'const direction = parse(this.getAttribute("direction") ?? this.direction, "column");'
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
  .replaceAll(
    'return this.disabled === true || this.disabled === "true" || this.disabled === "";',
    'const disabled = this.getAttribute("disabled") ?? this.disabled;\n      return disabled === true || disabled === "true" || disabled === "";'
  )
  .replaceAll(
    'return this.loading === true || this.loading === "true" || this.loading === "";',
    'const loading = this.getAttribute("loading") ?? this.loading;\n      return loading === true || loading === "true" || loading === "";'
  )
  .replaceAll(
    'return this.required === true || this.required === "true" || this.required === "";',
    'const required = this.getAttribute("required") ?? this.required;\n      return required === true || required === "true" || required === "";'
  )
  .replace(
    /this\.disabled === true \|\| this\.disabled === "true" \|\| this\.disabled === ""/,
    '(this.disabled ?? this.getAttribute("disabled")) === true || (this.disabled ?? this.getAttribute("disabled")) === "true" || (this.disabled ?? this.getAttribute("disabled")) === ""'
  )
  .replace(
    /this\.loading === true \|\| this\.loading === "true" \|\| this\.loading === ""/g,
    '(this.loading ?? this.getAttribute("loading")) === true || (this.loading ?? this.getAttribute("loading")) === "true" || (this.loading ?? this.getAttribute("loading")) === ""'
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
  'loading',
  'required',
  'direction',
  'value',
  'name',
  'form',
];
for (const prop of propsToEnsure) {
  const attr = prop === 'hideLabel' ? 'hide-label' : null;
  const needle = attr
    ? `@property({ attribute: "${attr}" }) ${prop}`
    : `@property() ${prop}`;
  if (!after.includes(needle) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitRadioGroup extends LitElement {',
      attr
        ? `export default class LitRadioGroup extends LitElement {\n  @property({ attribute: "${attr}" }) ${prop}: any;`
        : `export default class LitRadioGroup extends LitElement {\n  @property() ${prop}: any;`
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
    const required = this.isRequired
      ? html\`<span class="required" aria-hidden="true"> *</span>\`
      : nothing;
    const labelDisabled = this.isDisabled || this.isLoading;
    return html\`<div class="label-wrapper"><div class="label" id="label" aria-disabled=\${labelDisabled ? "true" : nothing}>\${this.labelText}<slot name="label"></slot>\${required}</div><slot name="label-after"></slot></div>\`;
  }
  get descriptionNode() {
    if (!this.hasDescription) return nothing;
    const labelDisabled = this.isDisabled || this.isLoading;
    return html\`<span class="label" id="description" aria-disabled=\${labelDisabled ? "true" : nothing}>\${this.descriptionText}<slot name="description"></slot></span>\`;
  }
  get spinnerNode() {
    if (!this.isLoading) return nothing;
    return html\`<p-spinner class="spinner" aria-hidden="true"></p-spinner>\`;
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
  console.error('build-lit-radio-group: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-radio-group")')) {
  console.error('build-lit-radio-group: expected @customElement("p-radio-group")');
  process.exit(1);
}

const required = [
  'class="root"',
  'class="wrapper"',
  'class="message"',
  'class="loading"',
  'hide-label',
  'stampOption',
  'slotchange',
  'p-radio-group-option',
  'p-spinner',
  'p-icon',
  'exclamation.46cd17b.svg',
  '1000',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-radio-group: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (
  after.includes('lit-radio-group') ||
  after.includes('lit-icon') ||
  after.includes('lit-spinner') ||
  after.includes('delegatesFocus') ||
  after.includes('formAssociated')
) {
  console.error('build-lit-radio-group: generated output must stay p-* and not fake delegatesFocus/formAssociated');
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
