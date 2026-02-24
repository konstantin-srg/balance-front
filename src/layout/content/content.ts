import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Balance} from '../../balance/balance';
import {Stock} from '../../stock/stock';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-content',
  imports: [
    RouterOutlet
  ],
  templateUrl: './content.html',
  standalone: true,
  styleUrl: './content.scss'
})
export class Content {
}
