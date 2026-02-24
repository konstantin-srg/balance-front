import {TableField} from './table-field';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {inject, linkedSignal, signal} from '@angular/core';
import {ListRow} from '../../list/models/list-row';
import {HttpClient} from '@angular/common/http';

export class TableModel {
  private http = inject(HttpClient);

  cacheName = '';
  api = {
    data: '' //Table Data update
  }

  data =  signal<any[] | string[]>([]);
  fields =  signal<TableField[]>([]);

  constructor(cacheName: string, updateUrl: string, fields: TableField[]) {
    this.cacheName = cacheName
    this.api.data = updateUrl
    this.fields.set(fields)
    this.intForm()
    this.initCache()
    this.update()
  }

  public initCache(){
    let key = this.cacheName;

    let storage: Record<string, object> = {};
    try {
      storage = JSON.parse(localStorage.getItem('DCakeTable') ?? '');
    } catch (e) {
      storage = {};
    }

    if(!storage.hasOwnProperty(key) || !storage[key].hasOwnProperty('sort')) {
      console.log('asda')
      storage[key] = {sort: {}}
    }

    // @ts-ignore
    this.form().patchValue({sort: storage[key].sort});
    this.form().valueChanges.subscribe(async value => {
      // @ts-ignore
      storage[key].sort = value.sort;
      localStorage.setItem('DCakeTable', JSON.stringify(storage));
    })
  }

  form = signal<UntypedFormGroup>(new UntypedFormGroup({}));

  private intForm() {
    this.form.set(new UntypedFormGroup({
      sort: new UntypedFormGroup({
        field: new UntypedFormControl(''),
        direction: new UntypedFormControl(''),
      })
    }));

    this.fields().forEach(field => {
      if (field.filter === 'search') {
        this.form().addControl(field.field, new UntypedFormControl('', []));
      }
    })

    this.form().valueChanges.subscribe(async () => {
      this.update()
    });
  }

  update() {
    this.http.post<ListRow[]>(
      this.api.data,
      this.form().value,
    ).subscribe(resp => {
      this.data.set(resp);
    });
  }
}
