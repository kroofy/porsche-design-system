import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitIconProps {
  name?: string;
  source?: string;
  color?: string;
  size?: any;
  aria?: any;
}

@Component({
  selector: "lit-icon",
  template: `
    <ng-container
      ><style [innerHTML]="sanitizer.bypassSecurityTrustHtml(cssText)"></style>
      <img
        width="24"
        height="24"
        loading="lazy"
        [attr.src]="src"
        [attr.alt]="alt"
    /></ng-container>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      :host {
        display: inline-flex;
        vertical-align: top;
      }
      :host([hidden]) {
        display: none !important;
      }
    `,
  ],
})
export default class LitIcon {
  @Input() name!: LitIconProps["name"];
  @Input() source!: LitIconProps["source"];
  @Input() color!: LitIconProps["color"];
  @Input() size!: LitIconProps["size"];
  @Input() aria!: LitIconProps["aria"];

  get cssText() {
    const sizeMap: any = {
      "xx-small": "var(--p-typescale-2xs)",
      "x-small": "var(--p-typescale-xs)",
      small: "var(--p-typescale-sm)",
      medium: "var(--p-typescale-md)",
      large: "var(--p-typescale-lg)",
      "x-large": "var(--p-typescale-xl)",
      "xx-large": "var(--p-typescale-2xl)",
      "2xs": "var(--p-typescale-2xs)",
      xs: "var(--p-typescale-xs)",
      sm: "var(--p-typescale-sm)",
      md: "var(--p-typescale-md)",
      lg: "var(--p-typescale-lg)",
      xl: "var(--p-typescale-xl)",
      "2xl": "var(--p-typescale-2xl)",
      "3xl": "var(--p-typescale-3xl)",
      "4xl": "var(--p-typescale-4xl)",
      "5xl": "var(--p-typescale-5xl)",
      inherit: "inherit",
    };
    const colorMap: any = {
      primary: "var(--p-color-primary)",
      "contrast-higher": "var(--p-color-contrast-higher)",
      "contrast-high": "var(--p-color-contrast-high)",
      "contrast-medium": "var(--p-color-contrast-medium)",
      "contrast-low": "var(--p-color-contrast-low)",
      "contrast-lower": "var(--p-color-contrast-lower)",
      success: "var(--p-color-success)",
      warning: "var(--p-color-warning)",
      error: "var(--p-color-error)",
      info: "var(--p-color-info)",
      inherit: "currentcolor",
    };
    const minWidth: any = {
      xs: 480,
      s: 760,
      m: 1000,
      l: 1300,
      xl: 1760,
      xxl: 1920,
    };
    const flippable: any = {
      "arrow-compact-left": 1,
      "arrow-compact-right": 1,
      "arrow-double-left": 1,
      "arrow-double-right": 1,
      "arrow-first": 1,
      "arrow-head-left": 1,
      "arrow-head-right": 1,
      "arrow-last": 1,
      "arrow-left": 1,
      "arrow-right": 1,
      chart: 1,
      chat: 1,
      copy: 1,
      external: 1,
      increase: 1,
      list: 1,
      logout: 1,
      return: 1,
      send: 1,
    };
    const files: any = {
      car: "car.35229c9.svg",
      "arrow-right": "arrow-right.872716b.svg",
    };
    const name = this.name || "arrow-right";
    const source = this.source || "";
    const color = this.color || "primary";
    const bg = colorMap[color] || colorMap.primary;
    let src = "";
    if (source && /(\/)/.test(source)) {
      src = source;
    } else {
      src =
        "http://localhost:3001/icons/" + (files[name] || files["arrow-right"]);
    }
    const mask = 'url("' + src + '") center/contain no-repeat';
    const imgBase =
      "img{display:block;margin:0;padding:0;border:0;outline:0;overflow:hidden;object-position:-9999px -9999px;pointer-events:none;width:var(--p-icon-size,var(--p-leading-normal));height:var(--p-icon-size,var(--p-leading-normal));font-family:var(--p-font-porsche-next);";
    const imgTail =
      "-webkit-mask:" +
      mask +
      ";mask:" +
      mask +
      ";background:var(--p-icon-color," +
      bg +
      ")}" +
      "@media(forced-colors:active){img{background:CanvasText}}" +
      (!source && flippable[name] ? "img:dir(rtl){transform:scaleX(-1)}" : "");
    let size = this.size || "sm";
    if (typeof size === "string" && size.charAt(0) === "{") {
      try {
        size = JSON.parse(
          size
            .replace(/'/g, '"')
            .replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":')
        );
      } catch (e) {
        size = "sm";
      }
    }
    const fontFor = (s: any) => sizeMap[s] || sizeMap.sm;
    if (typeof size === "object" && size !== null) {
      let out =
        imgBase + "font-size:" + fontFor(size.base || "sm") + ";" + imgTail;
      for (const bp of Object.keys(size)) {
        if (bp === "base") continue;
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){img{font-size:" +
          fontFor(size[bp]) +
          "}}";
      }
      return out;
    }
    return imgBase + "font-size:" + fontFor(size) + ";" + imgTail;
  }
  get src() {
    const files: any = {
      car: "car.35229c9.svg",
      "arrow-right": "arrow-right.872716b.svg",
    };
    const source = this.source || "";
    if (source && /(\/)/.test(source)) return source;
    const name = this.name || "arrow-right";
    return (
      "http://localhost:3001/icons/" + (files[name] || files["arrow-right"])
    );
  }
  get alt() {
    let raw: any = this.aria;
    if (!raw) return "";
    if (typeof raw === "string") {
      try {
        raw = JSON.parse(
          raw.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":')
        );
      } catch (e) {
        raw = null;
      }
    }
    if (typeof raw === "object" && raw !== null) return raw["aria-label"] || "";
    return "";
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitIcon],
  imports: [CommonModule],
  exports: [LitIcon],
})
export class LitIconModule {}
