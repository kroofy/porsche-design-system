import * as React from "react";

export interface LitCarouselProps {
  heading?: any;
  headingSize?: any;
  description?: any;
  alignHeader?: any;
  alignControls?: any;
  rewind?: any;
  width?: any;
  slidesPerPage?: any;
  pagination?: any;
  aria?: any;
  intl?: any;
  activeSlideIndex?: any;
  skipLinkTarget?: any;
  focusOnCenterSlide?: any;
  gradient?: any;
  trimSpace?: any;
}

function LitCarousel(props: LitCarouselProps) {
  function cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const parse = (raw: any, fallback: any) => {
      if (raw === undefined || raw === null || raw === "") return fallback;
      if (typeof raw === "string" && raw.charAt(0) === "{") {
        try {
          return JSON.parse(
            raw
              .replace(/'/g, '"')
              .replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":')
          );
        } catch (e) {
          return fallback;
        }
      }
      return raw;
    };
    const heading = props.heading || "";
    const description = props.description || "";
    const hasHeading = !!heading;
    const hasDescription = !!description;
    const hasControls = false;
    const headingSize = props.headingSize || "x-large";
    const width = props.width || "basic";
    const alignHeader = props.alignHeader || "start";
    const alignControls = props.alignControls || "auto";
    const gradient = isTrue(props.gradient);
    const pagination = parse(props.pagination, false);
    const hasPagination =
      pagination === true ||
      pagination === "true" ||
      (pagination && typeof pagination === "object");
    const isCenter = alignHeader === "center";
    const hasNavigation = true;
    const isInfinite = false;
    const col = width === "extended" ? "1" : "2";
    const padBase = "max(22px, 10.625vw - 12px)";
    const padS =
      "calc(calc(5vw - 16px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((100vw - calc(5vw - 16px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * " +
      col +
      ")";
    const padXxl =
      "calc(max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * " +
      col +
      ")";
    const pad = (v: any) =>
      "var(--p-carousel-ps,var(--p-carousel-px," + v + "))";
    const fontSize =
      headingSize === "xx-large"
        ? "var(--p-typescale-2xl)"
        : "var(--p-typescale-xl)";
    let out =
      ":host{display:flex;gap:var(--p-spacing-fluid-md) !important;flex-direction:column !important;box-sizing:content-box !important}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "::slotted(*){border-radius:var(--p-carousel-border-radius,var(--p-radius-3xl)) !important}";
    if (hasHeading || hasDescription) {
      out +=
        '.heading,p,::slotted([slot="description"]){grid-column:1/-1 !important;color:var(--p-color-primary) !important' +
        (isCenter
          ? ";text-align:center !important;justify-self:center !important"
          : "") +
        "}";
    }
    if (hasHeading) {
      out +=
        ".heading{max-width:56.25rem !important;margin:0 0 " +
        (hasDescription ? "0" : "var(--p-spacing-fluid-md)") +
        " !important;font:var(--p-font-weight-normal) " +
        fontSize +
        " / var(--p-leading-normal) var(--p-font-porsche-next) !important}" +
        '::slotted([slot="heading"]){margin:0 !important;font:var(--p-font-weight-normal) ' +
        fontSize +
        " / var(--p-leading-normal) var(--p-font-porsche-next) !important}";
    }
    if (hasDescription) {
      out +=
        'p,::slotted([slot="description"]){max-width:34.375rem !important;margin:var(--p-spacing-fluid-sm) 0 var(--p-spacing-fluid-md) !important;font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next) !important}';
    }
    if (hasControls) {
      const just =
        alignControls !== "auto"
          ? alignControls
          : isCenter
          ? "center"
          : "start";
      out +=
        'slot[name="controls"]{display:block;grid-column:1/-1;grid-row-start:3;align-self:center;justify-self:' +
        just +
        "}";
    }
    out +=
      ".header{display:grid;padding-inline-start:" +
      pad(padBase) +
      ";padding-inline-end:" +
      pad(padBase) +
      "}" +
      ".nav{display:none;color-scheme:var(--p-carousel-prev-next-color-scheme)}" +
      ".btn{padding:var(--p-spacing-static-sm)}" +
      ".skip-link:not(:focus){opacity:0;pointer-events:none}" +
      ".slide-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}" +
      ".splide{overflow:hidden;padding:4px 0;margin:-4px 0}" +
      ".splide__track{position:relative;padding-block:0px !important;padding-inline-start:" +
      pad(padBase) +
      " !important;padding-inline-end:" +
      pad(padBase) +
      " !important" +
      (gradient
        ? ";-webkit-mask:linear-gradient(90deg,transparent 20%,#000 var(--p-gradient-color-width,33%) calc(100% - var(--p-gradient-color-width,33%)),transparent 80%);mask:linear-gradient(90deg,transparent 20%,#000 var(--p-gradient-color-width,33%) calc(100% - var(--p-gradient-color-width,33%)),transparent 80%)"
        : "") +
      "}" +
      ".splide__list{backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex}" +
      ".splide__slide{backface-visibility:hidden;-webkit-backface-visibility:hidden;flex-shrink:0;transform:translateZ(0);border-radius:var(--p-carousel-border-radius,var(--p-radius-3xl))}" +
      ".splide__slide:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
      ".splide__sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}" +
      ".splide__track--draggable{cursor:grab;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}";
    if (isCenter) {
      out +=
        ".splide:not(.is-overflow) .splide__list{justify-content:center}" +
        ".splide:not(.is-overflow) .splide__slide:last-child{margin-inline-end:0 !important}";
    }
    if (hasPagination && hasNavigation) {
      const justPag = isInfinite ? "flex-start" : "center";
      out +=
        ".pagination-container{display:flex;position:relative;justify-content:" +
        justPag +
        ";width:calc(20px + 8px * 4 + 8px * 4);left:calc(50% - (calc(20px + 8px * 4 + 8px * 4)) / 2);overflow-x:hidden}" +
        ".pagination{display:flex;align-items:center;width:fit-content;height:8px;gap:8px;transition:transform var(--p-transition-duration,var(--p-duration-md))}" +
        ".bullet{border-radius:var(--p-radius-full);background:var(--p-color-contrast-medium);width:8px;height:8px;transition:background-color var(--p-transition-duration,var(--p-duration-md)), width var(--p-transition-duration,var(--p-duration-md))}" +
        ".bullet--active{background:var(--p-color-primary);height:8px;width:20px !important}" +
        '@media (pointer: coarse){.pagination-container{width:calc(20px + 8px * 4 + 16px * 4 + 2 * 8px);left:calc(50% - calc(20px + 8px * 4 + 16px * 4 + 2 * 8px) / 2)}.pagination{height:calc(8px + 2 * 8px);gap:16px}.bullet{position:relative}.bullet::before{content:"";position:absolute;inset:-8px}}' +
        "@media(hover:hover){.bullet{cursor:pointer}}";
    }
    out +=
      "@media(min-width:760px){.header{grid-template-columns:minmax(0px,1fr) auto;padding-inline-start:" +
      pad(padS) +
      ";padding-inline-end:" +
      pad(padS) +
      (hasNavigation ? ";column-gap:var(--p-spacing-static-md)" : "") +
      "}.nav{grid-row-start:3;grid-column-end:-1;display:flex;gap:var(--p-spacing-static-xs);align-self:flex-start}.splide__track{padding-inline-start:" +
      pad(padS) +
      " !important;padding-inline-end:" +
      pad(padS) +
      " !important}}" +
      "@media(min-width:1920px){.header{padding-inline-start:" +
      pad(padXxl) +
      ";padding-inline-end:" +
      pad(padXxl) +
      "}.splide__track{padding-inline-start:" +
      pad(padXxl) +
      " !important;padding-inline-end:" +
      pad(padXxl) +
      " !important}}" +
      "@media(forced-colors:active){.splide__slide:focus-visible{outline-color:Highlight}}";
    return out;
  }
  return (
    <>
      {" "}
      <div className="header">
        <style dangerouslySetInnerHTML={{ __html: cssText() }} />
        <div className="nav" />
      </div>{" "}
      <style jsx>{`
        :host {
          display: flex;
          flex-direction: column;
        }
        :host([hidden]) {
          display: none !important;
        }
      `}</style>{" "}
    </>
  );
}
export default LitCarousel;
