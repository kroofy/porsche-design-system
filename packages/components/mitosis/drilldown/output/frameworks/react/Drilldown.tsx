/* mitosis-native-host: native react from Drilldown.lite.tsx */
import * as React from "react";

import PButtonPure from "../../../../button-pure/output/frameworks/react/ButtonPure";
import PButton from "../../../../button/output/frameworks/react/Button";
import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitDrilldownProps {
  className?: string;
  open?: any;
  activeIdentifier?: any;
  aria?: any;
}

function LitDrilldown(props: LitDrilldownProps) {
  function cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const isOpen = isTrue(props.open);
    const activeId =
      props.activeIdentifier == null || props.activeIdentifier === ""
        ? ""
        : String(props.activeIdentifier);
    const isSecondary = !!activeId;
    const isPrimary = true;
    const durMd = "var(--p-transition-duration,var(--p-duration-md))";
    const durSm = "var(--p-transition-duration,var(--p-duration-sm))";
    const durLg = "var(--p-transition-duration,var(--p-duration-lg))";
    const animMd = "var(--p-animation-duration,var(--p-duration-md))";
    const easeIn = "var(--p-ease-in)";
    const easeOut = "var(--p-ease-out)";
    const easeBase = "var(--p-ease-in-out)";
    const dialogClosed =
      "visibility:hidden;transition:visibility 0s linear " +
      durMd +
      ", overlay " +
      durMd +
      " " +
      easeOut +
      " allow-discrete, background " +
      durMd +
      " " +
      easeOut +
      ", backdrop-filter " +
      durMd +
      " " +
      easeOut +
      ", -webkit-backdrop-filter " +
      durMd +
      " " +
      easeOut;
    const dialogOpen =
      "visibility:inherit;-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted);background:var(--_p-drilldown-d);transition:background " +
      durLg +
      " " +
      easeIn +
      ", backdrop-filter " +
      durLg +
      " " +
      easeIn +
      ", -webkit-backdrop-filter " +
      durLg +
      " " +
      easeIn;
    const drawerClosed =
      "opacity:0;transform:translate3d(-100%,0,0);transition:opacity " +
      durSm +
      " " +
      easeOut +
      ", transform " +
      durSm +
      " " +
      easeOut;
    const drawerOpen =
      "opacity:1;transform:translate3d(0,0,0);transition:opacity " +
      durMd +
      " " +
      easeIn +
      ", transform " +
      durMd +
      " " +
      easeIn;
    const slotGrid =
      "grid-template:var(--p-drilldown-grid-template,auto/auto);gap:var(--p-drilldown-gap,var(--p-spacing-fluid-xs));align-content:start;align-items:start;box-sizing:border-box;min-height:100%;height:fit-content;padding-block-end:var(--p-spacing-fluid-lg)";
    let slotDesktop = "";
    let slotMobile = "";
    if (isPrimary) {
      slotDesktop =
        "@media(min-width:760px){slot{grid-area:3/2/auto/-2;display:grid;" +
        slotGrid +
        ";animation:slide-up-desktop " +
        animMd +
        " " +
        easeBase +
        "}}";
    }
    if (!isSecondary) {
      slotMobile =
        "@media(max-width:759px){slot{display:grid;grid-area:4/2/auto/-2;z-index:0;" +
        slotGrid +
        (isPrimary
          ? ";animation:slide-up-mobile " + animMd + " " + easeBase
          : "") +
        "}}";
    } else {
      slotMobile =
        "@media(max-width:759px){slot{display:contents}::slotted(*:not([primary],[secondary],[cascade])){display:none !important}}";
    }
    if (isSecondary && !isPrimary) {
      slotDesktop +=
        "@media(min-width:760px){::slotted(*:not([primary],[cascade])){display:none !important}}";
    }
    const drawerDesktop = isSecondary
      ? ".drawer{width:calc(clamp(338px, 210px + 18vw, 640px) * 2);grid-template:var(--p-spacing-fluid-md) auto minmax(0, 1fr)/repeat(2, var(--p-spacing-fluid-lg) minmax(0, 1fr) var(--p-spacing-fluid-lg));background:linear-gradient(90deg,var(--_p-drilldown-b) 0%,var(--_p-drilldown-b) 50%,var(--_p-drilldown-c) 50%,var(--_p-drilldown-c) 100%)}.drawer:dir(rtl){background:linear-gradient(90deg,var(--_p-drilldown-c) 0%,var(--_p-drilldown-c) 50%,var(--_p-drilldown-b) 50%,var(--_p-drilldown-b) 100%)}"
      : ".drawer{width:clamp(338px, 210px + 18vw, 640px);grid-template:var(--p-spacing-fluid-md) auto minmax(0, 1fr)/repeat(1, var(--p-spacing-fluid-lg) minmax(0, 1fr) var(--p-spacing-fluid-lg));background:var(--_p-drilldown-b)}";
    const scrollerMobile = !isSecondary
      ? '.scroller{grid-area:1/1/-1/-1;display:grid;grid-template-rows:subgrid;grid-template-columns:subgrid}.scroller::before{content:"";position:sticky;top:0;grid-area:1/1/4/-1;z-index:1;background:linear-gradient(180deg,var(--_p-drilldown-b) 0%,var(--_p-drilldown-b) 65%,transparent 100%)}'
      : "";
    const backMobile =
      isSecondary && isPrimary
        ? ".back{display:block;grid-area:2/2;width:fit-content;height:fit-content;place-self:center;z-index:2}"
        : "";
    return (
      "@keyframes slide-up-mobile{from{transform:translate3d(0,var(--p-spacing-fluid-md),0)}to{transform:translate3d(0,0,0)}}" +
      "@keyframes slide-up-desktop{from{margin-block-start:var(--p-spacing-fluid-md)}to{margin-block-start:0px}}" +
      ":host{display:block;" +
      "--_p-drilldown-a:var(--p-color-primary) !important;" +
      "--_p-drilldown-b:var(--p-color-canvas) !important;" +
      "--_p-drilldown-c:var(--p-color-surface) !important;" +
      "--_p-drilldown-d:var(--p-color-backdrop) !important;" +
      "--_p-drilldown-f:rgba(255,255,255,.01) !important}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "::slotted(*){--p-drilldown-grid-template:auto/auto;--p-drilldown-gap:var(--p-spacing-fluid-xs)}" +
      "dialog{all:unset;position:fixed;inset:0;z-index:999999999;outline:0;" +
      (isOpen ? dialogOpen : dialogClosed) +
      "}" +
      "dialog::backdrop{display:none}" +
      slotDesktop +
      slotMobile +
      ".drawer{position:absolute;inset:0;display:grid;" +
      (isOpen ? drawerOpen : drawerClosed) +
      "}" +
      (isOpen ? "" : ".drawer:dir(rtl){transform:translate3d(100%,0,0)}") +
      '.drawer::before,.drawer::after{content:"";position:relative;z-index:2;pointer-events:none;opacity:0}' +
      ".scroller{display:contents;overflow:hidden auto;background:var(--_p-drilldown-f)}" +
      ".back{display:none}" +
      "@media(min-width:760px){" +
      drawerDesktop +
      ".drawer::after{grid-area:1/4/-1/-1;background:var(--_p-drilldown-c)}" +
      ".drawer::before{grid-area:1/1/-1/4;background:var(--_p-drilldown-b)}" +
      ".scroller{grid-area:1/1/-1/4;display:grid;grid-template-rows:subgrid;grid-template-columns:subgrid}" +
      ".dismiss-mobile{display:none}" +
      ".dismiss-desktop{--p-color-primary:hsl(225 100% 99%);--p-color-frosted:hsl(240 2% 43% / 0.228);--p-color-frosted-soft:hsl(240 3.7% 26.5% / 0.154);position:absolute;inset-inline-start:calc(100% + var(--p-spacing-fluid-sm));inset-block-start:var(--p-spacing-fluid-sm);padding:var(--p-spacing-static-sm)}" +
      "}" +
      "@media(max-width:759px){" +
      ".drawer{grid-template:var(--p-spacing-fluid-md) auto var(--p-spacing-fluid-lg) minmax(0, 1fr)/var(--p-spacing-fluid-lg) auto minmax(0, 1fr) auto var(--p-spacing-fluid-lg);background:var(--_p-drilldown-b)}" +
      ".drawer::after{grid-area:1/1/-1/-1;background:var(--_p-drilldown-b)}" +
      ".drawer::before{grid-area:1/1/-1/-1;background:var(--_p-drilldown-b)}" +
      scrollerMobile +
      ".dismiss-mobile{width:fit-content;height:fit-content;place-self:start end;grid-area:2/4;z-index:3;margin-inline-end:-1px}" +
      ".dismiss-desktop{display:none}" +
      backMobile +
      "}"
    );
  }

  function isOpenFlag() {
    const open = props.open;
    return open === true || open === "true" || open === "";
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
    <div
      className={["p-drilldown", props.className].filter(Boolean).join(" ")}
      data-pds="drilldown"
    >
      <dialog inert>
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host {\n          display: block;\n        }\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-drilldown") }} />
        <div className="drawer">
          <PButton-pure
            className="back"
            type="button"
            size="small"
            align-label="end"
            stretch="true"
            icon="arrow-left"
            hide-label="true"
          >
            {" "}
            Back{" "}
          </PButton-pure>
          <PButton
            className="dismiss-mobile"
            type="button"
            icon="close"
            compact="true"
            variant="secondary"
            hide-label="true"
          >
            {" "}
            Dismiss drilldown{" "}
          </PButton>
          <PButton
            className="dismiss-desktop"
            type="button"
            icon="close"
            variant="secondary"
            hide-label="true"
          >
            {" "}
            Dismiss drilldown{" "}
          </PButton>
          <div className="scroller">
            {props.children}
          </div>
        </div>
      </dialog>{" "}
    </div>
  );
}
export default LitDrilldown;
