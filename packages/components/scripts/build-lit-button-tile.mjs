import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/button-tile');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-button-tile.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/ButtonTile.ts'),
  resolve(mitosisDir, 'output/lit/ButtonTile.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-button-tile: generated ButtonTile.ts not found');
  process.exit(1);
}

const extraGetters = `  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.onHostClick, true);
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: true });
    queueMicrotask(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    this.removeEventListener("click", this.onHostClick, true);
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
  }

  isDisabled() {
    const raw = this.disabled ?? this.getAttribute("disabled");
    return raw === true || raw === "true" || raw === "";
  }

  isLoading() {
    const raw = this.loading ?? this.getAttribute("loading");
    return raw === true || raw === "true" || raw === "";
  }

  onHostClick = (event) => {
    if (this.isDisabled() || this.isLoading()) event.stopPropagation();
  };

  render() {`;

const renderTemplate = `const label = this.label ?? this.getAttribute("label") ?? "";
    const description = this.description ?? this.getAttribute("description") ?? "";
    const icon = this.icon ?? this.getAttribute("icon") ?? "none";
    const iconSource = this.iconSource ?? this.getAttribute("icon-source") ?? this.getAttribute("iconsource") ?? "";
    const type = this.type ?? this.getAttribute("type") ?? "submit";
    const disabled = this.isDisabled();
    const loading = this.isLoading();
    const compactIcon = icon === "none" ? "arrow-right" : icon;
    const source = iconSource || nothing;
    return html\`<div class="root"><style .innerHTML="\${this.cssText}"></style><slot name="header"></slot><div class="media"><slot></slot></div><div class="footer"><p>\${description}</p><slot name="footer"></slot><p-button class="link-or-button-pure" variant="secondary" icon=\${compactIcon} type=\${type} ?disabled=\${disabled} ?loading=\${loading} hide-label="true" compact="true" .iconSource=\${source}>\${label}</p-button><p-button class="link-or-button" variant="secondary" icon=\${icon} type=\${type} ?disabled=\${disabled} ?loading=\${loading} .iconSource=\${source}>\${label}</p-button></div></div>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+aspectRatio/g, '@property({ attribute: "aspect-ratio" }) aspectRatio')
  .replace(/@property\(\)\s+iconSource/g, '@property({ attribute: "icon-source" }) iconSource')
  .replace(
    'const size = parse(this.size, "medium");',
    'const size = parse(this.size ?? this.getAttribute("size"), "medium");'
  )
  .replace(
    'const weight = parse(this.weight, "semi-bold");',
    'const weight = parse(this.weight ?? this.getAttribute("weight"), "semi-bold");'
  )
  .replace(
    'const aspectRatio = parse(this.aspectRatio, "4/3");',
    'const aspectRatio = parse(this.aspectRatio ?? this.getAttribute("aspect-ratio") ?? this.getAttribute("aspectratio"), "4/3");'
  )
  .replace(
    'let compact: any = parse(this.compact, false);',
    'let compact: any = parse(this.compact ?? this.getAttribute("compact"), false);'
  )
  .replace(
    'const align = this.align || "bottom";',
    'const align = this.align ?? this.getAttribute("align") ?? "bottom";'
  )
  .replace(
    'const disabled = isTrue(this.disabled);',
    'const disabled = isTrue(this.disabled ?? this.getAttribute("disabled"));'
  )
  .replace(
    'const loading = isTrue(this.loading);',
    'const loading = isTrue(this.loading ?? this.getAttribute("loading"));'
  )
  .replace(
    'const hasGradient = isTrue(this.gradient);',
    'const hasGradient = isTrue(this.gradient ?? this.getAttribute("gradient"));'
  )
  .replace('const hasFooterSlot = false;', 'const hasFooterSlot = !!this.querySelector(\'[slot="footer"]\');')
  .replaceAll(
    'if (this.compact === "true") compact = true;',
    'if ((this.compact ?? this.getAttribute("compact")) === "true") compact = true;'
  )
  .replaceAll(
    'if (this.compact === "false") compact = false;',
    'if ((this.compact ?? this.getAttribute("compact")) === "false") compact = false;'
  )
  .replace('return this.description || "";', 'return this.description ?? this.getAttribute("description") ?? "";')
  .replace('return this.label || "";', 'return this.label ?? this.getAttribute("label") ?? "";')
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

const propsToEnsure = [
  ['size', null],
  ['weight', null],
  ['aspectRatio', 'aspect-ratio'],
  ['label', null],
  ['description', null],
  ['align', null],
  ['gradient', null],
  ['compact', null],
  ['type', null],
  ['disabled', null],
  ['loading', null],
  ['icon', null],
  ['iconSource', 'icon-source'],
  ['aria', null],
];
for (const [prop, attr] of propsToEnsure) {
  const needle = attr ? `@property({ attribute: "${attr}" }) ${prop}` : `@property() ${prop}`;
  if (!after.includes(needle) && !after.includes(`@property() ${prop}:`) && !after.includes(`@property() ${prop}`)) {
    after = after.replace(
      'export default class LitButtonTile extends LitElement {',
      attr
        ? `export default class LitButtonTile extends LitElement {\n  @property({ attribute: "${attr}" }) ${prop}: any;`
        : `export default class LitButtonTile extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace('  render() {', extraGetters);

if (after.includes('my-fragment')) {
  console.error('build-lit-button-tile: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-button-tile")')) {
  console.error('build-lit-button-tile: expected @customElement("p-button-tile")');
  process.exit(1);
}

const required = [
  'class="root"',
  'class="media"',
  'class="footer"',
  'link-or-button-pure',
  'link-or-button',
  'p-button',
  'hasFooterSlot',
  'slot="footer"',
  'm: 1000',
  'MutationObserver',
  'slotchange',
  'queueMicrotask',
  'isDisabled',
  'isLoading',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-button-tile: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('lit-button-tile') || after.includes('delegatesFocus') || after.includes('formAssociated')) {
  console.error('build-lit-button-tile: generated output must stay p-* and not fake delegatesFocus/formAssociated');
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
