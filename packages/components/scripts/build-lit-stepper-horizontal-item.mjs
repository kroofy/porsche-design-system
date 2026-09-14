import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/stepper-horizontal-item');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-stepper-horizontal-item.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/StepperHorizontalItem.ts'),
  resolve(mitosisDir, 'output/lit/StepperHorizontalItem.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-stepper-horizontal-item: generated StepperHorizontalItem.ts not found');
  process.exit(1);
}

const extraGetters = `  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this.setAttribute("role", "listitem");
    this.addEventListener("click", this.onHostClick, true);
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, characterData: true, subtree: true });
    queueMicrotask(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    this.removeEventListener("click", this.onHostClick, true);
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.stampIcon();
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
  }
  updated() {
    this.applyHostStyle();
    this.stampIcon();
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

  parsedState() {
    return this.state ?? this.getAttribute("state") ?? "";
  }

  parsedDisabled() {
    const raw = this.disabled ?? this.getAttribute("disabled");
    return raw === true || raw === "true" || raw === "";
  }

  onHostClick = (e) => {
    const step = this.parsedState();
    const disabled = this.parsedDisabled();
    const clickable = !!step && (step === "complete" || step === "warning") && !disabled;
    if (!clickable) e.stopPropagation();
  };

  stampIcon() {
    const icon = this.renderRoot?.querySelector("p-icon");
    if (!icon) return;
    const existing = icon.source || icon.getAttribute("source") || "";
    if (existing.includes("/")) return;
    const name = icon.name || icon.getAttribute("name");
    const files = { success: "success.b16d4c1.svg", warning: "warning.59927e6.svg" };
    const file = files[name];
    if (file) icon.source = "http://localhost:3001/icons/" + file;
  }

  render() {`;

const renderTemplate = `const step = this.parsedState();
    const disabled = this.parsedDisabled();
    const isDisabled = !step || disabled;
    const isCurrent = step === "current";
    const isIcon = step === "complete" || step === "warning";
    const iconName = step === "complete" ? "success" : "warning";
    return html\`<button type="button" aria-disabled=\${isDisabled ? "true" : nothing} aria-current=\${isCurrent ? "step" : nothing}>\${isIcon ? html\`<p-icon class="icon" name=\${iconName} size="inherit" color=\${iconName} aria-hidden="true"></p-icon>\` : html\`<span class="icon" aria-hidden="true"></span>\`}\${step ? html\`<span class="sr-only">\${step}: </span>\` : nothing}<slot></slot></button>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(
    'const step = this.state || "";',
    'const step = this.state ?? this.getAttribute("state") ?? "";'
  )
  .replace(
    'const disabled = isTrue(this.disabled);',
    'const disabled = isTrue(this.disabled ?? this.getAttribute("disabled"));'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

const propsToEnsure = ['state', 'disabled'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitStepperHorizontalItem extends LitElement {',
      `export default class LitStepperHorizontalItem extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace('  render() {', extraGetters);

if (after.includes('my-fragment')) {
  console.error('build-lit-stepper-horizontal-item: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-stepper-horizontal-item")')) {
  console.error('build-lit-stepper-horizontal-item: expected @customElement("p-stepper-horizontal-item")');
  process.exit(1);
}

const required = [
  'role", "listitem',
  'class="icon"',
  'p-icon',
  'span class="icon"',
  'nth-of-type',
  'parsedState',
  'stampIcon',
  'success.b16d4c1.svg',
  'MutationObserver',
  'slotchange',
  '@property() state',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-stepper-horizontal-item: missing ${missing.join(', ')}`);
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-stepper-horizontal-item', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-stepper-horizontal-item: ${err.message}`);
  process.exit(1);
}
if (
  after.includes('lit-stepper-horizontal-item') ||
  after.includes('delegatesFocus') ||
  after.includes('formAssociated')
) {
  console.error(
    'build-lit-stepper-horizontal-item: generated output must stay p-* and not fake delegatesFocus/formAssociated'
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
