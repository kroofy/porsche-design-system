import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitStepperHorizontalProps {
  size?: any;
}

@customElement("lit-stepper-horizontal")
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

  scrollCurrentIntoView() {
    const current = this.currentItem();
    if (!current) return;
    current.scrollIntoView({ behavior: "instant", block: "nearest", inline: "center", container: "nearest" });
  }

  firstUpdated() {
    this.addEventListener("slotchange", () => {
      requestAnimationFrame(() => this.scrollCurrentIntoView());
    });
    customElements.whenDefined("p-scroller").then(() => {
      requestAnimationFrame(() => requestAnimationFrame(() => this.scrollCurrentIntoView()));
    });
  }

  render() {
    return html`<div class="wrap"><style .innerHTML="${this.cssText}"></style><p-scroller class="scroller" .aria=${{ role: "list" }}><slot></slot></p-scroller></div>`;
  }
}
