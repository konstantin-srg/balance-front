export class TableField {
  constructor(
    public field: string,
    public label: string,
    public type: string = 'string', //product | number
    public filter: string = ''
  ) {}
}
