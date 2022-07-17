import { AddClientUseCase } from './AddClient';

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn(),
});

describe('[Unit] AddClient UseCase', () => {
  it('should be able to add a client', async () => {
    const repository = MockRepository();
    const usecase = new AddClientUseCase(repository);

    const input = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main Street',
    };

    const output = await usecase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(output.id).toBeDefined();
    expect(output.name).toEqual(input.name);
    expect(output.email).toEqual(input.email);
  });
});
