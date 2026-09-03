/**
 * Stencil no longer owns p-inline-notification. The playground tag is the Mitosis Lit
 * custom element from mitosis/inline-notification/InlineNotification.lite.tsx.
 * This file stays so generateConstructorMap can still import class InlineNotification.
 * Global HTMLPInlineNotificationElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class InlineNotification {
  host!: HTMLElement;
  heading?: string = '';
  headingTag?: string = 'h5';
  description?: string = '';
  state?: string = 'info';
  dismissButton?: boolean = true;
  actionLabel?: string;
  actionLoading?: boolean = false;
  actionIcon?: string = 'arrow-right';
  render(): void {}
}

declare global {
  interface HTMLPInlineNotificationElement extends HTMLElement {
    heading?: string;
    headingTag?: string;
    description?: string;
    state?: string;
    dismissButton?: boolean;
    actionLabel?: string;
    actionLoading?: boolean;
    actionIcon?: string;
  }
  interface HTMLElementTagNameMap {
    'p-inline-notification': HTMLPInlineNotificationElement;
  }
}
