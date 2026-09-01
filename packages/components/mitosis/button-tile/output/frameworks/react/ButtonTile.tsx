/* mitosis-native-host: native react from ButtonTile.lite.tsx */
import * as React from "react";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitButtonTileProps {
  className?: string;
  size?: any;
  weight?: any;
  aspectRatio?: any;
  label?: string;
  description?: string;
  align?: string;
  gradient?: any;
  compact?: any;
  type?: string;
  disabled?: any;
  loading?: any;
  icon?: string;
  iconSource?: string;
  aria?: any;
}

function LitButtonTile(props: LitButtonTileProps) {
  function cssText() {
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
      if (raw === "true") return true;
      if (raw === "false") return false;
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
    const sizeToken: any = {
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
    const weightToken: any = {
      regular: "var(--p-font-weight-normal)",
      "semi-bold": "var(--p-font-weight-semibold)",
      normal: "var(--p-font-weight-normal)",
      semibold: "var(--p-font-weight-semibold)",
      bold: "var(--p-font-weight-bold)",
    };
    const gradientStops =
      "hsla(from var(--p-color-canvas) h s l / .8) 0%,hsla(from var(--p-color-canvas) h s l / .8) 8.1%,hsla(from var(--p-color-canvas) h s l / .8) 15.5%,hsla(from var(--p-color-canvas) h s l / .8) 22.5%,hsla(from var(--p-color-canvas) h s l / .78) 29%,hsla(from var(--p-color-canvas) h s l / .73) 35.3%,hsla(from var(--p-color-canvas) h s l / .67) 41.2%,hsla(from var(--p-color-canvas) h s l / .6) 47.1%,hsla(from var(--p-color-canvas) h s l / .52) 52.9%,hsla(from var(--p-color-canvas) h s l / .44) 58.8%,hsla(from var(--p-color-canvas) h s l / .33) 64.7%,hsla(from var(--p-color-canvas) h s l / .22) 71%,hsla(from var(--p-color-canvas) h s l / .12) 77.5%,hsla(from var(--p-color-canvas) h s l / .05) 84.5%,hsla(from var(--p-color-canvas) h s l / .011) 91.9%,hsla(from var(--p-color-canvas) h s l / 0) 100%";
    const size = parse(props.size, "medium");
    const weight = parse(props.weight, "semi-bold");
    const aspectRatio = parse(props.aspectRatio, "4/3");
    let compact: any = parse(props.compact, false);
    if (props.compact === "true") compact = true;
    if (props.compact === "false") compact = false;
    const align = props.align || "bottom";
    const isTop = align === "top";
    const disabled = isTrue(props.disabled);
    const loading = isTrue(props.loading);
    const isDisabledOrLoading = disabled || loading;
    const hasGradient = isTrue(props.gradient);
    const hasFooterSlot = false;
    const sizeBase =
      typeof size === "object" && size !== null ? size.base || "medium" : size;
    const weightBase =
      typeof weight === "object" && weight !== null
        ? weight.base || "semi-bold"
        : weight;
    const ratioBase =
      typeof aspectRatio === "object" && aspectRatio !== null
        ? aspectRatio.base || "4/3"
        : aspectRatio;
    const compactBase =
      typeof compact === "object" && compact !== null ? compact.base : compact;
    const compactOn = compactBase === true || compactBase === "true";
    let out =
      ":host{display:flex;align-items:stretch;color-scheme:dark;hyphens:auto}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "slot{display:block}" +
      "slot:not([name]){width:100%;height:100%;transition:transform var(--p-transition-duration,var(--p-duration-md)) var(--p-ease-in-out)}" +
      'slot[name="header"]{grid-area:' +
      (isTop ? "4" : "2") +
      "/2;z-index:5}" +
      'slot[name="footer"]{grid-row:2;z-index:3}' +
      "::slotted(:is(img,video,picture)){display:block !important;width:100% !important;height:100% !important}" +
      "::slotted(:is(img,video)){object-fit:cover !important}" +
      "a{grid-area:1/1/-1 /-1;z-index:4;outline:0}" +
      "p{all:unset;z-index:3;max-width:34.375rem;font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-primary);hyphens:inherit;font-size:" +
      (sizeToken[sizeBase] || sizeToken.medium) +
      ";font-weight:" +
      (weightToken[weightBase] || weightToken["semi-bold"]) +
      "}" +
      "@supports (-webkit-hyphens: auto){:host{align-items:baseline}}" +
      ".root{display:grid;grid-template:var(--p-spacing-fluid-md) auto minmax(0px, 1fr) auto var(--p-spacing-fluid-md)/var(--p-spacing-fluid-md) minmax(0px, 1fr) var(--p-spacing-fluid-md);width:100%;border-radius:var(--p-radius-3xl);aspect-ratio:" +
      ratioBase +
      ";cursor:" +
      (isDisabledOrLoading ? "not-allowed" : "pointer") +
      "}";
    if (typeof aspectRatio === "object" && aspectRatio !== null) {
      for (const bp of Object.keys(aspectRatio)) {
        if (bp === "base" || !minWidth[bp]) continue;
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){.root{aspect-ratio:" +
          aspectRatio[bp] +
          "}}";
      }
    }
    if (hasGradient) {
      if (isTop) {
        out +=
          '.root::after{content:"";z-index:2;grid-area:1/1/3/-1;background:linear-gradient(to bottom, ' +
          gradientStops +
          ");;margin-bottom:calc(var(--p-spacing-fluid-lg) * -1);border-start-start-radius:inherit;border-start-end-radius:inherit}";
      } else {
        out +=
          '.root::after{content:"";z-index:2;grid-area:4/1/6/-1;background:linear-gradient(to top, ' +
          gradientStops +
          ");;margin-top:calc(var(--p-spacing-fluid-lg) * -1);border-end-start-radius:inherit;border-end-end-radius:inherit}";
      }
    }
    out +=
      ".media{position:relative;grid-area:1/1/-1 /-1;z-index:1;overflow:hidden;border-radius:inherit}" +
      ".footer{grid-area:" +
      (isTop ? "2" : "4") +
      "/2";
    if (typeof compact === "object" && compact !== null) {
      out += compactOn
        ? ";display:grid;grid-template-columns:minmax(0,1fr) auto;column-gap:var(--p-spacing-static-md)}"
        : ";display:flex;flex-direction:column;align-items:start}";
      for (const bp of Object.keys(compact)) {
        if (bp === "base" || !minWidth[bp]) continue;
        const on = compact[bp] === true || compact[bp] === "true";
        out += on
          ? "@media(min-width:" +
            minWidth[bp] +
            "px){.footer{display:grid;grid-template-columns:minmax(0,1fr) auto;column-gap:var(--p-spacing-static-md)}}"
          : "@media(min-width:" +
            minWidth[bp] +
            "px){.footer{display:flex;flex-direction:column;align-items:start}}";
      }
    } else {
      out += compactOn
        ? ";display:grid;grid-template-columns:minmax(0,1fr) auto;column-gap:var(--p-spacing-static-md)}"
        : ";display:flex;flex-direction:column;align-items:start}";
    }
    out +=
      ".link-or-button-pure{z-index:5;grid-column:2;grid-row:1/" +
      (hasFooterSlot ? "3" : "2") +
      ";align-self:" +
      (isTop ? "flex-start" : "flex-end");
    if (typeof compact === "object" && compact !== null) {
      out += ";display:" + (compactOn ? "inline-block" : "none") + "}";
      for (const bp of Object.keys(compact)) {
        if (bp === "base" || !minWidth[bp]) continue;
        const on = compact[bp] === true || compact[bp] === "true";
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){.link-or-button-pure{display:" +
          (on ? "inline-block" : "none") +
          "}}";
      }
    } else {
      out += ";display:" + (compactOn ? "inline-block" : "none") + "}";
    }
    out +=
      ".link-or-button{min-height:54px;z-index:5;margin-top:var(--p-spacing-static-md)";
    if (typeof compact === "object" && compact !== null) {
      out += ";display:" + (compactOn ? "none" : "inline-block") + "}";
      for (const bp of Object.keys(compact)) {
        if (bp === "base" || !minWidth[bp]) continue;
        const on = compact[bp] === true || compact[bp] === "true";
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){.link-or-button{display:" +
          (on ? "none" : "inline-block") +
          "}}";
      }
    } else {
      out += ";display:" + (compactOn ? "none" : "inline-block") + "}";
    }
    if (!disabled) {
      out +=
        "@media(hover:hover){.root:hover slot:not([name]){transform:scale3d(1.05,1.05,1.05)}}";
    }
    out += "@supports (-webkit-hyphens: auto){.root{height:100%}}";
    if (typeof size === "object" && size !== null) {
      for (const bp of Object.keys(size)) {
        if (bp === "base" || !minWidth[bp]) continue;
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){p{font-size:" +
          (sizeToken[size[bp]] || size[bp]) +
          "}}";
      }
    }
    if (typeof weight === "object" && weight !== null) {
      for (const bp of Object.keys(weight)) {
        if (bp === "base" || !minWidth[bp]) continue;
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){p{font-weight:" +
          (weightToken[weight[bp]] || weight[bp]) +
          "}}";
      }
    }
    return out;
  }
  function descriptionText() {
    return props.description || "";
  }
  function labelText() {
    return props.label || "";
  }
  return (
    <div
      className={["p-button-tile", props.className].filter(Boolean).join(" ")}
      data-pds="button-tile"
    >
      <div className="root">
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host {\n          display: flex;\n        }\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-button-tile") }} />
        {props["header"] ?? null}
        <div className="media">
          {props.children}
        </div>
        <div className="footer">
          <p>{descriptionText()}</p>
          {props["footer"] ?? null}
        </div>
      </div>{" "}
    </div>
  );
}
export default LitButtonTile;
