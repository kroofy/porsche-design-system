import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/toast-item');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-toast-item.iife.js');

const env = {
  ...process.env,
  NODE_PATH: [probeNodeModules, resolve(componentsRoot, '../../node_modules')].join(':'),
};

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/ToastItem.ts'),
  resolve(mitosisDir, 'output/lit/ToastItem.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-toast-item: generated ToastItem.ts not found');
  process.exit(1);
}

const extraMethods = `  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("popover", "manual");
    this.applyHostStyle();
    if (typeof this.showPopover === "function") {
      this.showPopover();
    }
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    queueMicrotask(() => {
      this.requestUpdate();
      if (typeof this.showPopover === "function" && !this.matches(":popover-open")) {
        this.showPopover();
      }
    });
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.renderRoot?.querySelector(".dismiss")?.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("dismiss", { bubbles: true, composed: true }));
    });
  }

  updated() {
    this.applyHostStyle();
    if (typeof this.showPopover === "function" && !this.matches(":popover-open")) {
      this.showPopover();
    }
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

  render() {
    return html\`<div class="notification"><p>\${this.textValue}</p><button class="dismiss" type="button"><span>Close notification message</span></button></div>\`;
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

after = after.replaceAll(
  'const visual = this.state || "info";',
  'const visual = this.state ?? this.getAttribute("state") ?? "info";'
);

after = after.replace(
  /get textValue\(\) \{[\s\S]*?\n  \}/,
  `get textValue() {
    return this.text ?? this.getAttribute("text") ?? "";
  }`
);

after = after.replace(/  render\(\) \{[\s\S]*?\n  \}\n\}/, extraMethods);

if (after.includes('my-fragment')) {
  console.error('build-lit-toast-item: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-toast-item")')) {
  console.error('build-lit-toast-item: expected @customElement("p-toast-item")');
  process.exit(1);
}
if (/\bclass="root"/.test(after) || after.includes("class='root'")) {
  console.error('build-lit-toast-item: dummy .root must not wrap the notification');
  process.exit(1);
}

const required = [
  'popover", "manual',
  'showPopover',
  'class="notification"',
  'class="dismiss"',
  'textValue',
  'getAttribute("text")',
  'getAttribute("state")',
  'min-width: 760px',
  'info-frosted',
  'hostStyle',
  'applyHostStyle',
  'static styles',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-toast-item: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('get cssText') || after.includes('.innerHTML')) {
  console.error('build-lit-toast-item: cssText/innerHTML stylesheet hack is not allowed');
  process.exit(1);
}
if (
  after.includes('lit-toast-item') ||
  after.includes('delegatesFocus') ||
  after.includes('formAssociated') ||
  after.includes('p-icon') ||
  after.includes('p-button-pure')
) {
  console.error('build-lit-toast-item: generated output must stay p-toast-item with a native dismiss button');
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
