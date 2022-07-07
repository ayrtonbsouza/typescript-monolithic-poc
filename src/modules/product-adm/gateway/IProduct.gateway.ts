import { Product } from '../domain/entities/Product';

export interface IProductGateway {
  add(product: Product): Promise<void>;
  find(id: string): Promise<Product>;
}
