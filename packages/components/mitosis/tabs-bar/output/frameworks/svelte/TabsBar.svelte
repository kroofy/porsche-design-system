<!-- mitosis-native-host: native svelte from TabsBar.lite.tsx -->
<script context="module" lang="ts">
  export interface LitTabsBarProps {
    background?: string;
    size?: any;
    compact?: any;
    weight?: string;
    activeTabIndex?: any;
    aria?: any;
  }
</script>

<script lang="ts">
  import PScroller from "../../../../scroller/output/frameworks/svelte/Scroller.svelte";
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let compact: LitTabsBarProps["compact"];
  export let background: LitTabsBarProps["background"];
  export let size: LitTabsBarProps["size"];
  export let activeTabIndex: LitTabsBarProps["activeTabIndex"];
  function __cmpProps() { return { compact, background, size, activeTabIndex }; }

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
    const compact = isTrue(__cmpProps().compact);
    const background = __cmpProps().background || "none";
    const hasBackground = background !== "none";
    const size = parse(__cmpProps().size, "small");
    const sizeBase =
      typeof size === "object" && size !== null
        ? pick(size, "base", "small")
        : size;
    const fontFor = (s: any) =>
      s === "medium" ? "var(--p-typescale-md)" : "var(--p-typescale-sm)";
    const tabCount = 0;
    const rawIndex = activeTabIndex;
    let active: any;
    if (rawIndex === undefined || rawIndex === null || rawIndex === "") {
      active = undefined;
    } else {
      const n = Number(rawIndex);
      if (!Number.isInteger(n) || tabCount < 1 || n < 0 || n > tabCount - 1)
        active = undefined;
      else active = n;
    }
    const hasActive = active !== undefined;
    const nth = hasActive ? active + 1 : 0;
    const radiusButton = hasBackground
      ? compact
        ? "var(--p-radius-md)"
        : "var(--p-radius-lg)"
      : compact
      ? "var(--p-radius-lg)"
      : "var(--p-radius-xl)";
    const tabPad = hasBackground
      ? compact
        ? "calc(7 * var(--p-spacing-static-2xs) - var(--p-spacing-static-xs)) calc(var(--p-spacing-static-md) - var(--p-spacing-static-xs))"
        : "calc(var(--p-spacing-static-md) - var(--p-spacing-static-xs)) calc(28 * var(--p-spacing-static-2xs) - var(--p-spacing-static-xs))"
      : compact
      ? "calc(6 * var(--p-spacing-static-2xs)) var(--p-spacing-static-md)"
      : "var(--p-spacing-static-md) calc(28 * var(--p-spacing-static-2xs))";
    const bgMap: any = {
      canvas: "var(--p-color-canvas)",
      surface: "var(--p-color-surface)",
      frosted: "var(--p-color-frosted)",
    };
    let out =
      ":host{display:grid}" +
      ":host([hidden]){display:none !important}" +
      ".wrap{display:contents}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "::slotted(a),::slotted(button){all:unset !important;white-space:nowrap !important;cursor:pointer !important;border-radius:" +
      radiusButton +
      " !important;padding:" +
      tabPad +
      " !important;font:var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next) !important;font-size:" +
      fontFor(sizeBase) +
      " !important;color:var(--p-color-primary) !important;background:0 0 / 0% 100% no-repeat !important;transition:background-color var(--p-duration-sm) var(--p-ease-in-out) !important}" +
      "::slotted(a:focus-visible),::slotted(button:focus-visible){outline:2px solid var(--p-color-focus) !important;outline-offset:2px !important}";
    if (hasActive) {
      out +=
        "::slotted(a:nth-child(" +
        nth +
        ")),::slotted(button:nth-child(" +
        nth +
        ")){background-image:linear-gradient(var(--p-color-frosted-strong), var(--p-color-frosted-strong)) !important;background-size:100% 100% !important;transition:background-size 0s linear var(--p-duration-md) !important}";
    }
    out +=
      "@media(forced-colors:active){::slotted(a),::slotted(button){forced-color-adjust:none !important;background:Canvas !important}::slotted(a){color:LinkText !important;box-shadow:inset 0 0 0 2px LinkText !important}::slotted(button){color:ButtonText !important;box-shadow:inset 0 0 0 2px ButtonBorder !important}::slotted(a:focus-visible),::slotted(button:focus-visible){outline-color:Highlight !important}}";
    if (hasActive) {
      out +=
        "@media(hover:hover){::slotted(a:not(:nth-child(" +
        nth +
        ")):hover),::slotted(button:not(:nth-child(" +
        nth +
        ")):hover){background-color:var(--p-color-frosted) !important}}";
    } else {
      out +=
        "@media(hover:hover){::slotted(a:hover),::slotted(button:hover){background-color:var(--p-color-frosted) !important}}";
    }
    out +=
      ".scroller{--_p-scroller-focus-ring-radius:" +
      radiusButton +
      ";place-self:flex-start";
    if (hasBackground) {
      out +=
        ";background:" +
        bgMap[background] +
        ";padding:" +
        (compact
          ? "calc(3 * var(--p-spacing-static-2xs))"
          : "var(--p-spacing-static-xs)") +
        ";border-radius:" +
        (compact ? "var(--p-radius-lg)" : "var(--p-radius-xl)");
      if (background === "frosted") {
        out +=
          ";-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted)";
      }
    }
    out += "}";
    out +=
      ".bar{position:absolute;inset-inline-start:0;width:0px;height:100%;z-index:-1;pointer-events:none;border-radius:" +
      radiusButton +
      ";background:var(--p-color-frosted-strong)}";
    if (hasBackground) {
      out +=
        "@media(forced-colors:active){.scroller{forced-color-adjust:none;outline:1px solid CanvasText}.bar{display:none}}";
    } else {
      out += "@media(forced-colors:active){.bar{display:none}}";
    }
    if (typeof size === "object" && size !== null) {
      for (const bp of Object.keys(size)) {
        if (bp === "base") continue;
        if (!minWidth[bp]) continue;
        const s = pick(size, bp, sizeBase);
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){::slotted(a),::slotted(button){font-size:" +
          fontFor(s) +
          " !important}}";
      }
    }
    return out;
  };
  $: isCompact = () => {
    return compact === true || compact === "true" || compact === "";
  };
  $: __pdsComponents = { PScroller };
  $: scopedCssText = scopeCss("\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-tabs-bar");
</script>

<div class="p-tabs-bar" data-pds="tabs-bar">
<div class="wrap">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}<PScroller
    class="scroller"><slot /><span class="bar" /></PScroller
  >
</div>


</div>
