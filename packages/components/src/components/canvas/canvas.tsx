/**
 * Stencil no longer owns p-canvas. The playground tag is the Mitosis Lit
 * custom element from mitosis/canvas/Canvas.lite.tsx.
 * This file stays so generateConstructorMap can still import class Canvas.
 */
import type { HTMLStencilElement } from '../../types/html-stencil-element';

export class Canvas {
  host!: HTMLElement;
  sidebarStartOpen?: boolean = false;
  sidebarEndOpen?: boolean = false;
  background?: string = 'canvas';
  sidebarStartUpdate?: { emit: (detail: { open: boolean }) => void };
  sidebarEndDismiss?: { emit: () => void };
  render(): void {}

  private toggleSidebarStart = (): void => {
    this.sidebarStartUpdate?.emit({
      open: !this.sidebarStartOpen,
    });
  };

  private onDismissSidebarEnd = (): void => {
    this.sidebarEndDismiss?.emit();
  };
}

declare global {
  interface HTMLPCanvasElement extends HTMLStencilElement {
    sidebarStartOpen?: boolean;
    sidebarEndOpen?: boolean;
    background?: string;
  }
  interface HTMLElementTagNameMap {
    'p-canvas': HTMLPCanvasElement;
  }
}
