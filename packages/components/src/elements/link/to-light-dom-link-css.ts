import { LINK_ROOT_CLASS } from './link.appearance';

const FOUC_BLOCK = /:not\(:defined,\[data-ssr\]\)\s*\{[^}]*\}/g;

export const rewriteShadowLinkCss = (shadowCss: string): string => {
  const rewritten = shadowCss
    .replaceAll(':host([hidden])', `.${LINK_ROOT_CLASS}[hidden]`)
    .replaceAll(':host', `.${LINK_ROOT_CLASS}`)
    .replaceAll(/(^|[,{\s])\.root\b/g, `$1.${LINK_ROOT_CLASS}`)
    .replace(FOUC_BLOCK, '');

  return `@layer pds.elements {\n${rewritten.trim()}\n}\n`;
};
