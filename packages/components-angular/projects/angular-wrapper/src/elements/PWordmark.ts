import { Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import { type WordmarkSize, wordmarkAppearance } from './core/wordmark/wordmark.appearance';
import { WORDMARK_PATH, WORDMARK_TITLE, WORDMARK_VIEWBOX } from './core/wordmark/wordmark-svg';

@Component({
  selector: 'svg[pWordmark], a[pWordmark]',
  standalone: true,
  template: `
    @if (isAnchor) {
      <svg xmlns="http://www.w3.org/2000/svg" [attr.viewBox]="viewBox">
        <title>{{ title }}</title>
        <path [attr.d]="path" />
      </svg>
    } @else {
      <title>{{ title }}</title>
      <path [attr.d]="path" />
    }
  `,
  host: {
    '[class.p-wordmark]': 'true',
    '[attr.xmlns]': 'isAnchor ? null : "http://www.w3.org/2000/svg"',
    '[attr.viewBox]': 'isAnchor ? null : viewBox',
  },
})
export class PWordmark implements OnInit, OnChanges {
  @Input() size?: WordmarkSize;

  readonly viewBox = WORDMARK_VIEWBOX;
  readonly title = WORDMARK_TITLE;
  readonly path = WORDMARK_PATH;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  get isAnchor(): boolean {
    return this.el.tagName === 'A';
  }

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(this.el, wordmarkAppearance({ size: this.size }), this.applied);
  }
}
