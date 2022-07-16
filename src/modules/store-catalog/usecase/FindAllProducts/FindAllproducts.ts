import { IUseCase } from '../../../@shared/usecase/IUseCase';
import { IProductGateway } from '../../gateway/IProduct.gateway';
import { IOutputFindAllProductsDto } from './dtos';

export class FindAllProductsUseCase implements IUseCase {
  constructor(private productRepository: IProductGateway) {}

  async execute(): Promise<IOutputFindAllProductsDto> {
    const products = await this.productRepository.findAll();
    return {
      products: products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
