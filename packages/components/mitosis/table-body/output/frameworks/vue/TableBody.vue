<template>
  <div class="root">
    <component v-html="cssText" :is="'style'"></component><slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "lit-table-body",

  computed: {
    cssText() {
      return ":host{display:table-row-group}:host([hidden]){display:none !important}";
    },
  },
});
</script>

<style scoped>
:host {
  display: table-row-group;
}
:host([hidden]) {
  display: none !important;
}
</style>