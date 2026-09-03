import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/drilldown-item');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-drilldown-item.iife.js');

const env = {
  ...process.env,
  NODE_PATH: [probeNodeModules, resolve(componentsRoot, '../../node_modules')].join(':'),
};

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/DrilldownItem.ts'),
  resolve(mitosisDir, 'output/lit/DrilldownItem.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-drilldown-item: generated DrilldownItem.ts not found');
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
    this._slottedButton?.removeEventListener("click", this._onCascadeClick);
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
  }

  get isPrimaryFlag() {
    const raw = this.primary ?? this.getAttribute("primary");
    return raw === true || raw === "true" || raw === "";
  }

  get isSecondaryFlag() {
    const raw = this.secondary ?? this.getAttribute("secondary");
    return raw === true || raw === "true" || raw === "";
  }

  get isCascadeFlag() {
    const raw = this.cascade ?? this.getAttribute("cascade");
    return raw === true || raw === "true" || raw === "";
  }

  get identifierValue() {
    return this.identifier ?? this.getAttribute("identifier") ?? "";
  }

  _onCascadeClick = () => {
    const parent = this.parentElement;
    const isDrilldownParent = parent && parent.tagName === "P-DRILLDOWN";
    if (isDrilldownParent) {
      this._emitInternalUpdate(this.isSecondaryFlag ? undefined : this.identifierValue);
    } else if (!this.isSecondaryFlag) {
      this._emitInternalUpdate(this.identifierValue);
    }
  };

  _onBackClick = () => {
    this._emitInternalUpdate(this.identifierValue);
  };

  _emitInternalUpdate(activeIdentifier) {
    this.dispatchEvent(new CustomEvent("internalUpdate", {
      bubbles: true,
      detail: { activeIdentifier },
    }));
  }

  updated() {
    const scroller = this.renderRoot?.querySelector(".scroller");
    if (scroller && typeof scroller.scrollTo === "function") {
      scroller.scrollTo(0, 0);
    }
    const slotted = this.querySelector(":scope > [slot=button]");
    if (slotted !== this._slottedButton) {
      this._slottedButton?.removeEventListener("click", this._onCascadeClick);
      this._slottedButton = slotted;
      if (slotted) {
        slotted.addEventListener("click", this._onCascadeClick);
        slotted.setAttribute("aria-expanded", this.isSecondaryFlag ? "true" : "false");
      }
    } else if (slotted) {
      slotted.setAttribute("aria-expanded", this.isSecondaryFlag ? "true" : "false");
    }
  }

  render() {
    const label = this.labelValue || "";
    const isPrimary = this.isPrimaryFlag;
    const isSecondary = this.isSecondaryFlag;
    const isCascade = this.isCascadeFlag;
    const hasButton = !!this.querySelector(":scope > [slot=button]");
    const hasHeader = !!this.querySelector(":scope > [slot=header]");
    const cascade = hasButton
      ? html\`<slot name="button"></slot>\`
      : html\`<p-button-pure class="button" type="button" size="medium" align-label="start" stretch="true" icon="arrow-head-right" icon-source="http://localhost:3001/icons/arrow-head-right.304b330.svg" ?inert=\${isPrimary || isCascade} active=\${isSecondary ? "true" : nothing} aria-expanded=\${isSecondary ? "true" : "false"} @click=\${this._onCascadeClick}>\${label}</p-button-pure>\`;
    const header = hasHeader ? html\`<slot name="header"></slot>\` : html\`<h2>\${label}</h2>\`;
    return html\`<style .innerHTML="\${this.cssText}"></style>\${cascade}<p-button-pure class="back" type="button" size="small" align-label="end" stretch="true" icon="arrow-left" icon-source="http://localhost:3001/icons/arrow-left.e03c25b.svg" hide-label='{"base":true,"s":false}' @click=\${this._onBackClick}>\${label}</p-button-pure>\${header}<div class="drawer"><div class="scroller"><slot></slot></div></div>\`;
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
  'const isPrimary = isTrue(this.primary);',
  'const isPrimary = isTrue(this.primary ?? this.getAttribute("primary"));'
);
after = after.replace(
  'const isSecondary = isTrue(this.secondary);',
  'const isSecondary = isTrue(this.secondary ?? this.getAttribute("secondary"));'
);
after = after.replace(
  'const isCascade = isTrue(this.cascade);',
  'const isCascade = isTrue(this.cascade ?? this.getAttribute("cascade"));'
);

after = after.replace(
  /get labelValue\(\) \{[\s\S]*?\n  \}/,
  `get labelValue() {
    return this.label ?? this.getAttribute("label") ?? "";
  }`
);

const propsToEnsure = ['identifier', 'label', 'primary', 'secondary', 'cascade'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitDrilldownItem extends LitElement {',
      `export default class LitDrilldownItem extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace(/  render\(\) \{[\s\S]*?\n  \}\n\}/, extraMethods);

if (after.includes('my-fragment')) {
  console.error('build-lit-drilldown-item: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-drilldown-item")')) {
  console.error('build-lit-drilldown-item: expected @customElement("p-drilldown-item")');
  process.exit(1);
}
if (/\bclass="root"/.test(after) || after.includes("class='root'")) {
  console.error('build-lit-drilldown-item: dummy .root must not wrap the shadow tree');
  process.exit(1);
}
if (after.includes('href="undefined"') || after.includes("href='undefined'")) {
  console.error('build-lit-drilldown-item: omit href so it does not become undefined');
  process.exit(1);
}

const required = [
  'display:contents',
  'class="drawer"',
  'class="scroller"',
  'class="button"',
  'class="back"',
  'stretch="true"',
  '{"base":true,"s":false}',
  'min-width:760px',
  'max-width:759px',
  'p-button-pure',
  'slot name="button"',
  'slot name="header"',
  'MutationObserver',
  'queueMicrotask',
  'cssText',
  'arrow-head-right',
  'arrow-left',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-drilldown-item: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('"s":false') && after.includes('hide-label') && after.includes('"m":false')) {
  console.error('build-lit-drilldown-item: hide-label must use s=760, not m');
  process.exit(1);
}
if (
  after.includes('lit-drilldown-item') ||
  after.includes('delegatesFocus') ||
  after.includes('formAssociated')
) {
  console.error('build-lit-drilldown-item: generated output must stay p-drilldown-item');
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
