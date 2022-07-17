import { ClientAdmFacade } from '../facade/ClientAdm';
import { ClientRepository } from '../repositories/ClientRepository';
import { AddClientUseCase } from '../usecase/AddClient/AddClient';
import { FindClientUseCase } from '../usecase/FindClient/FindClient';

export class ClientAdmFacadeFactory {
  static create(): ClientAdmFacade {
    const repository = new ClientRepository();
    const findUseCase = new FindClientUseCase(repository);
    const addUseCase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({ addUseCase, findUseCase });
    return facade;
  }
}
