import { Client } from '../../domain/entities/Client';
import { IClientGateway } from '../../gateway/IClient.gateway';
import { IInputAddClientDto, IOutputAddClientDto } from './dtos';

export class AddClientUseCase {
  private _clientRepository: IClientGateway;

  constructor(clientRepository: IClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: IInputAddClientDto): Promise<IOutputAddClientDto> {
    const props = {
      name: input.name,
      email: input.email,
      address: input.address,
    };

    const client = new Client(props);
    this._clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
