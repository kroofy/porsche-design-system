import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/banner');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-banner.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Banner.ts'),
  resolve(mitosisDir, 'output/lit/Banner.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-banner: generated Banner.ts not found');
  process.exit(1);
}

const renderTemplate = `return html\`<div popover="manual" inert=\${this.isOpenFlag ? nothing : true} role=\${this.roleName} aria-live=\${this.ariaLive} aria-label=\${this.headingAria || nothing}><style .innerHTML="\${this.cssText}"></style><div class="notification">\${this.headingNode}\${this.descriptionNode}\${this.dismissNode}</div></div>\`;`;

const extraGetters = `  isInitialRender = true;
  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true });
    queueMicrotask(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }
  updated() {
    const pop = this.renderRoot?.querySelector("[popover]");
    if (pop) {
      if (this.isOpenFlag) {
        if (!pop.matches(":popover-open")) pop.showPopover();
      } else if (pop.matches(":popover-open")) {
        pop.hidePopover();
      }
    }
    if (this.isInitialRender) this.isInitialRender = false;
  }
  get headingNode() {
    const heading = this.headingText;
    if (heading) {
      const tag = this.headingTagValue;
      if (tag === "h1") return html\`<h1>\${heading}</h1>\`;
      if (tag === "h2") return html\`<h2>\${heading}</h2>\`;
      if (tag === "h3") return html\`<h3>\${heading}</h3>\`;
      if (tag === "h4") return html\`<h4>\${heading}</h4>\`;
      if (tag === "h6") return html\`<h6>\${heading}</h6>\`;
      return html\`<h5>\${heading}</h5>\`;
    }
    return this.hasHeadingSlot ? html\`<slot name="heading"></slot>\` : nothing;
  }
  get descriptionNode() {
    const description = this.descriptionText;
    if (description) return html\`<p>\${description}</p>\`;
    if (this.hasDescriptionSlot) return html\`<slot name="description"></slot>\`;
    return html\`<slot></slot>\`;
  }
  get dismissNode() {
    if (!this.showDismiss) return nothing;
    return html\`<button class="dismiss" type="button"><span>Close banner</span></button>\`;
  }

  render() {`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+headingTag/g, '@property({ attribute: "heading-tag" }) headingTag')
  .replace(/@property\(\)\s+dismissButton/g, '@property({ attribute: "dismiss-button" }) dismissButton')
  .replaceAll(
    'const visual = this.state || "info";',
    'const visual = (this.getAttribute("state") ?? this.state) || "info";'
  )
  .replaceAll(
    'const heading = this.heading || "";',
    'const heading = (this.getAttribute("heading") ?? this.heading) || "";'
  )
  .replaceAll(
    'let dismiss: any = this.dismissButton;',
    'let dismiss: any = this.getAttribute("dismiss-button") ?? this.dismissButton;'
  )
  .replaceAll(
    'let isOpen: any = this.open;',
    'let isOpen: any = this.getAttribute("open") ?? this.open;'
  )
  .replaceAll(
    'let position: any = this.position;',
    'let position: any = this.getAttribute("position") ?? this.position;'
  )
  .replaceAll(
    'return this.heading || "";',
    'return (this.getAttribute("heading") ?? this.heading) || "";'
  )
  .replace(
    'return this.headingTag || "h5";',
    'return (this.getAttribute("heading-tag") ?? this.headingTag) || "h5";'
  )
  .replace(
    'return this.description || "";',
    'return (this.getAttribute("description") ?? this.description) || "";'
  )
  .replace(
    'const dismiss = this.dismissButton;',
    'const dismiss = this.getAttribute("dismiss-button") ?? this.dismissButton;'
  )
  .replace(
    'const open = this.open;',
    'const open = this.getAttribute("open") ?? this.open;'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (!after.includes('@property() heading:') && !after.includes('@property() heading ')) {
  after = after.replace(
    'export default class LitBanner extends LitElement {',
    `export default class LitBanner extends LitElement {
  @property() open: any;
  @property() heading: any;
  @property({ attribute: "heading-tag" }) headingTag: any;
  @property() description: any;
  @property() position: any;
  @property() state: any;
  @property({ attribute: "dismiss-button" }) dismissButton: any;`
  );
}

if (after.includes('get headingNode()')) {
  after = after.replace(/  get headingNode\(\) \{[\s\S]*?\n  \}\n\n  render\(\) \{/, extraGetters);
} else {
  after = after.replace('  render() {', extraGetters);
}

after = after.replace(
  /get hasHeadingSlot\(\) \{\s*return false;\s*\}/,
  `get hasHeadingSlot() {
    return !!this.querySelector('[slot="heading"]');
  }`
);

after = after.replace(
  /get hasDescriptionSlot\(\) \{\s*return false;\s*\}/,
  `get hasDescriptionSlot() {
    return !!this.querySelector('[slot="description"]');
  }`
);

after = after.replace(
  'get headingAria() {\n    return (this.getAttribute("heading") ?? this.heading) || "";\n  }',
  `get headingAria() {
    const heading = (this.getAttribute("heading") ?? this.heading) || "";
    if (heading) return heading;
    const slotted = this.querySelector('[slot="heading"]');
    return slotted ? (slotted.textContent || "").trim() : "";
  }`
);

if (!after.includes('@starting-style')) {
  after = after.replace(
    '    return out;',
    `    if (isOpen && !this.isInitialRender) {
      out += "@starting-style{[popover]{transform:var(--_p-banner-a)}.notification{opacity:0}}";
    }
    return out;`
  );
}

if (after.includes('my-fragment')) {
  console.error('build-lit-banner: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-banner")')) {
  console.error('build-lit-banner: expected @customElement("p-banner")');
  process.exit(1);
}
const required = [
  'class="notification"',
  'class="dismiss"',
  'Close banner',
  'slot name="heading"',
  'slot name="description"',
  'heading-tag',
  'dismiss-button',
  'querySelector',
  'MutationObserver',
  'showPopover',
  'min-width:760px',
  'popover="manual"',
  'isInitialRender',
  '@starting-style',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-banner: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (
  after.includes('lit-banner') ||
  after.includes('lit-heading') ||
  after.includes('lit-text') ||
  after.includes('lit-button')
) {
  console.error('build-lit-banner: generated output must use p-* tags, not lit-*');
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
