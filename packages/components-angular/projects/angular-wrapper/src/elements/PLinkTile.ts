import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import type { Responsive } from './core/appearance';
import { LINK_ICON_CLASS, LINK_LABEL_CLASS, linkAppearance } from './core/link/link.appearance';
import {
  LINK_TILE_ACTION_CLASS,
  LINK_TILE_ACTION_COMPACT_CLASS,
  LINK_TILE_CONTENT_CLASS,
  LINK_TILE_DESCRIPTION_CLASS,
  LINK_TILE_FOOTER_CLASS,
  LINK_TILE_HEADER_CLASS,
  LINK_TILE_MEDIA_CLASS,
  linkTileAppearance,
  type TileAlign,
  type TileAspectRatio,
  type TileSize,
  type TileWeight,
} from './core/tile/tile.appearance';
import { PIcon } from './PIcon';

@Component({
  selector: 'a[pLinkTile]',
  standalone: true,
  imports: [PIcon],
  template: `
    <span [class]="headerClass"><ng-content select="[pTileHeader]" /></span>
    <span [class]="mediaClass"><ng-content /></span>
    <span [class]="contentClass">
      <p [class]="descriptionClass">{{ description }}</p>
      <span [class]="footerClass"><ng-content select="[pTileFooter]" /></span>
      @if (showFull) {
        <span [class]="fullActionClass" data-p-variant="secondary" aria-hidden="true">
          <span [class]="labelClass">{{ label }}</span>
        </span>
      }
      @if (showCompact) {
        <span [class]="compactActionClass" data-p-variant="secondary" data-p-icon="arrow-right" data-p-hide-label="true" data-p-compact="true" aria-hidden="true">
          <img pIcon name="arrow-right" size="inherit" color="inherit" [class]="iconClass" aria-hidden="true" />
          <span [class]="labelClass">{{ label }}</span>
        </span>
      }
    </span>
  `,
  host: {
    '[class.p-link-tile]': 'true',
    '[attr.aria-label]': 'label',
  },
})
export class PLinkTile implements OnInit, OnChanges {
  @Input() size?: Responsive<TileSize>;
  @Input() weight?: Responsive<TileWeight>;
  @Input() aspectRatio?: Responsive<TileAspectRatio>;
  @Input() align?: TileAlign;
  @Input({ transform: booleanAttribute }) gradient = false;
  @Input() compact?: Responsive<boolean>;
  @Input() label = '';
  @Input() description = '';

  readonly headerClass = LINK_TILE_HEADER_CLASS;
  readonly mediaClass = LINK_TILE_MEDIA_CLASS;
  readonly contentClass = LINK_TILE_CONTENT_CLASS;
  readonly descriptionClass = LINK_TILE_DESCRIPTION_CLASS;
  readonly footerClass = LINK_TILE_FOOTER_CLASS;
  readonly iconClass = LINK_ICON_CLASS;
  readonly labelClass = LINK_LABEL_CLASS;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  get showFull(): boolean {
    return this.compact !== true;
  }

  get showCompact(): boolean {
    return this.compact === true || typeof this.compact === 'object';
  }

  get fullActionClass(): string {
    return `${linkAppearance({ variant: 'secondary' }).className} ${LINK_TILE_ACTION_CLASS}`;
  }

  get compactActionClass(): string {
    return `${linkAppearance({ variant: 'secondary', icon: 'arrow-right', hideLabel: true, compact: true }).className} ${LINK_TILE_ACTION_COMPACT_CLASS}`;
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
      linkTileAppearance({
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
