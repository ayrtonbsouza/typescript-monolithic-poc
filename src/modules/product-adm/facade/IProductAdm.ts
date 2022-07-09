import {
  IAddProductFacadeInput,
  ICheckStockFacadeInput,
  ICheckStockFacadeOutput,
} from './dtos';

export interface IProductAdm {
  addProduct(input: IAddProductFacadeInput): Promise<void>;
  checkStock(input: ICheckStockFacadeInput): Promise<ICheckStockFacadeOutput>;
}
