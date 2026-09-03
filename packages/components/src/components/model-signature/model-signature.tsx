/**
 * Stencil no longer owns p-model-signature. The playground tag is the Mitosis Lit
 * custom element from mitosis/model-signature/ModelSignature.lite.tsx.
 * This file stays so generateConstructorMap can still import class ModelSignature.
 */
export class ModelSignature {
  host!: HTMLElement;
  model?: string = '911';
  safeZone?: boolean = true;
  fetchPriority?: string = 'auto';
  lazy?: boolean = false;
  size?: string = 'small';
  color?: string = 'primary';
  render(): void {}
}
