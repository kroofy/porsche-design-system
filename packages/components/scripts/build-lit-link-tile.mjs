import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/link-tile');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-link-tile.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/LinkTile.ts'),
  resolve(mitosisDir, 'output/lit/LinkTile.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-link-tile: generated LinkTile.ts not found');
  process.exit(1);
}

const extraGetters = `  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: true });
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

  resolvedHref() {
    const href = this.href ?? this.getAttribute("href");
    if (href == null || href === "" || href === "undefined") return nothing;
    return href;
  }

  optionalAttr(raw) {
    if (raw == null || raw === "" || raw === "undefined") return nothing;
    return raw;
  }

  render() {`;

const renderTemplate = `const label = this.label ?? this.getAttribute("label") ?? "";
    const description = this.description ?? this.getAttribute("description") ?? "";
    const href = this.resolvedHref();
    const target = this.target ?? this.getAttribute("target") ?? "_self";
    const downloadAttr = this.optionalAttr(this.download ?? this.getAttribute("download"));
    const relAttr = this.optionalAttr(this.rel ?? this.getAttribute("rel"));
    return html\`<div class="root"><style .innerHTML="\${this.cssText}"></style><a href=\${href} target=\${target} download=\${downloadAttr} rel=\${relAttr} tabindex="-1" aria-hidden="true"></a><slot name="header"></slot><div class="media"><slot></slot></div><div class="footer"><p>\${description}</p><slot name="footer"></slot><p-link class="link-or-button-pure" variant="secondary" href=\${href} target=\${target} download=\${downloadAttr} rel=\${relAttr} hide-label="true" icon="arrow-right" compact="true">\${label}</p-link><p-link class="link-or-button" variant="secondary" href=\${href} target=\${target} download=\${downloadAttr} rel=\${relAttr}>\${label}</p-link></div></div>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+aspectRatio/g, '@property({ attribute: "aspect-ratio" }) aspectRatio')
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
  ['href', null],
  ['target', null],
  ['download', null],
  ['rel', null],
  ['aria', null],
];
for (const [prop, attr] of propsToEnsure) {
  const needle = attr ? `@property({ attribute: "${attr}" }) ${prop}` : `@property() ${prop}`;
  if (!after.includes(needle) && !after.includes(`@property() ${prop}:`) && !after.includes(`@property() ${prop}`)) {
    after = after.replace(
      'export default class LitLinkTile extends LitElement {',
      attr
        ? `export default class LitLinkTile extends LitElement {\n  @property({ attribute: "${attr}" }) ${prop}: any;`
        : `export default class LitLinkTile extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace('  render() {', extraGetters);

if (after.includes('my-fragment')) {
  console.error('build-lit-link-tile: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-link-tile")')) {
  console.error('build-lit-link-tile: expected @customElement("p-link-tile")');
  process.exit(1);
}

const required = [
  'class="root"',
  'class="media"',
  'class="footer"',
  'link-or-button-pure',
  'link-or-button',
  'p-link',
  'hasFooterSlot',
  'slot="footer"',
  'm: 1000',
  'MutationObserver',
  'slotchange',
  'queueMicrotask',
  'resolvedHref',
  'tabindex="-1"',
  'aria-hidden="true"',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-link-tile: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('lit-link-tile') || after.includes('delegatesFocus') || after.includes('formAssociated')) {
  console.error('build-lit-link-tile: generated output must stay p-* and not fake delegatesFocus/formAssociated');
  process.exit(1);
}
if (after.includes('cursor:') && after.includes('pointer')) {
  console.error('build-lit-link-tile: root must not set cursor (unlike button-tile)');
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
