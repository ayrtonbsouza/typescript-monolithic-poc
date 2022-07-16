import { ProductRepository } from '../repositories/ProductRepository';
import { FindAllProductsUseCase } from '../usecase/FindAllProducts/FindAllproducts';
import { FindProductUseCase } from '../usecase/FindProduct/FindProduct';

export class StoreCatalogFacadeFactory {
  static create(): IStoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findUseCase = new FindProductUseCase(productRepository);
    const findAllUseCase = new FindAllProductsUseCase(productRepository);
    const productFacade = new StoreCatalogFacade({
      findUseCase,
      findAllUseCase,
    });
    return productFacade;
  }
}
