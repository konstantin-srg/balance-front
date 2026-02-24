import {Component, inject, input, signal} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import {TableModel} from './models/table-model';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'ent-table',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DecimalPipe
  ],
  standalone: true,
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  table = input<TableModel>();
  sort = signal({
    field: '',
    direction: '',
  })

  getControl(form: UntypedFormGroup, control: string): FormControl {
    return form.get(control) as FormControl;
  }

  tblSort(field: string, defaultDirection: string = 'asc') {
    const form = this.table()!.form;
    const sort = form().get('sort')?.value;

    let direction = defaultDirection;
    if (sort.field === field) {
      direction = sort.direction === 'desc' ? 'asc' : 'desc';
    }

    form().patchValue({
      sort: {
        field: field,
        direction: direction,
      }
    });

    this.sort.set({
      field: field,
      direction: direction,
    });
  }
}
