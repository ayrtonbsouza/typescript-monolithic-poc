import { Id } from '../../@shared/domain/value-object/IdValueObject';
import { Client } from '../domain/entities/Client';
import { IClientGateway } from '../gateway/IClient.gateway';
import { ClientModel } from './model/Client.model';

export class ClientRepository implements IClientGateway {
  add(client: Client): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async find(id: string): Promise<Client> {
    const output = await ClientModel.findOne({
      where: { id },
    });

    if (!output) {
      throw new Error('Client not found');
    }

    return new Client({
      id: new Id(output.id),
      name: output.name,
      email: output.email,
      address: output.address,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    });
  }
}
