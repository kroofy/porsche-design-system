import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import type { Responsive } from './core/appearance';
import { type FieldState, textareaAppearance } from './core/input/input.appearance';
import { syncAppearance } from './apply-appearance';

@Component({
  selector: 'textarea[pTextarea]',
  standalone: true,
  template: '',
  host: {
    '[class.p-textarea]': 'true',
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.dir]': '"auto"',
    '[attr.rows]': 'rows',
  },
})
export class PTextarea implements OnInit, OnChanges {
  @Input() compact?: Responsive<boolean>;
  @Input() state?: FieldState;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() rows = 7;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(
      this.el,
      textareaAppearance({
        compact: this.compact,
        state: this.state,
        loading: this.loading,
      }),
      this.applied
    );
  }
}
