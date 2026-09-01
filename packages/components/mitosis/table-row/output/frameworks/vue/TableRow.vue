<!-- mitosis-native-host: native vue from TableRow.lite.tsx -->
<template>
  <div class="p-table-row" data-pds="table-row">

  <div class="root">
    <component v-html="scopedCssText" :is="'style'"></component><slot></slot>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export default defineComponent({
  name: "lit-table-row",

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-table-row");
    },
    cssText() {
      return (
        ":host{display:table-row;" +
        "border-bottom:var(--_p-table-d) solid var(--_p-table-c) !important;" +
        "transition:background var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out) !important}" +
        ":host([hidden]){display:none !important}" +
        "@media(hover:hover){:host(:hover){background:var(--_p-table-b) !important}}"
      );
    },
  },
});
</script>

