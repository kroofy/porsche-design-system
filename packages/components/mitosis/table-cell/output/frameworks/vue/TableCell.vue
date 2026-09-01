<!-- mitosis-native-host: native vue from TableCell.lite.tsx -->
<template>
  <div class="p-table-cell" data-pds="table-cell">

  <div class="root">
    <component v-html="scopedCssText" :is="'style'"></component><slot></slot>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitTableCellProps {
  multiline?: any;
}

export default defineComponent({
  name: "lit-table-cell",

  props: ["multiline"],

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-table-cell");
    },
    cssText() {
      const multiline =
        this.multiline === true ||
        this.multiline === "true" ||
        this.multiline === "";
      const whiteSpace = multiline ? "normal" : "nowrap";
      return (
        ":host{display:table-cell;vertical-align:middle;" +
        "padding:var(--_p-table-a) !important;" +
        "margin:0 !important;" +
        "white-space:" +
        whiteSpace +
        " !important}" +
        ":host([hidden]){display:none !important}"
      );
    },
  },
});
</script>

