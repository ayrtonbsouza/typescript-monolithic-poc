import { IProductGateway } from '../../gateway/IProduct.gateway';
import { IInputFindProductDto, IOutputFindProductDto } from './dtos';

export class FindProductUseCase {
  constructor(private readonly repository: IProductGateway) {}

  async execute(input: IInputFindProductDto): Promise<IOutputFindProductDto> {
    const product = await this.repository.find(input.id);
    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
}
