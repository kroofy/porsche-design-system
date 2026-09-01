/* mitosis-native-host: native angular from Banner.lite.tsx */
import { NgModule } from "@angular/core";
import { scopeCss } from "../../../../_runtime/scope-css.js";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitBannerProps {
  open?: any;
  heading?: string;
  headingTag?: string;
  description?: string;
  position?: any;
  state?: string;
  dismissButton?: any;
}

@Component({
  selector: "lit-banner",
  template: `
    <div class="p-banner" data-pds="banner">
    <div popover="manual">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(scopedCssText)"></style>
      <div class="notification">
        <h5>{{headingText}}</h5>
        <p>{{descriptionText}}</p>
        <slot name="heading"></slot>
        <slot name="description"></slot>
        <button class="dismiss" type="button"><span>Close banner</span></button>
      </div>
    </div>
  
    </div>
  `,
  styles: [`
      .p-banner {
        display: contents;
      }
      .p-banner {
        display: contents;
      }
      .p-banner[hidden] {
        display: none !important;
      }
    `],
})
export default class LitBanner {
  @Input() state!: LitBannerProps["state"];
  @Input() heading!: LitBannerProps["heading"];
  @Input() dismissButton!: LitBannerProps["dismissButton"];
  @Input() open!: LitBannerProps["open"];
  @Input() position!: LitBannerProps["position"];
  @Input() headingTag!: LitBannerProps["headingTag"];
  @Input() description!: LitBannerProps["description"];

  get scopedCssText() {
    return scopeCss(this.cssText, ".p-banner");
  }

  get cssText() {
    const visual = this.state || "info";
    const heading = this.heading || "";
    const hasHeadingSlot = this.hasHeadingSlot;
    const hasHeading = !!(heading || hasHeadingSlot);
    let dismiss: any = this.dismissButton;
    if (dismiss === false || dismiss === "false") {
      dismiss = false;
    } else {
      dismiss = true;
    }
    let isOpen: any = this.open;
    if (isOpen === true || isOpen === "true" || isOpen === "") {
      isOpen = true;
    } else {
      isOpen = false;
    }
    let position: any = this.position;
    if (position == null || position === "") {
      position = {
        base: "bottom",
        s: "top",
      };
    }
    if (typeof position === "string" && position.charAt(0) === "{") {
      try {
        position = JSON.parse(position);
      } catch (e) {
        position = {
          base: "bottom",
          s: "top",
        };
      }
    }
    const bgMap: any = {
      info: "var(--p-color-info-frosted)",
      success: "var(--p-color-success-frosted)",
      warning: "var(--p-color-warning-frosted)",
      error: "var(--p-color-error-frosted)",
    };
    const colorMap: any = {
      info: "var(--p-color-info)",
      success: "var(--p-color-success)",
      warning: "var(--p-color-warning)",
      error: "var(--p-color-error)",
    };
    const maskMap: any = {
      info: 'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9m-.75 4.5h1.5V9h-1.5zm1.5 8.5h-1.5v-6h1.5z"/></svg>\')',
      success:
        'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-1.26 12.69-3.8-3.8 1.07-1.05 2.73 2.73 5.25-5.26 1.06 1.06z"/></svg>\')',
      warning:
        'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.58 18.26 13.3 3.75A1.5 1.5 0 0 0 12 3a1.5 1.5 0 0 0-1.3.75l-8.28 14.5a1.5 1.5 0 0 0 0 1.5c.28.47.76.75 1.3.75h16.56a1.5 1.5 0 0 0 1.3-2.25M13 17.5h-2v-2h2zm-.4-3.5h-1.2L11 8.5h2z"/></svg>\')',
      error:
        'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 3H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4l2 2 2-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5 3.5-.4 5.5h-1.2L11 6.5zm-2 7h2v2h-2z"/></svg>\')',
    };
    const closeMask =
      'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>\') center/contain no-repeat';
    const iconMask =
      (maskMap[visual] || maskMap.info) + " center/contain no-repeat";
    const bg = bgMap[visual] || bgMap.info;
    const color = colorMap[visual] || colorMap.info;
    const placeSelf = hasHeading ? "center" : "flex-start";
    const descGrid = hasHeading ? "2/2" : "1/2";
    const descMargin = hasHeading ? "var(--p-spacing-static-xs)" : "0px";
    const duration = isOpen
      ? "var(--p-transition-duration,var(--p-duration-md))"
      : "var(--p-transition-duration,var(--p-duration-sm))";
    const easing = isOpen ? "var(--p-ease-in)" : "var(--p-ease-out)";
    const topA =
      "translate3d(-50%,calc(-100% - var(--p-banner-top,var(--p-banner-position-top,56px))),0)";
    const topInset =
      "var(--p-banner-top,var(--p-banner-position-top,56px)) auto";
    const botA =
      "translate3d(-50%,calc(var(--p-banner-bottom,var(--p-banner-position-bottom,56px)) + 100%),0)";
    const botInset =
      "auto var(--p-banner-bottom,var(--p-banner-position-bottom,56px))";
    const posRule = (v: any) => {
      if (v === "top")
        return "--_p-banner-a:" + topA + ";inset-block:" + topInset;
      return "--_p-banner-a:" + botA + ";inset-block:" + botInset;
    };
    const minWidth: any = {
      xs: 480,
      s: 760,
      m: 1000,
      l: 1300,
      xl: 1760,
      xxl: 1920,
    };
    let out =
      ":host{display:contents}" +
      ":host([hidden]){display:none !important}" +
      "[popover]{all:unset;position:fixed;" +
      (typeof position === "object" && position !== null
        ? posRule(position.base || "bottom")
        : posRule(position)) +
      ";left:50vw;width:min(calc(100vw - 2 * var(--p-banner-inset-x,max(22px, 10.625vw - 12px))),var(--p-banner-max-w,100ch));transform:" +
      (isOpen ? "translate3d(-50%,0,0)" : "var(--_p-banner-a)") +
      ";transition:transform " +
      duration +
      " " +
      easing +
      ";overlay:none;display:none}" +
      "[popover]:popover-open{overlay:auto;display:grid}" +
      "[popover]::backdrop{display:none}";
    if (typeof position === "object" && position !== null) {
      for (const bp of Object.keys(position)) {
        if (bp === "base" || !minWidth[bp]) continue;
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){[popover]{" +
          posRule(position[bp]) +
          "}}";
      }
    }
    out +=
      "@supports (overlay: auto) and (transition-behavior: allow-discrete){[popover]{transition:transform " +
      duration +
      " " +
      easing +
      ",overlay " +
      duration +
      " " +
      easing +
      " allow-discrete, display " +
      duration +
      " " +
      easing +
      " allow-discrete}}";
    if (hasHeading) {
      out +=
        'slot[name="heading"],h1,h2,h3,h4,h5,h6{all:unset;grid-area:1/2;font:var(--p-font-weight-semibold) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-primary)}';
    }
    out +=
      'slot:not([name]),slot[name="description"],p{all:unset;grid-area:' +
      descGrid +
      ";margin-top:" +
      descMargin +
      ";font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-primary)}" +
      ".notification{box-shadow:var(--p-shadow-lg);opacity:" +
      (isOpen ? "1" : "0") +
      ";transition:opacity " +
      duration +
      " " +
      easing +
      ";display:grid;grid-template:repeat(3, auto) / auto minmax(0, 1fr) repeat(2, auto);padding:calc(var(--p-spacing-static-sm) + var(--p-spacing-fluid-sm));border-radius:var(--p-radius-2xl);background:" +
      bg +
      ";-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted)}";
    if (dismiss) {
      out +=
        ".dismiss{all:unset;box-sizing:border-box;display:grid;place-items:center;padding:6px;border-radius:var(--p-radius-full);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);background-color:var(--p-color-frosted-strong);color:var(--p-color-primary);cursor:pointer;-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted);transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);grid-area:1/4/-1;align-self:flex-start;margin-block:calc(-6 * var(--p-spacing-static-2xs));margin-inline:var(--p-spacing-static-md) calc(-6 * var(--p-spacing-static-2xs))}" +
        ".dismiss:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
        '.dismiss::before{content:"";width:var(--p-leading-normal);height:var(--p-leading-normal);-webkit-mask:' +
        closeMask +
        ";mask:" +
        closeMask +
        ";background:currentColor}" +
        ".dismiss span{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
    }
    out +=
      "@media(min-width:760px){.notification::before{grid-area:1/1;place-self:" +
      placeSelf +
      ';content:"";width:1.5rem;height:1.5rem;margin-inline-end:var(--p-spacing-static-sm);background:' +
      color +
      ";-webkit-mask:" +
      iconMask +
      ";mask:" +
      iconMask +
      "}@media(forced-colors:active){.notification::before{background:CanvasText}}}";
    out +=
      "@media(forced-colors:active){.notification{outline:2px solid CanvasText;outline-offset:-2px}";
    if (dismiss) {
      out +=
        ".dismiss{forced-color-adjust:none;background:Canvas;box-shadow:inset 0 0 0 2px ButtonBorder;color:ButtonText}.dismiss:focus-visible{outline-color:Highlight}";
    }
    out += "}";
    if (dismiss) {
      out +=
        "@media(hover:hover){.dismiss:hover{background-color:var(--p-color-frosted)}@media(forced-colors:active){.dismiss:hover{background:Canvas}}}";
    }
    return out;
  }
  get headingText() {
    return this.heading || "";
  }
  get headingTagValue() {
    return this.headingTag || "h5";
  }
  get descriptionText() {
    return this.description || "";
  }
  get showDismiss() {
    const dismiss = this.dismissButton;
    if (dismiss === false || dismiss === "false") return false;
    return true;
  }
  get hasHeadingSlot() {
    return false;
  }
  get hasDescriptionSlot() {
    return false;
  }
  get headingAria() {
    return this.heading || "";
  }
  get roleName() {
    const visual = this.state || "info";
    return visual === "warning" || visual === "error" ? "alert" : "status";
  }
  get ariaLive() {
    const visual = this.state || "info";
    return visual === "warning" || visual === "error" ? "assertive" : "polite";
  }
  get isOpenFlag() {
    const open = this.open;
    return open === true || open === "true" || open === "";
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitBanner],
  imports: [CommonModule],
  exports: [LitBanner],
})
export class LitBannerModule {}
