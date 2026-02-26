import {
  Component,
  computed,
  effect,
  inject,
  Injectable,
  resource,
  signal,
  ViewChildren,
  WritableSignal
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import BalanceModel from './models/Balance';
import {Panel} from '../layout/helpers/panel/panel';
import {SubHeader} from '../layout/header/sub-header/sub-header';
import {ReactiveFormsModule} from '@angular/forms';
import {env} from '../env/env';
import {Console} from '../console/console';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, RouterState} from '@angular/router';
import {List, Table, TableField, TableModel, CalendarService, ListModel} from 'entity';
import {DecimalPipe} from '@angular/common';
import {Indent} from '../layout/helpers/indent/indent';

@Injectable({providedIn: 'root'})

@Component({
  selector: 'app-balance',
  imports: [
    Panel,
    SubHeader,
    ReactiveFormsModule,
    Table,
    DecimalPipe,
    Indent,
    List
  ],
  standalone: true,
  templateUrl: './balance.html',
  styleUrl: './balance.scss'
})
export class Balance {
  private calendarService = inject(CalendarService);

  private http = inject(HttpClient);
  private state = inject(ActivatedRoute)
  env = env;

  listModel = new ListModel(
    '/balance/flow-add',
    '/balance/flow-list',
    '/balance/flow-del',
  );

  table = new TableModel(
    'balance',
    '/balance/products',[
    new TableField(
      'product',
      'Название',
      'product',
      'search',
    ),
    new TableField(
      'stock',
      'Склад',
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

  balance: BalanceModel = new BalanceModel(0, 0, 0, 0);

  totalSum = computed(() => {
    let totalSum: number = 0;
    this.table.data().forEach(row => {
      totalSum += row.sum;
    });

    return totalSum;
  })

  ngOnInit() {
    //this.table.form().updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  readonly syncDialog = inject(MatDialog);
  updateData() {
    const dialogRef = this.syncDialog.open(Console, {
      disableClose: true,
      maxWidth: '1200px',
      data: {url: '/api/ozon/sync/map', map: 'stock', data: {}},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        //this.animal.set(result);
      }
    });
  }
}
