import {Component, effect, inject, input, signal} from '@angular/core';
import {ListModel} from './models/list-model';
import {form, Field, required, submit} from '@angular/forms/signals'
import {DecimalPipe, JsonPipe, NgClass} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {CalendarService} from '../calendar/calendar.service';
import {ListRow} from './models/list-row';

@Component({
  selector: 'ent-list',
  imports: [
    Field,
    JsonPipe,
    NgClass,
    DecimalPipe
  ],
  templateUrl: './list.html',
  standalone: true,
  styleUrl: './list.css'
})

export class List {
  calendarService = inject(CalendarService);
  listModel = input<ListModel>();
  formModel = signal({
    name: '',
    sum: '',
  });

  form = form(this.formModel, (schema) => {
    required(schema.name, {message: 'Обязательное поле'}, )
    required(schema.sum, {message: 'Обязательное поле'})
  })

  title = signal<string>('');
  private http = inject(HttpClient);

  constructor() {
    effect(() => {
      this.calendarService.date()
      this.update();
    })
  }

  ngOnInit() {
    //this.update()
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    submit(this.form, async () => {
      const credentials = this.formModel();

      this.formModel.set({
        name: '',
        sum: '',
      });

      this.form.name().reset();
      this.form.sum().reset();

      const resp = await fetch(this.listModel()!.addUrl + '?json=' + JSON.stringify(Object.assign(credentials, {
        date: this.calendarService.date(),
      })))
      const data: any[] = await resp.json();
      this.update();
    });
  }

  async update() {
    this.http.post<ListRow[]>(
      this.listModel()!.listUrl,
      {date: this.calendarService.date()},
    ).subscribe(resp => {
      this.listModel()!.data.set(resp);
    });
  }

  delRow(id: number) {
    this.http.post<ListRow[]>(
      this.listModel()!.listDel,
      {id: id},
    ).subscribe(resp => {
      this.update();
    });
  }
}

