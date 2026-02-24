import {Component, input} from '@angular/core';
import {StockTable as StockTableMdl} from '../models/stockTable';

@Component({
  selector: 'app-stock-table',
  imports: [],
  templateUrl: './stock-table.html',
  standalone: true,
  styleUrl: './stock-table.scss'
})
export class StockTable {
  stockTable = input<StockTableMdl>();

  protected readonly parseInt = parseInt;
  protected readonly Math = Math;
  protected readonly parseFloat = parseFloat;
}
