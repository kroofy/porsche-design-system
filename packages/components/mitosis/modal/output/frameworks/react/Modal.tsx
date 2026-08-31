import * as React from "react";

export interface LitModalProps {
  open?: any;
  dismissButton?: any;
  disableBackdropClick?: any;
  background?: string;
  backdrop?: string;
  fullscreen?: any;
  aria?: any;
}

function LitModal(props: LitModalProps) {
  function cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const isOpen = isTrue(props.open);
    let dismiss: any = props.dismissButton;
    if (dismiss === false || dismiss === "false") dismiss = false;
    else dismiss = true;
    const background = props.background === "surface" ? "surface" : "canvas";
    const backdrop = props.backdrop === "shading" ? "shading" : "blur";
    let fullscreen: any = props.fullscreen;
    if (fullscreen == null || fullscreen === "") fullscreen = false;
    if (typeof fullscreen === "string" && fullscreen.charAt(0) === "{") {
      try {
        fullscreen = JSON.parse(fullscreen.replace(/'/g, '"'));
      } catch (e) {
        fullscreen = false;
      }
    }
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
    let dialogVis = isOpen
      ? "width:100dvw;height:100dvh;visibility:inherit;pointer-events:auto;background:var(--p-color-backdrop)"
      : "width:0px;height:0px;visibility:hidden;pointer-events:none;background:transparent";
    if (isOpen && backdrop === "blur") {
      dialogVis +=
        ";-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted)";
    }
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
    const centered =
      "width:var(--p-modal-width,auto);min-width:276px;max-width:1535.5px;place-self:center;" +
      "margin:var(--p-modal-spacing-top,clamp(16px, 10vh, 192px)) max(22px, 10.625vw - 12px) var(--p-modal-spacing-bottom,clamp(16px, 10vh, 192px));" +
      "border-radius:var(--p-radius-3xl);clip-path:inset(0 round var(--p-radius-3xl))";
    const stretched =
      "width:auto;min-width:auto;max-width:none;place-self:stretch;margin:0;border-radius:0;clip-path:none";
    const minWidth: any = {
      xs: 480,
      s: 760,
      m: 1000,
      l: 1300,
      xl: 1760,
      xxl: 1920,
    };
    const fsRule = (v: any) =>
      v === true || v === "true" ? stretched : centered;
    let modalBox = centered;
    let modalMedia = "";
    if (typeof fullscreen === "object" && fullscreen !== null) {
      modalBox = fsRule(fullscreen.base);
      for (const bp of Object.keys(fullscreen)) {
        if (bp === "base" || !minWidth[bp]) continue;
        modalMedia +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){.modal{" +
          fsRule(fullscreen[bp]) +
          "}}";
      }
    } else {
      modalBox = fsRule(fullscreen);
    }
    const hcmOutline = isTrue(fullscreen)
      ? ""
      : "@media(forced-colors:active){.modal{outline:2px solid CanvasText;outline-offset:-2px}}";
    let out =
      ":host{display:contents;" +
      "--ref-p-modal-pt:var(--p-spacing-fluid-md) !important;" +
      "--ref-p-modal-pb:calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) !important;" +
      "--ref-p-modal-px:var(--p-spacing-fluid-lg) !important;" +
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
      "slot[name=footer]{grid-column:1/-1;z-index:2;position:sticky;bottom:-.1px;" +
      "margin-block:calc(-1 * calc(calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) - var(--p-radius-3xl)));" +
      "padding:calc(calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) - var(--p-radius-3xl)) var(--p-spacing-fluid-lg);" +
      "background:linear-gradient(0deg,var(--_p-dialog-a) 0%,var(--_p-dialog-a) 20%,transparent 80%)}" +
      'slot[name=footer][data-stuck]::after{content:"";z-index:-1;position:absolute;' +
      "inset:calc(calc(calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) - var(--p-radius-3xl)) - 12 * var(--p-spacing-static-2xs)) calc(var(--p-spacing-fluid-lg) - 12 * var(--p-spacing-static-2xs));" +
      "background:var(--p-color-frosted);border-radius:var(--p-radius-2xl);" +
      "-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted)}" +
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
      ".modal{position:relative;display:grid;" +
      "grid-template:auto/var(--p-spacing-fluid-sm) minmax(0,1fr) var(--p-spacing-fluid-sm);" +
      "gap:var(--p-spacing-fluid-md) calc(var(--p-spacing-fluid-lg) - var(--p-spacing-fluid-sm));" +
      "padding-top:var(--p-spacing-fluid-md);" +
      "padding-bottom:calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md));" +
      "align-content:flex-start;color:var(--p-color-primary);background:var(--_p-dialog-a);" +
      panelClosed +
      ";transition:opacity " +
      panelDur +
      " " +
      ease +
      ", transform " +
      panelDur +
      " " +
      ease +
      ";" +
      modalBox +
      "}" +
      modalMedia +
      (isOpen ? "" : ".modal:dir(rtl){transform:translate3d(0,25vh,0)}") +
      hcmOutline;
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
  }
  function isOpenFlag() {
    const open = props.open;
    return open === true || open === "true" || open === "";
  }
  function showDismiss() {
    const dismiss = props.dismissButton;
    if (dismiss === false || dismiss === "false") return false;
    return true;
  }
  function ariaLabelText() {
    const raw = props.aria;
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
  }
  return (
    <>
      {" "}
      <dialog aria-modal="true" inert tabIndex={-1}>
        <style dangerouslySetInnerHTML={{ __html: cssText() }} />
        <div className="scroller">
          <div className="modal">
            <button className="dismiss" type="button">
              <span>Dismiss modal</span>
            </button>
            <slot name="header" />
            <slot />
            <slot name="footer" />
          </div>
        </div>
      </dialog>{" "}
      <style jsx>{`
        :host {
          display: contents;
        }
        :host([hidden]) {
          display: none !important;
        }
      `}</style>{" "}
    </>
  );
}
export default LitModal;
