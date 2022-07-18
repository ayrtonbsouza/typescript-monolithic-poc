import { IUseCase } from '../../@shared/usecase/IUseCase';
import { IInputSavePaymentFacade, IOutputSavePaymentFacade } from './dtos';
import { IPayment } from './IPayment';

export class PaymentFacade implements IPayment {
  constructor(private processPaymentUseCase: IUseCase) {}

  async process(
    input: IInputSavePaymentFacade
  ): Promise<IOutputSavePaymentFacade> {
    return this.processPaymentUseCase.execute(input);
  }
}
