import { Id } from '../../../@shared/domain/value-object/IdValueObject';
import { Product } from '../../domain/entities/Product';

const product = new Product({
  id: new Id('1234567890'),
  name: 'Test product',
  description: 'Test product description',
  salesPrice: 10.0,
});

const MockRepository = () => ({
  findAll: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
});

describe('[Unit] FindProduct UseCase', () => {
  it('should be able to find a product', async () => {
    const repository = MockRepository();
    const useCase = new FindProductUseCase(repository);
    const input = { id: '1234567890' };
    const output = await useCase.execute(input);
    expect(repository.find).toHaveBeenCalled();
    expect(output).toEqual({
      id: '1234567890',
      name: 'Test product',
      description: 'Test product description',
      salesPrice: 10.0,
    });
  });
});
