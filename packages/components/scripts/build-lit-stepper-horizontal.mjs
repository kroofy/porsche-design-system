import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/stepper-horizontal');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-stepper-horizontal.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/StepperHorizontal.ts'),
  resolve(mitosisDir, 'output/lit/StepperHorizontal.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-stepper-horizontal: generated StepperHorizontal.ts not found');
  process.exit(1);
}

const extraGetters = `  stepItems() {
    return [...this.children].filter((el) => el.tagName === "P-STEPPER-HORIZONTAL-ITEM");
  }

  currentItem() {
    return this.stepItems().find((el) => (el.state ?? el.getAttribute("state")) === "current");
  }

  syncScrollerAria() {
    const scroller = this.renderRoot?.querySelector("p-scroller");
    if (!scroller) return;
    scroller.setAttribute("role", "list");
  }

  scrollCurrentIntoView() {
    const current = this.currentItem();
    if (!current) return;
    const rect = current.getBoundingClientRect();
    if (rect.width === 0) {
      requestAnimationFrame(() => this.scrollCurrentIntoView());
      return;
    }
    current.scrollIntoView({ behavior: "instant", block: "nearest", inline: "center", container: "nearest" });
  }

  emitUpdate(activeStepIndex) {
    this.dispatchEvent(new CustomEvent("update", { detail: { activeStepIndex }, bubbles: false }));
  }

  onItemClick = (e) => {
    const items = this.stepItems();
    const path = e.composedPath();
    const target = items.find((el) => path.includes(el));
    if (target) this.emitUpdate(items.indexOf(target));
  };

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => {
      this.requestUpdate();
      this.updateComplete.then(() => requestAnimationFrame(() => this.scrollCurrentIntoView()));
    });
    this._childObserver.observe(this, { childList: true, characterData: true, subtree: true });
    queueMicrotask(() => {
      this.requestUpdate();
      this.updateComplete.then(() => requestAnimationFrame(() => this.scrollCurrentIntoView()));
    });
    this.addEventListener("click", this.onItemClick);
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    this._resizeObserver?.disconnect();
    this.removeEventListener("click", this.onItemClick);
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.syncScrollerAria();
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this.syncScrollerAria();
        this.requestUpdate();
        requestAnimationFrame(() => this.scrollCurrentIntoView());
      });
    });
    customElements.whenDefined("p-scroller").then(() => {
      this.syncScrollerAria();
      requestAnimationFrame(() => requestAnimationFrame(() => this.scrollCurrentIntoView()));
    });
    const scroller = this.renderRoot?.querySelector("p-scroller");
    if (scroller && typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver(() => this.scrollCurrentIntoView());
      this._resizeObserver.observe(scroller);
    }
  }

  render() {`;

const renderTemplate = `return html\`<div class="wrap"><style .innerHTML="\${this.cssText}"></style><p-scroller class="scroller" .aria=\${{ role: "list" }}><slot></slot></p-scroller></div>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(
    'const size = parse(this.size, "small");',
    'const size = parse(this.getAttribute("size") ?? this.size, "small");'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (!after.includes('@property() size') && !after.includes('@property() size:')) {
  after = after.replace(
    'export default class LitStepperHorizontal extends LitElement {',
    'export default class LitStepperHorizontal extends LitElement {\n  @property() size: any;'
  );
}

after = after.replace('  render() {', extraGetters);

if (after.includes('my-fragment')) {
  console.error('build-lit-stepper-horizontal: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-stepper-horizontal")')) {
  console.error('build-lit-stepper-horizontal: expected @customElement("p-stepper-horizontal")');
  process.exit(1);
}

const required = [
  'class="wrap"',
  'class="scroller"',
  'scrollCurrentIntoView',
  'behavior: "instant"',
  'role: "list"',
  'slotchange',
  'MutationObserver',
  'p-scroller',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-stepper-horizontal: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('lit-stepper-horizontal') || after.includes('delegatesFocus') || after.includes('formAssociated')) {
  console.error('build-lit-stepper-horizontal: generated output must stay p-* and not fake delegatesFocus/formAssociated');
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
