import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitTabsProps {
  size?: any;
  activeTabIndex?: any;
  background?: string;
  compact?: any;
  weight?: string;
  aria?: any;
}

@Component({
  selector: "lit-tabs",
  template: `
    <div class="wrap">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(cssText)"></style>
      <p-tabs-bar
        class="root"
        [size]="sizeValue"
        [background]="backgroundValue"
        [compact]="isCompact"
        [activeTabIndex]="activeIndex"
      ></p-tabs-bar>
      <slot></slot>
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
export default class LitTabs {
  @Input() size!: LitTabsProps["size"];
  @Input() background!: LitTabsProps["background"];
  @Input() compact!: LitTabsProps["compact"];
  @Input() activeTabIndex!: LitTabsProps["activeTabIndex"];

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
    const size = parse(this.size, "small");
    let out =
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      ".root{margin-bottom:var(--p-spacing-static-sm)}" +
      ".wrap{display:contents}";
    if (size && typeof size === "object") {
      const sizeBase = pick(size, "base", "small");
      for (const bp in minWidth) {
        if (bp === "base") continue;
        if (!minWidth[bp]) continue;
        const s = pick(size, bp, sizeBase);
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){:host{--_p-tabs-size:" +
          s +
          "}}";
      }
    }
    return out;
  }
  get sizeValue() {
    return this.size || "small";
  }
  get backgroundValue() {
    return this.background || "none";
  }
  get isCompact() {
    return (
      this.compact === true || this.compact === "true" || this.compact === ""
    );
  }
  get activeIndex() {
    const raw = this.activeTabIndex;
    if (raw === undefined || raw === null || raw === "") return 0;
    const n = Number(raw);
    return Number.isInteger(n) ? n : 0;
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitTabs],
  imports: [CommonModule],
  exports: [LitTabs],
})
export class LitTabsModule {}
