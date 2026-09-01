<!-- mitosis-native-host: native vue from StepperHorizontal.lite.tsx -->
<template>
  <div class="p-stepper-horizontal" data-pds="stepper-horizontal">

  <div class="wrap">
    <component v-html="scopedCssText" :is="'style'"></component
    ><PScroller class="scroller"><slot></slot></PScroller>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PScroller from "../../../../scroller/output/frameworks/vue/Scroller.vue";
import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitStepperHorizontalProps {
  size?: any;
}

export default defineComponent({
  components: { PScroller },
  name: "lit-stepper-horizontal",

  props: ["size"],

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-stepper-horizontal");
    },
    cssText() {
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
      const fontFor = (s: any) =>
        s === "medium" ? "var(--p-typescale-md)" : "var(--p-typescale-sm)";
      const size = parse(this.size, "small");
      const sizeBase =
        typeof size === "object" && size !== null
          ? pick(size, "base", "small")
          : size;
      let out =
        ":host{display:grid}" +
        ":host([hidden]){display:none !important}" +
        ":not(:defined,[data-ssr]){visibility:hidden}" +
        ".wrap{display:contents}" +
        ".scroller{place-self:flex-start;font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);font-size:" +
        fontFor(sizeBase) +
        "}";
      if (size && typeof size === "object") {
        for (const bp in minWidth) {
          if (bp === "base") continue;
          if (!minWidth[bp]) continue;
          const s = pick(size, bp, sizeBase);
          out +=
            "@media(min-width:" +
            minWidth[bp] +
            "px){.scroller{font-size:" +
            fontFor(s) +
            "}}";
        }
      }
      return out;
    },
  },
});
</script>

