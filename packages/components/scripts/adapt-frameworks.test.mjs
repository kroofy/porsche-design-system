import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { adaptFile } from './adapt-frameworks.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (tag, target, file) =>
  readFileSync(resolve(root, 'mitosis', tag, 'output/frameworks', target, file), 'utf8');

const adapted = (tag, target, file) => {
  const raw = read(tag, target, file);
  return raw.includes('mitosis-native-host') ? raw : adaptFile(target, tag, raw);
};

describe('adaptFile react', () => {
  it('wraps button with a host, children, scoped cssText, and sibling components', () => {
    const next = adapted('button', 'react', 'Button.tsx');
    assert.match(next, /data-pds="button"/);
    assert.match(next, /scopeCss\(/);
    assert.match(next, /\{props\.children\}/);
    assert.doesNotMatch(next, /<slot/);
    assert.match(next, /import PIcon from/);
    assert.match(next, /import PSpinner from/);
    assert.match(next, /<PIcon/);
    assert.match(next, /<PSpinner/);
    assert.doesNotMatch(next, /<style jsx>/);
  });

  it('keeps wordmark host height in the scoped cssText call', () => {
    const next = adapted('wordmark', 'react', 'Wordmark.tsx');
    assert.match(next, /data-pds="wordmark"/);
    assert.match(next, /scopeCss\([^,]+, "\.p-wordmark"\)/);
  });

  it('binds input-text value from the lite getter', () => {
    const next = adapted('input-text', 'react', 'InputText.tsx');
    assert.match(next, /value=\{inputValue\(\)\}/);
    assert.match(next, /data-pds="input-text"/);
  });

  it('does not let a minified // comment eat the rest of the file', () => {
    const raw = [
      'import * as React from "react";',
      'function LitButtonPure(props) {',
      '  function iconSrc() { if (props.iconSource) return props.iconSource; // Landed LitIcon only maps car / arrow-right. Playground copy / like // would otherwise paint arrow-right. const files: any = { copy: "copy.svg" }; const icon = props.icon || "arrow-right"; if (files[icon]) return "http://localhost:3001/icons/" + files[icon]; return ""; }',
      '  return (',
      '    <button className="root"><style dangerouslySetInnerHTML={{ __html: cssText() }} /><slot /></button>',
      '  );',
      '}',
      'export default LitButtonPure;',
      '',
    ].join('\n');
    const next = adaptFile('react', 'button-pure', raw);
    assert.match(next, /data-pds="button-pure"/);
    assert.match(next, /const files/);
    assert.match(next, /http:\/\/localhost:3001\/icons\//);
    assert.match(next, /export default LitButtonPure;/);
    assert.doesNotMatch(next, /export default LitButtonPure; \*\//);
    assert.match(next, /\/\* Landed LitIcon[\s\S]*?\*\/\s+const files/);
  });

  it('keeps a minified return after a // comment', () => {
    const raw = [
      'import * as React from "react";',
      'function LitTagDismissible(props) {',
      "  function closeIconSrc() { // Landed LitIcon only maps car / arrow-right. name=\"close\" would paint // arrow-right. Feed the CDN close SVG so the nested p-icon matches the // stored Stencil baseline. return 'http://localhost:3001/icons/close.eec3c5d.svg'; }",
      '  return (',
      '    <button type="button"><style dangerouslySetInnerHTML={{ __html: cssText() }} /><slot /></button>',
      '  );',
      '}',
      'export default LitTagDismissible;',
      '',
    ].join('\n');
    const next = adaptFile('react', 'tag-dismissible', raw);
    assert.match(next, /data-pds="tag-dismissible"/);
    assert.match(next, /return 'http:\/\/localhost:3001\/icons\/close/);
    assert.match(next, /export default LitTagDismissible;/);
    assert.doesNotMatch(next, /\*\/ export default/);
    assert.doesNotMatch(next, /export default LitTagDismissible; \*\//);
  });
});

describe('adaptFile vue / svelte', () => {
  it('scopes vue button cssText and wraps a host', () => {
    const next = adapted('button', 'vue', 'Button.vue');
    assert.match(next, /data-pds="button"/);
    assert.match(next, /scopedCssText/);
    assert.match(next, /v-html="scopedCssText"/);
    assert.match(next, /<PIcon/);
    assert.match(next, /from "\.\.\/\.\.\/\.\.\/\.\.\/icon\/output\/frameworks\/vue\/Icon\.vue"/);
    assert.doesNotMatch(next, /\.vue\.vue/);
  });

  it('rewrites svelte custom-element this={p - icon} into a component', () => {
    const next = adapted('button', 'svelte', 'Button.svelte');
    assert.match(next, /data-pds="button"/);
    assert.match(next, /<PIcon/);
    assert.doesNotMatch(next, /svelte:component/);
    assert.match(next, /from "\.\.\/\.\.\/\.\.\/\.\.\/icon\/output\/frameworks\/svelte\/Icon\.svelte"/);
    assert.doesNotMatch(next, /\.svelte\.svelte/);
    assert.match(next, /<\$\{"style"\}>/);
    assert.doesNotMatch(next, /\{@html `<style>/);
    assert.match(next, /\$: __pdsComponents = \{ PIcon, PSpinner \}/);
  });

  it('rewrites svelte reads that would TDZ against a later const loading', () => {
    const raw = [
      '<script lang="ts">',
      '  export let loading: any;',
      '  export let loadingParent: any;',
      '  export let selected: any;',
      '  $: cssText = () => {',
      '    const selected = selected === true;',
      '    const optionLoading = isTrue(loading) && !selected;',
      '    const loading = optionLoading || isTrue(loadingParent);',
      '    return loading ? "1" : "0";',
      '  };',
      '</script>',
      '<div></div>',
      '',
    ].join('\n');
    const next = adaptFile('svelte', 'radio-group-option', raw);
    assert.match(next, /isTrue\(__cmpProps\(\)\.loading\)/);
    assert.match(next, /const loading = optionLoading/);
    assert.match(next, /data-pds="radio-group-option"/);
  });
});
