import { forceUpdate } from '../types/html-stencil-element';

export const updateParent = (host: HTMLElement): void => {
  forceUpdate(host.parentElement);
};
