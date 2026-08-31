<template>
  <div class="root">
    <component v-html="cssText" :is="'style'"></component><slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface LitTableCellProps {
  multiline?: any;
}

export default defineComponent({
  name: "lit-table-cell",

  props: ["multiline"],

  computed: {
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

<style scoped>
:host {
  display: table-cell;
}
:host([hidden]) {
  display: none !important;
}
</style>