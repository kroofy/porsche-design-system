import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/tabs-bar');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-tabs-bar.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/TabsBar.ts'),
  resolve(mitosisDir, 'output/lit/TabsBar.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-tabs-bar: generated TabsBar.ts not found');
  process.exit(1);
}

const extraGetters = `  tabChildren() {
    return [...this.children].filter((el) => el.tagName === "A" || el.tagName === "BUTTON");
  }

  tabCount() {
    return this.tabChildren().length;
  }

  isTabList() {
    return this.tabChildren()[0]?.tagName === "BUTTON";
  }

  sanitizedIndex() {
    const raw = this.activeTabIndex ?? this.getAttribute("active-tab-index") ?? this.getAttribute("activetabindex");
    if (raw === undefined || raw === null || raw === "") return undefined;
    const n = Number(raw);
    const count = this.tabCount();
    if (!Number.isInteger(n) || count < 1 || n < 0 || n > count - 1) return undefined;
    return n;
  }

  scrollerAria() {
    if (!this.isTabList()) return nothing;
    let extra = this.aria ?? this.getAttribute("aria");
    if (typeof extra === "string" && extra.charAt(0) === "{") {
      try {
        extra = JSON.parse(extra.replace(/'/g, '"'));
      } catch (e) {
        extra = {};
      }
    }
    return { role: "tablist", ...(extra && typeof extra === "object" ? extra : {}) };
  }

  syncScrollerAria() {
    const scroller = this.renderRoot?.querySelector("p-scroller");
    if (!scroller) return;
    const aria = this.scrollerAria();
    if (aria === nothing) {
      scroller.removeAttribute("role");
      return;
    }
    scroller.setAttribute("role", "tablist");
    for (const [key, value] of Object.entries(aria)) {
      if (key === "role" || value === undefined || value === null) continue;
      scroller.setAttribute(key, String(value));
    }
  }

  syncTabAria() {
    const tabs = this.tabChildren();
    const active = this.sanitizedIndex();
    const list = this.isTabList();
    tabs.forEach((tab, index) => {
      const isActive = active === index;
      if (list) {
        tab.setAttribute("role", "tab");
        tab.setAttribute("tabindex", active !== undefined ? (isActive ? "0" : "-1") : index === 0 ? "0" : "-1");
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
        tab.removeAttribute("aria-current");
      } else {
        tab.setAttribute("aria-current", isActive ? "true" : "false");
        tab.removeAttribute("role");
      }
    });
    this.syncScrollerAria();
  }

  scrollActiveIntoView() {
    const active = this.sanitizedIndex();
    if (active === undefined) return;
    const scroller = this.renderRoot?.querySelector("p-scroller") ?? this.shadowRoot?.querySelector("p-scroller");
    const tab = this.tabChildren()[active];
    const scrollArea = scroller?.shadowRoot?.querySelector(".scroll");
    if (!scroller || !tab || !scrollArea) return;
    const tabRect = tab.getBoundingClientRect();
    const areaRect = scrollArea.getBoundingClientRect();
    const delta = tabRect.left + tabRect.width / 2 - (areaRect.left + areaRect.width / 2);
    scrollArea.scrollTo({ left: scrollArea.scrollLeft + delta, behavior: "instant" });
  }

  emitUpdate(activeTabIndex) {
    this.dispatchEvent(new CustomEvent("update", { detail: { activeTabIndex }, bubbles: false }));
  }

  onTabClick = (e) => {
    const tabs = this.tabChildren();
    const newIndex = tabs.findIndex((el) => el.contains(e.target));
    if (newIndex >= 0) this.emitUpdate(newIndex);
  };

  onTabKeydown = (e) => {
    let upcoming;
    const root = this.getRootNode();
    const hasPTabsParent = root?.host?.tagName === "P-TABS";
    const tabs = this.tabChildren();
    const activeElementIndex = hasPTabsParent
      ? (this.sanitizedIndex() ?? 0)
      : Math.max(tabs.indexOf(document.activeElement), 0);
    const target = e.target;
    const scroller = this.renderRoot?.querySelector("p-scroller");
    const isRtl = scroller ? window.getComputedStyle(scroller).direction === "rtl" : false;
    switch (e.key) {
      case "ArrowLeft":
      case "Left":
        upcoming = tabs.length ? (activeElementIndex + (isRtl ? 1 : -1) + tabs.length) % tabs.length : undefined;
        break;
      case "ArrowRight":
      case "Right":
        upcoming = tabs.length ? (activeElementIndex + (isRtl ? -1 : 1) + tabs.length) % tabs.length : undefined;
        break;
      case "Home":
        upcoming = 0;
        break;
      case "End":
        upcoming = tabs.length - 1;
        break;
      case "Tab": {
        if (target.matches?.("button")) {
          const { tabIndex } = target;
          target.removeAttribute("tabindex");
          setTimeout(() => {
            target.tabIndex = tabIndex;
          });
        }
        return;
      }
      default:
        return;
    }
    if (upcoming === undefined) return;
    if (hasPTabsParent) this.emitUpdate(upcoming);
    if (target.matches?.("button")) tabs[upcoming]?.focus();
    if (target.matches?.("button,a")) e.preventDefault();
  };

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => {
      this.requestUpdate();
      queueMicrotask(() => this.scrollActiveIntoView());
    });
    this._childObserver.observe(this, { childList: true, characterData: true, subtree: true });
    queueMicrotask(() => {
      this.requestUpdate();
      this.scrollActiveIntoView();
    });
    this.addEventListener("click", this.onTabClick);
    this.addEventListener("keydown", this.onTabKeydown);
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    this._resizeObserver?.disconnect();
    this.removeEventListener("click", this.onTabClick);
    this.removeEventListener("keydown", this.onTabKeydown);
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.syncTabAria();
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this.syncTabAria();
        this.requestUpdate();
        requestAnimationFrame(() => this.scrollActiveIntoView());
      });
    });
    customElements.whenDefined("p-scroller").then(() => {
      requestAnimationFrame(() => requestAnimationFrame(() => this.scrollActiveIntoView()));
    });
    const scroller = this.renderRoot?.querySelector("p-scroller");
    if (scroller && typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver(() => this.scrollActiveIntoView());
      this._resizeObserver.observe(scroller);
    }
  }
  updated() {
    this.syncTabAria();
    this.scrollActiveIntoView();
  }

  render() {`;

const renderTemplate = `const compact = !!this.isCompact;
    const aria = this.scrollerAria();
    return html\`<div class="wrap"><style .innerHTML="\${this.cssText}"></style><p-scroller class="scroller" ?compact=\${compact} .aria=\${aria === nothing ? nothing : aria}><slot></slot><span class="bar"></span></p-scroller></div>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+activeTabIndex/g, '@property({ attribute: "active-tab-index" }) activeTabIndex')
  .replace(
    'const compact = isTrue(this.compact);',
    'const compact = isTrue(this.compact ?? this.getAttribute("compact"));'
  )
  .replace(
    'const background = this.background || "none";',
    'const background = this.background ?? this.getAttribute("background") ?? "none";'
  )
  .replace(
    'const size = parse(this.size, "small");',
    'const size = parse(this.getAttribute("size") ?? this.size, "small");'
  )
  .replace('const tabCount = 0;', 'const tabCount = this.tabCount();')
  .replace(
    'const rawIndex = this.activeTabIndex;',
    'const rawIndex = this.activeTabIndex ?? this.getAttribute("active-tab-index") ?? this.getAttribute("activetabindex");'
  )
  .replace(
    /this\.compact === true \|\| this\.compact === "true" \|\| this\.compact === ""/,
    '(this.compact ?? this.getAttribute("compact")) === true || (this.compact ?? this.getAttribute("compact")) === "true" || (this.compact ?? this.getAttribute("compact")) === ""'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

const propsToEnsure = [
  ['background', null],
  ['size', null],
  ['compact', null],
  ['weight', null],
  ['activeTabIndex', 'active-tab-index'],
  ['aria', null],
];
for (const [prop, attr] of propsToEnsure) {
  const needle = attr
    ? `@property({ attribute: "${attr}" }) ${prop}`
    : `@property() ${prop}`;
  if (!after.includes(needle) && !after.includes(`@property() ${prop}:`) && !after.includes(`@property() ${prop}`)) {
    after = after.replace(
      'export default class LitTabsBar extends LitElement {',
      attr
        ? `export default class LitTabsBar extends LitElement {\n  @property({ attribute: "${attr}" }) ${prop}: any;`
        : `export default class LitTabsBar extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace('  render() {', extraGetters);

if (after.includes('my-fragment')) {
  console.error('build-lit-tabs-bar: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-tabs-bar")')) {
  console.error('build-lit-tabs-bar: expected @customElement("p-tabs-bar")');
  process.exit(1);
}

const required = [
  'class="wrap"',
  'class="scroller"',
  'class="bar"',
  'tabCount()',
  'scrollActiveIntoView',
  'behavior: "instant"',
  'slotchange',
  'MutationObserver',
  'active-tab-index',
  'p-scroller',
  'nth-child',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-tabs-bar: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (
  after.includes('lit-tabs-bar') ||
  after.includes('delegatesFocus') ||
  after.includes('formAssociated')
) {
  console.error('build-lit-tabs-bar: generated output must stay p-* and not fake delegatesFocus/formAssociated');
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
