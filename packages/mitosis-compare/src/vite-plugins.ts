import type { Plugin } from 'vite';

const tagFromId = (id: string): string | null => {
  const mitosis = id.match(/mitosis\/([^/]+)\/output\/frameworks\//);
  if (mitosis) return mitosis[1];
  const fixed = id.match(/\/src\/react\/fixed\/([^/]+)\.tsx$/);
  if (!fixed) return null;
  return fixed[1]
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
};

const hostToClass = (css: string, tag: string, global = false) => {
  const cls = `.mh-${tag}`;
  const wrap = (selector: string) => (global ? `:global(${selector})` : selector);
  return css
    .replace(/:host\(\[([^\]]+)\]\)/g, wrap(`${cls}[$1]`))
    .replace(/:host(?![\w-(])/g, wrap(cls));
};

/** Fallback for unadapted emit. Native files (`mitosis-native-host`) skip this plugin. */
const rewriteStaticStyleHosts = (code: string, tag: string, global = false) =>
  code.replace(/<style([^>]*)>([\s\S]*?)<\/style>/g, (_match, attrs, css) => {
    if (/dangerouslySetInnerHTML|v-html/.test(attrs)) return _match;
    return `<style${attrs}>${hostToClass(css, tag, global)}</style>`;
  });

const rewriteSvelteCustomElements = (code: string) => {
  const re = /<svelte:component\s+this=\{p((?:\s-\s[A-Za-z0-9]+)+)\}|<\/svelte:component/g;
  const parts: string[] = [];
  const stack: string[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(code))) {
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
  }
  parts.push(code.slice(last));
  return parts.join('');
};

const rewriteReactFunctionShadowing = (code: string) => {
  let next = code;
  const fns = [...next.matchAll(/function (\w+)\s*\(/g)].map((match) => match[1]);
  for (const name of new Set(fns)) {
    if (!next.includes(`const ${name} = ${name}(`)) continue;
    next = next.replaceAll(`function ${name}(`, `function ${name}__fn(`);
    next = next.replaceAll(`const ${name} = ${name}(`, `const ${name} = ${name}__fn(`);
  }
  return next;
};

const replaceIdentOutsideStrings = (source: string, name: string, replacement: string) => {
  let out = '';
  let quote: string | null = null;
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

const rewriteSveltePropShadowing = (code: string) => {
  let next = code;
  const reactiveFns = [...next.matchAll(/\$: (\w+) = \(\) =>/g)].map((match) => match[1]);
  for (const name of new Set(reactiveFns)) {
    if (!next.includes(`const ${name} = ${name}(`)) continue;
    next = next.replace(`$: ${name} = () =>`, `$: ${name}__fn = () =>`);
    next = next.replace(`const ${name} = ${name}(`, `const ${name} = ${name}__fn(`);
  }

  const exported = [...new Set([...next.matchAll(/export let (\w+)/g)].map((match) => match[1]))];
  if (!exported.length) return next;

  for (const name of exported) {
    next = next.replace(
      new RegExp(
        `(?<!export )((?:const|let) ${name}(?:\\s*:\\s*[^;=\\n]+)?\\s*=\\s*)([^;]+);`,
        'g'
      ),
      (_match, left, right) => `${left}${replaceIdentOutsideStrings(right, name, `__cmpProps().${name}`)};`
    );
  }
  const snapshot = `  function __cmpProps() { return { ${exported.join(', ')} }; }`;
  const exportBlock = next.match(/(?:^|\n)([ \t]*export let [^\n]+\n)+/);
  if (exportBlock) {
    next = next.replace(exportBlock[0], `${exportBlock[0]}${snapshot}\n`);
  }
  return next;
};

const extractTemplate = (code: string) => {
  const match = code.match(/template:\s*`([\s\S]*?)`,/);
  return match?.[1] ?? '';
};

const extractStyles = (code: string) => {
  const match = code.match(/styles:\s*\[\s*`([\s\S]*?)`\s*,?\s*\]/);
  return match?.[1] ?? '';
};

const rewriteSlots = (template: string) =>
  template
    .replace(/<slot\s+name="([^"]+)"\s*\/>/g, '<compare-slot name="$1"></compare-slot>')
    .replace(/<slot\s+name="([^"]+)"\s*><\/slot>/g, '<compare-slot name="$1"></compare-slot>')
    .replace(/<slot\s*\/>/g, '<compare-slot></compare-slot>')
    .replace(/<slot><\/slot>/g, '<compare-slot></compare-slot>');

export function mitosisCompareAdapters(): Plugin {
  return {
    name: 'mitosis-compare-adapters',
    enforce: 'pre',
    transform(code, id) {
      const normalized = id.split('?')[0];
      const tag = tagFromId(normalized);
      if (!tag) return null;
      const native = code.includes('mitosis-native-host');

      if (
        (normalized.includes('/output/frameworks/react/') || normalized.includes('/src/react/fixed/')) &&
        normalized.endsWith('.tsx')
      ) {
        if (native) return null;
        let next = code;
        next = next.replace(/<slot\s+name="([^"]+)"\s*\/>/g, (_, name) => `{props[${JSON.stringify(name)}] ?? null}`);
        next = next.replace(/<slot\s+name="([^"]+)"\s*><\/slot>/g, (_, name) => `{props[${JSON.stringify(name)}] ?? null}`);
        next = next.replace(/<slot\s*\/>/g, '{props.children}');
        next = next.replace(/<slot><\/slot>/g, '{props.children}');
        next = next.replace(/<style\s+jsx>/g, '<style jsx global>');
        next = rewriteStaticStyleHosts(next, tag);
        next = rewriteReactFunctionShadowing(next);
        return next;
      }

      if (normalized.includes('/output/frameworks/vue/') && normalized.endsWith('.vue')) {
        if (native) return null;
        return rewriteStaticStyleHosts(code.replace(/<style scoped>/g, '<style>'), tag);
      }

      if (normalized.includes('/output/frameworks/svelte/') && normalized.endsWith('.svelte')) {
        if (native) return null;
        let next = rewriteStaticStyleHosts(code, tag, true);
        next = rewriteSvelteCustomElements(next);
        next = rewriteSveltePropShadowing(next);
        return next;
      }

      if (normalized.includes('/output/frameworks/angular/') && normalized.endsWith('.ts')) {
        const template = rewriteSlots(extractTemplate(code));
        const styles = extractStyles(code);
        let next = code;
        next = next.replace(/^import .*(@angular\/|CommonModule).*\n/gm, '');
        next = next.replace(/@NgModule\([\s\S]*?\)\s*export class \w+Module \{\}\s*/g, '');
        next = next.replace(/@Component\(\{[\s\S]*?\}\)\s*/g, '');
        next = next.replace(/@Input\(\)\s*/g, '');
        next = next.replace(
          /export default class (\w+) \{/,
          `export default class $1 {\n  static compareTemplate = ${JSON.stringify(template)};\n  static compareStyles = ${JSON.stringify(styles)};`
        );
        return next;
      }

      return null;
    },
  };
}
