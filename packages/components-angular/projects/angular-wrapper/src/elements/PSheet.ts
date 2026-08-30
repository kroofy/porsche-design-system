import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import {
  SHEET_DISMISS_CLASS,
  SHEET_PANEL_CLASS,
  SHEET_SCROLLER_CLASS,
  type SheetBackground,
  sheetAppearance,
} from './core/sheet/sheet.appearance';

@Component({
  selector: 'dialog[pSheet]',
  standalone: true,
  template: `
    <div [class]="scrollerClass">
      <div [class]="panelClass">
        @if (dismissButton) {
          <button type="button" [class]="dismissClass" aria-label="Dismiss sheet" (click)="onDismiss()">
            <span>Dismiss sheet</span>
          </button>
        }
        <ng-content />
      </div>
    </div>
  `,
  host: {
    '[class.p-sheet]': 'true',
    '[attr.aria-modal]': '"true"',
    '[attr.tabindex]': '-1',
  },
})
export class PSheet implements OnInit, OnChanges {
  @Input() background?: SheetBackground;
  @Input({ transform: booleanAttribute }) dismissButton = true;

  readonly scrollerClass = SHEET_SCROLLER_CLASS;
  readonly panelClass = SHEET_PANEL_CLASS;
  readonly dismissClass = SHEET_DISMISS_CLASS;

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
    syncAppearance(this.el, sheetAppearance({ background: this.background }), this.applied);
  }
}
