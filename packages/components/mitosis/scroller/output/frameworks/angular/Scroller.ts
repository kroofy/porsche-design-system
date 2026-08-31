import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitScrollerProps {
  scrollbar?: any;
  compact?: any;
  sticky?: any;
}

@Component({
  selector: "lit-scroller",
  template: `
    <div class="root">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(cssText)"></style>
      <span class="prev"></span>
      <span class="next"></span>
      <div class="scroll" [attr.tabIndex]="0">
        <span class="sentinel"></span>
        <slot></slot>
        <span class="sentinel"></span>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      :host {
        display: block;
        border-radius: var(--p-radius-lg);
      }
      :host([hidden]) {
        display: none !important;
      }
    `,
  ],
})
export default class LitScroller {
  @Input() scrollbar!: LitScrollerProps["scrollbar"];
  @Input() compact!: LitScrollerProps["compact"];
  @Input() sticky!: LitScrollerProps["sticky"];

  get cssText() {
    let prevVis: any = false;
    let nextVis: any = false;
    let hasBar: any = this.scrollbar;
    if (hasBar === true || hasBar === "true" || hasBar === "") {
      hasBar = true;
    } else {
      hasBar = false;
    }
    let isCompact: any = this.compact;
    if (isCompact === true || isCompact === "true" || isCompact === "") {
      isCompact = true;
    } else {
      isCompact = false;
    }
    let isSticky: any = this.sticky;
    if (isSticky === true || isSticky === "true" || isSticky === "") {
      isSticky = true;
    } else {
      isSticky = false;
    }
    const fadeEdges =
      !prevVis && !nextVis
        ? "none"
        : !prevVis
        ? "right"
        : !nextVis
        ? "left"
        : "both";
    const edgeLength = 24;
    const fadeLength = 96;
    const steps = 20;
    const fullLength = edgeLength + fadeLength;
    const leftStops: any = [];
    const rightStops: any = [];
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const alpha = t * t * t * (t * (t * 6 - 15) + 10);
      leftStops.push(
        "rgb(0 0 0/" +
          alpha.toFixed(3) +
          ") " +
          (edgeLength + fadeLength * t).toFixed(0) +
          "px"
      );
      rightStops.push(
        "rgb(0 0 0/" +
          (1 - alpha).toFixed(3) +
          ") calc(100% - " +
          (fullLength - fadeLength * t).toFixed(0) +
          "px)"
      );
    }
    const left =
      "transparent 0px,transparent " +
      edgeLength +
      "px," +
      leftStops.join(",") +
      ",black " +
      fullLength +
      "px";
    const right =
      "black calc(100% - " +
      fullLength +
      "px)," +
      rightStops.join(",") +
      ",transparent calc(100% - " +
      edgeLength +
      "px),transparent 100%";
    let fade = "";
    if (fadeEdges === "left")
      fade = "linear-gradient(to right," + left + ",black 100%)";
    else if (fadeEdges === "right")
      fade = "linear-gradient(to right,black 0%," + right + ")";
    else if (fadeEdges === "both")
      fade = "linear-gradient(to right," + left + "," + right + ")";
    const maskLayer = fade ? fade + " 0 0/auto no-repeat" : "";
    const scrollbarMask =
      "linear-gradient(black,black) 0 bottom/auto 12px no-repeat";
    const iconPrev =
      'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.875 12v-.001l.006-.005 5.476-6.494.768.642-4.94 5.858 4.939 5.858-.768.642-5.477-6.497z"/></svg>\') center/contain no-repeat';
    const iconNext =
      'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m15.121 11.997-5.477-6.497-.769.642 4.94 5.858-4.94 5.858.768.642 5.476-6.494.006-.005v-.001z"/></svg>\') center/contain no-repeat';
    const gap = isCompact
      ? "var(--p-scroller-gap,var(--p-spacing-static-xs))"
      : "var(--p-scroller-gap,var(--p-spacing-static-sm))";
    const visRule = (visible: any, isPrev: any) => {
      const opacity = visible ? "1" : "0";
      const visibility = visible ? "inherit" : "hidden";
      const transform = visible
        ? "translate3d(0,0,0)"
        : isPrev
        ? "translate3d(calc(-1 * var(--p-spacing-static-sm)),0,0)"
        : "translate3d(var(--p-spacing-static-sm),0,0)";
      const visDelay = visible
        ? "0s"
        : "var(--p-transition-duration,var(--p-duration-sm))";
      return (
        "opacity:" +
        opacity +
        ";visibility:" +
        visibility +
        ";transform:" +
        transform +
        ";transition:transform var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out),opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out),visibility 0s linear " +
        visDelay
      );
    };
    let indicatorExtra = "";
    if (isSticky) {
      indicatorExtra +=
        "position:sticky;top:var(--p-scroller-indicator-top,0px);bottom:var(--p-scroller-indicator-bottom,0px);";
    }
    if (hasBar) indicatorExtra += "margin-top:calc(-1 * 12px);";
    const pad = isCompact ? "" : "padding:var(--p-spacing-static-xs);";
    let out =
      ":host{display:block;border-radius:var(--p-radius-lg)}" +
      ":host([hidden]){display:none !important}" +
      "slot{grid-area:1/2;position:relative;display:inline-flex;gap:" +
      gap +
      "}" +
      ".root{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;border-radius:var(--_p-scroller-focus-ring-radius,inherit)}" +
      ".root:has(.scroll:focus-visible){outline:2px solid var(--p-color-focus);outline-offset:2px}" +
      ".scroll{grid-area:1/1/1/-1;z-index:0;display:grid;grid-template-columns:4px minmax(auto,1fr) 4px;margin:calc(-1 * 4px);padding:" +
      (hasBar ? "4px 0px calc(4px + 12px)" : "4px 0px") +
      ";scrollbar-width:" +
      (hasBar ? "thin" : "none") +
      ";outline:none;overflow:auto hidden";
    if (maskLayer) {
      const combined = hasBar ? maskLayer + "," + scrollbarMask : maskLayer;
      out += ";-webkit-mask:" + combined + ";mask:" + combined;
    }
    out +=
      "}" +
      ".sentinel{width:4px;visibility:hidden}" +
      ".sentinel:first-of-type:dir(rtl){grid-area:1/3}" +
      ".sentinel:last-of-type:dir(rtl){grid-area:1/1}" +
      ".prev{grid-area:1/1;z-index:1;" +
      indicatorExtra +
      "display:grid;align-self:center;width:1.5rem;height:1.5rem;" +
      pad +
      "cursor:pointer;" +
      visRule(prevVis, true) +
      "}" +
      ".prev:dir(rtl){grid-area:1/3}" +
      '.prev::after{content:"";-webkit-mask:' +
      iconPrev +
      ";mask:" +
      iconPrev +
      ";background:var(--p-color-primary);transition:transform var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}" +
      ".next{grid-area:1/3;z-index:1;" +
      indicatorExtra +
      "display:grid;align-self:center;width:1.5rem;height:1.5rem;" +
      pad +
      "cursor:pointer;" +
      visRule(nextVis, false) +
      "}" +
      ".next:dir(rtl){grid-area:1/1}" +
      '.next::after{content:"";-webkit-mask:' +
      iconNext +
      ";mask:" +
      iconNext +
      ";background:var(--p-color-primary);transition:transform var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}" +
      "@media(forced-colors:active){.root:has(.scroll:focus-visible){outline-color:Highlight}.prev::after{background:CanvasText}.next::after{background:CanvasText}}" +
      "@media(hover:hover){.prev:hover::after{transform:translate3d(calc(-1 * var(--p-spacing-static-xs)),0,0)}.next:hover::after{transform:translate3d(var(--p-spacing-static-xs),0,0)}}";
    if (hasBar) {
      out += "@media(pointer:coarse){";
      if (maskLayer)
        out += ".scroll{-webkit-mask:" + maskLayer + ";mask:" + maskLayer + "}";
      out += ".prev{margin-top:0}.next{margin-top:0}}";
    }
    return out;
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitScroller],
  imports: [CommonModule],
  exports: [LitScroller],
})
export class LitScrollerModule {}
