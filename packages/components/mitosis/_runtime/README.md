# Mitosis framework runtime

Shared helpers used by the native React / Vue / Svelte / Angular emit.

The same `.lite.tsx` still compiles to Lit custom elements (`:host`, `<slot>`, `cssText` in a shadow root). Framework targets do not have that host, so `generate:frameworks-adapt` wraps each generated file in a `.p-<tag>` host and calls `scopeCss()` on `cssText`.

Do not import this from Lit output.
