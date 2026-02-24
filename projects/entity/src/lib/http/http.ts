import {ajax} from "rxjs/internal/ajax/ajax";
import {map, Observable} from "rxjs";
import {inject, InjectionToken, makeEnvironmentProviders} from "@angular/core";

export class Http {
  protected config: connectionSettings;

  constructor() {
    this.config = inject(CONNECTION_SETTINGS);
  }

  send<T>(urlPath: string, data: object = {}): Observable<T> {
    return ajax.post<T>(
      this.config.domain + urlPath,
      data,
      { 'Content-Type': 'application/json' }
    )
    .pipe(map(data => data.response as T))
  }
}

export interface connectionSettings {
  domain: string;
}

export const CONNECTION_SETTINGS = new InjectionToken<connectionSettings>('CONNECTION_SETTINGS');

export function providerServer(domain: string) {

  return makeEnvironmentProviders([{
      provide: CONNECTION_SETTINGS, useValue: {
        domain: domain,
      }
    },
    Http,
  ]);
}
