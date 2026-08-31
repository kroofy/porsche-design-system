<script context="module" lang="ts">
  export interface LitTextProps {
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
  export let weight: LitTextProps["weight"];
  export let align: LitTextProps["align"];
  export let color: LitTextProps["color"];
  export let hyphens: LitTextProps["hyphens"];
  export let ellipsis: LitTextProps["ellipsis"];
  export let size: LitTextProps["size"];

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
      success: "var(--p-color-success)",
      warning: "var(--p-color-warning)",
      error: "var(--p-color-error)",
      info: "var(--p-color-info)",
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
    const weight = weightMap[weight || "normal"] || weightMap.normal;
    const align = align || "start";
    const color = colorMap[color || "primary"] || colorMap.primary;
    const hyphens = hyphens || "inherit";
    let ellipsis: any = ellipsis;
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
      "::slotted(:is(p,span,div,address,blockquote,figcaption,cite,time,legend)){all:unset}p{all:unset;display:block;font:" +
      weight +
      " var(--p-typescale-sm)/var(--p-leading-normal) var(--p-font-porsche-next);";
    const rootClose =
      ";color:" +
      color +
      ";text-align:" +
      align +
      ";hyphens:" +
      hyphens +
      extra +
      "}";
    let size = size || "sm";
    if (typeof size === "string" && size.charAt(0) === "{") {
      try {
        size = JSON.parse(
          size
            .replace(/'/g, '"')
            .replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":')
        );
      } catch (e) {
        size = "sm";
      }
    }
    const fontFor = (s: any) => sizeMap[s] || sizeMap.sm;
    if (typeof size === "object" && size !== null) {
      let out =
        rootOpen + "font-size:" + fontFor(size.base || "sm") + rootClose;
      for (const bp of Object.keys(size)) {
        if (bp === "base") continue;
        out +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){p{font-size:" +
          fontFor(size[bp]) +
          "}}";
      }
      return out;
    }
    return rootOpen + "font-size:" + fontFor(size) + rootClose;
  };
</script>

<p>{@html `<${"style"}  >${cssText()}<${"/style"}>`}<slot /></p>

<style>
  :host {
    display: block;
  }
  :host([hidden]) {
    display: none !important;
  }
</style>