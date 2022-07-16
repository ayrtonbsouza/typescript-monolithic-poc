import { Product } from '../domain/entities/Product';

export interface IProductGateway {
  findAll(): Promise<Product[]>;
  find(id: string): Promise<Product>;
}
