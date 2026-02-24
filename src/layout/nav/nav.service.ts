import {Injectable, Input} from '@angular/core';
import {iNavItem} from './nav-item/interfaces/iNavItem';

@Injectable({
  providedIn: 'root'
})

export class NavService {
  protected navItems: iNavItem[] = [
    {
      name: 'Главная',
      route: '',
    },
    {
      name: 'Баланс',
      route: 'balance',
    },
    {
      name: 'Финансы',
      route: 'flow',
    },
    {
      name: 'Склады',
      route: 'stock',
    },
  ];

  public getNavItems() : iNavItem[] {
    return this.navItems;
  }

  constructor() { }
}
