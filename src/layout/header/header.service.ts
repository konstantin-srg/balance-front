import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  marginTop = signal<number>(0);
}
