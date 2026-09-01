<!-- mitosis-native-host: native vue from TextListItem.lite.tsx -->
<template>
  <div class="p-text-list-item" data-pds="text-list-item">

  <div class="root">
    <component v-html="scopedCssText" :is="'style'"></component><slot></slot>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export default defineComponent({
  name: "lit-text-list-item",

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-text-list-item");
    },
    cssText() {
      return (
        ":host{display:grid;grid-template-columns:var(--_p-text-list-e) 1fr !important;column-gap:var(--p-spacing-static-md) !important;font:inherit !important;color:inherit !important}" +
        ":host([hidden]){display:none !important}" +
        ".root{display:contents}" +
        "slot{display:inline}" +
        '::slotted(*){--_p-text-list-f:.625rem !important;--_p-text-list-g:"–" !important;--_p-text-list-a:2rem !important;--_p-text-list-b:"" !important}' +
        "::slotted(*:last-child){grid-column:2 !important}"
      );
    },
  },
});
</script>

