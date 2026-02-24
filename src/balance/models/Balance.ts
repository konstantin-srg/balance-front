/*export interface IProduct {
  id?: number,
  name?: string,
  img?: string,
  size?: string,
  color?: string,
  pack?: string,
  price?: number,
  //boxCapacity?: number,
}*/

export default class Balance {
  constructor(
    public products:number,
    public bank:number,
    public credits:number,
    public summary:number
  ){}
}
