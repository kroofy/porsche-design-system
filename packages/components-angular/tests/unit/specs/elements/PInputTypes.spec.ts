import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PInputEmail, PInputNumber, PInputPassword } from '../../../../projects/angular-wrapper/src/elements/PInputTypes';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('typed native inputs', () => {
  it('returns an email input with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PInputEmail],
      template: `<input pInputEmail id="mail" />`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const input = host.firstElementChild as HTMLInputElement;

    expect(host.childElementCount).toBe(1);
    expect(input.type).toBe('email');
    expect(input.classList.contains('p-input')).toBe(true);
    expect(host.querySelector('p-input-email')).toBeNull();
  });

  it('returns a password input', () => {
    @Component({
      standalone: true,
      imports: [PInputPassword],
      template: `<input pInputPassword />`,
    })
    class Host {}

    const fixture = render(Host);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.type).toBe('password');
  });

  it('returns a number input and uses native disabled when loading', () => {
    @Component({
      standalone: true,
      imports: [PInputNumber],
      template: `<input pInputNumber loading />`,
    })
    class Host {}

    const fixture = render(Host);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.type).toBe('number');
    expect(input.disabled).toBe(true);
    expect(input.getAttribute('aria-busy')).toBe('true');
    expect(input.getAttribute('data-p-loading')).toBe('true');
  });
});
