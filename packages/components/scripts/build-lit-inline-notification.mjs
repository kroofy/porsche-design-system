import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/inline-notification');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-inline-notification.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/InlineNotification.ts'),
  resolve(mitosisDir, 'output/lit/InlineNotification.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-inline-notification: generated InlineNotification.ts not found');
  process.exit(1);
}

const renderTemplate = `return html\`<div class="notification" role=\${this.roleName} aria-live=\${this.ariaLive} aria-label=\${this.headingAria || nothing}>\${this.headingNode}\${this.descriptionNode}\${this.actionNode}\${this.dismissNode}</div>\`;`;

const extraGetters = `  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true });
    queueMicrotask(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
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
    return description ? html\`<p>\${description}</p>\` : html\`<slot></slot>\`;
  }
  get actionNode() {
    if (!this.hasAction) return nothing;
    return html\`<p-button-pure class="action" icon=\${this.actionIconName || nothing} loading=\${this.actionLoadingFlag || nothing}>\${this.actionLabelText}</p-button-pure>\`;
  }
  get dismissNode() {
    if (!this.showDismiss) return nothing;
    return html\`<button class="dismiss" type="button"><span>Close notification</span></button>\`;
  }

  updated() {
    this.applyHostStyle();
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
  .replace(/@property\(\)\s+actionLabel/g, '@property({ attribute: "action-label" }) actionLabel')
  .replace(/@property\(\)\s+actionIcon/g, '@property({ attribute: "action-icon" }) actionIcon')
  .replace(/@property\(\)\s+actionLoading/g, '@property({ attribute: "action-loading" }) actionLoading')
  .replaceAll(
    'const visual = this.state || "info";',
    'const visual = (this.getAttribute("state") ?? this.state) || "info";'
  )
  .replaceAll(
    'const heading = this.heading || "";',
    'const heading = (this.getAttribute("heading") ?? this.heading) || "";'
  )
  .replaceAll(
    'const actionLabel = this.actionLabel || "";',
    'const actionLabel = (this.getAttribute("action-label") ?? this.actionLabel) || "";'
  )
  .replaceAll(
    'let dismiss: any = this.dismissButton;',
    'let dismiss: any = this.getAttribute("dismiss-button") ?? this.dismissButton;'
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
    'return this.actionLabel || "";',
    'return (this.getAttribute("action-label") ?? this.actionLabel) || "";'
  )
  .replace(
    'return this.actionIcon || "arrow-right";',
    'return (this.getAttribute("action-icon") ?? this.actionIcon) || "arrow-right";'
  )
  .replace(
    'const loading = this.actionLoading;',
    'const loading = this.getAttribute("action-loading") ?? this.actionLoading;'
  )
  .replace(
    'const dismiss = this.dismissButton;',
    'const dismiss = this.getAttribute("dismiss-button") ?? this.dismissButton;'
  )
  .replace(
    'return !!(this.actionLabel || "");',
    'return !!((this.getAttribute("action-label") ?? this.actionLabel) || "");'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (!after.includes('@property() heading:') && !after.includes('@property() heading ')) {
  after = after.replace(
    'export default class LitInlineNotification extends LitElement {',
    `export default class LitInlineNotification extends LitElement {
  @property() heading: any;
  @property({ attribute: "heading-tag" }) headingTag: any;
  @property() description: any;
  @property() state: any;
  @property({ attribute: "dismiss-button" }) dismissButton: any;
  @property({ attribute: "action-label" }) actionLabel: any;
  @property({ attribute: "action-loading" }) actionLoading: any;
  @property({ attribute: "action-icon" }) actionIcon: any;`
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
  'get headingAria() {\n    return (this.getAttribute("heading") ?? this.heading) || "";\n  }',
  `get headingAria() {
    const heading = (this.getAttribute("heading") ?? this.heading) || "";
    if (heading) return heading;
    const slotted = this.querySelector('[slot="heading"]');
    return slotted ? (slotted.textContent || "").trim() : "";
  }`
);

if (after.includes('my-fragment')) {
  console.error('build-lit-inline-notification: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-inline-notification")')) {
  console.error('build-lit-inline-notification: expected @customElement("p-inline-notification")');
  process.exit(1);
}
if (
  !after.includes('class="notification"') ||
  !after.includes('class="action"') ||
  !after.includes('class="dismiss"') ||
  !after.includes('<p-button-pure') ||
  !after.includes('slot name="heading"') ||
  !after.includes('heading-tag') ||
  !after.includes('dismiss-button') ||
  !after.includes('action-label') ||
  !after.includes('action-icon') ||
  !after.includes('querySelector') ||
  !after.includes('MutationObserver') ||
  !(after.includes('min-width: 760px') || after.includes('min-width:760px'))
) {
  console.error('build-lit-inline-notification: expected notification layout, slots, kebab attrs, and slot detection');
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-inline-notification', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-inline-notification: ${err.message}`);
  process.exit(1);
}
if (
  after.includes('lit-inline-notification') ||
  after.includes('lit-button-pure') ||
  after.includes('lit-heading') ||
  after.includes('lit-icon')
) {
  console.error('build-lit-inline-notification: generated output must use p-* tags, not lit-*');
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
