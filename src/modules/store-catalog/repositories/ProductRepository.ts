import { Id } from '../../@shared/domain/value-object/IdValueObject';
import { Product } from '../domain/entities/Product';
import { IProductGateway } from '../gateway/IProduct.gateway';
import { ProductModel } from './model/Product.model';

export class ProductRepository implements IProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map(
      (product) =>
        new Product({
          id: new Id(product.id),
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        })
    );
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({
      where: {
        id,
      },
    });

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }
}
