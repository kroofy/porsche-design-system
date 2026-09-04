import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/flyout');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-flyout.iife.js');

const env = {
  ...process.env,
  NODE_PATH: [probeNodeModules, resolve(componentsRoot, '../../node_modules')].join(':'),
};

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Flyout.ts'),
  resolve(mitosisDir, 'output/lit/Flyout.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-flyout: generated Flyout.ts not found');
  process.exit(1);
}

const extraMethods = `  applyHostStyle() {
    const vars = this.hostStyle;
    if (!vars) return;
    for (const name of Object.keys(vars)) {
      const value = vars[name];
      if (value == null || value === "") this.style.removeProperty(name);
      else this.style.setProperty(name, String(value));
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("slotchange", () => this.requestUpdate());
    queueMicrotask(() => this.requestUpdate());
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    this._headerResize?.disconnect();
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
    this.applyHostStyle();
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
    if (this.shadowRoot && "adoptedStyleSheets" in this.shadowRoot && !this._stickySheet) {
      this._stickySheet = new CSSStyleSheet();
      this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, this._stickySheet];
      this._stickySheet.replaceSync(":host{--p-flyout-sticky-top:0px}");
    }
    const headerSlot = this.shadowRoot?.querySelector('slot[name="header"]');
    const headerEl = headerSlot?.assignedElements?.()[0];
    if (headerEl && this._stickySheet && !this._headerResize) {
      this._headerResize = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this._stickySheet.replaceSync(":host{--p-flyout-sticky-top:" + Math.floor(entry.target.getBoundingClientRect().height) + "px}");
        }
      });
      this._headerResize.observe(headerEl);
    }
  }

  render() {
    const dismiss = html\`<button class="dismiss" type="button"><span>Dismiss flyout</span></button>\`;
    const label = this.ariaLabelText || nothing;
    return html\`<dialog ?inert=\${!this.isOpenFlag} tabindex="-1" aria-modal="true" aria-label=\${label}><div class="scroller"><div class="flyout">\${dismiss}<slot name="header"></slot><slot></slot><slot name="footer"></slot><slot name="sub-footer"></slot></div></div></dialog>\`;
  }
}`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+footerBehavior/g, '@property({ attribute: "footer-behavior" }) footerBehavior')
  .replace(/@property\(\)\s+disableBackdropClick/g, '@property({ attribute: "disable-backdrop-click" }) disableBackdropClick');

const attrFallbacks = [
  ['const isOpen = isTrue(this.open);', 'const isOpen = isTrue(this.open ?? this.getAttribute("open"));'],
  [
    'const background = this.background === "surface" ? "surface" : "canvas";',
    'const background = (this.background ?? this.getAttribute("background")) === "surface" ? "surface" : "canvas";',
  ],
  [
    'const backdrop = this.backdrop === "shading" ? "shading" : "blur";',
    'const backdrop = (this.backdrop ?? this.getAttribute("backdrop")) === "shading" ? "shading" : "blur";',
  ],
  [
    'const position = this.position === "start" ? "start" : "end";',
    'const position = (this.position ?? this.getAttribute("position")) === "start" ? "start" : "end";',
  ],
  [
    'const isFooterFixed = this.footerBehavior === "fixed";',
    'const isFooterFixed = (this.footerBehavior ?? this.getAttribute("footer-behavior") ?? this.getAttribute("footerbehavior")) === "fixed";',
  ],
  ['let fullscreen: any = this.fullscreen;', 'let fullscreen: any = this.fullscreen ?? this.getAttribute("fullscreen");'],
  [
    'parse(this.fullscreen, false)',
    'parse(this.fullscreen ?? this.getAttribute("fullscreen"), false)',
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
  console.error('build-lit-flyout: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-flyout")')) {
  console.error('build-lit-flyout: expected @customElement("p-flyout")');
  process.exit(1);
}
if (/\bclass="root"/.test(after) || after.includes("class='root'")) {
  console.error('build-lit-flyout: dummy .root must not wrap the dialog');
  process.exit(1);
}

const required = [
  'display: contents',
  'class="scroller"',
  'class="flyout"',
  'class="dismiss"',
  'Dismiss flyout',
  'slot name="header"',
  'slot name="footer"',
  'slot name="sub-footer"',
  'showModal',
  'isOpenFlag',
  'charAt(0) === "{"',
  '([{,]',
  'min-width: 760px',
  'grid-template-rows: auto 1fr auto',
  '--p-flyout-sticky-top',
  '--p-fo-w',
  'ResizeObserver',
  'MutationObserver',
  'queueMicrotask',
  'static styles',
  'hostStyle',
  'applyHostStyle',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-flyout: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('<style') || after.includes('.innerHTML') || after.includes('get cssText')) {
  console.error('build-lit-flyout: injected style must be gone');
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-flyout', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-flyout: ${err.message}`);
  process.exit(1);
}
if (
  after.includes('lit-flyout') ||
  after.includes('delegatesFocus') ||
  after.includes('formAssociated') ||
  after.includes('p-button-pure')
) {
  console.error('build-lit-flyout: generated output must stay p-flyout with a native dismiss button');
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
