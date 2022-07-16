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

  it('should be able to find a products', async () => {
    const facade = StoreCatalogFacadeFactory.create();
    await ProductModel.create({
      id: '1234567890',
      name: 'Test Product',
      description: 'Test Product Description',
      salesPrice: 10.0,
    });
    const output = await facade.find('1234567890');
    expect(output).toBeDefined();
    expect(output.id).toBe('1234567890');
    expect(output.name).toBe('Test Product');
    expect(output.description).toBe('Test Product Description');
    expect(output.salesPrice).toBe(10.0);
  });
});
