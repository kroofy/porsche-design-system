import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/segmented-control-item');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-segmented-control-item.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/SegmentedControlItem.ts'),
  resolve(mitosisDir, 'output/lit/SegmentedControlItem.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-segmented-control-item: generated SegmentedControlItem.ts not found');
  process.exit(1);
}

const extraGetters = `  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this._lightDomObserver = new MutationObserver(() => this.requestUpdate());
    this._lightDomObserver.observe(this, { childList: true, characterData: true, subtree: true });
    queueMicrotask(() => this.requestUpdate());
    this.addEventListener("click", () => {
      if (this.isDisabled || this.isSelected) return;
      this.dispatchEvent(new CustomEvent("internalSegmentedControlItemUpdate", { bubbles: true }));
    });
    this.addEventListener("blur", (e) => {
      e.stopPropagation();
      const related = e.relatedTarget;
      if (!related || related.localName !== "p-segmented-control-item") {
        this.dispatchEvent(new CustomEvent("internalBlur", { bubbles: true }));
      }
    });
  }
  disconnectedCallback() {
    this._lightDomObserver?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
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

const renderTemplate = `return html\`<button type="button" aria-pressed=\${this.isSelected ? "true" : "false"} aria-disabled=\${this.isDisabled ? "true" : nothing}>\${this.labelNode}\${this.iconNode}<slot></slot></button>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+iconSource/g, '@property({ attribute: "icon-source" }) iconSource')
  .replace(/@property\(\)\s+disabledParent/g, '@property({ attribute: "disabled-parent" }) disabledParent')
  .replace(
    'const compact = isTrue(this.compact);',
    'const compact = isTrue(this.compact ?? this.getAttribute("compact"));'
  )
  .replace(
    'const disabled = isTrue(this.disabled) || isTrue(this.disabledParent);',
    'const disabled = isTrue(this.disabled ?? this.getAttribute("disabled")) || isTrue(this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent"));'
  )
  .replace(
    'const selected = isTrue(this.selected);',
    'const selected = isTrue(this.selected ?? this.getAttribute("selected"));'
  )
  .replace(
    /this\.state === "success" \|\| this\.state === "error" \? this\.state : "none"/,
    '(this.state ?? this.getAttribute("state")) === "success" || (this.state ?? this.getAttribute("state")) === "error" ? (this.state ?? this.getAttribute("state")) : "none"'
  )
  .replace('const icon = this.icon || "";', 'const icon = this.icon ?? this.getAttribute("icon") ?? "";')
  .replace(
    'const source = this.iconSource || "";',
    'const source = this.iconSource ?? this.getAttribute("icon-source") ?? this.getAttribute("iconsource") ?? "";'
  )
  .replace(
    'const hasSlotted = true;',
    'const hasSlotted = !!this.textContent?.trim() || [...this.childNodes].some((n) => n.nodeType === 1);'
  )
  .replaceAll('return this.label || "";', 'return this.label ?? this.getAttribute("label") ?? "";')
  .replaceAll('return this.icon || "";', 'return this.icon ?? this.getAttribute("icon") ?? "";')
  .replaceAll(
    'return this.iconSource || "";',
    'return this.iconSource ?? this.getAttribute("icon-source") ?? this.getAttribute("iconsource") ?? "";'
  )
  .replace(
    /return \(\s*this\.disabled === true \|\|\s*this\.disabled === "true" \|\|\s*this\.disabled === "" \|\|\s*this\.disabledParent === true \|\|\s*this\.disabledParent === "true" \|\|\s*this\.disabledParent === ""\s*\);/,
    `const disabled = this.disabled ?? this.getAttribute("disabled");
    const parent = this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent");
    return (
      disabled === true ||
      disabled === "true" ||
      disabled === "" ||
      parent === true ||
      parent === "true" ||
      parent === ""
    );`
  )
  .replace(
    /return \(\s*this\.selected === true \|\| this\.selected === "true" \|\| this\.selected === ""\s*\);/,
    'const selected = this.selected ?? this.getAttribute("selected");\n    return selected === true || selected === "true" || selected === "";'
  )
  .replace(
    'return this.selected === true || this.selected === "true" || this.selected === "";',
    'const selected = this.selected ?? this.getAttribute("selected");\n    return selected === true || selected === "true" || selected === "";'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

const nodeGetters = `  get labelNode() {
    const label = this.labelText;
    return label ? html\`<span>\${label}</span>\` : nothing;
  }
  get iconNode() {
    const icon = this.iconName;
    const source = this.iconSrc;
    if (!icon && !source) return nothing;
    return html\`<p-icon class="icon" name=\${icon || nothing} source=\${source || nothing} color="inherit" size="inherit" aria-hidden="true"></p-icon>\`;
  }

`;

after = after.replace('  render() {', `${nodeGetters}${extraGetters}`);

if (after.includes('my-fragment')) {
  console.error('build-lit-segmented-control-item: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-segmented-control-item")')) {
  console.error('build-lit-segmented-control-item: expected @customElement("p-segmented-control-item")');
  process.exit(1);
}

const required = [
  'class="icon"',
  '<slot',
  'hasSlotted',
  'icon-source',
  'disabled-parent',
  'slotchange',
  'internalSegmentedControlItemUpdate',
  'p-icon',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-segmented-control-item: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (
  after.includes('lit-segmented-control-item') ||
  after.includes('lit-icon') ||
  after.includes('delegatesFocus')
) {
  console.error('build-lit-segmented-control-item: generated output must stay p-* and not fake delegatesFocus');
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-segmented-control-item', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-segmented-control-item: ${err.message}`);
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
