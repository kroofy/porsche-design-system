import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PFieldset } from '../../../../projects/angular-wrapper/src/elements/PFieldset';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PFieldset', () => {
  it('returns a fieldset with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PFieldset],
      template: `<fieldset pFieldset><legend>Some label</legend></fieldset>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const fieldset = host.firstElementChild as HTMLFieldSetElement;

    expect(host.childElementCount).toBe(1);
    expect(fieldset.tagName).toBe('FIELDSET');
    expect(host.querySelector('p-fieldset')).toBeNull();
    expect(fieldset.classList.contains('p-fieldset')).toBe(true);
    expect(fieldset.parentElement).toBe(host);
  });

  it('puts aria attributes on the fieldset', () => {
    @Component({
      standalone: true,
      imports: [PFieldset],
      template: `<fieldset pFieldset role="radiogroup" aria-required="true"></fieldset>`,
    })
    class Host {}

    const fixture = render(Host);
    const fieldset = fixture.nativeElement.querySelector('fieldset') as HTMLFieldSetElement;

    expect(fieldset.getAttribute('role')).toBe('radiogroup');
    expect(fieldset.getAttribute('aria-required')).toBe('true');
  });

  it('encodes non-default appearance on the fieldset', () => {
    @Component({
      standalone: true,
      imports: [PFieldset],
      template: `<fieldset pFieldset labelSize="small" required state="error"></fieldset>`,
    })
    class Host {}

    const fixture = render(Host);
    const fieldset = fixture.nativeElement.querySelector('fieldset') as HTMLFieldSetElement;

    expect(fieldset.getAttribute('data-p-label-size')).toBe('small');
    expect(fieldset.getAttribute('data-p-required')).toBe('true');
    expect(fieldset.getAttribute('data-p-state')).toBe('error');
  });
});
