import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitStepperHorizontalProps {
  size?: any;
}

@Component({
  selector: "lit-stepper-horizontal",
  template: `
    <div class="wrap">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(cssText)"></style>
      <p-scroller class="scroller"><slot></slot></p-scroller>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      :host([hidden]) {
        display: none !important;
      }
    `,
  ],
})
export default class LitStepperHorizontal {
  @Input() size!: LitStepperHorizontalProps["size"];

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
    const size = parse(this.size, "small");
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

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitStepperHorizontal],
  imports: [CommonModule],
  exports: [LitStepperHorizontal],
})
export class LitStepperHorizontalModule {}
