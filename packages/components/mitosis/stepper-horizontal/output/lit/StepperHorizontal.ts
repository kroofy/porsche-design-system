import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitStepperHorizontalProps {
  size?: any;
}

@customElement("p-stepper-horizontal")
export default class LitStepperHorizontal extends LitElement {
  static styles = css`
      :host([hidden]) {
          display: none !important;
        }
`;

  @property() size: any;

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
    const fontFor = (s: any) =>
      s === "medium" ? "var(--p-typescale-md)" : "var(--p-typescale-sm)";
    const size = parse(this.getAttribute("size") ?? this.size, "small");
    const sizeBase =
      typeof size === "object" && size !== null
        ? pick(size, "base", "small")
        : size;
    let out =
      ":host{display:grid}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      ".wrap{display:contents}" +
      ".scroller{place-self:flex-start;font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);font-size:" +
      fontFor(sizeBase) +
      "}";
    if (size && typeof size === "object") {
      for (const bp in minWidth) {
        if (bp === "base") continue;
        if (!minWidth[bp]) continue;
        const s = pick(size, bp, sizeBase);
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){.scroller{font-size:" +
          fontFor(s) +
          "}}";
      }
    }
    return out;
  }

  stepItems() {
    return [...this.children].filter((el) => el.tagName === "P-STEPPER-HORIZONTAL-ITEM");
  }

  currentItem() {
    return this.stepItems().find((el) => (el.state ?? el.getAttribute("state")) === "current");
  }

  syncScrollerAria() {
    const scroller = this.renderRoot?.querySelector("p-scroller");
    if (!scroller) return;
    scroller.setAttribute("role", "list");
  }

  iconSrc(name) {
    const files = {
      success: "success.b16d4c1.svg",
      warning: "warning.59927e6.svg",
      "arrow-head-left": "arrow-head-left.cf1395d.svg",
    };
    const file = files[name];
    if (!file) return "";
    return "http://localhost:3001/icons/" + file;
  }

  stampIcon(icon) {
    if (!icon) return;
    const existing = icon.source || icon.getAttribute("source") || "";
    if (existing.includes("/")) return;
    const name = icon.name || icon.getAttribute("name");
    const src = this.iconSrc(name);
    if (src) icon.source = src;
  }

  stampIcons() {
    let pending = false;
    for (const item of this.stepItems()) {
      const state = item.state ?? item.getAttribute("state");
      if (state !== "complete" && state !== "warning") continue;
      const icon = item.shadowRoot?.querySelector("p-icon");
      if (!icon) pending = true;
      else this.stampIcon(icon);
    }
    const card = this.closest("[data-card=stepper-horizontal]");
    if (card) {
      for (const btn of card.querySelectorAll("p-button")) {
        this.stampIcon(btn.shadowRoot?.querySelector("p-icon"));
      }
    }
    if (pending) requestAnimationFrame(() => this.stampIcons());
  }

  scrollCurrentIntoView() {
    const current = this.currentItem();
    if (!current) return;
    const rect = current.getBoundingClientRect();
    if (rect.width === 0) {
      requestAnimationFrame(() => this.scrollCurrentIntoView());
      return;
    }
    current.scrollIntoView({ behavior: "instant", block: "nearest", inline: "center", container: "nearest" });
  }

  emitUpdate(activeStepIndex) {
    this.dispatchEvent(new CustomEvent("update", { detail: { activeStepIndex }, bubbles: false }));
  }

  onItemClick = (e) => {
    const items = this.stepItems();
    const path = e.composedPath();
    const target = items.find((el) => path.includes(el));
    if (target) this.emitUpdate(items.indexOf(target));
  };

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => {
      this.requestUpdate();
      this.updateComplete.then(() => {
        this.stampIcons();
        requestAnimationFrame(() => this.scrollCurrentIntoView());
      });
    });
    this._childObserver.observe(this, { childList: true, characterData: true, subtree: true });
    queueMicrotask(() => {
      this.requestUpdate();
      this.updateComplete.then(() => {
        this.stampIcons();
        requestAnimationFrame(() => this.scrollCurrentIntoView());
      });
    });
    this.addEventListener("click", this.onItemClick);
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    this._resizeObserver?.disconnect();
    this.removeEventListener("click", this.onItemClick);
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.syncScrollerAria();
    this.stampIcons();
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this.syncScrollerAria();
        this.stampIcons();
        this.requestUpdate();
        requestAnimationFrame(() => this.scrollCurrentIntoView());
      });
    });
    customElements.whenDefined("p-scroller").then(() => {
      this.syncScrollerAria();
      this.stampIcons();
      requestAnimationFrame(() => requestAnimationFrame(() => this.scrollCurrentIntoView()));
    });
    customElements.whenDefined("p-stepper-horizontal-item").then(() => {
      requestAnimationFrame(() => this.stampIcons());
    });
    const scroller = this.renderRoot?.querySelector("p-scroller");
    if (scroller && typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver(() => this.scrollCurrentIntoView());
      this._resizeObserver.observe(scroller);
    }
  }

  render() {
    return html`<div class="wrap"><style .innerHTML="${this.cssText}"></style><p-scroller class="scroller" .aria=${{ role: "list" }}><slot></slot></p-scroller></div>`;
  }
}
