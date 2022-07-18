import { Sequelize } from 'sequelize-typescript';
import { PaymentFacadeFactory } from '../factories/FacadeFactory';
import { TransactionModel } from '../repositories/model/Transaction.model';

describe('[Unit] Payment Facade', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able to create a transaction', async () => {
    const facade = PaymentFacadeFactory.create();

    const input = {
      orderId: '1234567890',
      amount: 100,
    };

    const output = await facade.process(input);

    expect(output).toBeDefined();
    expect(output.orderId).toBe(input.orderId);
    expect(output.amount).toBe(input.amount);
    expect(output.status).toBe('approved');
  });
});
