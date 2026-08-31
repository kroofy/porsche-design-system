<template>
  <div class="root">
    <component v-html="cssText" :is="'style'"></component><slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "lit-table-row",

  computed: {
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

<style scoped>
:host {
  display: table-row;
}
:host([hidden]) {
  display: none !important;
}
</style>