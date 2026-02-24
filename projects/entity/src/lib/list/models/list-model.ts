import {computed, inject, signal} from '@angular/core';
import {ListRow} from './list-row';
import {CalendarService} from '../../calendar/calendar.service';
import {HttpClient} from '@angular/common/http';

export class ListModel {
  private calendarService = inject(CalendarService);
  private http = inject(HttpClient);

  data = signal<ListRow[]>([]);
  sum = computed(() => {
    let sum = 0;
    this.data().forEach(function(row) {
      sum += row.sum;
    });
    return sum;
  })

  constructor(public addUrl: string, public listUrl: string, public listDel: string) {}

  async update() {
    this.http.post<ListRow[]>(
      this.listUrl,
      {date: this.calendarService.date()},
    ).subscribe(resp => {
      this.data.set(resp);
    });
  }
}
