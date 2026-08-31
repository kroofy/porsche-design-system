<script context="module" lang="ts">
  export interface LitAccordionProps {
    open?: any;
    alignMarker?: string;
    background?: string;
    compact?: any;
    indent?: any;
    sticky?: any;
    size?: any;
    heading?: string;
    headingTag?: string;
  }
</script>

<script lang="ts">
  export let open: LitAccordionProps["open"];
  export let compact: LitAccordionProps["compact"];
  export let sticky: LitAccordionProps["sticky"];
  export let alignMarker: LitAccordionProps["alignMarker"];
  export let background: LitAccordionProps["background"];
  export let indent: LitAccordionProps["indent"];
  export let size: LitAccordionProps["size"];
  export let heading: LitAccordionProps["heading"];
  export let headingTag: LitAccordionProps["headingTag"];

  $: cssText = () => {
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
    const pick = (obj: any, key: any, fallback: any) => {
      if (obj && typeof obj === "object") {
        if (obj[key] === undefined) return fallback;
        return obj[key];
      }
      return obj;
    };
    const isOpen = isTrue(open);
    const isCompact = isTrue(compact);
    const isSticky = isTrue(sticky);
    const align = alignMarker || "end";
    const isStart = align === "start";
    const background = background || "none";
    const indent = parse(indent, false);
    const size = parse(size, "small");
    const hasBefore = hasSummaryBefore();
    const hasAfter = hasSummaryAfter();
    const hasSummary = hasSummarySlot();
    const compactFactor = isCompact ? 0.64285714 : 1;
    const paddingBlock =
      "calc(28px * (" + compactFactor + " - 0.64285714) + 6px)";
    const paddingInline =
      "calc(11.2px * (" + compactFactor + " - 0.64285714) + 12px)";
    const gap = "calc(11.2px * (" + compactFactor + " - 0.64285714) + 4px)";
    const paddingTop = paddingBlock;
    const py = background === "none" ? "0" : paddingBlock;
    const px = background === "none" ? "0" : paddingInline;
    const radius = isCompact ? "var(--p-radius-xl)" : "var(--p-radius-2xl)";
    const bgMap: any = {
      canvas: "var(--p-color-canvas)",
      surface: "var(--p-color-surface)",
      frosted: "var(--p-color-frosted)",
      none: "transparent",
    };
    const bg = bgMap[background] || bgMap.none;
    const duration = isOpen
      ? "var(--p-transition-duration,var(--p-duration-md))"
      : "var(--p-transition-duration,var(--p-duration-sm))";
    const easing = isOpen ? "var(--p-ease-in)" : "var(--p-ease-out)";
    const summaryCol = hasBefore && isStart ? 3 : hasBefore || isStart ? 2 : 1;
    const iconCol = isStart
      ? 1
      : hasBefore && hasAfter
      ? 4
      : hasBefore || hasAfter
      ? 3
      : 2;
    const beforeCol = isStart ? 2 : 1;
    const afterCol = hasBefore && isStart ? 4 : hasBefore || isStart ? 3 : 2;
    const cols =
      (hasBefore ? "auto " : "") +
      (isStart ? "auto minmax(0, 1fr)" : "minmax(0, 1fr) auto") +
      (hasAfter ? " auto " : "");
    const iconMask =
      'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 15.125h-.001l-.005-.006-6.494-5.476.642-.768 5.858 4.94 5.858-4.94.642.769-6.497 5.477z"/></svg>\') center/contain no-repeat';
    const indentBase =
      typeof indent === "object" && indent !== null
        ? pick(indent, "base", false)
        : indent;
    const sizeBase =
      typeof size === "object" && size !== null
        ? pick(size, "base", "small")
        : size;
    const fontSizeFor = (s: any) =>
      s === "medium" ? "var(--p-typescale-md)" : "var(--p-typescale-sm)";
    let out =
      "@keyframes overflow-hidden{from{overflow:hidden}to{overflow:hidden}}" +
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      'slot[name="summary-before"],slot[name="summary"],slot[name="summary-after"]{display:flex;flex-wrap:wrap;align-items:center;gap:' +
      gap +
      "}" +
      'slot[name="summary-before"]{grid-area:1/' +
      beforeCol +
      ";z-index:2}" +
      'slot[name="summary"]{grid-area:1/' +
      summaryCol +
      "}" +
      'slot[name="summary-after"]{grid-area:1/' +
      afterCol +
      ";z-index:2}" +
      "slot:not([name]){display:block;overflow:hidden;transform:translate3d(0,0,0)}" +
      "details[open] slot:not([name]){overflow:visible;animation:overflow-hidden " +
      duration +
      "}" +
      "h1,h2,h3,h4,h5,h6{all:unset;grid-area:1/" +
      summaryCol +
      ";font:inherit;font-weight:var(--p-font-weight-semibold);font-size:" +
      fontSizeFor(sizeBase) +
      "}" +
      "details{all:unset;font:var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-primary);display:grid;grid-template:repeat(2, auto) / " +
      cols +
      ";column-gap:" +
      gap +
      ";align-items:center;padding:var(--p-accordion-py," +
      py +
      ") var(--p-accordion-px," +
      px +
      ");background:" +
      bg;
    if (background === "frosted") {
      out +=
        ";-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted)";
    }
    out +=
      ";border-radius:" +
      radius +
      "}" +
      "details::details-content{display:contents !important;content-visibility:visible !important}" +
      "details > div{grid-area:2/1/auto/-1;grid-column-start:" +
      (isTrue(indentBase) ? summaryCol : 1) +
      ";z-index:0;display:grid;opacity:0;margin-top:0px;grid-template-rows:0fr;visibility:hidden;transition:visibility 0s linear " +
      duration +
      ", grid-template-rows " +
      duration +
      " " +
      easing +
      ", padding-top " +
      duration +
      " " +
      easing +
      ", opacity " +
      duration +
      " " +
      easing +
      "}" +
      "details[open] > div{opacity:1;padding-top:" +
      paddingTop +
      ";z-index:2;padding-inline:var(--p-accordion-px," +
      px +
      ");margin-inline:calc(-1 * var(--p-accordion-px," +
      px +
      "));grid-template-rows:1fr;visibility:inherit;transition:visibility 0s linear 0s, grid-template-rows " +
      duration +
      " " +
      easing +
      ", margin-top " +
      duration +
      " " +
      easing +
      ", opacity " +
      duration +
      " " +
      easing +
      "}" +
      "summary{all:unset;grid-area:1/1/auto/-1;z-index:1;display:grid;grid-template-columns:subgrid;align-items:center;cursor:pointer;padding:var(--p-accordion-py," +
      py +
      ") var(--p-accordion-px," +
      px +
      ");margin:calc(-1 * var(--p-accordion-py," +
      py +
      ")) calc(-1 * var(--p-accordion-px," +
      px +
      "))";
    if (isSticky && (background === "canvas" || background === "surface")) {
      out +=
        ";position:sticky;top:var(--p-accordion-summary-top,var(--p-accordion-position-sticky-top,0px));background:linear-gradient(180deg," +
        bg +
        " 0%," +
        bg +
        " 90%,transparent 100%);border-radius:" +
        radius;
    }
    out +=
      "}" +
      "summary:focus-visible::before{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
      "summary::before{grid-area:1/" +
      iconCol +
      ';place-self:center;content:"";width:1.5rem;height:1.5rem;pointer-events:none;border-radius:var(--p-radius-full);background:transparent;transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}' +
      "summary::after{grid-area:1/" +
      iconCol +
      ';place-self:center;content:"";width:1rem;height:1rem;pointer-events:none;-webkit-mask:' +
      iconMask +
      ";mask:" +
      iconMask +
      ";background:var(--p-color-primary);transform:rotate3d(0);transition:transform " +
      duration +
      " " +
      easing +
      "}" +
      "details[open] summary::after{transform:rotate3d(0,0,1,180deg)}" +
      "@media(forced-colors:active){details{outline:1px solid CanvasText;outline-offset:" +
      (background === "none" ? "0" : "-1px") +
      ";padding:var(--p-accordion-py," +
      paddingBlock +
      ") var(--p-accordion-px," +
      paddingInline +
      ")}summary::after{background-color:LinkText}summary:focus-visible::before{outline-color:Highlight}}" +
      "@media(hover:hover){summary:hover::before{background:var(--p-color-frosted)}}";
    if (!hasBefore) out += 'slot[name="summary-before"]{display:none}';
    if (!hasAfter) out += 'slot[name="summary-after"]{display:none}';
    if (hasSummary)
      out +=
        "summary > h1,summary > h2,summary > h3,summary > h4,summary > h5,summary > h6{display:none}";
    else out += 'slot[name="summary"]{display:none}';
    if (typeof indent === "object" && indent !== null) {
      for (const bp of Object.keys(indent)) {
        if (bp === "base" || !minWidth[bp]) continue;
        const ind = isTrue(pick(indent, bp, indentBase));
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){details > div{grid-column-start:" +
          (ind ? summaryCol : 1) +
          "}}";
      }
    }
    if (typeof size === "object" && size !== null) {
      for (const bp of Object.keys(size)) {
        if (bp === "base" || !minWidth[bp]) continue;
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){h1,h2,h3,h4,h5,h6{font-size:" +
          fontSizeFor(pick(size, bp, sizeBase)) +
          "}}";
      }
    }
    return out;
  };
  $: headingText = () => {
    return heading || "";
  };
  $: headingTagValue = () => {
    return headingTag || "h2";
  };
  $: isOpenFlag = () => {
    return open === true || open === "true" || open === "";
  };
  $: hasSummaryBefore = () => {
    return false;
  };
  $: hasSummaryAfter = () => {
    return false;
  };
  $: hasSummarySlot = () => {
    return false;
  };
</script>

<details>
  {@html `<${"style"}  >${cssText()}<${"/style"}>`}<summary
    ><slot name="summary" />
    <h2>{headingText()}<slot name="heading" /></h2></summary
  ><slot name="summary-before" /><slot name="summary-after" />
  <div><slot /></div>
</details>

<style>
  :host {
    display: block;
  }
  :host([hidden]) {
    display: none !important;
  }
</style>