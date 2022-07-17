import { IClientGateway } from '../../gateway/IClient.gateway';
import { IInputFindClientDto, IOutputFindClientDto } from './dtos';

export class FindClientUseCase {
  private _clientRepository: IClientGateway;

  constructor(clientRepository: IClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: IInputFindClientDto): Promise<IOutputFindClientDto> {
    const output = await this._clientRepository.find(input.id);

    return {
      id: output.id.id,
      name: output.name,
      email: output.email,
      address: output.address,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }
}
