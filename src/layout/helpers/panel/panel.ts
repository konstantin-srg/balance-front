import { Component } from '@angular/core';
import {Indent} from '../indent/indent';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    Indent
  ],
  templateUrl: './panel.html',
  styleUrl: './panel.scss'
})
export class Panel {

}
