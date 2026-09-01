/* mitosis-native-host: native react from LinkTileProduct.lite.tsx */
import * as React from "react";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitLinkTileProductProps {
  className?: string;
  heading?: string;
  price?: string;
  priceOriginal?: string;
  description?: string;
  likeButton?: any;
  liked?: any;
  href?: string;
  aspectRatio?: any;
  target?: string;
  rel?: string;
}

function LitLinkTileProduct(props: LitLinkTileProductProps) {
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
      return raw;
    };
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const isFalse = (v: any) => v === false || v === "false";
    const href = props.href;
    const hasHref = !(href == null || href === "" || href === "undefined");
    const hasSlottedAnchor = !hasHref;
    const hasLikeButton = !isFalse(props.likeButton);
    const hasPriceOriginal = !!(
      props.priceOriginal && props.priceOriginal !== "undefined"
    );
    const hasDescription = !!(
      props.description && props.description !== "undefined"
    );
    const aspectRatio = parse(props.aspectRatio, "3/4");
    const ratioBase =
      typeof aspectRatio === "object" && aspectRatio !== null
        ? aspectRatio.base || "3/4"
        : aspectRatio;
    let out =
      ":host{display:block;position:relative}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      'slot[name="header"]{display:block}' +
      '::slotted([slot="header"]){display:flex !important;flex-wrap:wrap !important;gap:var(--p-spacing-fluid-xs) !important}' +
      "::slotted(:is(img,picture)){display:block !important;width:100% !important;height:100% !important;object-fit:cover !important;border-radius:var(--p-radius-2xl) !important;overflow:hidden !important}";
    if (hasSlottedAnchor) {
      out +=
        "::slotted(a[slot='anchor']){position:absolute !important;inset:0 !important;z-index:1 !important;border-radius:var(--p-radius-3xl) !important;text-indent:-999999px !important}" +
        "::slotted(a[slot='anchor']:focus-visible){outline:2px solid var(--p-color-focus) !important;outline-offset:2px !important}";
    }
    if (hasPriceOriginal) {
      out += "s{color:var(--p-color-contrast-medium)}";
    }
    if (hasSlottedAnchor) {
      out +=
        "@media(forced-colors:active){::slotted(a[slot='anchor']:focus-visible){outline-color:Highlight !important}::slotted(a[slot='anchor']){forced-color-adjust:none !important;box-shadow:inset 0 0 0 2px LinkText !important}}";
    }
    out +=
      ".root{display:flex;flex-direction:column;aspect-ratio:" +
      ratioBase +
      ";overflow:hidden;box-sizing:border-box;border-radius:var(--p-radius-3xl);padding:var(--p-spacing-fluid-sm);color:var(--p-color-primary);background-color:var(--p-color-surface)}";
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
    if (!hasSlottedAnchor) {
      out +=
        ".anchor{position:absolute;inset:0;z-index:1;border-radius:var(--p-radius-3xl)}" +
        ".anchor:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}";
    }
    out +=
      ".header{display:flex;gap:var(--p-spacing-fluid-sm);justify-content:space-between;align-items:flex-start}";
    if (hasLikeButton) {
      out += ".button{position:relative;z-index:2}";
    }
    out +=
      ".image{aspect-ratio:8/9;margin:var(--p-spacing-fluid-sm) auto var(--p-spacing-fluid-xs);overflow:hidden;transition:transform var(--p-transition-duration,var(--p-duration-md)) var(--p-ease-in-out)}" +
      ".wrapper{display:flex;flex-direction:column;margin:auto;text-align:center}" +
      ".heading{margin:0 0 2px;font:var(--p-font-weight-semibold) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}" +
      ".price{margin:0;font:var(--p-font-weight-normal) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next)";
    if (hasPriceOriginal) {
      out +=
        ";display:flex;flex-wrap:wrap;justify-content:center;column-gap:var(--p-spacing-fluid-xs)}";
    } else {
      out += "}";
    }
    if (hasDescription) {
      out +=
        ".description{margin:0;font:var(--p-font-weight-normal) var(--p-typescale-2xs) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-contrast-high);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}";
    }
    if (hasPriceOriginal) {
      out +=
        ".sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
    }
    out +=
      "@media(min-width:760px){.image{padding:0 var(--p-spacing-fluid-md)}}";
    if (!hasSlottedAnchor) {
      out +=
        "@media(forced-colors:active){.anchor{forced-color-adjust:none;box-shadow:inset 0 0 0 2px LinkText}.anchor:focus-visible{outline-color:Highlight}}";
    }
    out +=
      "@media(hover:hover){.root:hover .image{transform:scale3d(1.05,1.05,1.05)}}";
    return out;
  }
  function headingText() {
    return props.heading || "";
  }
  function priceText() {
    return props.price || "";
  }
  return (
    <div
      className={["p-link-tile-product", props.className].filter(Boolean).join(" ")}
      data-pds="link-tile-product"
    >
      <div className="root">
        <style dangerouslySetInnerHTML={{ __html: scopeCss("\n        :host {\n          display: block;\n          position: relative;\n        }\n        :host([hidden]) {\n          display: none !important;\n        }\n      " + cssText(), ".p-link-tile-product") }} />
        <div className="image">
          {props.children}
        </div>
        <div className="wrapper">
          <h3 className="heading">{headingText()}</h3>
          <p className="price">{priceText()}</p>
        </div>
      </div>{" "}
    </div>
  );
}
export default LitLinkTileProduct;
