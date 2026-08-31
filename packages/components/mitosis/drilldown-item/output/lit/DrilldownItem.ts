import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitDrilldownItemProps {
  identifier?: any;
  label?: any;
  primary?: any;
  secondary?: any;
  cascade?: any;
}

@customElement("p-drilldown-item")
export default class LitDrilldownItem extends LitElement {
  @property() identifier: any;
  static styles = css`
      :host {
          display: contents;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() primary: any;
  @property() secondary: any;
  @property() cascade: any;
  @property() label: any;

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const isPrimary = isTrue(this.primary ?? this.getAttribute("primary"));
    const isSecondary = isTrue(this.secondary ?? this.getAttribute("secondary"));
    const isCascade = isTrue(this.cascade ?? this.getAttribute("cascade"));
    const animMd = "var(--p-animation-duration,var(--p-duration-md))";
    const easeBase = "var(--p-ease-in-out)";
    const slotGrid =
      "grid-template:var(--p-drilldown-grid-template,auto/auto);gap:var(--p-drilldown-gap,var(--p-spacing-fluid-xs));align-content:start;align-items:start;box-sizing:border-box;min-height:100%;height:fit-content;padding-block-end:var(--p-spacing-fluid-lg)";
    let headerSlot = 'slot[name="header"]{display:none}';
    let buttonSlot = "";
    if (isPrimary || isCascade)
      buttonSlot += 'slot[name="button"]{display:none}';
    let defaultSlot = "slot:not([name]){display:none}";
    let h2 = "h2{display:none}";
    let slottedExtra = "";
    if (isCascade)
      slottedExtra +=
        "::slotted(*:not([primary],[cascade])){display:none !important}";
    if (isPrimary)
      slottedExtra +=
        "@media(max-width:759px){::slotted(*:not([secondary])){display:none}}";
    let scroller =
      ".scroller{display:none;overflow:hidden auto;background:var(--_p-drilldown-f)}";
    let button = "";
    if (isPrimary || isCascade) button += ".button{display:none}";
    else
      button +=
        ".button{grid-column:1/-1;padding:var(--p-spacing-fluid-sm);margin:0 calc(var(--p-spacing-fluid-sm) * -1)}";
    let back = "";
    if (!isPrimary) back = ".back{display:none}";
    let mobile = "";
    let desktop = "";
    if (isSecondary) {
      headerSlot +=
        '@media(max-width:759px){slot[name="header"]{grid-area:2/3;display:grid;place-items:center;z-index:2}}';
      buttonSlot +=
        '@media(max-width:759px){slot[name="button"]{display:none}}';
      defaultSlot +=
        "@media(max-width:759px){slot:not([name]){grid-area:4/2/auto/-2;z-index:0;display:grid;" +
        slotGrid +
        ";animation:slide-up-mobile " +
        animMd +
        " " +
        easeBase +
        "}}";
      h2 +=
        "@media(max-width:759px){h2{font:var(--p-font-weight-semibold) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);display:block;grid-area:2/3;place-self:center;z-index:2;margin:0;padding-inline:var(--p-spacing-static-md);max-width:100%;box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--_p-drilldown-a)}}";
      scroller +=
        '@media(max-width:759px){.scroller{display:grid;grid-template-rows:subgrid;grid-template-columns:subgrid;grid-area:1/1/-1/-1}.scroller::before{z-index:1;content:"";position:sticky;top:0;grid-area:1/1/4/-1;background:linear-gradient(180deg,var(--_p-drilldown-b) 0%,var(--_p-drilldown-b) 65%,transparent 100%)}}' +
        "@media(min-width:760px){.scroller{grid-area:1/1/-1/-1;display:grid;grid-template-rows:subgrid;grid-template-columns:subgrid}}";
      button += "@media(max-width:759px){.button{display:none}}";
      mobile += ".drawer{display:contents}";
      desktop +=
        ".drawer{position:absolute;inset:0;inset-inline-start:clamp(338px, 210px + 18vw, 640px);display:grid;grid-template:var(--p-spacing-fluid-md) minmax(0, 1fr)/var(--p-spacing-fluid-lg) minmax(0, 1fr) var(--p-spacing-fluid-lg)}";
    }
    if (isPrimary || isCascade) {
      defaultSlot +=
        "@media(max-width:759px){slot:not([name]){display:contents}}";
      scroller +=
        "@media(max-width:759px){.scroller{display:contents}}@media(min-width:760px){.scroller{display:contents}}";
      mobile += ".drawer{display:contents}";
      desktop += ".drawer{display:contents}";
    }
    if (isPrimary || isSecondary) {
      defaultSlot +=
        "@media(min-width:760px){slot:not([name]){grid-area:3/2/auto/-2;display:grid;" +
        slotGrid +
        ";animation:slide-up-desktop-" +
        (isPrimary ? "primary" : "secondary") +
        " " +
        animMd +
        " " +
        easeBase +
        "}}";
    }
    if (isSecondary) {
      defaultSlot +=
        "@media(min-width:760px){slot:not([name]){grid-area:2/2/auto/-2;padding-block-end:var(--p-spacing-fluid-lg)}}";
    }
    if (isCascade) {
      defaultSlot +=
        "@media(min-width:760px){slot:not([name]){display:contents}}";
    }
    if (!isPrimary && !isSecondary && !isCascade) {
      mobile += ".drawer{display:none}";
      desktop += ".drawer{display:none}";
    } else if (!isPrimary && !isSecondary && isCascade) {
    } else if (!isSecondary && !(isPrimary || isCascade)) {
      mobile += ".drawer{display:none}";
      desktop += ".drawer{display:none}";
    }
    if (!mobile.includes(".drawer")) mobile += ".drawer{display:none}";
    if (!desktop.includes(".drawer")) desktop += ".drawer{display:none}";
    if (isPrimary) {
      back +=
        "@media(max-width:759px){.back{grid-area:2/2;margin-top:2px;width:fit-content;height:fit-content;place-self:start;z-index:2}}" +
        "@media(min-width:760px){.back{grid-area:2/2;margin-bottom:var(--p-spacing-fluid-md);width:fit-content;height:fit-content;margin-inline-start:-4px}}";
    }
    return (
      "@keyframes slide-up-mobile{from{transform:translate3d(0,var(--p-spacing-fluid-md),0)}to{transform:translate3d(0,0,0)}}" +
      "@keyframes slide-up-desktop-primary{from{margin-block-start:var(--p-spacing-fluid-md)}to{margin-block-start:0px}}" +
      "@keyframes slide-up-desktop-secondary{from{margin-block-start:var(--p-spacing-fluid-md)}to{margin-block-start:0px}}" +
      ":host{display:contents}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      headerSlot +
      buttonSlot +
      defaultSlot +
      h2 +
      slottedExtra +
      "::slotted(*){--p-drilldown-grid-template:auto/auto;--p-drilldown-gap:var(--p-spacing-fluid-xs)}" +
      scroller +
      button +
      back +
      "@media(min-width:760px){" +
      desktop +
      "}" +
      "@media(max-width:759px){" +
      mobile +
      "}"
    );
  }
  get labelValue() {
    return this.label ?? this.getAttribute("label") ?? "";
  }

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("slotchange", () => this.requestUpdate());
    queueMicrotask(() => this.requestUpdate());
  }

  disconnectedCallback() {
    this._slottedButton?.removeEventListener("click", this._onCascadeClick);
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
  }

  get isPrimaryFlag() {
    const raw = this.primary ?? this.getAttribute("primary");
    return raw === true || raw === "true" || raw === "";
  }

  get isSecondaryFlag() {
    const raw = this.secondary ?? this.getAttribute("secondary");
    return raw === true || raw === "true" || raw === "";
  }

  get isCascadeFlag() {
    const raw = this.cascade ?? this.getAttribute("cascade");
    return raw === true || raw === "true" || raw === "";
  }

  get identifierValue() {
    return this.identifier ?? this.getAttribute("identifier") ?? "";
  }

  _onCascadeClick = () => {
    const parent = this.parentElement;
    const isDrilldownParent = parent && parent.tagName === "P-DRILLDOWN";
    if (isDrilldownParent) {
      this._emitInternalUpdate(this.isSecondaryFlag ? undefined : this.identifierValue);
    } else if (!this.isSecondaryFlag) {
      this._emitInternalUpdate(this.identifierValue);
    }
  };

  _onBackClick = () => {
    this._emitInternalUpdate(this.identifierValue);
  };

  _emitInternalUpdate(activeIdentifier) {
    this.dispatchEvent(new CustomEvent("internalUpdate", {
      bubbles: true,
      detail: { activeIdentifier },
    }));
  }

  updated() {
    const scroller = this.renderRoot?.querySelector(".scroller");
    if (scroller && typeof scroller.scrollTo === "function") {
      scroller.scrollTo(0, 0);
    }
    const slotted = this.querySelector(":scope > [slot=button]");
    if (slotted !== this._slottedButton) {
      this._slottedButton?.removeEventListener("click", this._onCascadeClick);
      this._slottedButton = slotted;
      if (slotted) {
        slotted.addEventListener("click", this._onCascadeClick);
        slotted.setAttribute("aria-expanded", this.isSecondaryFlag ? "true" : "false");
      }
    } else if (slotted) {
      slotted.setAttribute("aria-expanded", this.isSecondaryFlag ? "true" : "false");
    }
  }

  render() {
    const label = this.labelValue || "";
    const isPrimary = this.isPrimaryFlag;
    const isSecondary = this.isSecondaryFlag;
    const isCascade = this.isCascadeFlag;
    const hasButton = !!this.querySelector(":scope > [slot=button]");
    const hasHeader = !!this.querySelector(":scope > [slot=header]");
    const cascade = hasButton
      ? html`<slot name="button"></slot>`
      : html`<p-button-pure class="button" type="button" size="medium" align-label="start" stretch="true" icon="arrow-head-right" icon-source="http://localhost:3001/icons/arrow-head-right.304b330.svg" ?inert=${isPrimary || isCascade} active=${isSecondary ? "true" : nothing} aria-expanded=${isSecondary ? "true" : "false"} @click=${this._onCascadeClick}>${label}</p-button-pure>`;
    const header = hasHeader ? html`<slot name="header"></slot>` : html`<h2>${label}</h2>`;
    return html`<style .innerHTML="${this.cssText}"></style>${cascade}<p-button-pure class="back" type="button" size="small" align-label="end" stretch="true" icon="arrow-left" icon-source="http://localhost:3001/icons/arrow-left.e03c25b.svg" hide-label='{"base":true,"s":false}' @click=${this._onBackClick}>${label}</p-button-pure>${header}<div class="drawer"><div class="scroller"><slot></slot></div></div>`;
  }
}
