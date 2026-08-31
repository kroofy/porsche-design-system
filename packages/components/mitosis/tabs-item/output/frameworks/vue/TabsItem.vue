<template>
  <div class="root">
    <component v-html="cssText" :is="'style'"></component><slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface LitTabsItemProps {
  label?: string;
}

export default defineComponent({
  name: "lit-tabs-item",

  props: ["label"],

  computed: {
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

<style scoped>
:host([hidden]) {
  display: none !important;
}
</style>