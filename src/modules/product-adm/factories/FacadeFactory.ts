import { ProductAdmFacade } from '../facade/ProductAdm';
import { ProductRepository } from '../repositories/ProductRepository';
import { AddProductUseCase } from '../usecase/AddProduct/AddProduct';

export class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const useCase = new AddProductUseCase(productRepository);
    const productFacade = new ProductAdmFacade({
      addUseCase: useCase,
      checkStockUseCase: undefined,
    });
    return productFacade;
  }
}
