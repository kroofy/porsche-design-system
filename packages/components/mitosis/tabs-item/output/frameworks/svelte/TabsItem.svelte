<script context="module" lang="ts">
  export interface LitTabsItemProps {
    label?: string;
  }
</script>

<script lang="ts">
  export let label: LitTabsItemProps["label"];

  $: cssText = () => {
    return (
      ":host{display:block;color:var(--p-color-primary) !important;border-radius:2px !important}" +
      ":host([hidden]){display:none !important}" +
      ":host(:focus-visible){outline:2px solid var(--p-color-focus) !important;outline-offset:2px !important}" +
      "@media(forced-colors:active){:host(:focus-visible){outline-color:Highlight !important}}"
    );
  };
  $: labelValue = () => {
    return label || "";
  };
</script>

<div class="root">
  {@html `<${"style"}  >${cssText()}<${"/style"}>`}<slot />
</div>

<style>
  :host([hidden]) {
    display: none !important;
  }
</style>