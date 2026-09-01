<!-- mitosis-native-host: native vue from Tabs.lite.tsx -->
<template>
  <div class="p-tabs" data-pds="tabs">

  <div class="wrap">
    <component v-html="scopedCssText" :is="'style'"></component
    ><PTabsBar
      class="root"
      :size="sizeValue"
      :background="backgroundValue"
      :compact="isCompact"
      :activeTabIndex="activeIndex"
    ></PTabsBar
    ><slot></slot>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PTabsBar from "../../../../tabs-bar/output/frameworks/vue/TabsBar.vue";
import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitTabsProps {
  size?: any;
  activeTabIndex?: any;
  background?: string;
  compact?: any;
  weight?: string;
  aria?: any;
}

export default defineComponent({
  components: { PTabsBar },
  name: "lit-tabs",

  props: ["size", "background", "compact", "activeTabIndex"],

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-tabs");
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
      const size = parse(this.size, "small");
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
    },
    sizeValue() {
      return this.size || "small";
    },
    backgroundValue() {
      return this.background || "none";
    },
    isCompact() {
      return (
        this.compact === true || this.compact === "true" || this.compact === ""
      );
    },
    activeIndex() {
      const raw = this.activeTabIndex;
      if (raw === undefined || raw === null || raw === "") return 0;
      const n = Number(raw);
      return Number.isInteger(n) ? n : 0;
    },
  },
});
</script>

