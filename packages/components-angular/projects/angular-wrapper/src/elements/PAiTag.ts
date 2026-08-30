import { Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import {
  type AiTagLabel,
  type AiTagLocale,
  type AiTagVariant,
  aiTagAppearance,
  aiTagLabel,
} from './core/ai-tag/ai-tag.appearance';

@Component({
  selector: 'span[pAiTag]',
  standalone: true,
  template: `
    @if (label.kind === 'abbr') {
      <abbr [title]="label.title">{{ label.text }}</abbr>
    } @else {
      {{ label.text }}
    }
  `,
  host: {
    '[class.p-ai-tag]': 'true',
  },
})
export class PAiTag implements OnInit, OnChanges {
  @Input() locale?: AiTagLocale | string;
  @Input() variant?: AiTagVariant;

  label: AiTagLabel = aiTagLabel();

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    this.label = aiTagLabel(this.variant, this.locale);
    syncAppearance(this.el, aiTagAppearance(), this.applied);
  }
}
