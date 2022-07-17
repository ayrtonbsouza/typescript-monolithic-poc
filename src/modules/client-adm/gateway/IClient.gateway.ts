import { Client } from '../domain/entities/Client';

export interface IClientGateway {
  add(client: Client): Promise<void>;
  find(id: string): Promise<Client>;
}
