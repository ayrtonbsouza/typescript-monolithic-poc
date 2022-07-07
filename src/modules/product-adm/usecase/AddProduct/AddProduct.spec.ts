import { AddProductUseCase } from './AddProduct';

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn(),
});

describe('[Unit] AddProduct UseCase', () => {
  it('should be able to add a product', async () => {
    const productRepository = MockRepository();
    const useCase = new AddProductUseCase(productRepository);
    const input = {
      name: 'Test Product',
      description: 'Test Product Description',
      purchasePrice: 100,
      stock: 10,
    };
    const output = await useCase.execute(input);
    expect(productRepository.add).toHaveBeenCalled();
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.description).toBe(input.description);
    expect(output.purchasePrice).toBe(input.purchasePrice);
    expect(output.stock).toBe(input.stock);
  });
});
