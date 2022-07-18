import { IInputSavePaymentFacade, IOutputSavePaymentFacade } from './dtos';

export interface IPayment {
  process(input: IInputSavePaymentFacade): Promise<IOutputSavePaymentFacade>;
}
