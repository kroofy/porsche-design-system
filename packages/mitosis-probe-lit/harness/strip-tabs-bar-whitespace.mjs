import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/TabsBar.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  'const compact = isTrue(this.compact);',
  'const compact = isTrue(this.compact ?? this.getAttribute("compact"));',
);
after = after.replace(
  'const background = this.background || "none";',
  'const background = this.background ?? this.getAttribute("background") ?? "none";',
);
after = after.replace(
  'const size = parse(this.size, "small");',
  'const size = parse(this.getAttribute("size") ?? this.size, "small");',
);
after = after.replace(
  'const tabCount = 0;',
  'const tabCount = this.tabCount();',
);
after = after.replace(
  'const rawIndex = this.activeTabIndex;',
  'const rawIndex = this.activeTabIndex ?? this.getAttribute("active-tab-index") ?? this.getAttribute("activetabindex");',
);
after = after.replace(
  /this\.compact === true \|\| this\.compact === "true" \|\| this\.compact === ""/,
  '(this.compact ?? this.getAttribute("compact")) === true || (this.compact ?? this.getAttribute("compact")) === "true" || (this.compact ?? this.getAttribute("compact")) === ""',
);

const propsToEnsure = ['background', 'size', 'compact', 'weight', 'activeTabIndex', 'aria'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitTabsBar extends LitElement {',
      `export default class LitTabsBar extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

const helpers = `
  tabChildren() {
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
  }

  scrollActiveIntoView() {
    const active = this.sanitizedIndex();
    if (active === undefined) return;
    const scroller = this.shadowRoot?.querySelector("p-scroller");
    const tab = this.tabChildren()[active];
    const scrollArea = scroller?.shadowRoot?.querySelector(".scroll");
    if (!scroller || !tab || !scrollArea) return;
    const tabRect = tab.getBoundingClientRect();
    const areaRect = scrollArea.getBoundingClientRect();
    const delta = tabRect.left + tabRect.width / 2 - (areaRect.left + areaRect.width / 2);
    scrollArea.scrollTo({ left: scrollArea.scrollLeft + delta, behavior: "instant" });
  }

  firstUpdated() {
    this.addEventListener("slotchange", () => {
      this.syncTabAria();
      this.requestUpdate();
      requestAnimationFrame(() => this.scrollActiveIntoView());
    });
    this.syncTabAria();
    customElements.whenDefined("p-scroller").then(() => {
      requestAnimationFrame(() => requestAnimationFrame(() => this.scrollActiveIntoView()));
    });
  }

  updated() {
    this.syncTabAria();
  }
`;

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `${helpers}
  render() {
    const compact = !!this.isCompact;
    const aria = this.scrollerAria();
    return html\`<div class="wrap"><style .innerHTML="\${this.cssText}"></style><p-scroller class="scroller" ?compact=\${compact} .aria=\${aria === nothing ? nothing : aria}><slot></slot><span class="bar"></span></p-scroller></div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-tabs-bar-whitespace: no tabs-bar patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-tabs-bar-whitespace: patched TabsBar.ts');
}
