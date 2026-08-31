<template>
  <h3><component v-html="cssText" :is="'style'"></component><slot></slot></h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface LitDisplayProps {
  tag?: string;
  size?: any;
  align?: string;
  color?: string;
  ellipsis?: any;
}

export default defineComponent({
  name: "lit-display",

  props: ["align", "color", "ellipsis", "size"],

  computed: {
    cssText() {
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
      const align = this.align || "start";
      const color = colorMap[this.color || "primary"] || colorMap.primary;
      let ellipsis: any = this.ellipsis;
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
      const rootClose =
        ";color:" + color + ";text-align:" + align + extra + "}";
      let size = this.size || "large";
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
    },
  },
});
</script>

<style scoped>
:host {
  display: block;
}
:host([hidden]) {
  display: none !important;
}
</style>