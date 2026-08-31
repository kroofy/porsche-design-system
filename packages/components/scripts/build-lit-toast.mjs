import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/toast');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-toast.iife.js');

const env = {
  ...process.env,
  NODE_PATH: [probeNodeModules, resolve(componentsRoot, '../../node_modules')].join(':'),
};

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Toast.ts'),
  resolve(mitosisDir, 'output/lit/Toast.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-toast: generated Toast.ts not found');
  process.exit(1);
}

const extraMethods = `  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "status");
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("slotchange", () => this.requestUpdate());
    this.addEventListener("dismiss", (e) => {
      e.stopPropagation();
      this._toastMessage = undefined;
      this.requestUpdate();
    });
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

  addMessage(message) {
    if (!message || !message.text) {
      throw new Error("[Porsche Design System] p-toast empty text provided to addMessage().");
    }
    this._toastMessage = {
      text: String(message.text).replace(/<(?!br)[^>]*>/g, ""),
      state: message.state || "info",
    };
    this.requestUpdate();
  }

  render() {
    const toast = this._toastMessage;
    return toast
      ? html\`<style .innerHTML="\${this.cssText}"></style><p-toast-item text="\${toast.text}" state="\${toast.state}"></p-toast-item>\`
      : html\`<style .innerHTML="\${this.cssText}"></style><slot></slot>\`;
  }
}`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  );

after = after.replace(/  render\(\) \{[\s\S]*?\n  \}\n\}/, extraMethods);

if (after.includes('my-fragment')) {
  console.error('build-lit-toast: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-toast")')) {
  console.error('build-lit-toast: expected @customElement("p-toast")');
  process.exit(1);
}
if (/\bclass="root"/.test(after) || after.includes("class='root'")) {
  console.error('build-lit-toast: dummy .root must be stripped so the host stays position:fixed');
  process.exit(1);
}

const required = [
  'position:fixed',
  '--_p-toast-a',
  'z-index:999999',
  'min-width:760px',
  'role", "status',
  'addMessage',
  'MutationObserver',
  'slotchange',
  'queueMicrotask',
  'cssText',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-toast: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('lit-toast') || after.includes('delegatesFocus') || after.includes('formAssociated')) {
  console.error('build-lit-toast: generated output must stay p-* and not fake delegatesFocus/formAssociated');
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
