<!-- mitosis-native-host: native vue from TabsItem.lite.tsx -->
<template>
  <div class="p-tabs-item" data-pds="tabs-item">

  <div class="root">
    <component v-html="scopedCssText" :is="'style'"></component><slot></slot>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitTabsItemProps {
  label?: string;
}

export default defineComponent({
  name: "lit-tabs-item",

  props: ["label"],

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-tabs-item");
    },
    cssText() {
      return (
        ":host{display:block;color:var(--p-color-primary) !important;border-radius:2px !important}" +
        ":host([hidden]){display:none !important}" +
        ":host(:focus-visible){outline:2px solid var(--p-color-focus) !important;outline-offset:2px !important}" +
        "@media(forced-colors:active){:host(:focus-visible){outline-color:Highlight !important}}"
      );
    },
    labelValue() {
      return this.label || "";
    },
  },
});
</script>

