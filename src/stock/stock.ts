import {Component, inject, resource, signal} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {env} from '../env/env';
import {Loading} from '../layout/helpers/loading/loading';
import {Panel} from '../layout/helpers/panel/panel';
import {StockTable} from './stock-table/stock-table';
import {StockTable as StockTableMdl} from './models/stockTable';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Console} from '../console/console';
import {Indent} from '../layout/helpers/indent/indent';
import {ConsoleResponse} from '../console/models/ConsoleResponse';
import {OzonService} from '../libs/ozon/ozon.service';

@Component({
  selector: 'app-stock',
  imports: [
    Panel,
    MatButtonToggleGroup,
    MatButtonToggle,
    ReactiveFormsModule,
    FormsModule,
    Loading,
    StockTable,
    Indent
  ],
  templateUrl: './stock.html',
  standalone: true,
  styleUrl: './stock.scss'
})
export class Stock {
  env = env;
  readonly syncDialog = inject(MatDialog);
  readonly ozonService = inject(OzonService);
  //readonly syncDialog = inject(MatDialogRef<'sync-console'>);

  region = signal<string>('');
  tag = signal<string>('');
  brand = signal<string>('');

  stockTable = resource<StockTableMdl, {
    region: string,
    tag: string,
    brand: string,
    api: string,
  }>({
    params: () => ({
      region: this.region(),
      tag: this.tag(),
      brand: this.brand(),
      api: this.ozonService.accountId().toString(),
    }),
    loader:  async ({params, abortSignal}) => {
      const resp = await fetch(env.apiRoot + '/ozon/stock/table', {
        method: 'POST',
        body: JSON.stringify({
          region: params.region,
          tag: params.tag,
          brand: params.brand,
          api: params.api,
        }),
        signal: abortSignal
      });

      return await resp.json();
    }
  });

  ngOnInit() {
    //this.openConsole();

    // this.http.post<ConsoleResponse>(this.url(rowData, true), rowData.map.params).subscribe(resp => {
    //   resolve(resp)
    // })
  }

  openConsole(): void {
    const dialogRef = this.syncDialog.open(Console, {
      disableClose: true,
      maxWidth: '1200px',
      data: {url: '/ozon/sync/map', map: 'stock', data: {}},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.stockTable.reload()
    });
  }
}
