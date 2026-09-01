<!-- mitosis-native-host: native svelte from Display.lite.tsx -->
<script context="module" lang="ts">
  export interface LitDisplayProps {
    tag?: string;
    size?: any;
    align?: string;
    color?: string;
    ellipsis?: any;
  }
</script>

<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let align: LitDisplayProps["align"];
  export let color: LitDisplayProps["color"];
  export let ellipsis: LitDisplayProps["ellipsis"];
  export let size: LitDisplayProps["size"];
  function __cmpProps() { return { align, color, ellipsis, size }; }

  $: cssText = () => {
    const sizeMap: any = {
      small: "var(--p-typescale-3xl)",
      medium: "var(--p-typescale-4xl)",
      large: "var(--p-typescale-5xl)",
      inherit: "inherit",
      "3xl": "var(--p-typescale-3xl)",
      "4xl": "var(--p-typescale-4xl)",
      "5xl": "var(--p-typescale-5xl)",
    };
    const colorMap: any = {
      primary: "var(--p-color-primary)",
      inherit: "currentcolor",
    };
    const minWidth: any = {
      xs: 480,
      s: 760,
      m: 1000,
      l: 1300,
      xl: 1760,
      xxl: 1920,
    };
    const align = __cmpProps().align || "start";
    const color = colorMap[__cmpProps().color || "primary"] || colorMap.primary;
    let ellipsis: any = __cmpProps().ellipsis;
    if (ellipsis === true || ellipsis === "true" || ellipsis === "") {
      ellipsis = true;
    } else {
      ellipsis = false;
    }
    let extra = "";
    if (ellipsis)
      extra +=
        ";max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap";
    const rootOpen =
      "::slotted(:is(h1,h2,h3,h4,h5,h6)){all:unset!important}h3{all:unset;display:block;font:var(--p-font-weight-normal) var(--p-typescale-5xl)/var(--p-leading-normal) var(--p-font-porsche-next);";
    const rootClose = ";color:" + color + ";text-align:" + align + extra + "}";
    let size = __cmpProps().size || "large";
    if (typeof size === "string" && size.charAt(0) === "{") {
      try {
        size = JSON.parse(
          size
            .replace(/'/g, '"')
            .replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":')
        );
      } catch (e) {
        size = "large";
      }
    }
    const fontFor = (s: any) => sizeMap[s] || sizeMap.large;
    if (typeof size === "object" && size !== null) {
      let out =
        rootOpen + "font-size:" + fontFor(size.base || "large") + rootClose;
      for (const bp of Object.keys(size)) {
        if (bp === "base") continue;
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){h3{font-size:" +
          fontFor(size[bp]) +
          "}}";
      }
      return out;
    }
    return rootOpen + "font-size:" + fontFor(size) + rootClose;
  };
  $: scopedCssText = scopeCss("\n  :host {\n    display: block;\n  }\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-display");
</script>

<div class="p-display" data-pds="display">
<h3>{@html `<${"style"}>${scopedCssText}<${"/style"}>`}<slot /></h3>


</div>
