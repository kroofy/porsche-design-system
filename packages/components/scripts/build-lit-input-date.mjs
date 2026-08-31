import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/input-date');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-input-date.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/InputDate.ts'),
  resolve(mitosisDir, 'output/lit/InputDate.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-input-date: generated InputDate.ts not found');
  process.exit(1);
}

const renderTemplate =
  'return html`<div class="root"><style .innerHTML="${this.cssText}"></style><div class="label-wrapper"><label class="label" id="label" for="input-date">${this.labelText}</label><slot name="label-after"></slot></div><span class="label" id="description">${this.descriptionText}</span><div class="wrapper"><slot name="start"></slot><input type="date" id="input-date" dir="auto" .value=${this.inputValue} placeholder=${this.placeholderText || nothing} name=${this.name || nothing} ?disabled=${!!this.isDisabled} ?readonly=${!!this.isReadOnly} aria-disabled=${this.ariaDisabled || nothing} aria-invalid=${this.ariaInvalid || nothing} aria-readonly=${this.ariaReadonly || nothing}><p-button-pure class="button" type="button" icon="calendar" icon-source=${this.calendarIconSrc || nothing} hide-label="true" ?disabled=${!!this.isDisabled || !!this.isReadOnly}>Open date picker</p-button-pure><slot name="end"></slot><p-spinner aria-hidden="true"></p-spinner></div><span class="message" id="message"><p-icon name=${this.iconName || nothing} source=${this.iconSrc || nothing} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>${this.messageText}</span><span class="loading" id="loading" role="status">${this.loadingText}</span></div>`;';

const updatedBlock = `  get iconSrc() {
    const files = {
      check: "check.8ba06be.svg",
      exclamation: "exclamation.46cd17b.svg",
    };
    const name = this.iconName;
    if (files[name]) return "http://localhost:3001/icons/" + files[name];
    return "";
  }

  get calendarIconSrc() {
    return "http://localhost:3001/icons/calendar.70a6a12.svg";
  }

  updated() {
    const input = this.renderRoot?.querySelector("input");
    if (input) {
      const value = this.value ?? this.getAttribute("value") ?? "";
      if (input.value !== String(value)) input.value = String(value);
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
    'return this.value == null ? "" : String(this.value);',
    'const rawValue = this.value ?? this.getAttribute("value");\n    return rawValue == null ? "" : String(rawValue);'
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
  console.error('build-lit-input-date: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-input-date")')) {
  console.error('build-lit-input-date: expected @customElement("p-input-date")');
  process.exit(1);
}
if (
  !after.includes('class="root"') ||
  !after.includes('class="wrapper"') ||
  !after.includes('class="button"') ||
  !after.includes('class="loading"') ||
  !after.includes('type="date"') ||
  !after.includes('icon="calendar"') ||
  !after.includes('::-webkit-calendar-picker-indicator') ||
  !after.includes('.value=') ||
  !after.includes('input.readOnly') ||
  !after.includes('calendarIconSrc') ||
  !after.includes('calendar.70a6a12.svg')
) {
  console.error('build-lit-input-date: expected classes, date input, calendar button, and picker hide');
  process.exit(1);
}
if (
  after.includes('lit-input-date') ||
  after.includes('lit-icon') ||
  after.includes('lit-spinner') ||
  after.includes('lit-button-pure')
) {
  console.error(
    'build-lit-input-date: generated output must use p-input-date / p-icon / p-spinner / p-button-pure, not lit-*'
  );
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
