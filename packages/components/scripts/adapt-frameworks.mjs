#!/usr/bin/env node
/**
 * Post-process Mitosis React/Vue/Svelte/Angular emit so the same .lite.tsx
 * that compiles to Lit custom elements also ships as native framework
 * components: host wrapper, scoped cssText, children instead of <slot>,
 * and sibling p-* tags resolved to framework components.
 *
 * Lit output is never touched.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scopeCss } from '../mitosis/_runtime/scope-css.js';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisRoot = resolve(componentsRoot, 'mitosis');
const TARGETS = ['react', 'vue', 'angular', 'svelte'];
const RUNTIME_IMPORT = '../../../../_runtime/scope-css.js';
const MARKER = 'mitosis-native-host';

const pascal = (tag) =>
  tag
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const hostClass = (tag) => `p-${tag}`;

const listLite = () =>
  readdirSync(mitosisRoot)
    .map((dir) => {
      const folder = join(mitosisRoot, dir);
      if (!statSync(folder).isDirectory() || dir.startsWith('_')) return null;
      const lite = readdirSync(folder).find((name) => name.endsWith('.lite.tsx'));
      if (!lite) return null;
      return { tag: dir, lite, folder, pascal: pascal(dir) };
    })
    .filter(Boolean)
    .sort((a, b) => a.tag.localeCompare(b.tag));

const TAGS = listLite();
const TAG_SET = new Set(TAGS.map((entry) => entry.tag));

const componentFile = (tag, target) => {
  const name = pascal(tag);
  if (target === 'vue') return `${name}.vue`;
  if (target === 'svelte') return `${name}.svelte`;
  if (target === 'angular') return `${name}.ts`;
  return `${name}.tsx`;
};

const nestedImportPath = (_fromTag, toTag, target) => {
  const file = componentFile(toTag, target);
  return `../../../../${toTag}/output/frameworks/${target}/${target === 'react' ? file.replace(/\.tsx$/, '') : file}`;
};

const findNestedTags = (code, selfTag) => {
  const found = new Set();
  const re = /(?:<|this=\{)\s*p(?:\s-\s)?([a-z0-9]+(?:(?:\s-\s|-)[a-z0-9]+)*)/gi;
  let match;
  while ((match = re.exec(code))) {
    const tag = `p-${match[1].replace(/\s-\s/g, '-')}`.replace(/^p-p-/, 'p-').replace(/^p-/, '');
    const normalized = match[1].replace(/\s-\s/g, '-');
    if (TAG_SET.has(normalized) && normalized !== selfTag) found.add(normalized);
  }
  const htmlRe = /<\/?p-([a-z0-9-]+)/g;
  while ((match = htmlRe.exec(code))) {
    if (TAG_SET.has(match[1]) && match[1] !== selfTag) found.add(match[1]);
  }
  return [...found].sort();
};

const ensureImport = (code, statement) => {
  if (code.includes(statement)) return code;
  const react = code.match(/^import \* as React from ["']react["'];\s*/m);
  if (react) return code.replace(react[0], `${react[0]}${statement}\n`);
  const vue = code.match(/^import \{ defineComponent \} from ["']vue["'];\s*/m);
  if (vue) return code.replace(vue[0], `${vue[0]}${statement}\n`);
  const svelteScripts = [...code.matchAll(/<script([^>]*)>\n/g)];
  const svelteMain = svelteScripts.find((match) => !/context=["']module["']/.test(match[1] ?? ''));
  if (svelteMain) {
    return code.replace(svelteMain[0], `${svelteMain[0]}  ${statement}\n`);
  }
  if (code.includes('<script')) {
    return code.replace(/<\/script>/, `  ${statement}\n</script>`);
  }
  const firstImport = code.match(/^import .*;\n/m);
  if (firstImport) return code.replace(firstImport[0], `${firstImport[0]}${statement}\n`);
  return `${statement}\n${code}`;
};

const replaceIdentOutsideStrings = (source, name, replacement) => {
  let out = '';
  let quote = null;
  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      out += char;
      if (char === '\\' && i + 1 < source.length) {
        out += source[i + 1];
        i += 1;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      out += char;
      continue;
    }
    if (
      source.startsWith(name, i) &&
      (i === 0 || !/[\w$]/.test(source[i - 1])) &&
      !/[\w$]/.test(source[i + name.length] ?? '')
    ) {
      out += replacement;
      i += name.length - 1;
      continue;
    }
    out += char;
  }
  return out;
};

const rewriteReactFunctionShadowing = (code) => {
  let next = code;
  const fns = [...next.matchAll(/function (\w+)\s*\(/g)].map((match) => match[1]);
  for (const name of new Set(fns)) {
    if (!next.includes(`const ${name} = ${name}(`)) continue;
    next = next.replaceAll(`function ${name}(`, `function ${name}__fn(`);
    next = next.replaceAll(`const ${name} = ${name}(`, `const ${name} = ${name}__fn(`);
  }
  return next;
};

const rewriteSvelteCustomElements = (code) => {
  const re = /<svelte:component\s+this=\{p((?:\s-\s[A-Za-z0-9]+)+)\}|<\/svelte:component/g;
  const parts = [];
  const stack = [];
  let last = 0;
  let match = re.exec(code);
  while (match) {
    parts.push(code.slice(last, match.index));
    if (match[0].startsWith('</')) {
      parts.push(`</${stack.pop() || 'p-unknown'}`);
    } else {
      const tag = `p${match[1].replace(/\s-\s/g, '-')}`;
      const after = code.slice(re.lastIndex);
      const selfClose = after.search(/\/>/);
      const gt = after.search(/>/);
      if (!(selfClose !== -1 && (gt === -1 || selfClose <= gt))) stack.push(tag);
      parts.push(`<${tag}`);
    }
    last = re.lastIndex;
    match = re.exec(code);
  }
  parts.push(code.slice(last));
  return parts.join('');
};

const rewriteFnBodyShadowedReads = (body, exported) => {
  let next = body;
  for (const name of exported) {
    const decl = next.search(new RegExp(`(?:const|let) ${name}\\b`));
    if (decl < 0) continue;
    next = `${replaceIdentOutsideStrings(next.slice(0, decl), name, `__cmpProps().${name}`)}${next.slice(decl)}`;
  }
  return next;
};

const rewriteSvelteFunctionBodies = (code, exported) => {
  const starts = [];
  const arrow = /=>\s*\{/g;
  let match = arrow.exec(code);
  while (match) {
    starts.push(match.index + match[0].length - 1);
    match = arrow.exec(code);
  }
  const fn = /function(?:\s+\w+)?\s*\([^)]*\)\s*\{/g;
  match = fn.exec(code);
  while (match) {
    starts.push(match.index + match[0].length - 1);
    match = fn.exec(code);
  }
  starts.sort((a, b) => b - a);
  let next = code;
  const seen = new Set();
  for (const open of starts) {
    if (seen.has(open) || next[open] !== '{') continue;
    seen.add(open);
    const balanced = extractBalanced(next, open, '{', '}');
    if (!balanced) continue;
    const rewritten = rewriteFnBodyShadowedReads(balanced.inner, exported);
    if (rewritten === balanced.inner) continue;
    next = `${next.slice(0, balanced.start + 1)}${rewritten}${next.slice(balanced.end - 1)}`;
  }
  return next;
};

const rewriteSveltePropShadowing = (code) => {
  let next = code;
  const reactiveFns = [...next.matchAll(/\$: (\w+) = \(\) =>/g)].map((match) => match[1]);
  for (const name of new Set(reactiveFns)) {
    if (!next.includes(`const ${name} = ${name}(`)) continue;
    next = next.replace(`$: ${name} = () =>`, `$: ${name}__fn = () =>`);
    next = next.replace(`const ${name} = ${name}(`, `const ${name} = ${name}__fn(`);
  }

  const exported = [...new Set([...next.matchAll(/export let (\w+)/g)].map((match) => match[1]))];
  if (!exported.length) return next;

  next = rewriteSvelteFunctionBodies(next, exported);
  for (const name of exported) {
    next = next.replace(
      new RegExp(`(?<!export )((?:const|let) ${name}(?:\\s*:\\s*[^;=\\n]+)?\\s*=\\s*)([^;]+);`, 'g'),
      (_match, left, right) => `${left}${replaceIdentOutsideStrings(right, name, `__cmpProps().${name}`)};`
    );
  }
  if (!next.includes('function __cmpProps(')) {
    const snapshot = `  function __cmpProps() { return { ${exported.join(', ')} }; }`;
    const exportBlock = next.match(/(?:^|\n)([ \t]*export let [^\n]+\n)+/);
    if (exportBlock) {
      next = next.replace(exportBlock[0], `${exportBlock[0]}${snapshot}\n`);
    }
  }
  return next;
};

const rewriteReactSlots = (code) =>
  code
    .replace(/<slot\s+name="([^"]+)"\s*\/>/g, (_, name) => `{props[${JSON.stringify(name)}] ?? null}`)
    .replace(/<slot\s+name="([^"]+)"\s*><\/slot>/g, (_, name) => `{props[${JSON.stringify(name)}] ?? null}`)
    .replace(/<slot\s*\/>/g, '{props.children}')
    .replace(/<slot><\/slot>/g, '{props.children}');

const replacePdsTagsWithComponents = (code, nested, kind) => {
  let next = code;
  for (const tag of nested) {
    const Comp = `P${pascal(tag)}`;
    const raw = `p-${tag}`;
    if (kind === 'react' || kind === 'vue' || kind === 'svelte') {
      next = next.replaceAll(`<${raw}`, `<${Comp}`);
      next = next.replaceAll(`</${raw}`, `</${Comp}`);
    }
  }
  return next;
};

const availableIdents = (code) => {
  const names = new Set();
  for (const match of code.matchAll(/function (\w+)\s*\(/g)) names.add(match[1]);
  for (const match of code.matchAll(/\$: (\w+) =/g)) names.add(match[1]);
  for (const match of code.matchAll(/(\w+)\(\) \{/g)) names.add(match[1]);
  for (const match of code.matchAll(/get (\w+)\(/g)) names.add(match[1]);
  names.add('props');
  return names;
};

const bindNativeFields = (code, target) => {
  const names = availableIdents(code);
  const has = (name) => names.has(name);
  return code.replace(/<(input|textarea)([^>]*?)(\/)?>/g, (full, tag, attrs, self) => {
    if (/\svalue=|:value=|\[value\]=/.test(attrs)) return full;
    const bits = [];
    if (target === 'react') {
      if (has('inputValue')) bits.push('value={inputValue()}');
      else if (code.includes('props.value')) bits.push('value={props.value}');
      if (has('placeholderText')) bits.push('placeholder={placeholderText()}');
      else if (code.includes('props.placeholder')) bits.push('placeholder={props.placeholder}');
      if (has('isDisabled')) bits.push('disabled={!!isDisabled()}');
      if (has('isReadOnly')) bits.push('readOnly={!!isReadOnly()}');
      if (code.includes('props.name')) bits.push('name={props.name}');
      if (has('maxLengthValue')) bits.push('maxLength={maxLengthValue() || undefined}');
    } else if (target === 'vue') {
      if (has('inputValue')) bits.push(':value="inputValue"');
      if (has('placeholderText')) bits.push(':placeholder="placeholderText"');
      if (has('isDisabled')) bits.push(':disabled="isDisabled"');
      if (has('isReadOnly')) bits.push(':readonly="isReadOnly"');
      if (code.includes('"name"') || code.includes('name:')) bits.push(':name="name"');
      if (has('maxLengthValue')) bits.push(':maxlength="maxLengthValue"');
    } else if (target === 'svelte') {
      if (has('inputValue')) bits.push('value={inputValue()}');
      if (has('placeholderText')) bits.push('placeholder={placeholderText()}');
      if (has('isDisabled')) bits.push('disabled={!!isDisabled()}');
      if (has('isReadOnly')) bits.push('readonly={!!isReadOnly()}');
      if (has('maxLengthValue')) bits.push('maxlength={maxLengthValue()}');
    } else if (target === 'angular') {
      if (has('inputValue')) bits.push('[value]="inputValue"');
      if (has('placeholderText')) bits.push('[placeholder]="placeholderText"');
      if (has('isDisabled')) bits.push('[disabled]="isDisabled"');
      if (has('isReadOnly')) bits.push('[readOnly]="isReadOnly"');
      if (has('maxLengthValue')) bits.push('[maxLength]="maxLengthValue"');
    }
    if (!bits.length) return full;
    const end = self ? ' />' : '>';
    return `<${tag}${attrs} ${bits.join(' ')}${end}`;
  });
};

const extractBalanced = (source, openIndex, openChar, closeChar) => {
  if (source[openIndex] !== openChar) return null;
  let depth = 0;
  for (let i = openIndex; i < source.length; i += 1) {
    const char = source[i];
    if (char === openChar) depth += 1;
    else if (char === closeChar) {
      depth -= 1;
      if (depth === 0) return { inner: source.slice(openIndex + 1, i), start: openIndex, end: i + 1 };
    }
  }
  return null;
};

const addRuntimeImport = (code) => {
  if (code.includes(RUNTIME_IMPORT)) return code;
  return ensureImport(code, `import { scopeCss } from "${RUNTIME_IMPORT}";`);
};

const addNestedImports = (code, tag, target, nested) => {
  let next = code;
  for (const child of nested) {
    const Comp = `P${pascal(child)}`;
    const spec = nestedImportPath(tag, child, target);
    const statement = `import ${Comp} from "${spec}";`;
    if (!next.includes(statement) && !next.includes(`import ${Comp} `)) {
      next = ensureImport(next, statement);
    }
  }
  if (target === 'svelte') {
    const names = nested.map((child) => `P${pascal(child)}`);
    if (names.length && !next.includes('__pdsComponents')) {
      const instanceClose = next.lastIndexOf('</script>');
      if (instanceClose >= 0) {
        next = `${next.slice(0, instanceClose)}  $: __pdsComponents = { ${names.join(', ')} };\n${next.slice(instanceClose)}`;
      }
    }
  }
  return next;
};

const extractStyledJsx = (jsx) => {
  const statics = [];
  const next = jsx.replace(/<style\s+jsx(?:\s+global)?\>\{\`([\s\S]*?)\`\}<\/style>/g, (_, css) => {
    statics.push(css);
    return '';
  });
  return { jsx: next, staticCss: statics.join('\n') };
};

/**
 * Mitosis React emit is often one long line. A `//` comment then eats the
 * rest of the file. Convert only the comment text to a block comment and
 * leave the following statements intact. `http://` stays untouched.
 */
const convertMinifiedLineComments = (code) =>
  code.replace(/(^|[^:])\/\/(?!\/)(.*)$/gm, (match, prefix, rest) => {
    const resume = rest.match(
      /\s(?=(?:const|let|var)\s+\w+\s*[:=]|function\s+\w+|export\s+|return\s*(?:;|['"`({\[]|\w+\s*[(\[=;]))/
    );
    if (resume && resume.index != null) {
      const comment = rest.slice(0, resume.index).trim();
      return `${prefix}/* ${comment} */${rest.slice(resume.index)}`;
    }
    return `${prefix}/* ${rest.trim()} */`;
  });

const adaptReact = (code, tag) => {
  let next = convertMinifiedLineComments(code);
  next = rewriteReactFunctionShadowing(next);
  next = rewriteReactSlots(next);
  const nested = findNestedTags(next, tag);
  next = replacePdsTagsWithComponents(next, nested, 'react');
  next = bindNativeFields(next, 'react');
  next = addRuntimeImport(next);
  next = addNestedImports(next, tag, 'react', nested);

  if (!next.includes('className?: string')) {
    next = next.replace(/export interface (\w+) \{/, 'export interface $1 {\n  className?: string;');
  }

  if (next.includes(`data-pds="${tag}"`)) return next;

  const exportIdx = next.lastIndexOf('export default');
  const returnIdx = next.lastIndexOf('return (', exportIdx);
  if (returnIdx < 0) return next;
  const paren = extractBalanced(next, returnIdx + 'return '.length, '(', ')');
  if (!paren) return next;

  let jsx = paren.inner.trim();
  const extracted = extractStyledJsx(jsx);
  jsx = extracted.jsx;
  const staticCss = extracted.staticCss;
  const host = hostClass(tag);
  const staticArg = staticCss ? `${JSON.stringify(staticCss)} + ` : '';

  if (jsx.includes('cssText()')) {
    jsx = jsx.replace(
      /dangerouslySetInnerHTML=\{\{\s*__html:\s*cssText\(\)\s*\}\}/g,
      `dangerouslySetInnerHTML={{ __html: scopeCss(${staticArg}cssText(), ${JSON.stringify(`.${host}`)}) }}`
    );
  } else if (staticCss) {
    jsx = `<style dangerouslySetInnerHTML={{ __html: scopeCss(${JSON.stringify(staticCss)}, ${JSON.stringify(`.${host}`)}) }} />\n        ${jsx}`;
  }

  jsx = jsx.replace(/^\{\s*" "\s*\}\s*/, '').replace(/\s*\{\s*" "\s*\}$/, '');
  if (jsx.startsWith('<>')) {
    jsx = jsx.replace(/^<>\s*/, '').replace(/\s*<\/>$/, '');
    jsx = jsx.replace(/^\{\s*" "\s*\}\s*/, '').replace(/\s*\{\s*" "\s*\}$/, '');
  }

  const wrapped = `(
    <div
      className={["${host}", props.className].filter(Boolean).join(" ")}
      data-pds="${tag}"
    >
      ${jsx}
    </div>
  )`;

  return `${next.slice(0, returnIdx)}return ${wrapped}${next.slice(paren.end)}`;
};

const adaptVue = (code, tag) => {
  let next = code;
  const nested = findNestedTags(next, tag);
  next = replacePdsTagsWithComponents(next, nested, 'vue');
  next = bindNativeFields(next, 'vue');
  next = addRuntimeImport(next);
  next = addNestedImports(next, tag, 'vue', nested);

  const host = hostClass(tag);
  if (!next.includes('scopedCssText()')) {
    if (/computed:\s*\{/.test(next)) {
      next = next.replace(
        /computed:\s*\{/,
        `computed: {\n    scopedCssText() {\n      return scopeCss(this.cssText || "", ${JSON.stringify(`.${host}`)});\n    },`
      );
    } else {
      next = next.replace(
        /defineComponent\(\{\s*/,
        `defineComponent({\n  computed: {\n    scopedCssText() {\n      return scopeCss(this.cssText || "", ${JSON.stringify(`.${host}`)});\n    },\n  },\n  `
      );
    }
  }
  next = next.replace(/v-html="cssText"/g, 'v-html="scopedCssText"');

  if (nested.length && !next.includes('components:')) {
    const comps = nested.map((child) => `P${pascal(child)}`).join(', ');
    next = next.replace(/defineComponent\(\{\s*/, `defineComponent({\n  components: { ${comps} },\n  `);
  }

  const styleMatch = next.match(/<style([^>]*)>([\s\S]*?)<\/style>/);
  let staticCss = '';
  if (styleMatch) {
    staticCss = styleMatch[2];
    next = next.replace(styleMatch[0], '');
    if (staticCss.trim() && next.includes('scopedCssText()')) {
      next = next.replace(
        `return scopeCss(this.cssText, ${JSON.stringify(`.${host}`)});`,
        `return scopeCss(${JSON.stringify(staticCss)} + (this.cssText || ""), ${JSON.stringify(`.${host}`)});`
      );
    }
  }

  if (!next.includes(`data-pds="${tag}"`)) {
    const scriptIdx = next.search(/<script[\s>]/);
    const open = next.indexOf('<template>');
    const close = next.lastIndexOf('</template>', scriptIdx === -1 ? next.length : scriptIdx);
    if (open >= 0 && close > open) {
      const inner = next.slice(open + '<template>'.length, close);
      next = `${next.slice(0, open)}<template>\n  <div class="${host}" data-pds="${tag}">\n${inner}\n  </div>\n</template>${next.slice(close + '</template>'.length)}`;
    }
  }

  return next;
};

const adaptSvelte = (code, tag) => {
  let next = rewriteSvelteCustomElements(code);
  next = rewriteSveltePropShadowing(next);
  const nested = findNestedTags(next, tag);
  next = replacePdsTagsWithComponents(next, nested, 'svelte');
  next = bindNativeFields(next, 'svelte');

  const host = hostClass(tag);
  const styleMatch = next.match(/<style>([\s\S]*?)<\/style>/);
  let staticCss = '';
  if (styleMatch) {
    staticCss = styleMatch[1];
    next = next.replace(styleMatch[0], '');
  }

  const svelteImportBlock = `<script lang="ts">\n  import { scopeCss } from "${RUNTIME_IMPORT}";\n`;
  if (next.includes('<script lang="ts">') && !next.includes(RUNTIME_IMPORT)) {
    next = next.replace('<script lang="ts">', `<script lang="ts">\n  import { scopeCss } from "${RUNTIME_IMPORT}";`);
  } else if (!next.includes(RUNTIME_IMPORT)) {
    next = `${svelteImportBlock}</script>\n${next}`;
  }
  next = addNestedImports(next, tag, 'svelte', nested);

  const staticArg = staticCss ? `${JSON.stringify(staticCss)} + ` : '';
  if (!next.includes('scopedCssText')) {
    const instanceClose = next.lastIndexOf('</script>');
    if (instanceClose >= 0) {
      next = `${next.slice(0, instanceClose)}  $: scopedCssText = scopeCss(${staticArg}(typeof cssText === "function" ? cssText() : (cssText || "")), ${JSON.stringify(`.${host}`)});\n${next.slice(instanceClose)}`;
    }
  }
  const svelteStyleHtml = `{@html \`<\${"style"}>\${scopedCssText}<\${"/style"}>\`}`;
  next = next.replace(/\{\@html `<\$\{"style"\}[^`]*>\$\{(?:scopeCss\([^}]+\)|cssText\(\))\}<\$\{\"\/style\"\}>`\}/g, svelteStyleHtml);
  next = next.replace(/\{\@html `<style>\$\{[^}]+\}<\/style>`\}/g, svelteStyleHtml);

  if (!next.includes(`data-pds="${tag}"`)) {
    const markupStart = next.search(/\n<(?!script|style|\/script|\/style)/);
    if (markupStart >= 0) {
      const before = next.slice(0, markupStart);
      let markup = next.slice(markupStart);
      if (!markup.includes('scopedCssText') && !markup.includes(svelteStyleHtml)) {
        markup = `\n<div class="${host}" data-pds="${tag}">\n${svelteStyleHtml}\n${markup}\n</div>\n`;
      } else {
        markup = `\n<div class="${host}" data-pds="${tag}">${markup}\n</div>\n`;
      }
      next = before + markup;
    }
  }

  return next;
};

const adaptAngular = (code, tag) => {
  let next = code;
  const nested = findNestedTags(next, tag);
  next = bindNativeFields(next, 'angular');
  next = addRuntimeImport(next);

  const host = hostClass(tag);
  if (!next.includes('get scopedCssText(')) {
    next = next.replace(
      /get cssText\(\)/,
      `get scopedCssText() {\n    return scopeCss(this.cssText, ${JSON.stringify(`.${host}`)});\n  }\n\n  get cssText()`
    );
  }
  next = next.replace(
    /sanitizer\.bypassSecurityTrustHtml\(cssText\)/g,
    'sanitizer.bypassSecurityTrustHtml(scopedCssText)'
  );

  const styles = next.match(/styles:\s*\[\s*`([\s\S]*?)`\s*,?\s*\]/);
  if (styles) {
    const scoped = scopeCss(styles[1], `.${host}`).replace(/\\/g, '\\\\').replace(/`/g, '\\`');
    next = next.replace(styles[0], `styles: [\`${scoped}\`]`);
  }

  if (!next.includes(`data-pds="${tag}"`)) {
    next = next.replace(/template:\s*`\s*/, `template: \`\n    <div class="${host}" data-pds="${tag}">\n    `);
    next = next.replace(/`,\n  styles:/, `\n    </div>\n  \`,\n  styles:`);
  }

  return next;
};

export const adaptFile = (target, tag, code) => {
  if (target === 'react') return adaptReact(code, tag);
  if (target === 'vue') return adaptVue(code, tag);
  if (target === 'svelte') return adaptSvelte(code, tag);
  if (target === 'angular') return adaptAngular(code, tag);
  return code;
};

export const adaptAll = ({ tags = TAGS, force = false } = {}) => {
  const summary = { tags: {}, counts: { adapted: 0, skipped: 0, missing: 0 } };
  for (const entry of tags) {
    const tagResult = {};
    for (const target of TARGETS) {
      const dest = join(entry.folder, 'output/frameworks', target, componentFile(entry.tag, target));
      if (!existsSync(dest)) {
        tagResult[target] = { status: 'missing' };
        summary.counts.missing += 1;
        continue;
      }
      const before = readFileSync(dest, 'utf8');
      if (!force && before.includes(MARKER) && before.includes(`data-pds="${entry.tag}"`)) {
        tagResult[target] = { status: 'skipped', dest: relative(mitosisRoot, dest) };
        summary.counts.skipped += 1;
        continue;
      }
      const raw = before.includes(MARKER)
        ? before.replace(/^\/\* mitosis-native-host:[\s\S]*?\*\/\n/, '').replace(/^<!-- mitosis-native-host:[\s\S]*? -->\n/, '')
        : before;
      const adapted = adaptFile(target, entry.tag, raw);
      const header =
        target === 'vue' || target === 'svelte'
          ? `<!-- ${MARKER}: native ${target} from ${entry.lite} -->\n`
          : `/* ${MARKER}: native ${target} from ${entry.lite} */\n`;
      const after = `${header}${adapted}`;
      writeFileSync(dest, after);
      tagResult[target] = { status: 'adapted', dest: relative(mitosisRoot, dest), bytes: after.length };
      summary.counts.adapted += 1;
    }
    summary.tags[entry.tag] = tagResult;
  }
  return summary;
};

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const only = args.filter((arg) => !arg.startsWith('-'));
  const tags = only.length ? TAGS.filter((entry) => only.includes(entry.tag)) : TAGS;
  const summary = adaptAll({ tags, force });
  const out = join(mitosisRoot, 'frameworks-adapt-result.json');
  writeFileSync(out, `${JSON.stringify(summary, null, 2)}\n`);
  console.warn(JSON.stringify({ counts: summary.counts, tagCount: tags.length }, null, 2));
}
