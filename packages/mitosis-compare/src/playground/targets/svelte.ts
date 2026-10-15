import type { RootNode } from '../frame';
import SvelteNode from './SvelteNode.svelte';
import { collectTags, loadComponents } from './tree';

const modules = import.meta.glob('../../../../components/mitosis/*/output/frameworks/svelte/*.svelte');

// Svelte 4 cannot target named slots from a dynamic tree; slotted children land in the default slot.
export async function render(mount: HTMLElement, root: RootNode) {
  const comps = await loadComponents<unknown>(modules, /mitosis\/([^/]+)\/output\/frameworks\/svelte\//, collectTags(root));
  new SvelteNode({ target: mount, props: { node: root, comps } });
}
