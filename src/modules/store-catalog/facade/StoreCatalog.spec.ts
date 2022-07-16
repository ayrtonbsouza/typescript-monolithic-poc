import { Sequelize } from 'sequelize-typescript';
import { StoreCatalogFacadeFactory } from '../factories/FacadeFactory';
import { ProductModel } from '../repositories/model/Product.model';

describe('[Unit] StoreCatalog Facade', () => {
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

  it('should be able to find a product', async () => {
    const facade = StoreCatalogFacadeFactory.create();
    await ProductModel.create({
      id: '1234567890',
      name: 'Test Product',
      description: 'Test Product Description',
      salesPrice: 10.0,
    });
    const output = await facade.find({ id: '1234567890' });
    expect(output).toBeDefined();
    expect(output.id).toBe('1234567890');
    expect(output.name).toBe('Test Product');
    expect(output.description).toBe('Test Product Description');
    expect(output.salesPrice).toBe(10.0);
  });

  it('should be able to find all products', async () => {
    const facade = StoreCatalogFacadeFactory.create();
    await ProductModel.create({
      id: '1234567890',
      name: 'Test Product',
      description: 'Test Product Description',
      salesPrice: 10.0,
    });
    await ProductModel.create({
      id: '1234567891',
      name: 'Test Product 2',
      description: 'Test Product Description 2',
      salesPrice: 20.0,
    });

    const output = await facade.findAll();

    expect(output).toBeDefined();
    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe('1234567890');
    expect(output.products[0].name).toBe('Test Product');
    expect(output.products[0].description).toBe('Test Product Description');
    expect(output.products[0].salesPrice).toBe(10.0);
    expect(output.products[1].id).toBe('1234567891');
    expect(output.products[1].name).toBe('Test Product 2');
    expect(output.products[1].description).toBe('Test Product Description 2');
    expect(output.products[1].salesPrice).toBe(20.0);
  });
});
