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

const renderTemplate = `return html\`<fieldset class="root" ?disabled=\${!!this.isDisabled} aria-invalid=\${this.ariaInvalid || nothing} aria-labelledby=\${this.labelText ? "label" : nothing}>\${this.labelNode}<div class="wrapper" dir="ltr" @keydown=\${this.onKeyDown} @paste=\${this.onPaste} @input=\${this.onInput}>\${this.inputNodes}\${this.spinnerNode}</div>\${this.messageNode}<span class="loading" id="loading" role="status">\${this.loadingText}</span></fieldset>\`;`;

const extraGetters = `  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
  get inputElements() {
    return Array.from(this.renderRoot?.querySelectorAll("input") || []);
  }
  get labelNode() {
    if (!this.labelText) return nothing;
    return html\`<div class="label-wrapper"><label class="label" id="label" for="current-input" aria-disabled=\${this.isDisabled || this.isLoading ? "true" : nothing} @click=\${this.focusCurrentInput}>\${this.labelText}</label><slot name="label-after"></slot></div>\`;
  }
  get inputNodes() {
    const n = Number(this.pinLength) || 4;
    const value = this.parsedValue;
    const type = this.inputType;
    const nodes = [];
    for (let i = 0; i < n; i++) {
      const isCurrent = !value ? i === 0 : value.indexOf(" ") === -1 ? i === n - 1 : i === value.indexOf(" ");
      const ch = value[i] && value[i] !== " " ? value[i] : "";
      nodes.push(html\`<input id=\${isCurrent ? "current-input" : nothing} type=\${type} aria-label=\${i + 1 + " of " + n} aria-invalid=\${this.ariaInvalid || nothing} aria-disabled=\${this.isLoading ? "true" : nothing} autocomplete="one-time-code" pattern="\\\\d*" inputmode="numeric" .value=\${ch} ?disabled=\${!!this.isDisabled} ?required=\${!!this.isRequired} @focus=\${this.onInputFocus} @mouseup=\${this.onInputMouseUp} @blur=\${this.onInputBlur} @beforeinput=\${this.onBeforeInput}>\`);
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
  isInputOnlyDigits(input) {
    return /^[0-9]*$/.test(input);
  }
  removeWhiteSpaces(value) {
    return String(value ?? "").replace(/\\s/g, "");
  }
  hasInputOnlyDigitsOrWhitespaces(input) {
    return /^[\\d ]+$/.test(input);
  }
  getConcatenatedInputValues() {
    return this.inputElements.map((el) => el.value || " ").join("");
  }
  getSanitisedValue(value, length) {
    if (value && !this.hasInputOnlyDigitsOrWhitespaces(value)) return "";
    if (this.removeWhiteSpaces(value).length > length) return String(value).slice(0, length);
    return value;
  }
  onBeforeInput(event) {
    const { data, inputType, target } = event;
    if (this.isLoading) {
      event.preventDefault();
      return;
    }
    if (data && !this.isInputOnlyDigits(data)) {
      event.preventDefault();
      return;
    }
    if (inputType === "insertText" && target.value.length > 0 && data?.length === 1) {
      event.preventDefault();
      target.value = data;
      this.updateValue(this.getConcatenatedInputValues());
      if (target.nextElementSibling) target.nextElementSibling.focus();
      else target.select();
      return;
    }
    if (inputType === "insertText" && target.value.length > 0) {
      event.preventDefault();
    }
  }
  onInputFocus(event) {
    if (event.target.value) event.target.select();
  }
  onInputMouseUp(event) {
    if (event.target.value) event.preventDefault();
  }
  onInput(event) {
    const { target } = event;
    const length = Number(this.pinLength) || 4;
    if (target.value.length >= length) {
      const sanitisedValue = this.removeWhiteSpaces(this.getSanitisedValue(target.value, length));
      this.updateValue(sanitisedValue);
      this.focusFirstEmptyOrLastInput(sanitisedValue);
    } else {
      this.updateValue(this.getConcatenatedInputValues());
      target.nextElementSibling?.focus();
    }
  }
  onKeyDown(event) {
    const { key, target } = event;
    const previousElementSibling = target.previousElementSibling;
    const nextElementSibling = target.nextElementSibling;
    if (key === "ArrowLeft") {
      event.preventDefault();
      previousElementSibling?.focus();
    } else if (key === "ArrowRight") {
      event.preventDefault();
      nextElementSibling?.focus();
    } else if (key === "Home") {
      event.preventDefault();
      this.inputElements[0]?.focus();
    } else if (key === "End") {
      event.preventDefault();
      this.inputElements[this.inputElements.length - 1]?.focus();
    } else if (key === "Backspace" || key === "Delete") {
      if (!target.value) {
        event.preventDefault();
        if (key === "Backspace" && previousElementSibling) {
          previousElementSibling.value = "";
          previousElementSibling.focus();
        } else if (key === "Delete" && nextElementSibling) {
          nextElementSibling.value = "";
          nextElementSibling.focus();
        }
      }
      target.value = "";
      this.updateValue(this.getConcatenatedInputValues());
    } else if (key === "Dead" || key === "Process") {
      target.blur();
      requestAnimationFrame(() => target.focus());
    }
  }
  onPaste(event) {
    const length = Number(this.pinLength) || 4;
    const sanitisedPastedValue = this.removeWhiteSpaces(
      this.getSanitisedValue(event.clipboardData.getData("Text"), length)
    );
    if (sanitisedPastedValue !== this.parsedValue) {
      this.updateValue(sanitisedPastedValue);
      this.focusFirstEmptyOrLastInput(sanitisedPastedValue);
    }
    event.preventDefault();
  }
  updateValue(newValue) {
    this.value = newValue;
    if (newValue == null) this.removeAttribute("value");
    else this.setAttribute("value", String(newValue));
    const length = Number(this.pinLength) || 4;
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: { value: newValue, isComplete: this.removeWhiteSpaces(newValue).length === length },
      })
    );
  }
  focusFirstEmptyOrLastInput(sanitisedValue) {
    const length = Number(this.pinLength) || 4;
    this.inputElements[sanitisedValue.length === length ? sanitisedValue.length - 1 : sanitisedValue.length]?.focus();
  }
  focusCurrentInput() {
    this.inputElements.find((input) => input.id === "current-input")?.focus();
  }
  onInputBlur(event) {
    event.stopPropagation();
    if (!event.relatedTarget || !this.inputElements.includes(event.relatedTarget)) {
      this.dispatchEvent(new CustomEvent("blur", { bubbles: false, composed: true }));
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
  ' of ',
  'onBeforeInput',
  'onKeyDown',
  'focusCurrentInput',
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
