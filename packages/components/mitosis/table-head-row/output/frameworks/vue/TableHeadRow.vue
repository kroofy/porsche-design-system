<!-- mitosis-native-host: native vue from TableHeadRow.lite.tsx -->
<template>
  <div class="p-table-head-row" data-pds="table-head-row">

  <div class="root">
    <component v-html="scopedCssText" :is="'style'"></component><slot></slot>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export default defineComponent({
  name: "lit-table-head-row",

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-table-head-row");
    },
    cssText() {
      return ":host{display:table-row}:host([hidden]){display:none !important}";
    },
  },
});
</script>

