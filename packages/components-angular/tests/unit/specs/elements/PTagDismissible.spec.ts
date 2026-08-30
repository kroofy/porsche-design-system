import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { nativeIconUrl } from '../../../../projects/angular-wrapper/src/elements/core/icon/icon-url';
import { PTagDismissible } from '../../../../projects/angular-wrapper/src/elements/PTagDismissible';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PTagDismissible', () => {
  it('returns a button with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PTagDismissible],
      template: `<button pTagDismissible>Default</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const button = host.firstElementChild as HTMLButtonElement;

    expect(host.childElementCount).toBe(1);
    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
    expect(button.classList.contains('p-tag-dismissible')).toBe(true);
    expect(host.querySelector('p-tag-dismissible')).toBeNull();
    expect(button.querySelector('.p-tag-dismissible__sr')?.textContent).toBe('Remove:');
    const icon = button.querySelector('img.p-icon') as HTMLImageElement;
    expect(icon.getAttribute('src')).toBe(nativeIconUrl('close'));
    expect(icon.parentElement?.classList.contains('p-tag-dismissible__icon')).toBe(true);
  });

  it('encodes compact and a label child', () => {
    @Component({
      standalone: true,
      imports: [PTagDismissible],
      template: `<button pTagDismissible compact label="Some label">Default</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('data-p-compact')).toBe('true');
    expect(button.querySelector('.p-tag-dismissible__label')?.textContent).toBe('Some label');
  });
});
