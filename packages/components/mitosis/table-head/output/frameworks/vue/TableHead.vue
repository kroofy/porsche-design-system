<!-- mitosis-native-host: native vue from TableHead.lite.tsx -->
<template>
  <div class="p-table-head" data-pds="table-head">

  <div class="root">
    <component v-html="scopedCssText" :is="'style'"></component><slot></slot>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export default defineComponent({
  name: "lit-table-head",

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-table-head");
    },
    cssText() {
      return (
        ":host{display:table-header-group;" +
        "font:var(--p-font-weight-semibold) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next) !important;" +
        "border-bottom:1px solid var(--_p-table-c) !important}" +
        ":host([hidden]){display:none !important}" +
        "::slotted(*){--_p-table-d:0px !important;--_p-table-b:none !important}"
      );
    },
  },
});
</script>

