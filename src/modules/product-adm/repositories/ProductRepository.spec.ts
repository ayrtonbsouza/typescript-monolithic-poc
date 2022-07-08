import { Sequelize } from 'sequelize-typescript';
import { Id } from '../../@shared/domain/value-object/IdValueObject';
import { Product } from '../domain/entities/Product';
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

  it('should be able to create a product', async () => {
    const productProps = {
      id: new Id('1234567890'),
      name: 'Test Product',
      description: 'Test Product Description',
      purchasePrice: 10.0,
      stock: 10,
    };

    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDatabase = await ProductModel.findOne({
      where: { id: productProps.id.id },
    });

    expect(productDatabase.id).toEqual(productProps.id.id);
    expect(productDatabase.name).toEqual(productProps.name);
    expect(productDatabase.description).toEqual(productProps.description);
    expect(productDatabase.purchasePrice).toEqual(productProps.purchasePrice);
    expect(productDatabase.stock).toEqual(productProps.stock);
  });
});
