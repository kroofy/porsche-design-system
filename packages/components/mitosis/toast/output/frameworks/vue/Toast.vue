<!-- mitosis-native-host: native vue from Toast.lite.tsx -->
<template>
  <div class="p-toast" data-pds="toast">

  <div class="root">
    <component v-html="scopedCssText" :is="'style'"></component><slot></slot>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export default defineComponent({
  name: "lit-toast",

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-toast");
    },
    cssText() {
      return (
        ":host{--_p-toast-a:var(--p-toast-position-bottom,56px) !important;" +
        "position:fixed !important;" +
        "inset:auto max(22px, 10.625vw - 12px) var(--_p-toast-a) !important;" +
        "z-index:999999 !important}" +
        ":host([hidden]){display:none !important}" +
        ":not(:defined,[data-ssr]){visibility:hidden}" +
        "@keyframes in{from{transform:translate3d(0,calc(var(--_p-toast-a) + 100%),0)}to{transform:translate3d(0,0,0)}}" +
        "@keyframes out{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,calc(var(--_p-toast-a) + 100%),0)}}" +
        "@media(min-width:760px){:host{--_p-toast-a:var(--p-toast-position-bottom,64px) !important;" +
        "inset:auto auto var(--_p-toast-a) 64px !important;" +
        "max-width:min(42rem, calc(100vw - 64px * 2)) !important}}" +
        ".hydrated{animation:var(--p-animation-duration,.4s) in cubic-bezier(0,0,.2,1) forwards}" +
        ".close{animation:.4s out cubic-bezier(.4,0,.5,1) forwards !important}"
      );
    },
  },
});
</script>

