import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitRadioGroupOptionProps {
  value?: any;
  label?: string;
  disabled?: any;
  loading?: any;
  selected?: any;
  disabledParent?: any;
  loadingParent?: any;
  name?: string;
  state?: string;
}

@customElement("lit-radio-group-option")
export default class LitRadioGroupOption extends LitElement {
  static styles = css`
      :host {
          display: block;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() disabled: any;
  @property() disabledParent: any;
  @property() selected: any;
  @property() loading: any;
  @property() loadingParent: any;
  @property() state: any;
  @property() label: any;
  @property() name: any;
  @property() value: any;

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const disabled = isTrue(this.disabled ?? this.getAttribute("disabled")) || isTrue(this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent"));
    const selected = isTrue(this.selected ?? this.getAttribute("selected"));
    const optionLoading = isTrue(this.loading ?? this.getAttribute("loading")) && !selected;
    const loading = optionLoading || isTrue(this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent"));
    const blocked = disabled || loading;
    const formState =
      (this.state ?? this.getAttribute("state")) === "success" || (this.state ?? this.getAttribute("state")) === "error" ? (this.state ?? this.getAttribute("state")) : "none";
    const palettes: any = {
      none: {
        bg: "var(--p-color-frosted)",
        border: "var(--p-color-contrast-lower)",
        hover: "var(--p-color-primary)",
        checked: "var(--p-color-primary)",
      },
      success: {
        bg: "var(--p-color-success-frosted-soft)",
        border: "var(--p-color-success)",
        hover: "var(--p-color-success)",
        checked: "var(--p-color-success)",
      },
      error: {
        bg: "var(--p-color-error-frosted-soft)",
        border: "var(--p-color-error)",
        hover: "var(--p-color-error)",
        checked: "var(--p-color-error)",
      },
    };
    const palette = palettes[formState] || palettes.none;
    const checkedIcon =
      'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>\') center/contain no-repeat';
    const dim = "calc(var(--_p-radio-group-option-a) * 1.75rem)";
    let out =
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      'slot[name="label-after"]{display:inline-block;vertical-align:top}' +
      'slot[name="label-after"]::slotted(*){margin-inline-start:var(--p-spacing-static-xs) !important}' +
      ".label-after{display:inline-block;vertical-align:top}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "input{all:unset;display:grid;width:" +
      dim +
      ";height:" +
      dim +
      ";margin-block:max(0px, calc((var(--p-leading-normal) - " +
      dim +
      ") / 2));box-sizing:border-box;font:var(--p-typescale-sm) var(--p-font-porsche-next);background:" +
      palette.bg +
      ";transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);border:1px solid " +
      palette.border +
      ";border-radius:var(--p-radius-full)";
    if (blocked) out += ";pointer-events:none";
    out +=
      "}input:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
      "input:checked{background:" +
      palette.checked +
      "}" +
      'input::before{content:"";grid-area:1/1}' +
      'input::after{content:"";margin:calc(-1px - max(0px, calc(24px - ' +
      dim +
      ") / 2));grid-area:1/1}" +
      "input:checked::before{-webkit-mask:" +
      checkedIcon +
      ";mask:" +
      checkedIcon +
      ";background-color:var(--p-color-canvas)}";
    if (blocked) {
      out +=
        "@media(forced-colors:active){input{border-color:GrayText}input:checked::before{background:CanvasText}input:focus-visible{outline-color:Highlight}}";
    } else {
      out +=
        "@media(forced-colors:active){input:checked::before{background:CanvasText}input:focus-visible{outline-color:Highlight}}" +
        "@media(hover:hover){input:hover{border-color:" +
        palette.hover +
        "}}";
    }
    out +=
      ".root{display:grid;grid-template-columns:auto minmax(0, 1fr);row-gap:var(--p-spacing-static-xs)}" +
      ".wrapper{position:relative;display:flex;align-items:center;align-self:flex-start;min-height:var(--p-leading-normal);cursor:" +
      (blocked ? "not-allowed" : "pointer");
    if (disabled) out += ";opacity:0.4";
    out += "}";
    if (loading) {
      out +=
        ".spinner{--p-spinner-size:calc(" +
        dim +
        " - 2px);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}";
    }
    out +=
      ".label-wrapper{min-width:fit-content;position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal;padding-top:max(0px, calc((" +
      dim +
      " - var(--p-leading-normal)) / 2));padding-inline-start:calc(11.2px * (var(--_p-radio-group-option-a) - 0.64285714) + 4px)}" +
      ".label{font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);cursor:" +
      (blocked ? "not-allowed" : "pointer") +
      ";color:var(--p-color-primary)";
    if (blocked) out += ";pointer-events:none";
    if (disabled) out += ";opacity:0.4";
    out +=
      ';transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);display:inline}.label:empty{display:none}.label:is(span){cursor:unset;font-size:var(--p-typescale-xs);color:var(--p-color-contrast-high);position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal;margin-top:calc(-1 * var(--p-spacing-static-xs))}.label > slot[name="label"]::slotted(*){display:inline !important}.required{user-select:none}' +
      ".loading{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
    if (disabled) {
      out +=
        "@media(forced-colors:active){.wrapper{opacity:1;color:GrayText}.label{opacity:1;color:GrayText}}";
    }
    return out;
  }
  get labelText() {
    return this.label ?? this.getAttribute("label") ?? "";
  }
  get isDisabled() {
    return (
      (this.disabled ?? this.getAttribute("disabled")) === true ||
      (this.disabled ?? this.getAttribute("disabled")) === "true" ||
      (this.disabled ?? this.getAttribute("disabled")) === "" ||
      (this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent")) === true ||
      (this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent")) === "true" ||
      (this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent")) === ""
    );
  }
  get isSelected() {
    return (
      (this.selected ?? this.getAttribute("selected")) === true || (this.selected ?? this.getAttribute("selected")) === "true" || (this.selected ?? this.getAttribute("selected")) === ""
    );
  }
  get isLoadingParent() {
    return (
      (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === true ||
      (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === "true" ||
      (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === ""
    );
  }
  get isOptionLoading() {
    const selected =
      (this.selected ?? this.getAttribute("selected")) === true ||
      (this.selected ?? this.getAttribute("selected")) === "true" ||
      (this.selected ?? this.getAttribute("selected")) === "";
    const loading =
      (this.loading ?? this.getAttribute("loading")) === true || (this.loading ?? this.getAttribute("loading")) === "true" || (this.loading ?? this.getAttribute("loading")) === "";
    return loading && !selected;
  }
  get isLoading() {
    const selected =
      (this.selected ?? this.getAttribute("selected")) === true ||
      (this.selected ?? this.getAttribute("selected")) === "true" ||
      (this.selected ?? this.getAttribute("selected")) === "";
    const loading =
      (this.loading ?? this.getAttribute("loading")) === true || (this.loading ?? this.getAttribute("loading")) === "true" || (this.loading ?? this.getAttribute("loading")) === "";
    const loadingParent =
      (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === true ||
      (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === "true" ||
      (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === "";
    return (loading && !selected) || loadingParent;
  }
  get loadingText() {
    const selected =
      (this.selected ?? this.getAttribute("selected")) === true ||
      (this.selected ?? this.getAttribute("selected")) === "true" ||
      (this.selected ?? this.getAttribute("selected")) === "";
    const loading =
      (this.loading ?? this.getAttribute("loading")) === true || (this.loading ?? this.getAttribute("loading")) === "true" || (this.loading ?? this.getAttribute("loading")) === "";
    const loadingParent =
      (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === true ||
      (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === "true" ||
      (this.loadingParent ?? this.getAttribute("loading-parent") ?? this.getAttribute("loadingparent")) === "";
    if (loadingParent) return "";
    if (loading && !selected) return "Loading";
    return "";
  }
  get ariaInvalid() {
    return (this.state ?? this.getAttribute("state")) === "error" ? "true" : "";
  }
  get inputName() {
    return this.name ?? this.getAttribute("name") ?? "";
  }
  get inputValue() {
    const rawValue = this.value ?? this.getAttribute("value");
    return rawValue == null ? "" : String(rawValue);
  }

  render() {
    const disabled = !!this.isDisabled;
    const selected = !!this.isSelected;
    const loading = !!this.isLoading;
    const optionLoading = !!this.isOptionLoading;
    const loadingParent = !!this.isLoadingParent;
    const spinner = optionLoading && !loadingParent
      ? html`<p-spinner class="spinner" aria-hidden="true"></p-spinner>`
      : nothing;
    const loadingMsg = loadingParent
      ? nothing
      : html`<span class="loading" id="loading" role="status">${this.loadingText}</span>`;
    const hasLabel = !!this.labelText || !!this.querySelector('[slot="label"]');
    const labelBlock = hasLabel
      ? html`<div class="label-wrapper"><label class="label" id="label" for="radio-group-option" aria-disabled=${disabled || loading ? "true" : nothing}>${this.labelText}<slot name="label"></slot></label><span class="label-after"><slot name="label-after"></slot></span></div>`
      : nothing;
    return html`<div class="root"><style .innerHTML="${this.cssText}"></style><div class="wrapper"><input id="radio-group-option" type="radio" name=${this.inputName || nothing} value=${this.inputValue} .checked=${selected} ?disabled=${disabled || loading} aria-invalid=${this.ariaInvalid || nothing} aria-disabled=${disabled || loading ? "true" : nothing} aria-describedby=${loading ? "loading" : nothing}>${spinner}</div>${labelBlock}${loadingMsg}</div>`;
  }
}
