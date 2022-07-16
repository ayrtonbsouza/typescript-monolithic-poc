import { IUseCase } from '../../@shared/usecase/IUseCase';
import {
  IAddProductFacadeInput,
  ICheckStockFacadeInput,
  ICheckStockFacadeOutput,
} from './dtos';
import { IProductAdm } from './IProductAdm';

export interface IUseCasesProps {
  addUseCase: IUseCase;
  stockUseCase: IUseCase;
}

export class ProductAdmFacade implements IProductAdm {
  private _addUseCase: IUseCase;
  private _stockUseCase: IUseCase;

  constructor(useCasesProps: IUseCasesProps) {
    this._addUseCase = useCasesProps.addUseCase;
    this._stockUseCase = useCasesProps.stockUseCase;
  }

  addProduct(input: IAddProductFacadeInput): Promise<void> {
    return this._addUseCase.execute(input);
  }

  checkStock(input: ICheckStockFacadeInput): Promise<ICheckStockFacadeOutput> {
    return this._stockUseCase.execute(input);
  }
}
