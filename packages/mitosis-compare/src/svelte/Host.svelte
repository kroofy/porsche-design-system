<script>
  export let Cmp;
  export let props = {};
  export let text = '';
  export let img = null;
  export let tag = '';
</script>

<div class="mitosis-host mh-{tag}">
  <svelte:component this={Cmp} {...props}>
    {#if img}
      <img src={img.src} alt={img.alt} />
    {/if}
    {#if text}{text}{/if}
    <slot />
  </svelte:component>
</div>
