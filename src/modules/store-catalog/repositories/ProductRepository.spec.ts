import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from './model/Product.model';
import { ProductRepository } from './ProductRepository';

describe('[Unit] ProductRepository', () => {
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

  it('should be able to find all products', async () => {
    await ProductModel.create({
      id: '1234567890',
      name: 'Test Product',
      description: 'Test Product Description',
      salesPrice: 10.0,
    });

    await ProductModel.create({
      id: '1234567891',
      name: 'Test Product',
      description: 'Test Product Description',
      salesPrice: 20.0,
    });

    const productRepository = new ProductRepository();
    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id.id).toBe('1234567890');
    expect(products[1].id.id).toBe('1234567891');
    expect(products[0].name).toBe('Test Product');
    expect(products[1].name).toBe('Test Product');
    expect(products[0].description).toBe('Test Product Description');
    expect(products[1].description).toBe('Test Product Description');
    expect(products[0].salesPrice).toBe(10.0);
    expect(products[1].salesPrice).toBe(20.0);
  });
});
