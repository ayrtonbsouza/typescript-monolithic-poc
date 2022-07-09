import { IUseCase } from '../../@shared/usecase/IUseCase';
import {
  IAddProductFacadeInput,
  ICheckStockFacadeInput,
  ICheckStockFacadeOutput,
} from './dtos';
import { IProductAdm } from './IProductAdm';

export interface IUseCasesProps {
  addUseCase: IUseCase;
  checkStockUseCase: IUseCase;
}

export class ProductAdmFacade implements IProductAdm {
  private _addUseCase: IUseCase;
  private _checkStockUseCase: IUseCase;

  constructor(useCasesProps: IUseCasesProps) {
    this._addUseCase = useCasesProps.addUseCase;
    this._checkStockUseCase = useCasesProps.checkStockUseCase;
  }

  addProduct(input: IAddProductFacadeInput): Promise<void> {
    return this._addUseCase.execute(input);
  }

  checkStock(input: ICheckStockFacadeInput): Promise<ICheckStockFacadeOutput> {
    throw new Error('Method not implemented.');
  }
}
