import { FindAllProductsUseCase } from '../usecase/FindAllProducts/FindAllproducts';
import { FindProductUseCase } from '../usecase/FindProduct/FindProduct';
import {
  IInputFindStoreCatalogFacade,
  IOutputFindStoreCatalogFacade,
  IOutputFindAllStoreCatalogFacade,
} from './dtos';
import { IStoreCatalog } from './IStoreCatalog';

export interface IUseCaseProps {
  findUseCase: FindProductUseCase;
  findAllUseCase: FindAllProductsUseCase;
}

export class StoreCatalogFacade implements IStoreCatalog {
  private _findUseCase: FindProductUseCase;
  private _findAllUseCase: FindAllProductsUseCase;

  constructor(props: IUseCaseProps) {
    this._findUseCase = props.findUseCase;
    this._findAllUseCase = props.findAllUseCase;
  }

  async find(
    id: IInputFindStoreCatalogFacade
  ): Promise<IOutputFindStoreCatalogFacade> {
    const product = await this._findUseCase.execute(id);
    return product;
  }

  async findAll(): Promise<IOutputFindAllStoreCatalogFacade> {
    const products = await this._findAllUseCase.execute();
    return products;
  }
}
