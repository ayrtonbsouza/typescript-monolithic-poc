import { ProductAdmFacade } from '../facade/ProductAdm';
import { ProductRepository } from '../repositories/ProductRepository';
import { AddProductUseCase } from '../usecase/AddProduct/AddProduct';
import { CheckStockUseCase } from '../usecase/CheckStock/CheckStock';

export class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUseCase: checkStockUseCase,
    });
    return productFacade;
  }
}
