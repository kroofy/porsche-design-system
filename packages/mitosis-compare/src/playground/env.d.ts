/// <reference types="vite/client" />

declare module 'virtual:pds-lit-deps' {
  const deps: Record<string, string[]>;
  export default deps;
}

declare module '*.svelte' {
  const component: new (options: { target: Element; props?: Record<string, unknown> }) => unknown;
  export default component;
}

declare module '*.vue' {
  import type { Component } from 'vue';

  const component: Component;
  export default component;
}
