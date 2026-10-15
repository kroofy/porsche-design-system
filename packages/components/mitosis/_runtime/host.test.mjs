import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { hostAttr, hostAttrs, styleString } from './host.js';

describe('hostAttr', () => {
  it('drops unset and false values like a missing Lit attribute', () => {
    for (const value of [undefined, null, false, 'false']) assert.equal(hostAttr(value), undefined);
  });

  it('maps true to an empty attribute and keeps strings', () => {
    assert.equal(hostAttr(true), '');
    assert.equal(hostAttr(''), '');
    assert.equal(hostAttr('secondary'), 'secondary');
    assert.equal(hostAttr(0), '0');
  });

  it('serializes breakpoint objects', () => {
    assert.equal(hostAttr({ base: true, m: false }), '{"base":true,"m":false}');
  });
});

describe('hostAttrs', () => {
  it('keeps only attributes that would be present', () => {
    assert.deepEqual(hostAttrs({ disabled: true, loading: false, 'icon-source': undefined, icon: 'car' }), {
      disabled: '',
      icon: 'car',
    });
  });
});

describe('styleString', () => {
  it('joins custom properties and skips empty values', () => {
    assert.equal(styleString({ '--a': '1px', '--b': '', '--c': 'red' }), '--a: 1px; --c: red');
    assert.equal(styleString(undefined), '');
  });
});
