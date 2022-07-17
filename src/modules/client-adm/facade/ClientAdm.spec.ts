import { Sequelize } from 'sequelize-typescript';
import { ClientRepository } from '../repositories/ClientRepository';
import { ClientModel } from '../repositories/model/Client.model';
import { AddClientUseCase } from '../usecase/AddClient/AddClient';
import { ClientAdmFacade } from './ClientAdm';

describe('[Unit] Client Adm Facade', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able to create a client', async () => {
    const repository = new ClientRepository();
    const addUseCase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({ addUseCase, findUseCase: undefined });

    const input = {
      id: '1234567890',
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
    };

    await facade.add(input);

    const client = await ClientModel.findOne({ where: { id: input.id } });

    expect(client).toBeDefined();
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });
});
