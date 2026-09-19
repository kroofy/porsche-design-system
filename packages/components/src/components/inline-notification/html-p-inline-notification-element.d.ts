/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPInlineNotificationElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-inline-notification hosts.
 */
export {};

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
