import { Id } from '../../../@shared/domain/value-object/IdValueObject';
import { Product } from '../../domain/entities/Product';
import { CheckStockUseCase } from './CheckStock';

const product = new Product({
  id: new Id('1234567890'),
  name: 'Test Product',
  description: 'Test Product Description',
  purchasePrice: 10,
  stock: 10,
});

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
});

describe('[Unit] CheckStock UseCase', () => {
  it('should be able to check stock', async () => {
    const productRepository = MockRepository();
    const useCase = new CheckStockUseCase(productRepository);
    const input = {
      productId: '1234567890',
    };
    const output = await useCase.execute(input);
    expect(productRepository.find).toHaveBeenCalled();
    expect(output.productId).toBe(input.productId);
    expect(output.stock).toBe(product.stock);
  });
});
