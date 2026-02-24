export class ConsoleResponse {
  constructor(
    public message: string = '',
    //public loading: string = 'loading',
    public status: string = 'waiting',
    public page: number = 0,
  ) {}

  result?: any;
  //message?:string;
  //loading?:string;
  //status?: string;
  processed?: string;
  time?: string;
  errors?: string[] = [];
  warnings?: string[] = [];
  info?: string[] = [];
  //page: number = 0;
}
