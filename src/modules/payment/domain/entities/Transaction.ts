import { BaseEntity } from '../../../@shared/domain/entities/BaseEntity';
import { IAggregateRoot } from '../../../@shared/domain/entities/IAggregateRoot';
import { Id } from '../../../@shared/domain/value-object/IdValueObject';

type TransactionProps = {
  id?: Id;
  amount: number;
  orderId: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Transaction extends BaseEntity implements IAggregateRoot {
  private _amount: number;
  private _orderId: string;
  private _status: string;

  constructor(props: TransactionProps) {
    super(props.id);
    this._amount = props.amount;
    this._orderId = props.orderId;
    this._status = props.status || 'pending';
    this.validate();
  }

  get amount(): number {
    return this._amount;
  }

  get orderId(): string {
    return this._orderId;
  }

  get status(): string {
    return this._status;
  }

  validate(): void {
    if (this.amount <= 0) {
      throw new Error('Transaction amount must be greater than 0');
    }
  }

  approve(): void {
    this._status = 'approved';
  }

  decline(): void {
    this._status = 'declined';
  }

  process(): void {
    if (this._amount >= 100) {
      this.approve();
    } else {
      this.decline();
    }
  }
}
