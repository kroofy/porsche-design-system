import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PTextarea } from '../../../../projects/angular-wrapper/src/elements/PTextarea';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PTextarea', () => {
  it('returns a textarea with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PTextarea],
      template: `<textarea pTextarea id="bio"></textarea>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const textarea = host.firstElementChild as HTMLTextAreaElement;

    expect(host.childElementCount).toBe(1);
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(host.querySelector('p-textarea')).toBeNull();
    expect(textarea.classList.contains('p-textarea')).toBe(true);
    expect(textarea.parentElement).toBe(host);
  });
});
