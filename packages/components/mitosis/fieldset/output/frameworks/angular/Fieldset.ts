/* mitosis-native-host: native angular from Fieldset.lite.tsx */
import { NgModule } from "@angular/core";
import { scopeCss } from "../../../../_runtime/scope-css.js";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitFieldsetProps {
  label?: string;
  labelSize?: string;
  required?: any;
  message?: string;
  state?: string;
  theme?: string;
}

@Component({
  selector: "lit-fieldset",
  template: `
    <div class="p-fieldset" data-pds="fieldset">
    <fieldset>
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(scopedCssText)"></style>
      <legend>{{labelText}}</legend>
      <slot></slot>
      <span class="message" id="message"
        ><p-icon aria-hidden="true"></p-icon> {{messageText}}</span
      >
    </fieldset>
  
    </div>
  `,
  styles: [`
      .p-fieldset {
        display: contents;
      }
      .p-fieldset[hidden] {
        display: none !important;
      }
    `],
})
export default class LitFieldset {
  @Input() state!: LitFieldsetProps["state"];
  @Input() message!: LitFieldsetProps["message"];
  @Input() label!: LitFieldsetProps["label"];
  @Input() labelSize!: LitFieldsetProps["labelSize"];

  get scopedCssText() {
    return scopeCss(this.cssText, ".p-fieldset");
  }

  get cssText() {
    const formState =
      this.state === "success" || this.state === "error" ? this.state : "none";
    const message = this.message || "";
    const hasMsg =
      !!message && (formState === "success" || formState === "error");
    const label = this.label || "";
    const hasLabel = !!label;
    const labelSize = this.labelSize || "medium";
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

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitFieldset],
  imports: [CommonModule],
  exports: [LitFieldset],
})
export class LitFieldsetModule {}
