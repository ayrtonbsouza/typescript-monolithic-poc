import { Id } from '../../../@shared/domain/value-object/IdValueObject';
import { Transaction } from '../../domain/entities/Transaction';
import { ProcessPaymentUseCase } from './ProcessPayment';

const approvedTransaction = new Transaction({
  id: new Id('1234567890'),
  amount: 100,
  orderId: '1234567890',
  status: 'approved',
});

const ApprovedMockRepository = () => ({
  save: jest.fn().mockReturnValue(Promise.resolve(approvedTransaction)),
});

const declinedTransaction = new Transaction({
  id: new Id('1234567890'),
  amount: 50,
  orderId: '1234567890',
  status: 'declined',
});

const DeclinedMockRepository = () => ({
  save: jest.fn().mockReturnValue(Promise.resolve(declinedTransaction)),
});

describe('[Unit] ProcessPayment UseCase', () => {
  it('should be able to approve a transaction', async () => {
    const paymentRepository = ApprovedMockRepository();
    const useCase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      orderId: '1234567890',
      amount: 100,
    };

    const output = await useCase.execute(input);

    expect(output.transactionId).toBe(approvedTransaction.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(output.status).toBe('approved');
    expect(output.amount).toBe(100);
    expect(output.orderId).toBe('1234567890');
    expect(output.createdAt).toBe(approvedTransaction.createdAt);
    expect(output.updatedAt).toBe(approvedTransaction.updatedAt);
  });

  it('should be able to decline a transaction', async () => {
    const paymentRepository = DeclinedMockRepository();
    const useCase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      orderId: '1234567890',
      amount: 50,
    };

    const output = await useCase.execute(input);

    expect(output.transactionId).toBe(declinedTransaction.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(output.status).toBe('declined');
    expect(output.amount).toBe(50);
    expect(output.orderId).toBe('1234567890');
    expect(output.createdAt).toBe(declinedTransaction.createdAt);
    expect(output.updatedAt).toBe(declinedTransaction.updatedAt);
  });
});
