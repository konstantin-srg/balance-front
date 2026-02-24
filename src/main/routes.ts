import { Routes } from '@angular/router';
import {Balance} from '../balance/balance';
import {Stock} from '../stock/stock';
import {Flow} from '../flow/flow';

export const routes: Routes = [
  {
    path: '',
    component: Balance,
  },
  {
    path: 'balance',
    component: Balance,
  },
  {
    path: 'flow',
    component: Flow,
  },
  {
    path: 'stock',
    component: Stock,
  },
];
