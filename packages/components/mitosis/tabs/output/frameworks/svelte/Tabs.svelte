<!-- mitosis-native-host: native svelte from Tabs.lite.tsx -->
<script context="module" lang="ts">
  export interface LitTabsProps {
    size?: any;
    activeTabIndex?: any;
    background?: string;
    compact?: any;
    weight?: string;
    aria?: any;
  }
</script>

<script lang="ts">
  import PTabsBar from "../../../../tabs-bar/output/frameworks/svelte/TabsBar.svelte";
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let size: LitTabsProps["size"];
  export let background: LitTabsProps["background"];
  export let compact: LitTabsProps["compact"];
  export let activeTabIndex: LitTabsProps["activeTabIndex"];
  function __cmpProps() { return { size, background, compact, activeTabIndex }; }

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
    const pick = (obj: any, key: any, fallback: any) => {
      if (obj && typeof obj === "object") {
        if (obj[key] === undefined) return fallback;
        return obj[key];
      }
      return obj;
    };
    const size = parse(__cmpProps().size, "small");
    let out =
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      ".root{margin-bottom:var(--p-spacing-static-sm)}" +
      ".wrap{display:contents}";
    if (size && typeof size === "object") {
      const sizeBase = pick(size, "base", "small");
      for (const bp in minWidth) {
        if (bp === "base") continue;
        if (!minWidth[bp]) continue;
        const s = pick(size, bp, sizeBase);
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){:host{--_p-tabs-size:" +
          s +
          "}}";
      }
    }
    return out;
  };
  $: sizeValue = () => {
    return size || "small";
  };
  $: backgroundValue = () => {
    return background || "none";
  };
  $: isCompact = () => {
    return compact === true || compact === "true" || compact === "";
  };
  $: activeIndex = () => {
    const raw = activeTabIndex;
    if (raw === undefined || raw === null || raw === "") return 0;
    const n = Number(raw);
    return Number.isInteger(n) ? n : 0;
  };
  $: __pdsComponents = { PTabsBar };
  $: scopedCssText = scopeCss("\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-tabs");
</script>

<div class="p-tabs" data-pds="tabs">
<div class="wrap">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}<PTabsBar
    class="root"
    size={sizeValue()}
    background={backgroundValue()}
    compact={isCompact()}
    activeTabIndex={activeIndex()}
  /><slot />
</div>


</div>
