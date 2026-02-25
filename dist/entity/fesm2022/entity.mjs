import * as i0 from '@angular/core';
import { signal, computed, effect, Injectable, inject, InjectionToken, makeEnvironmentProviders, input, Component } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ajax } from 'rxjs/internal/ajax/ajax';
import { map } from 'rxjs';
import * as i1$1 from '@angular/forms';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { DecimalPipe, JsonPipe, NgClass } from '@angular/common';
import { form, required, submit, Field } from '@angular/forms/signals';

class CalendarService {
    constructor(http) {
        this.http = http;
        this.year = signal(new Date().getFullYear().toString(), ...(ngDevMode ? [{ debugName: "year" }] : []));
        this.month = signal((new Date().getMonth() + 1).toString(), ...(ngDevMode ? [{ debugName: "month" }] : []));
        this.date = computed(() => {
            return this.year() + '-' + this.month().padStart(2, '0') + '-01';
        }, ...(ngDevMode ? [{ debugName: "date" }] : []));
        let calendarCookie = localStorage.getItem('calendar');
        if (calendarCookie !== null) {
            const calendar = calendarCookie.split('-');
            const date = new Date(parseInt(calendar[0]), parseInt(calendar[1]) - 1);
            this.year.set(date.getFullYear().toString());
            this.month.set((date.getMonth() + 1).toString());
        }
        effect(() => {
            localStorage.setItem('calendar', this.year() + '-' + this.month());
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.5", ngImport: i0, type: CalendarService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.0.5", ngImport: i0, type: CalendarService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.5", ngImport: i0, type: CalendarService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class Http {
    constructor() {
        this.config = inject(CONNECTION_SETTINGS);
    }
    send(urlPath, data = {}) {
        return ajax.post(this.config.domain + urlPath, data, { 'Content-Type': 'application/json' })
            .pipe(map(data => data.response));
    }
}
const CONNECTION_SETTINGS = new InjectionToken('CONNECTION_SETTINGS');
function providerServer(domain) {
    return makeEnvironmentProviders([{
            provide: CONNECTION_SETTINGS, useValue: {
                domain: domain,
            }
        },
        Http,
    ]);
}

class Table {
    constructor() {
        this.table = input(...(ngDevMode ? [undefined, { debugName: "table" }] : []));
        this.sort = signal({
            field: '',
            direction: '',
        }, ...(ngDevMode ? [{ debugName: "sort" }] : []));
    }
    getControl(form, control) {
        return form.get(control);
    }
    tblSort(field, defaultDirection = 'asc') {
        const form = this.table().form;
        const sort = form().get('sort')?.value;
        let direction = defaultDirection;
        if (sort.field === field) {
            direction = sort.direction === 'desc' ? 'asc' : 'desc';
        }
        form().patchValue({
            sort: {
                field: field,
                direction: direction,
            }
        });
        this.sort.set({
            field: field,
            direction: direction,
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.5", ngImport: i0, type: Table, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.0.5", type: Table, isStandalone: true, selector: "ent-table", inputs: { table: { classPropertyName: "table", publicName: "table", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"ent-table\">\r\n  <div class=\"header\">\r\n    @for (field of table()!.fields(); track field.field) {\r\n      @switch (field.filter) {\r\n        @case ('search') {\r\n          <div class=\"cell product\">\r\n            <i class=\"fa fa-magnifying-glass\"></i>\r\n            <input [formControl]=\"getControl(table()!.form(), field.field)\" placeholder=\"{{field.label}}\">\r\n          </div>\r\n        }\r\n        @case ('sort') {\r\n          <div class=\"cell sort\"\r\n               [class.active]  =\"sort().field === field.field\"\r\n               [class.desc]    =\"sort().field === field.field && sort().direction === 'desc'\"\r\n               (click)=\"tblSort(field.field)\"\r\n          >\r\n            {{field.label}} <i class=\"fa fa-arrow-down\"></i>\r\n          </div>\r\n        }\r\n        @default {\r\n          <div class=\"cell\">{{field.label}}</div>\r\n        }\r\n      }\r\n    }\r\n  </div>\r\n\r\n  <div class=\"body\">\r\n    @for (row of table()!.data(); track i; let i = $index) {\r\n      <div class=\"row\">\r\n\r\n      @for (field of table()!.fields(); track field.field) {\r\n        @switch (field.type) {\r\n          @case ('product') {\r\n            <div class=\"cell product\">\r\n              <div class=\"pic\" style=\"background-image: url({{row[field.field].image}})\"></div>\r\n              <div class=\"data\">\r\n                <div class=\"title\">{{row[field.field].name}}</div>\r\n                @if(row[field.field].size) {\r\n                  <div class=\"prop\">\u0440\u0430\u0437\u043C\u0435\u0440: {{row[field.field].size}}</div>\r\n                }\r\n                @if(row[field.field].color) {\r\n                  <div class=\"prop\">\u0446\u0432\u0435\u0442: {{row[field.field].color}}</div>\r\n                }\r\n                @if(row[field.field].stock) {\r\n                  <div class=\"prop\">\u0421\u043A\u043B\u0430\u0434: {{row[field.field].stock}}</div>\r\n                }\r\n              </div>\r\n            </div>\r\n          }\r\n          @case ('number') {\r\n            <div class=\"cell\"><div class=\"nbr\">{{row[field.field] | number: '.0': 'ru'}}</div></div>\r\n          }\r\n          @default {\r\n            <div class=\"cell\">{{row[field.field]}}</div>\r\n          }\r\n        }\r\n      }\r\n\r\n      </div>\r\n    } @empty {\r\n      <div class=\"empty\">\u041D\u0435\u0442 \u0437\u0430\u043F\u0438\u0441\u0435\u0439</div>\r\n    }\r\n  </div>\r\n</div>\r\n", styles: [".ent-table .cell{flex:0 150px;display:flex;justify-content:flex-end}.ent-table .cell:first-child{justify-content:space-between}.ent-table .cell:last-child{padding-right:10px}.ent-table .cell.product{flex:1}.ent-table .header{display:flex;justify-content:space-between;padding-bottom:18px;border-bottom:1px solid rgba(255,255,255,.1);-webkit-user-select:none;user-select:none}.ent-table .header .cell.product{justify-content:flex-start;align-items:center}.ent-table .header .cell.product i{margin-right:10px}.ent-table .header .cell.product input{font-size:15px;border:none;background:none;color:#fff}.ent-table .header .cell.product input::placeholder{color:#fff}.ent-table .header .cell.sort{cursor:pointer;vertical-align:center}.ent-table .header .cell.sort i{display:block;transition:transform ease .2s;line-height:22px;margin-left:8px}.ent-table .header .cell.sort.active,.ent-table .header .cell.sort.active i{font-weight:400}.ent-table .header .cell.sort.desc i{transform:rotate(180deg)}.ent-table .body .empty{text-align:center;padding:40px 15px 15px}.ent-table .body .row{position:relative;box-sizing:border-box;padding:18px 0;display:flex;border-bottom:1px solid rgba(255,255,255,.1);overflow:hidden;transition:all ease .3s}.ent-table .body .row :after{display:block;position:absolute;content:\"\";bottom:0;left:0;width:100%;height:1px;transition:all ease .3s;background:#25a09f;opacity:0}.ent-table .body .row:hover :after{opacity:100}.ent-table .body .row:hover{border-bottom:1px solid #25a09f;background:#ffffff0d}.ent-table .body .cell{align-items:center}.ent-table .body .cell.product{display:flex;justify-content:space-between}.ent-table .body .cell.product .pic{flex:0 60px;height:80px;background-size:contain;background-position:center;background-repeat:no-repeat;margin-right:25px}.ent-table .body .cell.product .data{flex:1}.ent-table .body .cell.product .data .title{font-size:15px;font-weight:400;margin-bottom:4px;padding-top:2px}.ent-table .body .cell.product .data .prop{font-size:13px;color:#d3d3d3}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: DecimalPipe, name: "number" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.5", ngImport: i0, type: Table, decorators: [{
            type: Component,
            args: [{ selector: 'ent-table', imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        DecimalPipe
                    ], standalone: true, template: "<div class=\"ent-table\">\r\n  <div class=\"header\">\r\n    @for (field of table()!.fields(); track field.field) {\r\n      @switch (field.filter) {\r\n        @case ('search') {\r\n          <div class=\"cell product\">\r\n            <i class=\"fa fa-magnifying-glass\"></i>\r\n            <input [formControl]=\"getControl(table()!.form(), field.field)\" placeholder=\"{{field.label}}\">\r\n          </div>\r\n        }\r\n        @case ('sort') {\r\n          <div class=\"cell sort\"\r\n               [class.active]  =\"sort().field === field.field\"\r\n               [class.desc]    =\"sort().field === field.field && sort().direction === 'desc'\"\r\n               (click)=\"tblSort(field.field)\"\r\n          >\r\n            {{field.label}} <i class=\"fa fa-arrow-down\"></i>\r\n          </div>\r\n        }\r\n        @default {\r\n          <div class=\"cell\">{{field.label}}</div>\r\n        }\r\n      }\r\n    }\r\n  </div>\r\n\r\n  <div class=\"body\">\r\n    @for (row of table()!.data(); track i; let i = $index) {\r\n      <div class=\"row\">\r\n\r\n      @for (field of table()!.fields(); track field.field) {\r\n        @switch (field.type) {\r\n          @case ('product') {\r\n            <div class=\"cell product\">\r\n              <div class=\"pic\" style=\"background-image: url({{row[field.field].image}})\"></div>\r\n              <div class=\"data\">\r\n                <div class=\"title\">{{row[field.field].name}}</div>\r\n                @if(row[field.field].size) {\r\n                  <div class=\"prop\">\u0440\u0430\u0437\u043C\u0435\u0440: {{row[field.field].size}}</div>\r\n                }\r\n                @if(row[field.field].color) {\r\n                  <div class=\"prop\">\u0446\u0432\u0435\u0442: {{row[field.field].color}}</div>\r\n                }\r\n                @if(row[field.field].stock) {\r\n                  <div class=\"prop\">\u0421\u043A\u043B\u0430\u0434: {{row[field.field].stock}}</div>\r\n                }\r\n              </div>\r\n            </div>\r\n          }\r\n          @case ('number') {\r\n            <div class=\"cell\"><div class=\"nbr\">{{row[field.field] | number: '.0': 'ru'}}</div></div>\r\n          }\r\n          @default {\r\n            <div class=\"cell\">{{row[field.field]}}</div>\r\n          }\r\n        }\r\n      }\r\n\r\n      </div>\r\n    } @empty {\r\n      <div class=\"empty\">\u041D\u0435\u0442 \u0437\u0430\u043F\u0438\u0441\u0435\u0439</div>\r\n    }\r\n  </div>\r\n</div>\r\n", styles: [".ent-table .cell{flex:0 150px;display:flex;justify-content:flex-end}.ent-table .cell:first-child{justify-content:space-between}.ent-table .cell:last-child{padding-right:10px}.ent-table .cell.product{flex:1}.ent-table .header{display:flex;justify-content:space-between;padding-bottom:18px;border-bottom:1px solid rgba(255,255,255,.1);-webkit-user-select:none;user-select:none}.ent-table .header .cell.product{justify-content:flex-start;align-items:center}.ent-table .header .cell.product i{margin-right:10px}.ent-table .header .cell.product input{font-size:15px;border:none;background:none;color:#fff}.ent-table .header .cell.product input::placeholder{color:#fff}.ent-table .header .cell.sort{cursor:pointer;vertical-align:center}.ent-table .header .cell.sort i{display:block;transition:transform ease .2s;line-height:22px;margin-left:8px}.ent-table .header .cell.sort.active,.ent-table .header .cell.sort.active i{font-weight:400}.ent-table .header .cell.sort.desc i{transform:rotate(180deg)}.ent-table .body .empty{text-align:center;padding:40px 15px 15px}.ent-table .body .row{position:relative;box-sizing:border-box;padding:18px 0;display:flex;border-bottom:1px solid rgba(255,255,255,.1);overflow:hidden;transition:all ease .3s}.ent-table .body .row :after{display:block;position:absolute;content:\"\";bottom:0;left:0;width:100%;height:1px;transition:all ease .3s;background:#25a09f;opacity:0}.ent-table .body .row:hover :after{opacity:100}.ent-table .body .row:hover{border-bottom:1px solid #25a09f;background:#ffffff0d}.ent-table .body .cell{align-items:center}.ent-table .body .cell.product{display:flex;justify-content:space-between}.ent-table .body .cell.product .pic{flex:0 60px;height:80px;background-size:contain;background-position:center;background-repeat:no-repeat;margin-right:25px}.ent-table .body .cell.product .data{flex:1}.ent-table .body .cell.product .data .title{font-size:15px;font-weight:400;margin-bottom:4px;padding-top:2px}.ent-table .body .cell.product .data .prop{font-size:13px;color:#d3d3d3}\n"] }]
        }], propDecorators: { table: [{ type: i0.Input, args: [{ isSignal: true, alias: "table", required: false }] }] } });

class List {
    constructor() {
        this.calendarService = inject(CalendarService);
        this.listModel = input(...(ngDevMode ? [undefined, { debugName: "listModel" }] : []));
        this.formModel = signal({
            name: '',
            sum: '',
        }, ...(ngDevMode ? [{ debugName: "formModel" }] : []));
        this.form = form(this.formModel, (schema) => {
            required(schema.name, { message: 'Обязательное поле' });
            required(schema.sum, { message: 'Обязательное поле' });
        });
        this.title = signal('', ...(ngDevMode ? [{ debugName: "title" }] : []));
        this.http = inject(HttpClient);
        effect(() => {
            this.calendarService.date();
            this.update();
        });
    }
    ngOnInit() {
        //this.update()
    }
    async onSubmit(event) {
        event.preventDefault();
        submit(this.form, async () => {
            const credentials = this.formModel();
            this.formModel.set({
                name: '',
                sum: '',
            });
            this.form.name().reset();
            this.form.sum().reset();
            const resp = await fetch(this.listModel().addUrl + '?json=' + JSON.stringify(Object.assign(credentials, {
                date: this.calendarService.date(),
            })));
            const data = await resp.json();
            this.update();
        });
    }
    async update() {
        this.http.post(this.listModel().listUrl, { date: this.calendarService.date() }).subscribe(resp => {
            this.listModel().data.set(resp);
        });
    }
    delRow(id) {
        this.http.post(this.listModel().listDel, { id: id }).subscribe(resp => {
            this.update();
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.5", ngImport: i0, type: List, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.0.5", type: List, isStandalone: true, selector: "ent-list", inputs: { listModel: { classPropertyName: "listModel", publicName: "listModel", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"list\">\r\n  <div class=\"header\"></div>\r\n\r\n  <div class=\"rows\">\r\n      @for (row of listModel()?.data(); track i; let i = $index) {\r\n        <div class=\"row\">\r\n          <div class=\"key\">{{row.name}}</div>\r\n          <div class=\"val {{row.sum >= 0 ? 'green' : 'red'}}\">{{row.sum | number: '.0': 'ru'}}</div>\r\n          <div class=\"btns\" (click)=\"delRow(row.id)\"><i class=\"fa fa-trash btn\"></i></div>\r\n        </div>\r\n      }\r\n  </div>\r\n  <div class=\"sum\">\r\n    <div class=\"key\">\u0418\u0442\u043E\u0433\u043E</div>\r\n    <div class=\"val {{listModel()!.sum() >= 0 ? 'green' : 'red'}}\">{{listModel()?.sum() | number: '.0': 'ru'}}</div>\r\n    <div class=\"btns\"></div>\r\n  </div>\r\n\r\n  <form class=\"form row\" (submit)=\"onSubmit($event)\">\r\n    <div class=\"key\">\r\n      <input class=\"std-input\" placeholder=\"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\"\r\n         [field]=\"form.name\"\r\n         [class]=\"{'error': form.name().touched() && form.name().invalid()}\">\r\n    </div>\r\n    <div class=\"val red\">\r\n      <input class=\"std-input\" placeholder=\"\u0421\u0443\u043C\u043C\u0430\"\r\n         [field]=\"form.sum\"\r\n         [class]=\"{'error': form.sum().touched() && form.sum().invalid()}\">\r\n    </div>\r\n    <div class=\"btns\">\r\n      <button type=\"submit\"><i class=\"fa fa-plus btn\"></i></button>\r\n    </div>\r\n  </form>\r\n</div>\r\n", styles: [":host{width:100%;display:block}.header{font-size:22px;padding-bottom:13px;-webkit-user-select:none;user-select:none;border-bottom:1px solid rgba(255,255,255,.1);margin-bottom:10px}.row,.sum{display:flex;width:100%;justify-content:space-between;align-items:center;font-size:16px}:is(.row,.sum) .key{flex:9999;margin-right:20px}:is(.row,.sum) .val{flex:120px;width:120px;text-align:right;font-weight:400}:is(.row,.sum) .btns{margin-left:10px;width:20px;flex:20px;text-align:right}:is(.row,.sum) .btns i{font-weight:400}.rows .row,.sum{border-bottom:1px solid rgba(255,255,255,.1);padding:14px 0}.form{margin-top:35px}\n"], dependencies: [{ kind: "directive", type: Field, selector: "[field]", inputs: ["field"] }, { kind: "pipe", type: DecimalPipe, name: "number" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.5", ngImport: i0, type: List, decorators: [{
            type: Component,
            args: [{ selector: 'ent-list', imports: [
                        Field,
                        JsonPipe,
                        NgClass,
                        DecimalPipe
                    ], standalone: true, template: "<div class=\"list\">\r\n  <div class=\"header\"></div>\r\n\r\n  <div class=\"rows\">\r\n      @for (row of listModel()?.data(); track i; let i = $index) {\r\n        <div class=\"row\">\r\n          <div class=\"key\">{{row.name}}</div>\r\n          <div class=\"val {{row.sum >= 0 ? 'green' : 'red'}}\">{{row.sum | number: '.0': 'ru'}}</div>\r\n          <div class=\"btns\" (click)=\"delRow(row.id)\"><i class=\"fa fa-trash btn\"></i></div>\r\n        </div>\r\n      }\r\n  </div>\r\n  <div class=\"sum\">\r\n    <div class=\"key\">\u0418\u0442\u043E\u0433\u043E</div>\r\n    <div class=\"val {{listModel()!.sum() >= 0 ? 'green' : 'red'}}\">{{listModel()?.sum() | number: '.0': 'ru'}}</div>\r\n    <div class=\"btns\"></div>\r\n  </div>\r\n\r\n  <form class=\"form row\" (submit)=\"onSubmit($event)\">\r\n    <div class=\"key\">\r\n      <input class=\"std-input\" placeholder=\"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\"\r\n         [field]=\"form.name\"\r\n         [class]=\"{'error': form.name().touched() && form.name().invalid()}\">\r\n    </div>\r\n    <div class=\"val red\">\r\n      <input class=\"std-input\" placeholder=\"\u0421\u0443\u043C\u043C\u0430\"\r\n         [field]=\"form.sum\"\r\n         [class]=\"{'error': form.sum().touched() && form.sum().invalid()}\">\r\n    </div>\r\n    <div class=\"btns\">\r\n      <button type=\"submit\"><i class=\"fa fa-plus btn\"></i></button>\r\n    </div>\r\n  </form>\r\n</div>\r\n", styles: [":host{width:100%;display:block}.header{font-size:22px;padding-bottom:13px;-webkit-user-select:none;user-select:none;border-bottom:1px solid rgba(255,255,255,.1);margin-bottom:10px}.row,.sum{display:flex;width:100%;justify-content:space-between;align-items:center;font-size:16px}:is(.row,.sum) .key{flex:9999;margin-right:20px}:is(.row,.sum) .val{flex:120px;width:120px;text-align:right;font-weight:400}:is(.row,.sum) .btns{margin-left:10px;width:20px;flex:20px;text-align:right}:is(.row,.sum) .btns i{font-weight:400}.rows .row,.sum{border-bottom:1px solid rgba(255,255,255,.1);padding:14px 0}.form{margin-top:35px}\n"] }]
        }], ctorParameters: () => [], propDecorators: { listModel: [{ type: i0.Input, args: [{ isSignal: true, alias: "listModel", required: false }] }] } });

class ListModel {
    constructor(addUrl, listUrl, listDel) {
        this.addUrl = addUrl;
        this.listUrl = listUrl;
        this.listDel = listDel;
        this.calendarService = inject(CalendarService);
        this.http = inject(HttpClient);
        this.data = signal([], ...(ngDevMode ? [{ debugName: "data" }] : []));
        this.sum = computed(() => {
            let sum = 0;
            this.data().forEach(function (row) {
                sum += row.sum;
            });
            return sum;
        }, ...(ngDevMode ? [{ debugName: "sum" }] : []));
    }
    async update() {
        this.http.post(this.listUrl, { date: this.calendarService.date() }).subscribe(resp => {
            this.data.set(resp);
        });
    }
}

class TableModel {
    constructor(cacheName, updateUrl, fields) {
        this.http = inject(HttpClient);
        this.cacheName = '';
        this.api = {
            data: '' //Table Data update
        };
        this.data = signal([], ...(ngDevMode ? [{ debugName: "data" }] : []));
        this.fields = signal([], ...(ngDevMode ? [{ debugName: "fields" }] : []));
        this.form = signal(new UntypedFormGroup({}), ...(ngDevMode ? [{ debugName: "form" }] : []));
        this.cacheName = cacheName;
        this.api.data = updateUrl;
        this.fields.set(fields);
        this.intForm();
        this.initCache();
        this.update();
    }
    initCache() {
        let key = this.cacheName;
        let storage = {};
        try {
            storage = JSON.parse(localStorage.getItem('DCakeTable') ?? '');
        }
        catch (e) {
            storage = {};
        }
        if (!storage.hasOwnProperty(key) || !storage[key].hasOwnProperty('sort')) {
            console.log('asda');
            storage[key] = { sort: {} };
        }
        // @ts-ignore
        this.form().patchValue({ sort: storage[key].sort });
        this.form().valueChanges.subscribe(async (value) => {
            // @ts-ignore
            storage[key].sort = value.sort;
            localStorage.setItem('DCakeTable', JSON.stringify(storage));
        });
    }
    intForm() {
        this.form.set(new UntypedFormGroup({
            sort: new UntypedFormGroup({
                field: new UntypedFormControl(''),
                direction: new UntypedFormControl(''),
            })
        }));
        this.fields().forEach(field => {
            if (field.filter === 'search') {
                this.form().addControl(field.field, new UntypedFormControl('', []));
            }
        });
        this.form().valueChanges.subscribe(async () => {
            this.update();
        });
    }
    update() {
        this.http.post(this.api.data, this.form().value).subscribe(resp => {
            this.data.set(resp);
        });
    }
}

class TableField {
    constructor(field, label, type = 'string', //product | number
    filter = '') {
        this.field = field;
        this.label = label;
        this.type = type;
        this.filter = filter;
    }
}

/*
 * Public API Surface of entity
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CONNECTION_SETTINGS, CalendarService, Http, List, ListModel, Table, TableField, TableModel, providerServer };
//# sourceMappingURL=entity.mjs.map
