import {Component, input, signal, WritableSignal} from '@angular/core';
import {ConsoleRequest} from '../models/ConsoleRequest';
import {ConsoleResponse} from '../models/ConsoleResponse';

@Component({
  selector: 'app-console-row',
  imports: [],
  standalone: true,
  templateUrl: './console-row.html',
  styleUrl: './console-row.scss'
})

export class ConsoleRow {
  request = input<ConsoleRequest | null>({});
  responses = input<ConsoleResponse[]>([]);
}
