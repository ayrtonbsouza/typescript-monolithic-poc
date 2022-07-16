import {
  IInputFindStoreCatalogFacade,
  IOutputFindAllStoreCatalogFacade,
  IOutputFindStoreCatalogFacade,
} from './dtos';

export interface IStoreCatalog {
  find(
    id: IInputFindStoreCatalogFacade
  ): Promise<IOutputFindStoreCatalogFacade>;
  findAll(): Promise<IOutputFindAllStoreCatalogFacade>;
}
