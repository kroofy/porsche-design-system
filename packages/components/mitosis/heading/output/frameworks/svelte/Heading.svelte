<!-- mitosis-native-host: native svelte from Heading.lite.tsx -->
<script context="module" lang="ts">
  export interface LitHeadingProps {
    tag?: string;
    size?: any;
    weight?: string;
    align?: string;
    color?: string;
    hyphens?: string;
    ellipsis?: any;
  }
</script>

<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let weight: LitHeadingProps["weight"];
  export let align: LitHeadingProps["align"];
  export let color: LitHeadingProps["color"];
  export let hyphens: LitHeadingProps["hyphens"];
  export let ellipsis: LitHeadingProps["ellipsis"];
  export let size: LitHeadingProps["size"];
  function __cmpProps() { return { weight, align, color, hyphens, ellipsis, size }; }

  $: cssText = () => {
    const sizeMap: any = {
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
    const weightMap: any = {
      regular: "var(--p-font-weight-normal)",
      normal: "var(--p-font-weight-normal)",
      "semi-bold": "var(--p-font-weight-semibold)",
      semibold: "var(--p-font-weight-semibold)",
      bold: "var(--p-font-weight-bold)",
    };
    const colorMap: any = {
      primary: "var(--p-color-primary)",
      "contrast-higher": "var(--p-color-contrast-higher)",
      "contrast-high": "var(--p-color-contrast-high)",
      "contrast-medium": "var(--p-color-contrast-medium)",
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
    const weight = weightMap[__cmpProps().weight || "normal"] || weightMap.normal;
    const align = __cmpProps().align || "start";
    const color = colorMap[__cmpProps().color || "primary"] || colorMap.primary;
    const hyphens = __cmpProps().hyphens || "none";
    let ellipsis: any = __cmpProps().ellipsis;
    if (ellipsis === true || ellipsis === "true" || ellipsis === "") {
      ellipsis = true;
    } else {
      ellipsis = false;
    }
    let extra = "";
    if (hyphens === "auto" || hyphens === "manual")
      extra += ";overflow-wrap:break-word";
    if (ellipsis)
      extra +=
        ";max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap";
    const rootOpen =
      "::slotted(:is(h1,h2,h3,h4,h5,h6)){all:unset}h2{all:unset;display:block;font:" +
      weight +
      " var(--p-typescale-2xl)/var(--p-leading-normal) var(--p-font-porsche-next);";
    const rootClose =
      ";color:" +
      color +
      ";text-align:" +
      align +
      ";hyphens:" +
      hyphens +
      extra +
      "}";
    let size = __cmpProps().size || "2xl";
    if (typeof size === "string" && size.charAt(0) === "{") {
      try {
        size = JSON.parse(
          size
            .replace(/'/g, '"')
            .replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":')
        );
      } catch (e) {
        size = "2xl";
      }
    }
    const fontFor = (s: any) => sizeMap[s] || sizeMap["2xl"];
    if (typeof size === "object" && size !== null) {
      let out =
        rootOpen + "font-size:" + fontFor(size.base || "2xl") + rootClose;
      for (const bp of Object.keys(size)) {
        if (bp === "base") continue;
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){h2{font-size:" +
          fontFor(size[bp]) +
          "}}";
      }
      return out;
    }
    return rootOpen + "font-size:" + fontFor(size) + rootClose;
  };
  $: scopedCssText = scopeCss("\n  :host {\n    display: block;\n  }\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-heading");
</script>

<div class="p-heading" data-pds="heading">
<h2>{@html `<${"style"}>${scopedCssText}<${"/style"}>`}<slot /></h2>


</div>
