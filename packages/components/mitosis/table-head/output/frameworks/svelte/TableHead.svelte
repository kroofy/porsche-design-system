<!-- mitosis-native-host: native svelte from TableHead.lite.tsx -->
<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  $: cssText = () => {
    return (
      ":host{display:table-header-group;" +
      "font:var(--p-font-weight-semibold) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next) !important;" +
      "border-bottom:1px solid var(--_p-table-c) !important}" +
      ":host([hidden]){display:none !important}" +
      "::slotted(*){--_p-table-d:0px !important;--_p-table-b:none !important}"
    );
  };
  $: scopedCssText = scopeCss("\n  :host {\n    display: table-header-group;\n  }\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-table-head");
</script>

<div class="p-table-head" data-pds="table-head">
<div class="root">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}<slot />
</div>


</div>
