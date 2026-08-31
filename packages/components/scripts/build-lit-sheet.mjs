import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/sheet');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-sheet.iife.js');

const env = {
  ...process.env,
  NODE_PATH: [probeNodeModules, resolve(componentsRoot, '../../node_modules')].join(':'),
};

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Sheet.ts'),
  resolve(mitosisDir, 'output/lit/Sheet.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-sheet: generated Sheet.ts not found');
  process.exit(1);
}

const extraMethods = `  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("slotchange", () => this.requestUpdate());
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
    this.renderRoot?.querySelector(".dismiss")?.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("dismiss", { bubbles: false, composed: true, detail: { reason: "dismiss-button" } }));
    });
  }

  updated() {
    const dialog = this.renderRoot?.querySelector("dialog");
    if (!dialog) return;
    if (this.isOpenFlag) {
      if (!dialog.open) {
        dialog.inert = true;
        dialog.showModal();
        dialog.inert = false;
        dialog.focus();
      }
    } else if (dialog.open) {
      dialog.close();
    }
    dialog.inert = !this.isOpenFlag;
  }

  render() {
    const dismiss = this.showDismiss
      ? html\`<button class="dismiss" type="button"><span>Dismiss sheet</span></button>\`
      : nothing;
    const label = this.ariaLabelText || nothing;
    return html\`<style .innerHTML="\${this.cssText}"></style><dialog ?inert=\${!this.isOpenFlag} tabindex="-1" aria-modal="true" aria-label=\${label}><div class="scroller"><div class="sheet">\${dismiss}<slot name="header"></slot><slot></slot></div></div></dialog>\`;
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

const attrFallbacks = [
  ['const isOpen = isTrue(this.open);', 'const isOpen = isTrue(this.open ?? this.getAttribute("open"));'],
  [
    'let dismiss: any = this.dismissButton;',
    'let dismiss: any = this.dismissButton ?? this.getAttribute("dismiss-button") ?? this.getAttribute("dismissbutton");',
  ],
  [
    'const background = this.background === "surface" ? "surface" : "canvas";',
    'const background = (this.background ?? this.getAttribute("background")) === "surface" ? "surface" : "canvas";',
  ],
];
for (const [from, to] of attrFallbacks) {
  after = after.replace(from, to);
}

after = after.replace(
  /get isOpenFlag\(\) \{[\s\S]*?\n  \}/,
  `get isOpenFlag() {
    const open = this.open ?? this.getAttribute("open");
    return open === true || open === "true" || open === "";
  }`
);
after = after.replace(
  /get showDismiss\(\) \{[\s\S]*?\n  \}/,
  `get showDismiss() {
    const dismiss = this.dismissButton ?? this.getAttribute("dismiss-button") ?? this.getAttribute("dismissbutton");
    if (dismiss === false || dismiss === "false") return false;
    return true;
  }`
);
after = after.replace(
  /get ariaLabelText\(\) \{[\s\S]*?\n  \}/,
  `get ariaLabelText() {
    const raw = this.aria ?? this.getAttribute("aria");
    if (raw && typeof raw === "object" && raw["aria-label"]) return raw["aria-label"];
    if (typeof raw === "string" && raw.charAt(0) === "{") {
      try {
        const parsed = JSON.parse(raw.replace(/'/g, '"'));
        return parsed["aria-label"] || "";
      } catch (e) {
        return "";
      }
    }
    return "";
  }`
);

after = after.replace(/  render\(\) \{[\s\S]*?\n  \}\n\}/, extraMethods);

if (after.includes('my-fragment')) {
  console.error('build-lit-sheet: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-sheet")')) {
  console.error('build-lit-sheet: expected @customElement("p-sheet")');
  process.exit(1);
}
if (/\bclass="root"/.test(after) || after.includes("class='root'")) {
  console.error('build-lit-sheet: dummy .root must not wrap the dialog');
  process.exit(1);
}

const required = [
  'display:contents',
  'width:0px',
  'visibility:hidden',
  'class="scroller"',
  'class="sheet"',
  'class="dismiss"',
  'Dismiss sheet',
  'slot name="header"',
  'showModal',
  'isOpenFlag',
  'translate3d(0,25vh,0)',
  'inset:0',
  'MutationObserver',
  'queueMicrotask',
  'cssText',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-sheet: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (
  after.includes('lit-sheet') ||
  after.includes('delegatesFocus') ||
  after.includes('formAssociated') ||
  after.includes('p-button-pure') ||
  after.includes('slot name="footer"') ||
  after.includes('slot name="sub-footer"') ||
  after.includes('--p-flyout-sticky-top')
) {
  console.error('build-lit-sheet: generated output must stay p-sheet without flyout extras');
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
