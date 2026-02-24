import {Product} from './product';
import {Cluster} from './cluster';
import {Stock} from './stock';

export class StockTable {
  clusters?: Cluster[];
  stock?: {
    product: Product,
    stock: Stock[],
  }[];
}
