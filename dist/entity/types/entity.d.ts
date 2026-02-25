import * as _angular_core from '@angular/core';
import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UntypedFormGroup, FormControl } from '@angular/forms';
import * as _angular_forms_signals from '@angular/forms/signals';

declare class CalendarService {
    private http;
    year: _angular_core.WritableSignal<string>;
    month: _angular_core.WritableSignal<string>;
    date: _angular_core.Signal<string>;
    constructor(http: HttpClient);
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CalendarService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<CalendarService>;
}

declare class Http {
    protected config: connectionSettings;
    constructor();
    send<T>(urlPath: string, data?: object): Observable<T>;
}
interface connectionSettings {
    domain: string;
}
declare const CONNECTION_SETTINGS: InjectionToken<connectionSettings>;
declare function providerServer(domain: string): _angular_core.EnvironmentProviders;

declare class TableField {
    field: string;
    label: string;
    type: string;
    filter: string;
    constructor(field: string, label: string, type?: string, //product | number
    filter?: string);
}

declare class TableModel {
    private http;
    cacheName: string;
    api: {
        data: string;
    };
    data: _angular_core.WritableSignal<any[] | string[]>;
    fields: _angular_core.WritableSignal<TableField[]>;
    constructor(cacheName: string, updateUrl: string, fields: TableField[]);
    initCache(): void;
    form: _angular_core.WritableSignal<UntypedFormGroup>;
    private intForm;
    update(): void;
}

declare class Table {
    table: _angular_core.InputSignal<TableModel | undefined>;
    sort: _angular_core.WritableSignal<{
        field: string;
        direction: string;
    }>;
    getControl(form: UntypedFormGroup, control: string): FormControl;
    tblSort(field: string, defaultDirection?: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Table, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<Table, "ent-table", never, { "table": { "alias": "table"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class ListRow {
    id: number;
    name: string;
    sum: number;
    constructor(id: number, name: string, sum: number);
}

declare class ListModel {
    addUrl: string;
    listUrl: string;
    listDel: string;
    private calendarService;
    private http;
    data: _angular_core.WritableSignal<ListRow[]>;
    sum: _angular_core.Signal<number>;
    constructor(addUrl: string, listUrl: string, listDel: string);
    update(): Promise<void>;
}

declare class List {
    calendarService: CalendarService;
    listModel: _angular_core.InputSignal<ListModel | undefined>;
    formModel: _angular_core.WritableSignal<{
        name: string;
        sum: string;
    }>;
    form: _angular_forms_signals.FieldTree<{
        name: string;
        sum: string;
    }, string | number>;
    title: _angular_core.WritableSignal<string>;
    private http;
    constructor();
    ngOnInit(): void;
    onSubmit(event: Event): Promise<void>;
    update(): Promise<void>;
    delRow(id: number): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<List, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<List, "ent-list", never, { "listModel": { "alias": "listModel"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { CONNECTION_SETTINGS, CalendarService, Http, List, ListModel, Table, TableField, TableModel, providerServer };
export type { connectionSettings };
