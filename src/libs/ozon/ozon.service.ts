import {effect, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {env} from '../../env/env';

interface RespOzonAccounts {
  id: number;
  name: string;
}

@Injectable({providedIn: 'root'})

export class OzonService {
  env = env;

  accounts = signal<RespOzonAccounts[]>([]);
  accountId = signal<number>(0);

  constructor(private http: HttpClient)  {
    const cacheKey = "ozon_api";

    const accountId = localStorage.getItem(cacheKey);

    this.accountId.set(accountId !== null ? parseInt(accountId) : 0);

    this.http.post<RespOzonAccounts[]>(this.env.apiRoot + '/ozon/accounts/list', {}).subscribe(resp => {
      this.accounts.set(resp);

      if(this.accountId() === 0) {
        this.accountId.set(resp[0].id);
      }
    });

    effect(() => {
      if(this.accountId() !== 0) {
        localStorage.setItem(cacheKey, this.accountId().toString());
      }
    });
  }

  setId(e: Event) {
    this.accountId.set(parseInt((e.target as HTMLSelectElement).value))
  }
}
