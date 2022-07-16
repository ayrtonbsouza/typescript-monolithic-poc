import { StoreCatalogFacade } from '../facade/StoreCatalog';
import { ProductRepository } from '../repositories/ProductRepository';
import { FindAllProductsUseCase } from '../usecase/FindAllProducts/FindAllproducts';
import { FindProductUseCase } from '../usecase/FindProduct/FindProduct';

export class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
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
