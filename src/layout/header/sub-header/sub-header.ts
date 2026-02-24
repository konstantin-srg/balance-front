import {Component, inject} from '@angular/core';
import {HeaderService} from '../header.service';
import {Indent} from '../../helpers/indent/indent';

@Component({
  selector: 'app-sub-header',
  imports: [
    Indent
  ],
  standalone: true,
  templateUrl: './sub-header.html',
  styleUrl: './sub-header.scss'
})
export class SubHeader {
  private headerService = inject(HeaderService);

  ngOnInit() {
    this.headerService.marginTop.set(55);
  }

  ngOnDestroy() {
    this.headerService.marginTop.set(0);
  }
}
