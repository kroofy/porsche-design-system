<template>
  <div role="alert" aria-live="assertive" :aria-label="ariaLabel">
    <component v-html="cssText" :is="'style'"></component
    ><span class="sr-only"></span
    ><svg
      viewBox="-16 -16 32 32"
      width="100%"
      height="100%"
      focusable="false"
      aria-hidden="true"
    >
      <circle r="11"></circle>
      <circle r="11"></circle>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface LitSpinnerProps {
  color?: string;
  size?: any;
  aria?: any;
}

export default defineComponent({
  name: "lit-spinner",

  props: ["color", "size", "aria"],

  computed: {
    cssText() {
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
      const color = colorMap[this.color || "primary"] || colorMap.primary;
      const keyframes =
        "@keyframes rotate{0%{transform:rotateZ(0deg)}100%{transform:rotateZ(360deg)}}" +
        "@keyframes dash{0%{stroke-dashoffset:69;transform:rotateZ(0)}50%,75%{stroke-dashoffset:24;transform:rotateZ(80deg)}100%{stroke-dashoffset:69;transform:rotateZ(360deg)}}";
      const rest =
        "svg{display:block;fill:none;stroke-width:1.5;animation:rotate var(--p-animation-duration,var(--p-duration-xl)) steps(50) infinite}" +
        "circle:first-child{stroke:var(--p-spinner-track-color,var(--p-color-contrast-lower))}" +
        "circle:last-child{stroke:var(--p-spinner-color," +
        color +
        ");stroke-dasharray:var(--p-temporary-spinner-stroke-dasharray,69);stroke-linecap:round;animation:dash var(--p-animation-duration,var(--p-duration-xl)) steps(50) infinite}" +
        "@media(forced-colors:active){circle:last-child{stroke:CanvasText}circle:first-child{stroke:none!important}}" +
        "@supports (color: oklch(from red l c h)){circle:first-child{stroke:var(--p-spinner-track-color,oklch(from var(--p-spinner-color," +
        color +
        ") l c h/.2))}}" +
        "span,.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
      const rootOpen =
        keyframes +
        "div{width:var(--p-spinner-size,var(--p-leading-normal));height:var(--p-spinner-size,var(--p-leading-normal));font-family:var(--p-font-porsche-next);";
      let size = this.size || "sm";
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
          rootOpen + "font-size:" + fontFor(size.base || "sm") + "}" + rest;
        for (const bp of Object.keys(size)) {
          if (bp === "base") continue;
          out +=
            "@media(min-width:" +
            minWidth[bp] +
            "px){div{font-size:" +
            fontFor(size[bp]) +
            "}}";
        }
        return out;
      }
      return rootOpen + "font-size:" + fontFor(size) + "}" + rest;
    },
    ariaLabel() {
      let raw: any = this.aria;
      if (!raw) return "";
      if (typeof raw === "string") {
        try {
          raw = JSON.parse(
            raw
              .replace(/'/g, '"')
              .replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":')
          );
        } catch (e) {
          raw = null;
        }
      }
      if (typeof raw === "object" && raw !== null)
        return raw["aria-label"] || "";
      return "";
    },
  },
});
</script>

<style scoped>
:host {
  display: inline-flex;
  vertical-align: top;
}
:host([hidden]) {
  display: none !important;
}
</style>