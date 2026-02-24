import { Component } from '@angular/core';
import {Header} from './header/header';
import {Footer} from './footer/footer';
import {Content} from './content/content';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, Content],
  standalone: true,
  templateUrl: './layout.html',
})
export class Layout {

}
