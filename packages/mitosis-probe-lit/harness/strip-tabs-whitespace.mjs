import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Tabs.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  'const size = parse(this.size, "small");',
  'const size = parse(this.getAttribute("size") ?? this.size, "small");',
);

const propsToEnsure = ['size', 'activeTabIndex', 'background', 'compact', 'weight', 'aria'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitTabs extends LitElement {',
      `export default class LitTabs extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

const helpers = `
  tabItems() {
    return [...this.children].filter((el) => el.tagName === "P-TABS-ITEM");
  }

  itemLabel(el) {
    return el.label ?? el.getAttribute("label") ?? "";
  }

  parsedActiveIndex() {
    const raw = this.activeTabIndex ?? this.getAttribute("active-tab-index") ?? this.getAttribute("activetabindex");
    if (raw === undefined || raw === null || raw === "") return 0;
    const n = Number(raw);
    return Number.isInteger(n) ? n : 0;
  }

  parsedSize() {
    return this.getAttribute("size") ?? this.size ?? "small";
  }

  parsedBackground() {
    return this.background ?? this.getAttribute("background") ?? "none";
  }

  parsedCompact() {
    const raw = this.compact ?? this.getAttribute("compact");
    return raw === true || raw === "true" || raw === "";
  }

  parsedAria() {
    let extra = this.aria ?? this.getAttribute("aria");
    if (typeof extra === "string" && extra.charAt(0) === "{") {
      try {
        extra = JSON.parse(extra.replace(/'/g, '"'));
      } catch (e) {
        extra = undefined;
      }
    }
    return extra && typeof extra === "object" ? extra : nothing;
  }

  syncPanels() {
    const items = this.tabItems();
    const active = this.parsedActiveIndex();
    items.forEach((tab, index) => {
      tab.setAttribute("role", "tabpanel");
      tab.setAttribute("aria-label", this.itemLabel(tab));
      if (index === active) {
        tab.removeAttribute("hidden");
        tab.setAttribute("tabindex", "0");
      } else {
        tab.setAttribute("hidden", "");
        tab.removeAttribute("tabindex");
      }
    });
  }

  onBarUpdate = (e) => {
    e.stopPropagation();
    const next = e.detail?.activeTabIndex;
    if (next === undefined || next === null) return;
    this.activeTabIndex = next;
    this.setAttribute("active-tab-index", String(next));
    this.syncPanels();
    this.requestUpdate();
  };

  firstUpdated() {
    const bar = this.shadowRoot?.querySelector("p-tabs-bar");
    bar?.addEventListener("update", this.onBarUpdate);
    this.addEventListener("slotchange", () => {
      this.syncPanels();
      this.requestUpdate();
    });
    this.syncPanels();
  }

  updated() {
    this.syncPanels();
  }
`;

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `${helpers}
  render() {
    const size = this.parsedSize();
    const background = this.parsedBackground();
    const compact = this.parsedCompact();
    const active = this.parsedActiveIndex();
    const aria = this.parsedAria();
    const labels = this.tabItems().map((el) => this.itemLabel(el));
    return html\`<div class="wrap"><style .innerHTML="\${this.cssText}"></style><p-tabs-bar class="root" size=\${size} background=\${background} ?compact=\${compact} .activeTabIndex=\${active} .aria=\${aria}>\${labels.map((label) => html\`<button type="button">\${label}</button>\`)}</p-tabs-bar><slot></slot></div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-tabs-whitespace: no tabs patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-tabs-whitespace: patched Tabs.ts');
}
