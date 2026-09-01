<!-- mitosis-native-host: native svelte from TableBody.lite.tsx -->
<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  $: cssText = () => {
    return ":host{display:table-row-group}:host([hidden]){display:none !important}";
  };
  $: scopedCssText = scopeCss("\n  :host {\n    display: table-row-group;\n  }\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-table-body");
</script>

<div class="p-table-body" data-pds="table-body">
<div class="root">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}<slot />
</div>


</div>
