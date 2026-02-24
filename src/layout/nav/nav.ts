import {Component, inject} from '@angular/core';
import {NavItem} from "./nav-item/nav-item";
import {NavService} from "./nav.service";
import {iNavItem} from './nav-item/interfaces/iNavItem';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    NavItem,
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})

export class Nav {
  mainNavService: NavService = inject(NavService);

  navItems:iNavItem[] = [];


  constructor() {
    this.navItems = this.mainNavService.getNavItems();
  }
}
