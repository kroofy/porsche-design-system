import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/textarea');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-textarea.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Textarea.ts'),
  resolve(mitosisDir, 'output/lit/Textarea.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-textarea: generated Textarea.ts not found');
  process.exit(1);
}

const renderTemplate =
  'return html`<div class="root"><style .innerHTML="${this.cssText}"></style><div class="label-wrapper"><label class="label" id="label" for="textarea">${this.labelText}</label><slot name="label-after"></slot></div><span class="label" id="description">${this.descriptionText}</span><div class="wrapper"><textarea id="textarea" .value=${this.inputValue} placeholder=${this.placeholderText || nothing} name=${this.name || nothing} rows=${this.rowsValue || nothing} maxlength=${this.maxLengthValue || nothing} ?disabled=${!!this.isDisabled} ?readonly=${!!this.isReadOnly} aria-invalid=${this.ariaInvalid || nothing}></textarea><span class="sr-only" aria-live="polite">${this.srOnlyText}</span><span class="counter" aria-hidden="true">${this.counterText}</span></div><span class="message" id="message"><p-icon name=${this.iconName || nothing} source=${this.iconSrc || nothing} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>${this.messageText}</span></div>`;';

const updatedBlock = `  get iconSrc() {
    const files = {
      check: "check.8ba06be.svg",
      exclamation: "exclamation.46cd17b.svg",
    };
    const name = this.iconName;
    if (files[name]) return "http://localhost:3001/icons/" + files[name];
    return "";
  }

  updated() {
    const input = this.renderRoot?.querySelector("textarea");
    if (input) {
      const value = this.value ?? this.getAttribute("value") ?? "";
      if (input.value !== String(value)) input.value = String(value);
      const maxLength = this.maxLength ?? this.getAttribute("max-length") ?? this.getAttribute("maxlength");
      if (maxLength != null && maxLength !== "") input.maxLength = Number(maxLength);
      const rows = this.rows ?? this.getAttribute("rows");
      if (rows != null && rows !== "") input.rows = Number(rows);
      const readOnly = this.readOnly ?? this.getAttribute("read-only");
      input.readOnly = readOnly === true || readOnly === "true" || readOnly === "";
      const placeholder = this.placeholder ?? this.getAttribute("placeholder") ?? "";
      input.placeholder = placeholder;
      const name = this.name ?? this.getAttribute("name") ?? "";
      input.name = name;
      const disabled = this.disabled ?? this.getAttribute("disabled");
      input.disabled = disabled === true || disabled === "true" || disabled === "";
    }
  }

  render() {`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(/@property\(\)\s+hideLabel/g, '@property({ attribute: "hide-label" }) hideLabel')
  .replace(/@property\(\)\s+readOnly/g, '@property({ attribute: "read-only" }) readOnly')
  .replace(/@property\(\)\s+maxLength/g, '@property({ attribute: "max-length" }) maxLength')
  .replace(/@property\(\)\s+minLength/g, '@property({ attribute: "min-length" }) minLength')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(
    'const hideLabel = parse(this.hideLabel, false);',
    'const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);'
  )
  .replace(
    'const readOnly = isTrue(this.readOnly);',
    'const readOnly = isTrue(this.getAttribute("read-only") ?? this.readOnly);'
  )
  .replace(
    'const hasCounter = isTrue(this.counter);',
    'const hasCounter = isTrue(this.getAttribute("counter") ?? this.counter);'
  )
  .replace(
    'return this.value == null ? "" : String(this.value);',
    'const rawValue = this.value ?? this.getAttribute("value");\n    return rawValue == null ? "" : String(rawValue);'
  )
  .replace(
    /return this\.maxLength == null \|\| this\.maxLength === ""\s*\n\s*\? ""\s*\n\s*: String\(this\.maxLength\);/,
    'const rawMax = this.maxLength ?? this.getAttribute("max-length") ?? this.getAttribute("maxlength");\n    return rawMax == null || rawMax === "" ? "" : String(rawMax);'
  )
  .replace(
    /this\.maxLength == null \|\| this\.maxLength === ""\s*\n\s*\? ""\s*\n\s*: String\(this\.maxLength\);/g,
    '(this.maxLength ?? this.getAttribute("max-length") ?? this.getAttribute("maxlength")) == null || (this.maxLength ?? this.getAttribute("max-length") ?? this.getAttribute("maxlength")) === ""\n        ? ""\n        : String(this.maxLength ?? this.getAttribute("max-length") ?? this.getAttribute("maxlength"));'
  )
  .replace(
    'const value = this.value == null ? "" : String(this.value);',
    'const value = (this.value ?? this.getAttribute("value")) == null ? "" : String(this.value ?? this.getAttribute("value"));'
  )
  .replace(
    'if (this.rows == null || this.rows === "") return "7";\n    return String(this.rows);',
    'const rawRows = this.rows ?? this.getAttribute("rows");\n    if (rawRows == null || rawRows === "") return "7";\n    return String(rawRows);'
  )
  .replace(
    'const value = this.value == null ? "" : String(this.value);',
    'const value = (this.value ?? this.getAttribute("value")) == null ? "" : String(this.value ?? this.getAttribute("value"));'
  )
  .replace(
    'const max = this.maxLength == null || this.maxLength === "" ? "" : String(this.maxLength);',
    'const rawMaxAttr = this.maxLength ?? this.getAttribute("max-length") ?? this.getAttribute("maxlength");\n      const max = rawMaxAttr == null || rawMaxAttr === "" ? "" : String(rawMaxAttr);'
  )
  .replace(
    'this.readOnly === true || this.readOnly === "true" || this.readOnly === ""',
    '(this.readOnly ?? this.getAttribute("read-only")) === true || (this.readOnly ?? this.getAttribute("read-only")) === "true" || (this.readOnly ?? this.getAttribute("read-only")) === ""'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (!after.includes('@property() name:') && !after.includes('@property() name ')) {
  after = after.replace('@property() label: any;', '@property() label: any;\n  @property() name: any;');
}

if (after.includes('updated()')) {
  after = after.replace(/  updated\(\) \{[\s\S]*?\n  \}\n\n  render\(\) \{/, updatedBlock);
} else {
  after = after.replace('  render() {', updatedBlock);
}

if (after.includes('my-fragment')) {
  console.error('build-lit-textarea: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-textarea")')) {
  console.error('build-lit-textarea: expected @customElement("p-textarea")');
  process.exit(1);
}
if (
  !after.includes('class="root"') ||
  !after.includes('class="wrapper"') ||
  !after.includes('class="counter"') ||
  !after.includes('<textarea') ||
  !after.includes('.value=') ||
  !after.includes('input.readOnly') ||
  !after.includes('max-length') ||
  !after.includes('rows')
) {
  console.error('build-lit-textarea: expected classes, textarea, value / readOnly / max-length / rows');
  process.exit(1);
}
if (after.includes('lit-textarea') || after.includes('lit-icon')) {
  console.error('build-lit-textarea: generated output must use p-textarea / p-icon, not lit-*');
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
