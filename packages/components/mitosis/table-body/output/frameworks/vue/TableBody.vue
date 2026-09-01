<!-- mitosis-native-host: native vue from TableBody.lite.tsx -->
<template>
  <div class="p-table-body" data-pds="table-body">

  <div class="root">
    <component v-html="scopedCssText" :is="'style'"></component><slot></slot>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export default defineComponent({
  name: "lit-table-body",

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-table-body");
    },
    cssText() {
      return ":host{display:table-row-group}:host([hidden]){display:none !important}";
    },
  },
});
</script>

