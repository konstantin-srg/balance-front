import {Component, input, Input, InputSignal} from '@angular/core';
import {iNavItem} from './interfaces/iNavItem';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav-item.html',
  styleUrl: './nav-item.scss'
})
export class NavItem {
  navItem = input<iNavItem>();
}

