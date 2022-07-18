import { PaymentFacade } from '../facade/Payment';
import { TransactionRepository } from '../repositories/TransactionRepository';
import { ProcessPaymentUseCase } from '../usecase/ProcessPayment/ProcessPayment';

export class PaymentFacadeFactory {
  static create(): PaymentFacade {
    const repository = new TransactionRepository();
    const useCase = new ProcessPaymentUseCase(repository);
    const facade = new PaymentFacade(useCase);
    return facade;
  }
}
