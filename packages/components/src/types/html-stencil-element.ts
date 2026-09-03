/**
 * Local stand-in for leftover Stencil host types after the compiler is gone.
 * HTMLElement is enough for leftover stubs and host maps.
 */
export type HTMLStencilElement = HTMLElement;

export type HostElement = HTMLElement & {
  componentOnReady?: () => Promise<HostElement>;
};

export type EventEmitter<T = unknown> = {
  emit: (data?: T) => CustomEvent<T>;
};

export const forceUpdate = (_el?: unknown): void => {};

export type FunctionalComponent<P = Record<string, unknown>> = (props: P, children?: unknown) => unknown;

export const h = (..._args: unknown[]): unknown => undefined;

export const Fragment = {};

export namespace JSX {
  export type Element = unknown;
}

export namespace JSXBase {
  export type HTMLAttributes = Record<string, unknown>;
}
