import { IUseCase } from '../../../@shared/usecase/IUseCase';
import { Transaction } from '../../domain/entities/Transaction';
import { IPaymentGateway } from '../../gateway/IPayment.gateway';
import { IInputProcessPaymentDto, IOutputProcessPaymentDto } from './dtos';

export class ProcessPaymentUseCase implements IUseCase {
  constructor(private transactionRepository: IPaymentGateway) {}

  async execute(
    input: IInputProcessPaymentDto
  ): Promise<IOutputProcessPaymentDto> {
    const { orderId, amount } = input;
    const transaction = new Transaction({ orderId, amount });
    transaction.process();

    const persistTransaction = await this.transactionRepository.save(
      transaction
    );

    return {
      transactionId: persistTransaction.id.id,
      orderId: persistTransaction.orderId,
      amount: persistTransaction.amount,
      status: persistTransaction.status,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt,
    };
  }
}
