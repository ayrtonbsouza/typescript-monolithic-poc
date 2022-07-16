export interface IOutputFindAllStoreCatalogFacade {
  products: Array<{
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }>;
}
