import { Id } from '../../../@shared/domain/value-object/IdValueObject';
import { Product } from '../../domain/entities/Product';
import { IProductGateway } from '../../gateway/IProduct.gateway';
import { IInputAddProductDto, IOutputAddProduct } from './dtos';

export class AddProductUseCase {
  private _productRepository: IProductGateway;

  constructor(_productRepository: IProductGateway) {
    this._productRepository = _productRepository;
  }

  async execute(input: IInputAddProductDto): Promise<IOutputAddProduct> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    };

    const product = new Product(props);
    this._productRepository.add(product);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
