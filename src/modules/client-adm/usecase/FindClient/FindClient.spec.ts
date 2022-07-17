import { Id } from '../../../@shared/domain/value-object/IdValueObject';
import { Client } from '../../domain/entities/Client';
import { FindClientUseCase } from './FindClient';

const client = new Client({
  id: new Id('1234567890'),
  name: 'John Doe',
  email: 'johndoe@example.com',
  address: '123 Main Street',
});

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(client)),
});

describe('[Unit] FindClient UseCase', () => {
  it('should be able to find a client', async () => {
    const repository = MockRepository();
    const usecase = new FindClientUseCase(repository);

    const input = {
      id: '1234567890',
    };

    const output = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(output.id).toEqual(input.id);
    expect(output.name).toEqual(client.name);
    expect(output.email).toEqual(client.email);
    expect(output.address).toEqual(client.address);
    expect(output.createdAt).toEqual(client.createdAt);
    expect(output.updatedAt).toEqual(client.updatedAt);
  });
});
