import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitOptgroupProps {
  label?: string;
  disabled?: any;
  hidden?: any;
}

@customElement("p-optgroup")
export default class LitOptgroup extends LitElement {
  static styles = css`
      :host {
          display: block;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() disabled: any;
  @property() label: any;

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const disabled = isTrue(this.disabled ?? this.getAttribute("disabled"));
    let out =
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      "::slotted(*){--_p-select-option-b:calc(44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px);--_p-multi-select-option-b:calc(44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px)}" +
      '[role="group"]{display:flex;flex-direction:column;gap:calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px)}' +
      '[role="presentation"]{padding-block:calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px);padding-inline:calc(16.8px * (var(--_p-optgroup-a) - 0.64285714) + 6px);font:var(--p-font-weight-semibold) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-primary)';
    if (disabled) out += ";opacity:0.4";
    out += "}";
    if (disabled) {
      out +=
        '@media(forced-colors:active){[role="presentation"]{opacity:1;color:GrayText}}';
    }
    return out;
  }
  get labelText() {
    return this.getAttribute("label") ?? this.label ?? "";
  }
  get isDisabled() {
    return (
      (this.disabled ?? this.getAttribute("disabled")) === true || (this.disabled ?? this.getAttribute("disabled")) === "true" || (this.disabled ?? this.getAttribute("disabled")) === ""
    );
  }

  syncOptionsDisabled() {
    const disabled = !!this.isDisabled;
    for (const child of this.children) {
      child.disabledParent = disabled;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => {
      this.syncOptionsDisabled();
      this.requestUpdate();
    });
    this._childObserver.observe(this, { childList: true, characterData: true, subtree: true });
    queueMicrotask(() => {
      this.syncOptionsDisabled();
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
        this.syncOptionsDisabled();
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent("internalOptgroupUpdate", { bubbles: true }));
      });
    });
    this.syncOptionsDisabled();
  }
  updated() {
    this.syncOptionsDisabled();
  }

  render() {
    const disabled = !!this.isDisabled;
    const hidden = !!this.hasAttribute("hidden") || this.hidden === true;
    return html`<div role="group" aria-labelledby="label" aria-disabled=${disabled ? "true" : nothing} aria-hidden=${hidden ? "true" : nothing}><style .innerHTML="${this.cssText}"></style><span id="label" role="presentation">${this.labelText}</span><slot></slot></div>`;
  }
}
