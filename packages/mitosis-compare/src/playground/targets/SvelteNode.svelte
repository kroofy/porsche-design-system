<script lang="ts">
  export let node: any;
  export let comps: Record<string, any>;
  $: kids = (node && typeof node === 'object' && node.children) || [];
  $: attrs = node && typeof node === 'object' && node.el ? { ...(node.attrs || {}), ...(node.slot ? { slot: node.slot } : {}) } : {};
</script>

{#if typeof node === 'string'}{node}{:else if node.el}<svelte:element this={node.el} {...attrs}
    >{#each kids as child}<svelte:self node={child} {comps} />{/each}</svelte:element
  >{:else}<svelte:component this={comps[node.c]} {...node.props || {}}
    >{#each kids as child}<svelte:self node={child} {comps} />{/each}</svelte:component
  >{/if}
