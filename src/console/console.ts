import {Component, ComponentRef, inject, signal, viewChild, ViewContainerRef, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ConsoleRow} from './console-row/console-row';
import {ConsoleRequest} from './models/ConsoleRequest';
import {MAT_DIALOG_DATA, MatDialogClose} from '@angular/material/dialog';
import {ConsoleResponse} from './models/ConsoleResponse';
import {CalendarService} from '../../projects/entity/src/lib/calendar/calendar.service';
import {env} from '../env/env';

@Component({
  selector: 'app-sync',
  imports: [
    MatDialogClose
  ],
  standalone: true,
  templateUrl: './console.html',
  styleUrl: './console.scss'
})

export class Console {
  calendarService = inject(CalendarService);
  env = env;
  consoleScroll = viewChild('console', {read: ViewContainerRef});
  consoleContent = viewChild('consoleContent', {read: ViewContainerRef});
  data = inject(MAT_DIALOG_DATA);


  private asd: mapRow[] = [];

  constructor(
    private http: HttpClient) {
  }

  ngOnInit() {
    this.load();
  }

  async load() {
    let rowData = {
      map: {name: 'Загрузка карты обновлений', url: this.data.url, params: {map: this.data.map} as Record<string, string>,},
      steps: [],
      resolve: false
    } as mapRow;

    let row = this.addRow(rowData.map.name, this.url(rowData));

    const task = (i: number) => new Promise(resolve =>
      setTimeout(() => {
        console.log(i)
        resolve(i)
      }, 1000)
    );

    let maps = await new Promise<ConsoleResponse>((resolve, reject) => {
      this.http.post<ConsoleResponse>(this.url(rowData, true), rowData.map.params).subscribe(resp => {
        resolve(resp)
      })
    }).then<mapRow[]>((consResp) => {
      rowData.steps.push(consResp)

      row?.setInput('responses', rowData.steps.reduce((p: ConsoleResponse[], c) => {
        p.push(c)
        return p
      }, []));

      let maps: mapRow[] = [];

      for (const res of consResp.result) {
        maps.push(new mapRow(
          {
            name: res.name,
            url: res.url,
            params: {map: res.map} as Record<string,any>
          }))
      }

      return maps
    })


    maps.reduce((p, c) =>
      p.then((): Promise<any> => {
        console.log(c)
        //return this.sync(c.map.name, c.map.url, Object.assign({map: c.map.map}, this.data.data))
        return this.sync(c)
      })
    , Promise.resolve()).then(() => this.addRow('Все запросы выполнены'))

    return true;
  }

  /*async execute()
  {
    await this.asd
      .filter(c => !c.resolve)
      .reduce((p, c) =>
        p.then((): Promise<any> => {
          return this.sync(c)
        })
      , Promise.resolve())
      .then(() => {
        this.addRow('Все запросы выполнены');
        return true;
    });

    return false;
  }*/

  protected url(row: mapRow, post: boolean = false) {
    return env.apiRoot + row.map.url + (!post ? '?json=' + JSON.stringify(row.map.params) : '')
  }

  async sync(rowData: mapRow){
    console.log(rowData)
    rowData.map.params['date'] = this.calendarService.date();

    const row = this.addRow(rowData.map.name, this.url(rowData));

    //request.map.data['date'] = this.calendarService.date();

    let result = {};
    let page = 1;

    const request = (rowData: mapRow) => new Promise(resolve => {
      this.http.post<any>(this.url(rowData, true), rowData.map.params).subscribe(resp => {
        resolve(resp)
      })
    });

    await (async function loop(rowData: mapRow) {
      if(rowData.resolve && page < 4) return;
      rowData.map.params['page'] = (page++).toString();

      await request(rowData).then((resp: any) => {
        console.log(resp)
        rowData.resolve = resp.continue !== true;

        let consResp = new ConsoleResponse()

        consResp.status = resp.status
        consResp.processed = resp.processed
        consResp.time = resp.time
        consResp.warnings = resp.warnings
        consResp.errors = resp.errors
        consResp.info = resp.info

        rowData.steps.push(consResp)
      });
    })(rowData);

    row?.setInput('responses', rowData.steps);

    return true;
  }

  addRow(header: string, url: string = '') {
    const row = this.consoleContent()?.createComponent(ConsoleRow);
    const req = new ConsoleRequest();

    req.header = header;
    req.link = url;

    row?.setInput('request', req);

    return row;
  }
}

class mapRow {
  constructor(
    public map: {
      name: string,
      url: string,
      params: {[key: string | number | symbol]: unknown;}
    } = {name: '', url: '', params: {} as Record<string, any>,},
    public steps: ConsoleResponse[] = [],
    public resolve: boolean = false
  ) {}

  //map!: {name: string, url: string, params: Record<string,string | number>}
}
