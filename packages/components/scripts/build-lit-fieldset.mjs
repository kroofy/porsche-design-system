import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/fieldset');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-fieldset.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Fieldset.ts'),
  resolve(mitosisDir, 'output/lit/Fieldset.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-fieldset: generated Fieldset.ts not found');
  process.exit(1);
}

const renderTemplate =
  'return html`<fieldset><style .innerHTML="${this.cssText}"></style><legend>${this.labelText}</legend><slot></slot><span class="message" id="message"><p-icon name=${this.iconName || nothing} source=${this.iconSrc || nothing} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>${this.messageText}</span></fieldset>`;';

const extraGetters = `  get iconSrc() {
    const files = {
      check: "check.8ba06be.svg",
      exclamation: "exclamation.46cd17b.svg",
    };
    const name = this.iconName;
    if (files[name]) return "http://localhost:3001/icons/" + files[name];
    return "";
  }

  render() {`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(/@property\(\)\s+labelSize/g, '@property({ attribute: "label-size" }) labelSize')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(
    'const label = this.label || "";',
    'const label = (this.getAttribute("label") ?? this.label) || "";'
  )
  .replace(
    'const labelSize = this.labelSize || "medium";',
    'const labelSize = (this.getAttribute("label-size") ?? this.labelSize) || "medium";'
  )
  .replace(
    'return this.label || "";',
    'return (this.getAttribute("label") ?? this.label) || "";'
  )
  .replace(
    'const formState = this.state || "none";',
    'const formState = (this.getAttribute("state") ?? this.state) || "none";'
  )
  .replace(
    'const message = this.message || "";',
    'const message = (this.getAttribute("message") ?? this.message) || "";'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (after.includes('get iconSrc()')) {
  after = after.replace(/  get iconSrc\(\) \{[\s\S]*?\n  \}\n\n  render\(\) \{/, extraGetters);
} else {
  after = after.replace('  render() {', extraGetters);
}

if (after.includes('my-fragment')) {
  console.error('build-lit-fieldset: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-fieldset")')) {
  console.error('build-lit-fieldset: expected @customElement("p-fieldset")');
  process.exit(1);
}
if (
  !after.includes('<fieldset') ||
  !after.includes('<legend') ||
  !after.includes('<slot') ||
  !after.includes('class="message"') ||
  !after.includes('label-size') ||
  !after.includes('check.8ba06be.svg')
) {
  console.error('build-lit-fieldset: expected fieldset, legend, slot, message, and label-size');
  process.exit(1);
}
if (after.includes('lit-fieldset') || after.includes('lit-icon') || after.includes('lit-input-text')) {
  console.error('build-lit-fieldset: generated output must use p-fieldset / p-icon, not lit-*');
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
