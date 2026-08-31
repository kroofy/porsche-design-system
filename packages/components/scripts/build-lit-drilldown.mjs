import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/drilldown');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-drilldown.iife.js');

const env = {
  ...process.env,
  NODE_PATH: [probeNodeModules, resolve(componentsRoot, '../../node_modules')].join(':'),
};

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Drilldown.ts'),
  resolve(mitosisDir, 'output/lit/Drilldown.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-drilldown: generated Drilldown.ts not found');
  process.exit(1);
}

const extraMethods = `  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("slotchange", () => this.requestUpdate());
    this._onInternalUpdate = (e) => {
      e.stopPropagation();
    };
    this.addEventListener("internalUpdate", this._onInternalUpdate);
    queueMicrotask(() => this.requestUpdate());
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    this.removeEventListener("internalUpdate", this._onInternalUpdate);
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
    this.renderRoot?.querySelector(".back")?.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("update", { bubbles: false, composed: true, detail: { activeIdentifier: undefined } }));
    });
    this.renderRoot?.querySelectorAll(".dismiss-mobile, .dismiss-desktop").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("dismiss", { bubbles: false, composed: true, detail: { reason: "dismiss-button" } }));
      });
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
      }
    } else if (dialog.open) {
      dialog.close();
    }
    dialog.inert = !this.isOpenFlag;
  }

  render() {
    const label = this.ariaLabelText || nothing;
    return html\`<style .innerHTML="\${this.cssText}"></style><dialog ?inert=\${!this.isOpenFlag} aria-label=\${label}><div class="drawer"><p-button-pure class="back" type="button" size="small" align-label="end" stretch="true" hide-label="true" icon="arrow-left">Back</p-button-pure><p-button class="dismiss-mobile" type="button" icon="close" compact="true" variant="secondary" hide-label="true">Dismiss drilldown</p-button><p-button class="dismiss-desktop" type="button" icon="close" variant="secondary" hide-label="true">Dismiss drilldown</p-button><div class="scroller"><slot></slot></div></div></dialog>\`;
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

after = after.replace(
  'const isOpen = isTrue(this.open);',
  'const isOpen = isTrue(this.open ?? this.getAttribute("open"));'
);
after = after.replace(
  /const activeId =\s*this\.activeIdentifier == null \|\| this\.activeIdentifier === ""\s*\? ""\s*: String\(this\.activeIdentifier\);/,
  `const rawActive = this.activeIdentifier ?? this.getAttribute("active-identifier") ?? this.getAttribute("activeidentifier");
    const activeId = rawActive == null || rawActive === "" ? "" : String(rawActive);`
);
after = after.replace(
  'const isPrimary = true;',
  `let isPrimary = true;
    if (activeId) {
      const items = this.querySelectorAll("p-drilldown-item");
      for (const item of items) {
        if (item.getAttribute("identifier") === activeId) {
          isPrimary = item.parentElement === this;
          break;
        }
      }
    }`
);

after = after.replace(
  /get isOpenFlag\(\) \{[\s\S]*?\n  \}/,
  `get isOpenFlag() {
    const open = this.open ?? this.getAttribute("open");
    return open === true || open === "true" || open === "";
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
  console.error('build-lit-drilldown: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-drilldown")')) {
  console.error('build-lit-drilldown: expected @customElement("p-drilldown")');
  process.exit(1);
}
if (/\bclass="root"/.test(after) || after.includes("class='root'")) {
  console.error('build-lit-drilldown: dummy .root must not wrap the dialog');
  process.exit(1);
}
if (after.includes('href="undefined"') || after.includes("href='undefined'")) {
  console.error('build-lit-drilldown: omit href so it does not become undefined');
  process.exit(1);
}

const required = [
  'display:block',
  'visibility:hidden',
  'class="drawer"',
  'class="scroller"',
  'class="back"',
  'class="dismiss-mobile"',
  'class="dismiss-desktop"',
  'hide-label="true"',
  'stretch="true"',
  'compact="true"',
  'min-width:760px',
  'max-width:759px',
  'p-button-pure',
  'showModal',
  'isOpenFlag',
  'MutationObserver',
  'queueMicrotask',
  'cssText',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-drilldown: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (
  after.includes('lit-drilldown') ||
  after.includes('delegatesFocus') ||
  after.includes('formAssociated')
) {
  console.error('build-lit-drilldown: generated output must stay p-drilldown');
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
