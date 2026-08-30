import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PRadio } from '../../../../projects/angular-wrapper/src/elements/PRadio';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PRadio', () => {
  it('returns a radio with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PRadio],
      template: `<input pRadio id="opt" name="g" />`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const input = host.firstElementChild as HTMLInputElement;

    expect(host.childElementCount).toBe(1);
    expect(input.type).toBe('radio');
    expect(input.classList.contains('p-radio')).toBe(true);
    expect(host.querySelector('p-radio')).toBeNull();
  });

  it('encodes compact and state on the radio', () => {
    @Component({
      standalone: true,
      imports: [PRadio],
      template: `<input pRadio [compact]="true" state="error" name="g" />`,
    })
    class Host {}

    const fixture = render(Host);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.getAttribute('data-p-compact')).toBe('true');
    expect(input.getAttribute('data-p-state')).toBe('error');
  });
});
