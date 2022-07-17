import { Sequelize } from 'sequelize-typescript';
import { ClientAdmFacadeFactory } from '../factories/FacadeFactory';
import { ClientModel } from '../repositories/model/Client.model';

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
    const facade = ClientAdmFacadeFactory.create();

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

  it('should be able to find a client', async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: '1234567890',
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
    };

    await facade.add(input);

    const output = await facade.find({ id: input.id });

    expect(output).toBeDefined();
    expect(output.id).toBe(input.id);
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
    expect(output.address).toBe(input.address);
  });
});
