import { Product } from '../domain/entities/Product';
import { IProductGateway } from '../gateway/IProduct.gateway';
import { ProductModel } from './model/Product.model';

export class ProductRepository implements IProductGateway {
  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async find(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
}
