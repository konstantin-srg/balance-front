import {Component, computed, inject, signal} from '@angular/core';
import {List, ListModel, Table, TableField, TableModel} from 'entity';
import {Indent} from '../layout/helpers/indent/indent';
import {Panel} from '../layout/helpers/panel/panel';
import {ListRow} from '../../projects/entity/src/lib/list/models/list-row';
import {DecimalPipe} from '@angular/common';
import {SubHeader} from '../layout/header/sub-header/sub-header';
import {Console} from '../console/console';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-flow',
  imports: [
    Indent,
    Panel,
    Table,
    DecimalPipe,
    SubHeader,
    List
  ],
  templateUrl: './flow.html',
  styleUrl: './flow.scss',
  standalone: true
})
export class Flow {
  totalSum = computed(() => {
    let totalSum: number = 0;
    this.table.data().forEach(row => {
      totalSum += row.sum;
    });

    return totalSum;
  })

  table = new TableModel(
    'flow',
    '/flow/products',[
    new TableField(
      'product',
      'Название',
      'product',
      'search',
    ),
    new TableField(
      'sales',
      'Продажи',
      'number',
      'sort'
    ),
    new TableField(
      'profit',
      'Прибыль',
      'number',
      'sort'
    ),
    new TableField(
      'cost',
      'Цена',
      'number',
      'sort'
    ),
    new TableField(
      'sum',
      'Сумма',
      'number',
      'sort'
    ),
  ]);

  listModel = new ListModel(
    '/flow/flow-add',
    '/flow/flow-list',
    '/flow/flow-del',
  );

  readonly syncDialog = inject(MatDialog);
  updateData() {
    const dialogRef = this.syncDialog.open(Console, {
      disableClose: true,
      maxWidth: '1200px',
      data: {url: '/ozon/sync/map', map: 'stock', data: {}},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        //this.animal.set(result);
      }
    });
  }
}
