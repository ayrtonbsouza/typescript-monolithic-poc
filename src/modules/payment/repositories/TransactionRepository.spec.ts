import { Sequelize } from 'sequelize-typescript';
import { Id } from '../../@shared/domain/value-object/IdValueObject';
import { Transaction } from '../domain/entities/Transaction';
import { TransactionModel } from './model/Transaction.model';
import { TransactionRepository } from './TransactionRepository';

describe('[Unit] TransactionRepository', () => {
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
    const transaction = new Transaction({
      id: new Id('1234567890'),
      orderId: '1234567890',
      amount: 100,
    });
    transaction.approve();

    const repository = new TransactionRepository();
    const output = await repository.save(transaction);

    expect(output.id).toBe(transaction.id);
    expect(output.status).toBe('approved');
    expect(output.amount).toBe(transaction.amount);
    expect(output.orderId).toBe(transaction.orderId);
  });
});
