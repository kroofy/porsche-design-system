import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitTabsProps {
  size?: any;
  activeTabIndex?: any;
  background?: string;
  compact?: any;
  weight?: string;
  aria?: any;
}

@customElement("p-tabs")
export default class LitTabs extends LitElement {
  @property() aria: any;
  @property() weight: any;
  static styles = css`
      :host([hidden]) {
          display: none !important;
        }
`;

  @property() size: any;
  @property() background: any;
  @property() compact: any;
  @property({ attribute: "active-tab-index" }) activeTabIndex: any;

  get cssText() {
    const minWidth: any = {
      xs: 480,
      s: 760,
      m: 1000,
      l: 1300,
      xl: 1760,
      xxl: 1920,
    };
    const parse = (raw: any, fallback: any) => {
      if (raw === undefined || raw === null || raw === "") return fallback;
      if (typeof raw === "string" && raw.charAt(0) === "{") {
        try {
          return JSON.parse(
            raw
              .replace(/'/g, '"')
              .replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":')
          );
        } catch (e) {
          return fallback;
        }
      }
      return raw;
    };
    const pick = (obj: any, key: any, fallback: any) => {
      if (obj && typeof obj === "object") {
        if (obj[key] === undefined) return fallback;
        return obj[key];
      }
      return obj;
    };
    const size = parse(this.getAttribute("size") ?? this.size, "small");
    let out =
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      ".root{margin-bottom:var(--p-spacing-static-sm)}" +
      ".wrap{display:contents}";
    if (size && typeof size === "object") {
      const sizeBase = pick(size, "base", "small");
      for (const bp in minWidth) {
        if (bp === "base") continue;
        if (!minWidth[bp]) continue;
        const s = pick(size, bp, sizeBase);
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){:host{--_p-tabs-size:" +
          s +
          "}}";
      }
    }
    return out;
  }
  get sizeValue() {
    return this.getAttribute("size") ?? this.size ?? "small";
  }
  get backgroundValue() {
    return this.background ?? this.getAttribute("background") ?? "none";
  }
  get isCompact() {
    return (
      (this.compact ?? this.getAttribute("compact")) === true || (this.compact ?? this.getAttribute("compact")) === "true" || (this.compact ?? this.getAttribute("compact")) === ""
    );
  }
  get activeIndex() {
    const raw = this.activeTabIndex;
    if (raw === undefined || raw === null || raw === "") return 0;
    const n = Number(raw);
    return Number.isInteger(n) ? n : 0;
  }

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
    this.dispatchEvent(new CustomEvent("update", { detail: { activeTabIndex: next }, bubbles: false }));
  };

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => {
      this.requestUpdate();
      this.updateComplete.then(() => this.syncPanels());
    });
    this._childObserver.observe(this, { childList: true });
    queueMicrotask(() => {
      this.requestUpdate();
      this.updateComplete.then(() => this.syncPanels());
    });
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    const bar = this.renderRoot?.querySelector("p-tabs-bar");
    bar?.removeEventListener("update", this.onBarUpdate);
    super.disconnectedCallback();
  }
  firstUpdated() {
    const bar = this.renderRoot?.querySelector("p-tabs-bar");
    bar?.addEventListener("update", this.onBarUpdate);
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this.syncPanels();
        this.requestUpdate();
      });
    });
    this.syncPanels();
  }
  updated() {
    this.syncPanels();
  }

  render() {
    const size = this.parsedSize();
    const background = this.parsedBackground();
    const compact = this.parsedCompact();
    const active = this.parsedActiveIndex();
    const aria = this.parsedAria();
    const labels = this.tabItems().map((el) => this.itemLabel(el));
    return html`<div class="wrap"><style .innerHTML="${this.cssText}"></style><p-tabs-bar class="root" size=${size} background=${background} ?compact=${compact} .activeTabIndex=${active} .aria=${aria}>${labels.map((label) => html`<button type="button">${label}</button>`)}</p-tabs-bar><slot></slot></div>`;
  }
}
