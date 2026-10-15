import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitSwitchProps {
  alignLabel?: any;
  hideLabel?: any;
  stretch?: any;
  checked?: any;
  disabled?: any;
  loading?: any;
  compact?: any;
}

@customElement("lit-switch")
export default class LitSwitch extends LitElement {
  static styles = css`
      :host([hidden]) {
          display: none !important;
        }
`;

  @property() checked: any;
  @property() disabled: any;
  @property() loading: any;
  @property() compact: any;
  @property() alignLabel: any;
  @property() hideLabel: any;
  @property() stretch: any;

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
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const pick = (obj: any, key: any, fallback: any) => {
      if (obj && typeof obj === "object") {
        if (obj[key] === undefined) return fallback;
        return obj[key];
      }
      return obj;
    };
    const checked = isTrue(this.checked);
    const disabled = isTrue(this.disabled);
    const loading = isTrue(this.loading);
    const compact = isTrue(this.compact);
    const blocked = disabled || loading;
    const alignLabel = parse(this.getAttribute("align-label") ?? this.alignLabel, "end");
    const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);
    const stretch = parse(this.getAttribute("stretch") ?? this.stretch, false);
    const alignBase =
      typeof alignLabel === "object" && alignLabel !== null
        ? pick(alignLabel, "base", "end")
        : alignLabel;
    const hideBase =
      typeof hideLabel === "object" && hideLabel !== null
        ? pick(hideLabel, "base", false)
        : hideLabel;
    const stretchBase =
      typeof stretch === "object" && stretch !== null
        ? pick(stretch, "base", false)
        : stretch;
    const hostFor = (st: any) =>
      isTrue(st)
        ? "display:flex;justify-content:space-between !important;width:100% !important"
        : "display:inline-flex;justify-content:flex-start !important;width:auto !important;vertical-align:top !important";
    const orderFor = (al: any) => (al === "start" ? "-1" : "0");
    const labelVisFor = (h: any) =>
      isTrue(h)
        ? "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap"
        : "position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal;padding-top:max(0px, calc((calc(var(--_p-switch-a) * 1.75rem) - var(--p-leading-normal)) / 2))";
    const border = checked
      ? "var(--p-color-success-low)"
      : "var(--p-color-contrast-low)";
    const hoverBorder = checked
      ? "var(--p-color-success)"
      : "var(--p-color-primary)";
    const buttonBg = checked
      ? "var(--p-color-success-frosted-soft)"
      : "var(--p-color-frosted-soft)";
    const toggleBg = loading
      ? "transparent"
      : checked
      ? "var(--p-color-success)"
      : "var(--p-color-primary)";
    const toggleOff = "calc(var(--_p-switch-a) * .1875rem)";
    const toggleOn =
      "calc(calc(var(--_p-switch-a) * 3rem) - 1px * 2 - 100% - calc(var(--_p-switch-a) * .1875rem))";
    const toggleX = checked ? toggleOn : toggleOff;
    let out =
      ".wrap{display:contents}" +
      ":host{--_p-switch-a:" +
      (compact ? "0.64285714" : "1") +
      ";" +
      hostFor(stretchBase);
    if (disabled) out += ";opacity:0.4 !important";
    out +=
      ";outline:0 !important;font:var(--p-typescale-sm) var(--p-font-porsche-next) !important;gap:calc(11.2px * (var(--_p-switch-a) - 0.64285714) + 4px) !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "button{all:unset;position:relative;display:flex;align-items:center;flex-shrink:0;box-sizing:border-box;width:calc(var(--_p-switch-a) * 3rem);height:calc(var(--_p-switch-a) * 1.75rem);margin-block:max(0px, calc((var(--p-leading-normal) - calc(var(--_p-switch-a) * 1.75rem)) / 2));font:var(--p-typescale-sm) var(--p-font-porsche-next);border:1px solid " +
      border +
      ";border-radius:var(--p-radius-full);background:" +
      buttonBg +
      ";cursor:" +
      (blocked ? "not-allowed" : "pointer") +
      ";transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}" +
      "button:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
      'button::before{content:"";position:absolute;inset:calc(-1px - max(0px, calc(24px - calc(var(--_p-switch-a) * 1.75rem)) / 2))}' +
      "label{font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);min-width:0;min-height:0;cursor:" +
      (blocked ? "not-allowed" : "pointer") +
      ";color:var(--p-color-primary);order:" +
      orderFor(alignBase) +
      ";" +
      labelVisFor(hideBase) +
      "}" +
      ".toggle{display:flex;place-items:center;place-content:center;width:calc(var(--_p-switch-a) * 1.25rem);height:calc(var(--_p-switch-a) * 1.25rem);border-radius:var(--p-radius-full);background:" +
      toggleBg +
      ";transition:transform var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);transform:translate3d(" +
      toggleX +
      ", 0, 0)}" +
      ".toggle:dir(rtl){transform:translate3d(calc(" +
      toggleX +
      " * -1), 0, 0)}" +
      ".loading{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
    if (loading) {
      out += ".spinner{--p-spinner-size:calc(var(--_p-switch-a) * 1.75rem)}";
    } else {
      out += "p-spinner{display:none}";
    }
    if (disabled) {
      out +=
        "@media(forced-colors:active){:host{opacity:1 !important;color:GrayText !important}button{border-color:GrayText}button:focus-visible{outline-color:Highlight}label{color:GrayText}.toggle{background:CanvasText}}";
    } else if (loading) {
      out +=
        "@media(forced-colors:active){button{border-color:GrayText}button:focus-visible{outline-color:Highlight}label{color:GrayText}.toggle{background:CanvasText}}";
    } else {
      out +=
        "@media(forced-colors:active){button:focus-visible{outline-color:Highlight}.toggle{background:CanvasText}}";
    }
    if (!blocked) {
      out +=
        "@media(hover:hover){button:hover{border-color:" + hoverBorder + "}}";
    }
    const keys: any = {};
    if (typeof alignLabel === "object" && alignLabel !== null)
      for (const k of Object.keys(alignLabel)) keys[k] = 1;
    if (typeof hideLabel === "object" && hideLabel !== null)
      for (const k of Object.keys(hideLabel)) keys[k] = 1;
    if (typeof stretch === "object" && stretch !== null)
      for (const k of Object.keys(stretch)) keys[k] = 1;
    for (const bp of Object.keys(keys)) {
      if (bp === "base") continue;
      if (!minWidth[bp]) continue;
      const al = pick(alignLabel, bp, alignBase);
      const h = pick(hideLabel, bp, hideBase);
      const st = pick(stretch, bp, stretchBase);
      out +=
        "@media(min-width:" +
        minWidth[bp] +
        "px){:host{" +
        hostFor(st) +
        "}label{order:" +
        orderFor(al) +
        ";" +
        labelVisFor(h) +
        "}}";
    }
    return out;
  }
  get ariaDisabled() {
    const disabled =
      this.disabled === true ||
      this.disabled === "true" ||
      this.disabled === "";
    const loading =
      this.loading === true || this.loading === "true" || this.loading === "";
    return disabled || loading ? "true" : "";
  }
  get ariaChecked() {
    const checked =
      this.checked === true || this.checked === "true" || this.checked === "";
    return checked ? "true" : "false";
  }
  get loadingText() {
    const loading =
      this.loading === true || this.loading === "true" || this.loading === "";
    return loading ? "Loading" : "";
  }

  render() {
    return html`<div class="wrap"><style .innerHTML="${this.cssText}"></style><button type="button" role="switch" id="x" aria-checked=${this.ariaChecked} aria-disabled=${this.ariaDisabled || nothing} aria-labelledby="label"><span class="toggle"><p-spinner class="spinner" aria-hidden="true"></p-spinner></span></button><label id="label" for="x"><slot></slot></label><span class="loading" id="loading" role="status">${this.loadingText}</span></div>`;
  }
}
