import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitFieldsetProps {
  label?: string;
  labelSize?: string;
  required?: any;
  message?: string;
  state?: string;
  theme?: string;
}

@customElement("lit-fieldset")
export default class LitFieldset extends LitElement {
  static styles = css`
      :host([hidden]) {
          display: none !important;
        }
`;

  @property() state: any;
  @property() message: any;
  @property() label: any;
  @property() required: any;
  @property() labelSize: any;

  get cssText() {
    const formState =
      this.state === "success" || this.state === "error" ? this.state : "none";
    const message = this.message || "";
    const hasMsg =
      !!message && (formState === "success" || formState === "error");
    const label = (this.label ?? this.getAttribute("label") ?? "") || "";
    const hasLabel = !!label;
    const labelSize = this.labelSize ?? this.getAttribute("label-size") ?? "medium";
    const small = labelSize === "small";
    const palettes: any = {
      none: "",
      success: "var(--p-color-success)",
      error: "var(--p-color-error)",
    };
    const messageColor = palettes[formState] || "";
    let out =
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "fieldset{all:unset;display:block}";
    if (hasLabel) {
      out +=
        "legend{all:unset;margin-bottom:var(--p-spacing-static-md);color:var(--p-color-primary);font:" +
        (small
          ? "var(--p-font-weight-semibold) var(--p-typescale-sm)"
          : "var(--p-font-weight-normal) var(--p-typescale-md)") +
        " / var(--p-leading-normal) var(--p-font-porsche-next)}";
    } else {
      out += "legend{display:none}";
    }
    out +=
      ".required{user-select:none}" +
      ".message{display:flex;gap:var(--p-spacing-static-xs);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next)";
    if (messageColor) out += ";color:" + messageColor;
    out +=
      ";transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);margin-top:var(--p-spacing-static-md)}.message:empty{opacity:0;position:absolute}";
    if (!hasMsg)
      out +=
        ".message{opacity:0;position:absolute}.message p-icon{display:none}";
    return out;
  }
  get labelText() {
    return this.label || "";
  }
  get messageText() {
    const formState = this.state || "none";
    const message = this.message || "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return message;
  }
  get iconName() {
    const formState = this.state || "none";
    const message = this.message || "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return formState === "error" ? "exclamation" : "check";
  }
  get iconColor() {
    const formState = this.state || "none";
    if (formState === "error") return "error";
    if (formState === "success") return "success";
    return "";
  }

  render() {
    return html`<fieldset><style .innerHTML="${this.cssText}"></style><legend>${this.labelText}</legend><slot></slot><span class="message" id="message"><p-icon name=${this.iconName || nothing} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>${this.messageText}</span></fieldset>`;
  }
}
