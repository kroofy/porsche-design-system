import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PInputText } from '../../../../projects/angular-wrapper/src/elements/PInputText';
import { PLabel } from '../../../../projects/angular-wrapper/src/elements/PLabel';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PInputText', () => {
  it('returns an input with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PInputText],
      template: `<input pInputText id="name" />`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const input = host.firstElementChild as HTMLInputElement;

    expect(host.childElementCount).toBe(1);
    expect(input.tagName).toBe('INPUT');
    expect(host.querySelector('p-input-text')).toBeNull();
    expect(input.classList.contains('p-input')).toBe(true);
    expect(input.type).toBe('text');
    expect(input.parentElement).toBe(host);
  });

  it('uses native disabled and aria-busy when loading', () => {
    @Component({
      standalone: true,
      imports: [PInputText],
      template: `<input pInputText loading />`,
    })
    class Host {}

    const fixture = render(Host);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.disabled).toBe(true);
    expect(input.getAttribute('aria-busy')).toBe('true');
    expect(input.getAttribute('data-p-loading')).toBe('true');
  });

  it('encodes non-default appearance on the input', () => {
    @Component({
      standalone: true,
      imports: [PInputText],
      template: `<input pInputText [compact]="true" state="error" />`,
    })
    class Host {}

    const fixture = render(Host);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.getAttribute('data-p-compact')).toBe('true');
    expect(input.getAttribute('data-p-state')).toBe('error');
  });
});

describe('PLabel', () => {
  it('returns a label with for pointing at the input', () => {
    @Component({
      standalone: true,
      imports: [PInputText, PLabel],
      template: `
        <label pLabel for="name">Name</label>
        <input pInputText id="name" />
      `,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const label = host.querySelector('label') as HTMLLabelElement;
    const input = host.querySelector('input') as HTMLInputElement;

    expect(label.htmlFor).toBe('name');
    expect(label.classList.contains('p-label')).toBe(true);
    expect(input.id).toBe('name');
    expect(label.parentElement).toBe(host);
    expect(input.parentElement).toBe(host);
    expect(host.querySelector('p-input-text')).toBeNull();
  });
});
