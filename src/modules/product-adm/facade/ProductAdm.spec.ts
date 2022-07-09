import { Sequelize } from 'sequelize-typescript';
import { ProductAdmFacadeFactory } from '../factories/FacadeFactory';
import { ProductModel } from '../repositories/model/Product.model';
import { ProductRepository } from '../repositories/ProductRepository';
import { AddProductUseCase } from '../usecase/AddProduct/AddProduct';
import { ProductAdmFacade } from './ProductAdm';

describe('ProductAdm Facade', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able to create a product', async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: '1234567890',
      name: 'Test Product',
      description: 'Test Product Description',
      purchasePrice: 10,
      stock: 10,
    };

    await productFacade.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: input.id } });

    expect(product).toBeDefined();
    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.purchasePrice).toBe(input.purchasePrice);
    expect(product.stock).toBe(input.stock);
  });
});
