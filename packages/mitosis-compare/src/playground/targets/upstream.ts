import { componentsReady, load } from 'pds-upstream';
import type { RootNode } from '../frame';
import { appendDom } from './tree';

export const UPSTREAM_PREFIX = 'upstream';

let loadedOnce = false;

export async function render(mount: HTMLElement, root: RootNode) {
  if (!loadedOnce) {
    load({ prefix: UPSTREAM_PREFIX });
    loadedOnce = true;
  }
  appendDom(mount, root, (node) => {
    const element = document.createElement(`${UPSTREAM_PREFIX}-p-${node.c}`);
    for (const [name, value] of Object.entries(node.props ?? {})) {
      (element as unknown as Record<string, unknown>)[name] = value;
    }
    return element;
  });
  await componentsReady(mount);
}
