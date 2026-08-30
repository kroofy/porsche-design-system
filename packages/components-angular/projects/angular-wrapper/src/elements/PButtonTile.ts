import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import type { Responsive } from './core/appearance';
import {
  BUTTON_ICON_CLASS,
  BUTTON_LABEL_CLASS,
  BUTTON_SPINNER_CLASS,
  buttonAppearance,
} from './core/button/button.appearance';
import {
  BUTTON_TILE_ACTION_CLASS,
  BUTTON_TILE_ACTION_COMPACT_CLASS,
  BUTTON_TILE_CONTENT_CLASS,
  BUTTON_TILE_DESCRIPTION_CLASS,
  BUTTON_TILE_FOOTER_CLASS,
  BUTTON_TILE_HEADER_CLASS,
  BUTTON_TILE_MEDIA_CLASS,
  buttonTileAppearance,
  type TileAlign,
  type TileAspectRatio,
  type TileSize,
  type TileWeight,
} from './core/tile/tile.appearance';
import { PIcon } from './PIcon';

@Component({
  selector: 'button[pButtonTile]',
  standalone: true,
  imports: [PIcon],
  template: `
    <span [class]="headerClass"><ng-content select="[pTileHeader]" /></span>
    <span [class]="mediaClass"><ng-content /></span>
    <span [class]="contentClass">
      <p [class]="descriptionClass">{{ description }}</p>
      <span [class]="footerClass"><ng-content select="[pTileFooter]" /></span>
      @if (showFull) {
        <span [class]="fullActionClass" [attr.data-p-variant]="'secondary'" [attr.data-p-icon]="icon !== 'none' ? icon : null" [attr.data-p-loading]="loading ? 'true' : null" aria-hidden="true">
          @if (icon !== 'none' || iconSource) {
            <img pIcon [name]="icon === 'none' ? 'arrow-right' : icon" [source]="iconSource" size="inherit" color="inherit" [class]="iconClass" aria-hidden="true" />
          }
          @if (loading) {
            <span [class]="spinnerClass" aria-hidden="true">
              <svg viewBox="-16 -16 32 32" width="100%" height="100%" focusable="false" aria-hidden="true">
                <circle r="11" />
                <circle r="11" />
              </svg>
            </span>
          }
          <span [class]="labelClass">{{ label }}</span>
        </span>
      }
      @if (showCompact) {
        <span [class]="compactActionClass" data-p-variant="secondary" [attr.data-p-icon]="compactIcon" data-p-hide-label="true" data-p-compact="true" [attr.data-p-loading]="loading ? 'true' : null" aria-hidden="true">
          <img pIcon [name]="compactIcon" [source]="iconSource" size="inherit" color="inherit" [class]="iconClass" aria-hidden="true" />
          @if (loading) {
            <span [class]="spinnerClass" aria-hidden="true">
              <svg viewBox="-16 -16 32 32" width="100%" height="100%" focusable="false" aria-hidden="true">
                <circle r="11" />
                <circle r="11" />
              </svg>
            </span>
          }
          <span [class]="labelClass">{{ label }}</span>
        </span>
      }
    </span>
  `,
  host: {
    '[class.p-button-tile]': 'true',
    '[attr.type]': 'type',
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.data-p-loading]': 'loading ? "true" : null',
    '[attr.aria-label]': 'label',
  },
})
export class PButtonTile implements OnInit, OnChanges {
  @Input() size?: Responsive<TileSize>;
  @Input() weight?: Responsive<TileWeight>;
  @Input() aspectRatio?: Responsive<TileAspectRatio>;
  @Input() align?: TileAlign;
  @Input({ transform: booleanAttribute }) gradient = false;
  @Input() compact?: Responsive<boolean>;
  @Input() label = '';
  @Input() description = '';
  @Input() icon = 'none';
  @Input() iconSource?: string;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'submit';

  readonly headerClass = BUTTON_TILE_HEADER_CLASS;
  readonly mediaClass = BUTTON_TILE_MEDIA_CLASS;
  readonly contentClass = BUTTON_TILE_CONTENT_CLASS;
  readonly descriptionClass = BUTTON_TILE_DESCRIPTION_CLASS;
  readonly footerClass = BUTTON_TILE_FOOTER_CLASS;
  readonly iconClass = BUTTON_ICON_CLASS;
  readonly labelClass = BUTTON_LABEL_CLASS;
  readonly spinnerClass = BUTTON_SPINNER_CLASS;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  get showFull(): boolean {
    return this.compact !== true;
  }

  get showCompact(): boolean {
    return this.compact === true || typeof this.compact === 'object';
  }

  get compactIcon(): string {
    return this.icon === 'none' ? 'arrow-right' : this.icon;
  }

  get fullActionClass(): string {
    return `${buttonAppearance({ variant: 'secondary', icon: this.icon, loading: this.loading }).className} ${BUTTON_TILE_ACTION_CLASS}`;
  }

  get compactActionClass(): string {
    return `${buttonAppearance({ variant: 'secondary', icon: this.compactIcon, hideLabel: true, compact: true, loading: this.loading }).className} ${BUTTON_TILE_ACTION_COMPACT_CLASS}`;
  }

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(
      this.el,
      buttonTileAppearance({
        size: this.size,
        weight: this.weight,
        aspectRatio: this.aspectRatio,
        align: this.align,
        gradient: this.gradient,
        compact: this.compact,
      }),
      this.applied
    );
  }
}
