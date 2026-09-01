<!-- mitosis-native-host: native vue from Sheet.lite.tsx -->
<template>
  <div class="p-sheet" data-pds="sheet">

  <dialog aria-modal="true" :inert="true" :tabIndex="-1">
    <component v-html="scopedCssText" :is="'style'"></component>
    <div class="scroller">
      <div class="sheet">
        <button class="dismiss" type="button"><span>Dismiss sheet</span></button
        ><slot name="header"></slot><slot></slot>
      </div>
    </div>
  </dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitSheetProps {
  open?: any;
  dismissButton?: any;
  disableBackdropClick?: any;
  background?: string;
  aria?: any;
}

export default defineComponent({
  name: "lit-sheet",

  props: ["open", "dismissButton", "background", "aria"],

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-sheet");
    },
    cssText() {
      const isTrue = (v: any) => v === true || v === "true" || v === "";
      const isOpen = isTrue(this.open);
      let dismiss: any = this.dismissButton;
      if (dismiss === false || dismiss === "false") dismiss = false;
      else dismiss = true;
      const background = this.background === "surface" ? "surface" : "canvas";
      const dialogBg =
        background === "surface"
          ? "var(--p-color-surface)"
          : "var(--p-color-canvas)";
      const dismissBg = dialogBg;
      const dismissHover =
        background === "surface"
          ? "var(--p-color-canvas)"
          : "var(--p-color-surface)";
      const closeMask =
        'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>\') center/contain no-repeat';
      const durMd = "var(--p-transition-duration,var(--p-duration-md))";
      const durSm = "var(--p-transition-duration,var(--p-duration-sm))";
      const durLg = "var(--p-transition-duration,var(--p-duration-lg))";
      const delay = isOpen ? "var(--p-transition-duration,0s)" : durMd;
      const ease = isOpen ? "var(--p-ease-in)" : "var(--p-ease-out)";
      const dialogDur = isOpen ? durLg : durMd;
      const panelDur = isOpen ? durMd : durSm;
      const dialogVis = isOpen
        ? "width:100dvw;height:100dvh;visibility:inherit;pointer-events:auto;background:var(--p-color-backdrop)"
        : "width:0px;height:0px;visibility:hidden;pointer-events:none;background:transparent";
      const dialogTrans =
        "visibility 0s linear " +
        delay +
        ", width 0s linear " +
        delay +
        ", height 0s linear " +
        delay +
        ", background-color " +
        dialogDur +
        " " +
        ease +
        ", -webkit-backdrop-filter " +
        dialogDur +
        " " +
        ease +
        ", backdrop-filter " +
        dialogDur +
        " " +
        ease;
      const panelClosed = isOpen
        ? "opacity:1;transform:translate3d(0,0,0)"
        : "opacity:0;transform:translate3d(0,25vh,0)";
      let out =
        ":host{display:contents;" +
        "--ref-p-sheet-pt:var(--p-spacing-fluid-md) !important;" +
        "--ref-p-sheet-pb:calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) !important;" +
        "--ref-p-sheet-px:var(--p-spacing-fluid-lg) !important;" +
        "--pds-internal-grid-outer-column:calc(var(--p-spacing-fluid-lg) - clamp(16px, 1.25vw + 12px, 36px)) !important;" +
        "--pds-internal-grid-margin:calc(var(--p-spacing-fluid-lg) * -1) !important;" +
        "--pds-internal-grid-width-min:auto !important;" +
        "--pds-internal-grid-width-max:none !important;" +
        "--_p-dialog-a:" +
        dialogBg +
        " !important}" +
        ":host([hidden]){display:none !important}" +
        "slot{display:block}" +
        "slot:first-of-type{grid-row-start:1}" +
        "slot:not([name]){grid-column:2/3;z-index:0}" +
        "slot[name=header]{grid-column:2/3;z-index:0}" +
        "dialog{all:unset;position:fixed;inset:0;max-width:100dvw;max-height:100dvh;overflow:hidden;" +
        "display:block;user-select:text;outline:0;" +
        dialogVis +
        ";transition:" +
        dialogTrans +
        ";overlay:none}" +
        "dialog:modal{overlay:auto}" +
        "dialog::backdrop{display:none}" +
        "@supports (overlay: auto) and (transition-behavior: allow-discrete){dialog{transition:" +
        dialogTrans +
        ", overlay " +
        dialogDur +
        " " +
        ease +
        " allow-discrete}}" +
        ".scroller{position:absolute;isolation:isolate;display:grid;inset:0;overflow:hidden auto;" +
        "overscroll-behavior-y:none;background:rgba(255,255,255,.01);transform:translate3d(0,0,0)}" +
        ".sheet{position:relative;display:grid;" +
        "grid-template:auto/var(--p-spacing-fluid-sm) minmax(0,1fr) var(--p-spacing-fluid-sm);" +
        "gap:var(--p-spacing-fluid-md) calc(var(--p-spacing-fluid-lg) - var(--p-spacing-fluid-sm));" +
        "padding-top:var(--p-spacing-fluid-md);" +
        "padding-bottom:calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md));" +
        "align-content:flex-start;" +
        panelClosed +
        ";transition:opacity " +
        panelDur +
        " " +
        ease +
        ", transform " +
        panelDur +
        " " +
        ease +
        ";color:var(--p-color-primary);background:var(--_p-dialog-a);" +
        "width:100%;align-self:flex-end;margin-block-start:var(--p-spacing-fluid-lg);" +
        "border-top-left-radius:var(--p-radius-3xl);border-top-right-radius:var(--p-radius-3xl);" +
        "clip-path:inset(0 round var(--p-radius-3xl) var(--p-radius-3xl) 0 0)}" +
        (isOpen ? "" : ".sheet:dir(rtl){transform:translate3d(0,25vh,0)}") +
        "@media(forced-colors:active){.sheet{border-top:2px solid CanvasText}}";
      if (dismiss) {
        out +=
          ".dismiss{all:unset;box-sizing:border-box;display:grid;place-items:center;padding:6px;" +
          "border-radius:var(--p-radius-full);" +
          "font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);" +
          "background-color:" +
          dismissBg +
          ";color:var(--p-color-primary);cursor:pointer;" +
          "transition:background-color " +
          durSm +
          " var(--p-ease-in-out), color " +
          durSm +
          " var(--p-ease-in-out);grid-area:1/3;z-index:5;position:sticky;top:var(--p-spacing-fluid-sm);" +
          "margin-top:calc(-1 * var(--p-spacing-fluid-md) + var(--p-spacing-fluid-sm));" +
          "margin-inline-end:var(--p-spacing-fluid-sm);place-self:flex-start flex-end}" +
          ".dismiss:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
          '.dismiss::before{content:"";width:var(--p-leading-normal);height:var(--p-leading-normal);' +
          "-webkit-mask:" +
          closeMask +
          ";mask:" +
          closeMask +
          ";background:currentColor}" +
          ".dismiss span{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}" +
          "@media(forced-colors:active){.dismiss{forced-color-adjust:none;background:Canvas;box-shadow:inset 0 0 0 2px ButtonBorder;color:ButtonText}.dismiss:focus-visible{outline-color:Highlight}}" +
          "@media(hover:hover){.dismiss:hover{background-color:" +
          dismissHover +
          "}@media(forced-colors:active){.dismiss:hover{background:Canvas}}}";
      }
      return out;
    },
    isOpenFlag() {
      const open = this.open;
      return open === true || open === "true" || open === "";
    },
    showDismiss() {
      const dismiss = this.dismissButton;
      if (dismiss === false || dismiss === "false") return false;
      return true;
    },
    ariaLabelText() {
      const raw = this.aria;
      if (raw && typeof raw === "object" && raw["aria-label"])
        return raw["aria-label"];
      if (typeof raw === "string" && raw.charAt(0) === "{") {
        try {
          const parsed = JSON.parse(raw.replace(/'/g, '"'));
          return parsed["aria-label"] || "";
        } catch (e) {
          return "";
        }
      }
      return "";
    },
  },
});
</script>

