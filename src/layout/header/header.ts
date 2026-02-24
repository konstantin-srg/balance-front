import {Component, computed, effect, inject, signal} from '@angular/core';
import {Nav} from '../nav/nav';
import {Indent} from '../helpers/indent/indent';
import {HeaderService} from './header.service';
import {CalendarService} from 'entity';

@Component({
  selector: 'app-header',
  imports: [
    Nav,
    Indent,
  ],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private calendarService = inject(CalendarService);
  private headerService = inject(HeaderService);
  protected headerHeight  = 75;
  margin = computed(() => this.headerHeight + this.headerService.marginTop());

  years:{value: string, icon: string}[]  = [];
  months:{value: string, icon: string}[]  = [];

  month = signal<string>(this.calendarService.month());
  year = signal<string>(this.calendarService.year());

  constructor() {
    this.months = [
      {value: '1', icon: 'Январь'},
      {value: '2', icon: 'Фкевраль'},
      {value: '3', icon: 'Март'},
      {value: '4', icon: 'Апрель'},
      {value: '5', icon: 'Май'},
      {value: '6', icon: 'Июнь'},
      {value: '7', icon: 'Июль'},
      {value: '8', icon: 'Август'},
      {value: '9', icon: 'Сентярбрь'},
      {value: '10', icon: 'Октябрь'},
      {value: '11', icon: 'Ноябрь'},
      {value: '12', icon: 'Декабрь'},
    ];

    let curYear = new Date().getFullYear();
    for (let y = curYear - 5; y <= curYear; y++) {
      this.years.push({value: y.toString(), icon: y.toString()});
    }

    effect(() => {
      this.calendarService.year.set(this.year());
      this.calendarService.month.set(this.month());
    });
  }

  setYear(event: Event) {
    this.calendarService.year.set((event.target as HTMLSelectElement).value)
  }

  setMonth(event: Event) {
    this.calendarService.month.set((event.target as HTMLSelectElement).value)
  }
}
