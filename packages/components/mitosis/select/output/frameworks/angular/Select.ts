/* mitosis-native-host: native angular from Select.lite.tsx */
import { NgModule } from "@angular/core";
import { scopeCss } from "../../../../_runtime/scope-css.js";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitSelectProps {
  label?: string;
  description?: string;
  message?: string;
  state?: string;
  hideLabel?: any;
  compact?: any;
  disabled?: any;
  required?: any;
  filter?: any;
  name?: string;
  value?: any;
  form?: string;
  dropdownDirection?: string;
}

@Component({
  selector: "lit-select",
  template: `
    <div class="p-select" data-pds="select">
    <div class="root">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(scopedCssText)"></style>
      <div class="label-wrapper">
        <label class="label" id="label" for="button"
          >{{labelText}} <slot name="label"></slot
        ></label>
        <slot name="label-after"></slot>
      </div>
      <span class="label" id="description"
        >{{descriptionText}} <slot name="description"></slot
      ></span>
      <button type="button" role="combobox" id="button">
        <span>{{selectedText}}</span>
        <p-icon name="arrow-head-down" color="primary"></p-icon>
      </button>
      <div>
        <div class="options" id="listbox"><slot></slot></div>
      </div>
      <span class="message" id="message"
        ><p-icon></p-icon> {{messageText}}</span
      >
    </div>
  
    </div>
  `,
  styles: [`
      .p-select {
        display: contents;
      }
      .p-select[hidden] {
        display: none !important;
      }
    `],
})
export default class LitSelect {
  @Input() disabled!: LitSelectProps["disabled"];
  @Input() compact!: LitSelectProps["compact"];
  @Input() state!: LitSelectProps["state"];
  @Input() message!: LitSelectProps["message"];
  @Input() hideLabel!: LitSelectProps["hideLabel"];
  @Input() label!: LitSelectProps["label"];
  @Input() description!: LitSelectProps["description"];
  @Input() required!: LitSelectProps["required"];

  get scopedCssText() {
    return scopeCss(this.cssText, ".p-select");
  }

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
    const disabled = isTrue(this.disabled);
    const compact = isTrue(this.compact);
    const formState =
      this.state === "success" || this.state === "error" ? this.state : "none";
    const message = this.message || "";
    const hasMsg =
      !!message && (formState === "success" || formState === "error");
    const hideLabel = parse(this.hideLabel, false);
    const hideBase =
      typeof hideLabel === "object" && hideLabel !== null
        ? pick(hideLabel, "base", false)
        : hideLabel;
    const scale = compact ? "0.64285714" : "1";
    const palettes: any = {
      none: {
        bg: "var(--p-color-frosted)",
        border: "var(--p-color-contrast-lower)",
        hover: "var(--p-color-primary)",
        message: "",
      },
      success: {
        bg: "var(--p-color-success-frosted-soft)",
        border: "var(--p-color-success)",
        hover: "var(--p-color-success)",
        message: "var(--p-color-success)",
      },
      error: {
        bg: "var(--p-color-error-frosted-soft)",
        border: "var(--p-color-error)",
        hover: "var(--p-color-error)",
        message: "var(--p-color-error)",
      },
    };
    const palette = palettes[formState] || palettes.none;
    const labelVisFor = (h: any) =>
      isTrue(h)
        ? "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap"
        : "min-width:fit-content;position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal";
    const descVisFor = (h: any) =>
      isTrue(h)
        ? "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;margin-top:calc(-1 * var(--p-spacing-static-xs))"
        : "position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal;margin-top:calc(-1 * var(--p-spacing-static-xs))";
    let out =
      "@keyframes fade-in{from{opacity:0}to{opacity:1}}" +
      ":host{display:block;--_p-select-a:" +
      scale +
      " !important;--_p-select-option-a:" +
      scale +
      " !important;--_p-optgroup-a:" +
      scale +
      " !important}" +
      ":host([hidden]){display:none !important}" +
      'slot[name="label-after"]{display:inline-block;vertical-align:top}' +
      'slot[name="label-after"]::slotted(*){margin-inline-start:var(--p-spacing-static-xs) !important}' +
      ".label-after{display:inline-block;vertical-align:top}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "button{all:unset;display:flex;align-items:center;gap:calc(22.4px * (var(--_p-select-a) - 0.64285714) + 4px);height:calc(var(--_p-select-a) * 3.5rem);box-sizing:border-box;min-width:0;padding-inline:calc(22.4px * (var(--_p-select-a) - 0.64285714) + 8px);border:1px solid var(--p-select-border-color," +
      palette.border +
      ");border-radius:" +
      (compact ? "var(--p-radius-lg)" : "var(--p-radius-xl)") +
      ";background:var(--p-select-background-color," +
      palette.bg +
      ");font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-select-text-color,var(--p-color-primary));cursor:" +
      (disabled ? "not-allowed" : "pointer");
    if (disabled) out += ";opacity:0.4";
    out +=
      ";transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}";
    if (!disabled) {
      out +=
        "button:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
        "@media(forced-colors:active){button:focus-visible{outline-color:Highlight}}" +
        "@media(hover:hover){button:hover,label:hover~button{border-color:var(--p-select-border-color," +
        palette.hover +
        ")}}";
    }
    if (disabled) {
      out += "@media(forced-colors:active){button{opacity:1;color:GrayText}}";
    }
    out +=
      "button img{font:var(--p-typescale-sm) var(--p-font-porsche-next);width:auto;height:var(--p-leading-normal);border-radius:var(--p-radius-sm)}" +
      "button span{flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
      "[popover]{all:unset;position:absolute;z-index:99;padding:calc(11.2px * (var(--_p-select-a) - 0.64285714) + 4px);display:none;flex-direction:column;gap:calc(11.2px * (var(--_p-select-a) - 0.64285714) + 4px);max-height:max(calc(224px), calc(50vh - 54px / 2 - 6px * 2));box-sizing:border-box;overflow:hidden auto;scrollbar-width:thin;scrollbar-color:auto;animation:var(--p-animation-duration,var(--p-duration-sm)) fade-in var(--p-ease-in-out) forwards;filter:drop-shadow(0 0 8px rgba(0,0,0,0.15));background:var(--p-color-canvas);border:1px solid var(--p-color-contrast-low);border-radius:var(--p-radius-xl)}" +
      "[popover]:not(:popover-open){display:none}" +
      'slot[name="selected"]{display:block;height:100%;flex-grow:1;overflow:hidden}' +
      ".root{display:grid;gap:var(--p-spacing-static-xs);min-width:calc(1rem + var(--p-spacing-static-md) + 1px * 2 + calc(9px + var(--p-spacing-static-md) / 2 + (var(--p-leading-normal) + var(--p-spacing-static-xs) * 2) * 1))}" +
      ".options{display:flex;flex-direction:column;gap:calc(11.2px * (var(--_p-select-a) - 0.64285714) + 4px)}" +
      ".icon{margin-inline-end:-3px;pointer-events:none;transform:rotate3d(0,0,1,0.0001deg);transition:transform var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}" +
      ".sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
    out += ".label-wrapper{" + labelVisFor(hideBase) + "}";
    out +=
      ".label{font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);cursor:" +
      (disabled ? "not-allowed" : "pointer") +
      ";color:var(--p-color-primary)";
    if (disabled) out += ";pointer-events:none;opacity:0.4";
    out +=
      ";transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);display:inline}.label:empty{display:none}.label:is(span){cursor:unset;font-size:var(--p-typescale-xs);color:var(--p-color-contrast-high);" +
      descVisFor(hideBase) +
      '}.label > slot[name="label"]::slotted(*){display:inline !important}.required{user-select:none}' +
      ".message{display:flex;gap:var(--p-spacing-static-xs);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next)";
    if (palette.message) out += ";color:" + palette.message;
    out +=
      ";transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}.message:empty{opacity:0;position:absolute}";
    if (!hasMsg)
      out +=
        ".message{opacity:0;position:absolute}.message p-icon{display:none}";
    if (disabled) {
      out += "@media(forced-colors:active){.label{opacity:1;color:GrayText}}";
    }
    const keys: any = {};
    if (typeof hideLabel === "object" && hideLabel !== null)
      for (const k of Object.keys(hideLabel)) keys[k] = 1;
    for (const bp of Object.keys(keys)) {
      if (bp === "base") continue;
      if (!minWidth[bp]) continue;
      const h = pick(hideLabel, bp, hideBase);
      out +=
        "@media(min-width:" +
        minWidth[bp] +
        "px){.label-wrapper{" +
        labelVisFor(h) +
        "}.label:is(span){" +
        descVisFor(h) +
        "}}";
    }
    return out;
  }
  get labelText() {
    return this.label || "";
  }
  get descriptionText() {
    return this.description || "";
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
  get isDisabled() {
    return (
      this.disabled === true || this.disabled === "true" || this.disabled === ""
    );
  }
  get isRequired() {
    return (
      this.required === true || this.required === "true" || this.required === ""
    );
  }
  get ariaInvalid() {
    return this.state === "error" ? "true" : "";
  }
  get messageRole() {
    return this.state === "success" ? "status" : "alert";
  }
  get selectedText() {
    return "";
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitSelect],
  imports: [CommonModule],
  exports: [LitSelect],
})
export class LitSelectModule {}
