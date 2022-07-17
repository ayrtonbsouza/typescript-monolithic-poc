import { BaseEntity } from '../../../@shared/domain/entities/BaseEntity';
import { IAggregateRoot } from '../../../@shared/domain/entities/IAggregateRoot';
import { Id } from '../../../@shared/domain/value-object/IdValueObject';

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  address: string;
};

export class Client extends BaseEntity implements IAggregateRoot {
  private _name: string;
  private _email: string;
  private _address: string;

  constructor(props: ClientProps) {
    super(props.id);
    this._name = props.name;
    this._email = props.email;
    this._address = props.address;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get address(): string {
    return this._address;
  }
}
