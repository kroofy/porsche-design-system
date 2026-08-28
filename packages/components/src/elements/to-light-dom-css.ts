const FOUC_BLOCK = /:not\(:defined,\[data-ssr\]\)\s*\{[^}]*\}/g;

export const rewriteShadowElementCss = (shadowCss: string, rootClass: string): string => {
  const rewritten = shadowCss
    .replaceAll(':host([hidden])', `.${rootClass}[hidden]`)
    .replaceAll(':host', `.${rootClass}`)
    .replaceAll(/(^|[,{\s])\.root\b/g, `$1.${rootClass}`)
    .replace(FOUC_BLOCK, '');

  return `@layer pds.elements {\n${rewritten.trim()}\n}\n`;
};
