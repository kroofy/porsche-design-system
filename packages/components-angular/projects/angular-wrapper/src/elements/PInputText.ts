import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import type { Responsive } from './core/appearance';
import { type FieldState, inputAppearance } from './core/input/input.appearance';
import { syncAppearance } from './apply-appearance';

@Component({
  selector: 'input[pInputText]',
  standalone: true,
  template: '',
  host: {
    '[class.p-input]': 'true',
    '[attr.type]': '"text"',
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.dir]': '"auto"',
  },
})
export class PInputText implements OnInit, OnChanges {
  @Input() compact?: Responsive<boolean>;
  @Input() state?: FieldState;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) disabled = false;

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
      inputAppearance({
        compact: this.compact,
        state: this.state,
        loading: this.loading,
      }),
      this.applied
    );
  }
}
