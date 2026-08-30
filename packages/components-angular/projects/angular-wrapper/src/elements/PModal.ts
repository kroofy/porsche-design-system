import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import type { Responsive } from './core/appearance';
import {
  MODAL_DISMISS_CLASS,
  MODAL_PANEL_CLASS,
  MODAL_SCROLLER_CLASS,
  type ModalBackdrop,
  type ModalBackground,
  modalAppearance,
} from './core/modal/modal.appearance';

@Component({
  selector: 'dialog[pModal]',
  standalone: true,
  template: `
    <div [class]="scrollerClass">
      <div [class]="panelClass">
        @if (dismissButton) {
          <button type="button" [class]="dismissClass" aria-label="Dismiss modal" (click)="onDismiss()">
            <span>Dismiss modal</span>
          </button>
        }
        <ng-content />
      </div>
    </div>
  `,
  host: {
    '[class.p-modal]': 'true',
    '[attr.aria-modal]': '"true"',
    '[attr.tabindex]': '-1',
  },
})
export class PModal implements OnInit, OnChanges {
  @Input() background?: ModalBackground;
  @Input() backdrop?: ModalBackdrop;
  @Input() fullscreen?: Responsive<boolean>;
  @Input({ transform: booleanAttribute }) dismissButton = true;

  readonly scrollerClass = MODAL_SCROLLER_CLASS;
  readonly panelClass = MODAL_PANEL_CLASS;
  readonly dismissClass = MODAL_DISMISS_CLASS;

  private readonly el = inject(ElementRef).nativeElement as HTMLDialogElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  onDismiss(): void {
    this.el.close();
  }

  private sync(): void {
    syncAppearance(
      this.el,
      modalAppearance({
        background: this.background,
        backdrop: this.backdrop,
        fullscreen: this.fullscreen,
      }),
      this.applied
    );
  }
}
