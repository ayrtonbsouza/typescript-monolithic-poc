import { Id } from '../../../@shared/domain/value-object/IdValueObject';
import { Product } from '../../domain/entities/Product';

const firstProduct = new Product({
  id: new Id('1234567890'),
  name: 'Test product',
  description: 'Test description',
  salesPrice: 10.0,
});

const secondProduct = new Product({
  id: new Id('1234567891'),
  name: 'Test product 2',
  description: 'Test description 2',
  salesPrice: 20.0,
});

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest
    .fn()
    .mockReturnValue(Promise.resolve([firstProduct, secondProduct])),
});

describe('[Unit] FindAllProducts UseCase', () => {
  it('should be able to find all products', async () => {
    const productRepository = MockRepository();
    const usecase = new FindAllProductsUseCase(productRepository);

    const output = await usecase.execute();

    expect(productRepository.findAll).toHaveBeenCalled();
    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(firstProduct.id);
    expect(output.products[1].id).toBe(secondProduct.id);
    expect(output.products[0].name).toBe(firstProduct.name);
    expect(output.products[1].name).toBe(secondProduct.name);
    expect(output.products[0].description).toBe(firstProduct.description);
    expect(output.products[1].description).toBe(secondProduct.description);
    expect(output.products[0].salesPrice).toBe(firstProduct.salesPrice);
    expect(output.products[1].salesPrice).toBe(secondProduct.salesPrice);
  });
});
