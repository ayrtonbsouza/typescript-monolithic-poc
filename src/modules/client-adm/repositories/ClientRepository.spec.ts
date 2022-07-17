import { Sequelize } from 'sequelize-typescript';
import { Id } from '../../@shared/domain/value-object/IdValueObject';
import { Client } from '../domain/entities/Client';
import { ClientRepository } from './ClientRepository';
import { ClientModel } from './model/Client.model';

describe('[Unit] ClientRepository', () => {
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
    const client = new Client({
      id: new Id('1234567890'),
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const clientFromDb = await ClientModel.findOne({
      where: { id: '1234567890' },
    });

    expect(clientFromDb).toBeDefined();
    expect(clientFromDb.id).toBe(client.id.id);
    expect(clientFromDb.name).toBe(client.name);
    expect(clientFromDb.email).toBe(client.email);
    expect(clientFromDb.address).toBe(client.address);
  });

  it('should be able to find a client', async () => {
    const client = await ClientModel.create({
      id: '1234567890',
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();
    const output = await repository.find(client.id);

    expect(output.id.id).toEqual(client.id);
    expect(output.name).toEqual(client.name);
    expect(output.email).toEqual(client.email);
    expect(output.address).toEqual(client.address);
    expect(output.createdAt).toEqual(client.createdAt);
    expect(output.updatedAt).toEqual(client.updatedAt);
  });
});
