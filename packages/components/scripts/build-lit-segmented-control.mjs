import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/segmented-control');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-segmented-control.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/SegmentedControl.ts'),
  resolve(mitosisDir, 'output/lit/SegmentedControl.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-segmented-control: generated SegmentedControl.ts not found');
  process.exit(1);
}

const extraGetters = `  itemChildren() {
    return [...this.children].filter(
      (el) => el.slot !== "label" && el.slot !== "label-after" && el.slot !== "message" && el.slot !== "description",
    );
  }

  measureItemWidths(compact) {
    const scaling = compact ? 0.5 : 1;
    const verticalPadding = "max(2px, var(--p-spacing-static-sm) * " + scaling + ")";
    const horizontalPadding = "calc(" + verticalPadding + " + 4px)";
    const padding = verticalPadding + " " + horizontalPadding;
    const dimension =
      "calc(max(var(--p-leading-normal), " +
      scaling +
      " * (var(--p-leading-normal) + 10px)) + (" +
      verticalPadding +
      " + 1px) * 2)";
    if (typeof document === "undefined") return { minWidth: dimension, maxWidth: 46 };
    const items = this.itemChildren();
    if (!items.length) return { minWidth: dimension, maxWidth: 46 };
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.border = "1px solid";
    tempDiv.style.boxSizing = "border-box";
    tempDiv.style.font = "normal normal 400 1rem/calc(6px + 2.125ex) Porsche Next, sans-serif";
    const root = document.body || this.shadowRoot || this;
    root.append(tempDiv);
    const widths = items.map((item) => {
      tempDiv.innerHTML = item.innerHTML;
      tempDiv.style.minWidth = dimension;
      tempDiv.style.padding = padding;
      if (item.icon || item.iconSource || item.getAttribute("icon") || item.getAttribute("icon-source")) {
        const tempIcon = document.createElement("div");
        tempIcon.style.display = "inline-block";
        tempIcon.style.width = "1.5rem";
        tempIcon.style.marginRight = ".25rem";
        tempDiv.prepend(tempIcon);
      }
      const label = item.label ?? item.getAttribute("label");
      if (label) {
        const tempLabel = document.createElement("div");
        tempLabel.style.font = "normal normal 400 .875rem/calc(6px + 2.125ex) Porsche Next, sans-serif";
        tempLabel.innerHTML = label;
        tempDiv.prepend(tempLabel);
      }
      return Number.parseFloat(getComputedStyle(tempDiv).width);
    });
    tempDiv.remove();
    const finite = widths.filter((w) => Number.isFinite(w));
    if (!finite.length) return this._measured || { minWidth: dimension, maxWidth: 80 };
    const next = { minWidth: dimension, maxWidth: Math.max(...finite) };
    this._measured = next;
    return next;
  }

  stampItem(item) {
    const value = this.value ?? this.getAttribute("value");
    const disabled = !!this.isDisabled;
    const compact =
      this.compact === true ||
      this.compact === "true" ||
      this.compact === "" ||
      this.getAttribute("compact") === "" ||
      this.getAttribute("compact") === "true";
    const state = this.state ?? this.getAttribute("state") ?? "none";
    const message = this.message ?? this.getAttribute("message") ?? "";
    const itemValue = item.value ?? item.getAttribute("value");
    item.selected = value !== null && value !== undefined && String(itemValue) === String(value);
    item.state = state;
    item.message = message;
    item.compact = compact;
    item.disabledParent = disabled;
    const icon = item.icon ?? item.getAttribute("icon");
    if (icon === "like" && !(item.iconSource || item.getAttribute("icon-source"))) {
      item.iconSource = "http://localhost:3001/icons/like.a7468cd.svg";
    }
  }

  syncItems() {
    for (const item of this.itemChildren()) this.stampItem(item);
  }

  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    const stampArg = (node) => {
      if (node && node.localName === "p-segmented-control-item") this.stampItem(node);
      if (node && node.nodeType === 11) {
        for (const child of node.childNodes) stampArg(child);
      }
    };
    for (const name of ["appendChild", "insertBefore", "append", "prepend"]) {
      const orig = this[name];
      if (typeof orig !== "function") continue;
      this[name] = (...args) => {
        for (const arg of args) stampArg(arg);
        return orig.apply(this, args);
      };
    }
    this._childObserver = new MutationObserver(() => {
      this.syncItems();
      this.requestUpdate();
    });
    this._childObserver.observe(this, { childList: true });
    queueMicrotask(() => {
      this.syncItems();
      this.requestUpdate();
    });
    this.addEventListener("internalSegmentedControlItemUpdate", (e) => {
      e.stopPropagation();
      if (this.isDisabled) return;
      const item = e.target;
      this.value = item.value ?? item.getAttribute("value");
      this.syncItems();
      this.requestUpdate();
    });
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this.syncItems();
        this.requestUpdate();
      });
    });
    this.syncItems();
  }
  updated() {
    this.applyHostStyle();
    this.syncItems();
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

const renderTemplate = `return html\`<fieldset class="root" ?disabled=\${!!this.isDisabled} aria-invalid=\${this.ariaInvalid || nothing} aria-labelledby=\${this.hasLabel ? "label" : nothing} aria-describedby=\${this.hasDescription ? "description" : nothing}>\${this.labelNode}\${this.descriptionNode}\${this.slotNode}<span class="message" id="message" role=\${this.messageRole}>\${this.iconNode}\${this.messageText}</span></fieldset>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+hideLabel/g, '@property({ attribute: "hide-label" }) hideLabel')
  .replace(/@property\(\)\s+noWrap/g, '@property({ attribute: "no-wrap" }) noWrap')
  .replace('const disabled = isTrue(this.disabled);', 'const disabled = isTrue(this.getAttribute("disabled") ?? this.disabled);')
  .replace('const compact = isTrue(this.compact);', 'const compact = isTrue(this.getAttribute("compact") ?? this.compact);')
  .replace(
    'const noWrap = isTrue(this.noWrap);',
    'const noWrap = isTrue(this.getAttribute("no-wrap") ?? this.getAttribute("nowrap") ?? this.noWrap);'
  )
  .replace(
    'const hideLabel = parse(this.hideLabel, false);',
    'const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);'
  )
  .replace(
    'const columns = parse(this.columns, "auto");',
    'const columns = parse(this.getAttribute("columns") ?? this.columns, "auto");'
  )
  .replace(
    'const formState = this.state === "success" || this.state === "error" ? this.state : "none";',
    'const formState = (this.getAttribute("state") ?? this.state) === "success" || (this.getAttribute("state") ?? this.state) === "error" ? (this.getAttribute("state") ?? this.state) : "none";'
  )
  .replace(
    'const message = this.message || "";',
    'const message = this.getAttribute("message") ?? this.message ?? "";'
  )
  .replace(
    /const measuredMin: any = 46;\s*const measuredMax: any = 80;/,
    'const measured = this.measureItemWidths(compact);\n    const measuredMin: any = measured.minWidth;\n    const measuredMax: any = measured.maxWidth;'
  )
  .replaceAll('return this.label || "";', 'return this.getAttribute("label") ?? this.label ?? "";')
  .replaceAll(
    'return this.description || "";',
    'return this.getAttribute("description") ?? this.description ?? "";'
  )
  .replaceAll(
    'const formState = this.state || "none";',
    'const formState = this.getAttribute("state") ?? this.state ?? "none";'
  )
  .replaceAll(
    'const message = this.message || "";',
    'const message = this.getAttribute("message") ?? this.message ?? "";'
  )
  .replaceAll(
    'return this.disabled === true || this.disabled === "true" || this.disabled === "";',
    'const disabled = this.getAttribute("disabled") ?? this.disabled;\n      return disabled === true || disabled === "true" || disabled === "";'
  )
  .replaceAll(
    'return this.required === true || this.required === "true" || this.required === "";',
    'const required = this.getAttribute("required") ?? this.required;\n      return required === true || required === "true" || required === "";'
  )
  .replaceAll('this.state === "error"', '(this.getAttribute("state") ?? this.state) === "error"')
  .replaceAll('this.state === "success"', '(this.getAttribute("state") ?? this.state) === "success"')
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (!after.includes('hide-label')) {
  after = after.replace(
    'export default class LitSegmentedControl extends LitElement {',
    `export default class LitSegmentedControl extends LitElement {
  @property() label: any;
  @property() description: any;
  @property() message: any;
  @property() state: any;
  @property({ attribute: "hide-label" }) hideLabel: any;
  @property() compact: any;
  @property() disabled: any;
  @property() required: any;
  @property() columns: any;
  @property({ attribute: "no-wrap" }) noWrap: any;
  @property() value: any;
  @property() name: any;
  @property() form: any;`
  );
}

after = after.replace('  render() {', extraGetters);

const nodeGetters = `  get hasLabel() {
    return !!this.labelText || !!this.querySelector('[slot="label"]');
  }
  get hasDescription() {
    return !!this.descriptionText || !!this.querySelector('[slot="description"]');
  }
  get hasLabelAfter() {
    return !!this.querySelector('[slot="label-after"]');
  }
  get isNoWrap() {
    const raw = this.getAttribute("no-wrap") ?? this.getAttribute("nowrap") ?? this.noWrap;
    return raw === true || raw === "true" || raw === "";
  }
  get labelNode() {
    if (!this.hasLabel) return nothing;
    const required = this.isRequired
      ? html\`<span class="required" aria-hidden="true"> *</span>\`
      : nothing;
    const after = this.hasLabelAfter ? html\`<slot name="label-after"></slot>\` : nothing;
    return html\`<div class="label-wrapper"><div class="label" id="label" aria-disabled=\${this.isDisabled ? "true" : nothing}>\${this.labelText}<slot name="label"></slot>\${required}</div>\${after}</div>\`;
  }
  get descriptionNode() {
    if (!this.hasDescription) return nothing;
    return html\`<span class="label" id="description" aria-disabled=\${this.isDisabled ? "true" : nothing}>\${this.descriptionText}<slot name="description"></slot></span>\`;
  }
  get slotNode() {
    if (this.isNoWrap) return html\`<p-scroller class="scroller"><slot></slot></p-scroller>\`;
    return html\`<slot></slot>\`;
  }
  get iconNode() {
    const icon = this.iconName;
    if (!icon) return nothing;
    const src =
      icon === "exclamation"
        ? "http://localhost:3001/icons/exclamation.46cd17b.svg"
        : "http://localhost:3001/icons/check.8ba06be.svg";
    return html\`<p-icon name=\${icon} source=\${src} color=\${this.iconColor || nothing} aria-hidden="true"></p-icon>\`;
  }

`;

after = after.replace('  itemChildren() {', `${nodeGetters}  itemChildren() {`);

if (after.includes('my-fragment')) {
  console.error('build-lit-segmented-control: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-segmented-control")')) {
  console.error('build-lit-segmented-control: expected @customElement("p-segmented-control")');
  process.exit(1);
}

const required = [
  'class="root"',
  'class="message"',
  'hide-label',
  'no-wrap',
  'measureItemWidths',
  'stampItem',
  'slotchange',
  'querySelector',
  '1000',
  'p-segmented-control-item',
  'like.a7468cd.svg',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-segmented-control: missing ${missing.join(', ')}`);
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-segmented-control', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-segmented-control: ${err.message}`);
  process.exit(1);
}
if (after.includes('lit-segmented-control') || after.includes('lit-icon') || after.includes('lit-scroller')) {
  console.error('build-lit-segmented-control: generated output must use p-* tags, not lit-*');
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
