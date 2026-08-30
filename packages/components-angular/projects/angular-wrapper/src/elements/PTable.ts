import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import {
  type TableLayout,
  tableAppearance,
  tableCellAppearance,
  tableHeadCellAppearance,
} from './core/table/table.appearance';

@Component({
  selector: 'table[pTable]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-table]': 'true',
  },
})
export class PTable implements OnInit, OnChanges {
  @Input({ transform: booleanAttribute }) compact = false;
  @Input() layout?: TableLayout;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(this.el, tableAppearance({ compact: this.compact, layout: this.layout }), this.applied);
  }
}

@Component({
  selector: 'thead[pTableHead]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-table-head]': 'true',
  },
})
export class PTableHead {}

@Component({
  selector: 'tbody[pTableBody]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-table-body]': 'true',
  },
})
export class PTableBody {}

@Component({
  selector: 'tr[pTableRow]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-table-row]': 'true',
  },
})
export class PTableRow {}

@Component({
  selector: 'th[pTableHeadCell]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-table-head-cell]': 'true',
    '[attr.scope]': 'scope',
  },
})
export class PTableHeadCell implements OnInit, OnChanges {
  @Input({ transform: booleanAttribute }) hideLabel = false;
  @Input({ transform: booleanAttribute }) multiline = false;
  @Input() scope = 'col';

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
      tableHeadCellAppearance({ hideLabel: this.hideLabel, multiline: this.multiline }),
      this.applied
    );
  }
}

@Component({
  selector: 'td[pTableCell]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-table-cell]': 'true',
  },
})
export class PTableCell implements OnInit, OnChanges {
  @Input({ transform: booleanAttribute }) multiline = false;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(this.el, tableCellAppearance({ multiline: this.multiline }), this.applied);
  }
}
