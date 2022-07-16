import { IProductGateway } from '../../gateway/IProduct.gateway';
import { IInputCheckStockDto, IOutputCheckStockDto } from './dtos';

export class CheckStockUseCase {
  private _productRepository: IProductGateway;

  constructor(productRepository: IProductGateway) {
    this._productRepository = productRepository;
  }

  async execute(input: IInputCheckStockDto): Promise<IOutputCheckStockDto> {
    const product = await this._productRepository.find(input.productId);
    return {
      productId: product.id.id,
      stock: product.stock,
    };
  }
}
