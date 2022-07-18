import { Transaction } from '../domain/entities/Transaction';

export interface IPaymentGateway {
  save(input: Transaction): Promise<Transaction>;
}
