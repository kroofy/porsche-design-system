import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { hostAttr, hostAttrs, styleString } from './host.js';

describe('hostAttr', () => {
  it('drops unset and false values like a missing Lit attribute', () => {
    for (const value of [undefined, null, false, 'false']) assert.equal(hostAttr(value), undefined);
  });

  it('maps true to "true" and keeps strings', () => {
    assert.equal(hostAttr(true), 'true');
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
    assert.deepEqual(
      hostAttrs({ disabled: true, loading: true, 'icon-source': undefined, icon: 'car', open: 'false' }),
      {
        disabled: true,
        loading: 'true',
        icon: 'car',
      }
    );
  });

  it('keeps explicit false for attributes compared against ="false"', () => {
    assert.deepEqual(hostAttrs({ 'like-button': false, disabled: false }, ['like-button']), { 'like-button': 'false' });
  });
});

describe('styleString', () => {
  it('joins custom properties and skips empty values', () => {
    assert.equal(styleString({ '--a': '1px', '--b': '', '--c': 'red' }), '--a: 1px; --c: red');
    assert.equal(styleString(undefined), '');
  });
});
