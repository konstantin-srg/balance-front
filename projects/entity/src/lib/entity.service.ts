import { Injectable } from '@angular/core';
import {Http} from "./http/http";

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  constructor(private http: Http) {

  }
}
