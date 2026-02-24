import {computed, effect, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class CalendarService {
  year  = signal<string>(new Date().getFullYear().toString());
  month = signal<string>((new Date().getMonth() + 1).toString());

  date = computed(() => {
    return this.year() + '-' + this.month().padStart(2, '0') + '-01';
  });

  constructor(private http: HttpClient) {

    let calendarCookie = localStorage.getItem('calendar');

    if(calendarCookie !== null) {
      const calendar = calendarCookie.split('-');
       const date = new Date(parseInt(calendar[0]), parseInt(calendar[1]) - 1);

      this.year.set(date.getFullYear().toString());
      this.month.set((date.getMonth() + 1).toString());
    }

    effect(() => {
      localStorage.setItem('calendar',this.year() + '-' + this.month());
    });
  }
}
