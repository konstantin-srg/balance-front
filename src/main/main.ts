import { Component } from '@angular/core';
import {Layout} from '../layout/layout';
import {RouterLink} from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu, 'ru');

@Component({
  selector: 'app-main',
  imports: [Layout],
  standalone: true,
  templateUrl: './main.html',
})
export class Main {

}
